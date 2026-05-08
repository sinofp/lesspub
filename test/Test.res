open! Node // shadows Date
open Global

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------

let devPort = 8888
let ghShimPort = 3001
let remotePort = 9999
let baseUrl = `http://localhost:${Int.toString(devPort)}`
let remoteUser = "alvis"
let remoteActor = `http://localhost:${Int.toString(remotePort)}/users/${remoteUser}`
let noteId = `http://localhost:${Int.toString(remotePort)}/users/${remoteUser}/statuses/reply/1`
let samplesDir = Path.join([__dirname, "samples"])

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

type httpResponse = {status: int, body: string}

let httpGet = async (port, path) => {
  let res = await fetch(
    `http://localhost:${Int.toString(port)}${path}`,
    Obj.magic({"method": "GET"}),
  )
  let body = await res->text
  {status: res.status, body}
}

let httpPost = async (port, path, body, headers) => {
  let res = await fetch(
    `http://localhost:${Int.toString(port)}${path}`,
    Obj.magic({"method": "POST", "headers": headers, "body": body}),
  )
  let respBody = await res->text
  {status: res.status, body: respBody}
}

let genRsaKeyPair = () =>
  Crypto.generateKeyPairSync(
    "rsa",
    Obj.magic({
      "modulusLength": 2048,
      "publicKeyEncoding": {"type": "spki", "format": "pem"},
      "privateKeyEncoding": {"type": "pkcs8", "format": "pem"},
    }),
  )

let sha256b64 = str => Crypto.createHash("sha256")->Crypto.update(str)->Crypto.digest("base64")

let signedHeaders = (body, reqPath, privateKey) => {
  let d = Date.make()->Date.toUTCString
  let digest = "SHA-256=" ++ sha256b64(body)
  let toSign =
    `(request-target): post ${reqPath}\n` ++
    `host: localhost:${Int.toString(devPort)}\n` ++
    `date: ${d}\n` ++
    `digest: ${digest}`
  let sig =
    Crypto.sign("sha256", Buffer.fromString(toSign), privateKey)->Buffer.toStringWithEncoding(
      #base64,
    )
  Dict.fromArray([
    ("content-type", "application/activity+json"),
    ("host", `localhost:${Int.toString(devPort)}`),
    ("date", d),
    ("digest", digest),
    (
      "signature",
      `keyId="${remoteActor}#main-key",algorithm="rsa-sha256",` ++
      `headers="(request-target) host date digest",signature="${sig}"`,
    ),
  ])
}

let sample = name => Fs.readFileAsUtf8Sync(Path.join([samplesDir, name]))

let collectBody = (req: Http.incomingMessage) => {
  req->Http.setEncoding("utf8")
  Promise.make((resolve, _) => {
    let chunks: array<string> = []
    req->Http.onData(c => chunks->Array.push(c))
    req->Http.onEnd(() => resolve(chunks->Array.join("")))
  })
}

let collectionContains = (collection: option<JSON.t>, id) =>
  collection
  ->Option.flatMap(JSON.Decode.object)
  ->Option.flatMap(d => d->Dict.get("orderedItems"))
  ->Option.flatMap(JSON.Decode.array)
  ->Option.getOr([])
  ->Array.some(item =>
    switch item->JSON.Decode.string {
    | Some(s) => s === id
    | None =>
      item
      ->JSON.Decode.object
      ->Option.flatMap(d => d->Dict.get("id"))
      ->Option.flatMap(JSON.Decode.string)
      ->Option.map(s => s === id)
      ->Option.getOr(false)
    }
  )

let jsonStringify = (json: option<JSON.t>) =>
  json->Option.map(j => JSON.stringify(j, ~space=4))->Option.getOr("null")

// ---------------------------------------------------------------------------
// Test framework
// ---------------------------------------------------------------------------

type testResult = {name: string, checkings: int, failures: array<string>}

let runTest = async (name, fn) => {
  let results: array<(bool, string)> = []
  let assert_that = (cond, msg) => results->Array.push((cond, msg))
  await fn(assert_that)
  {
    name,
    checkings: results->Array.length,
    failures: results->Array.filterMap(((pass, msg)) => pass ? None : Some(`${name}: ${msg}`)),
  }
}

// ---------------------------------------------------------------------------
// GitHub Contents API Shim
// ---------------------------------------------------------------------------

let encodeBase64 = s => s->Buffer.fromString->Buffer.toStringWithEncoding(#base64)
let decodeBase64 = s => s->Buffer.fromStringWithEncoding(#base64)->Buffer.toString

let respond = (res, code, headers, body) => {
  res->Http.writeHead(code, headers)
  res->Http.end_(body)
}

let sendJson = (res, code, body) =>
  respond(res, code, [("Content-Type", "application/json")]->Dict.fromArray, body)

let startGitHubShim = (dataDir, port) => {
  let server = Http.createServer(async (req, res) => {
    let reqPath = req->Http.url->Nullable.toOption->Option.getOr("/")
    let method_ = req->Http.method_->Nullable.toOption->Option.getOr("GET")
    let filePath = Path.join([dataDir, reqPath])
    switch method_ {
    | "GET" =>
      if Fs.existsSync(filePath) {
        let content = Fs.readFileAsUtf8Sync(filePath)
        sendJson(res, 200, `{"content":"${encodeBase64(content)}", "sha":"shim"}`)
      } else {
        sendJson(res, 404, "{\"message\":\"Not Found\"}")
      }
    | "PUT" =>
      let body = await collectBody(req)
      let content =
        body
        ->JSON.parseOrThrow
        ->JSON.Decode.object
        ->Option.flatMap(d => d->Dict.get("content"))
        ->Option.flatMap(JSON.Decode.string)
        ->Option.getOrThrow
        ->decodeBase64
      Fs.mkdirSync(Path.dirname(filePath))
      Fs.writeFileAsUtf8Sync(filePath, content)
      sendJson(res, 200, "{}")
    | "DELETE" =>
      if Fs.existsSync(filePath) {
        Fs.rmSync(filePath)
        sendJson(res, 200, "{}")
      } else {
        sendJson(res, 404, "{\"message\":\"Not Found\"}")
      }
    | _ => sendJson(res, 405, "{\"message\":\"Method Not Allowed\"}")
    }
  })
  Promise.make((resolve, _) => server->Http.listen(port, () => resolve()))
}

// ---------------------------------------------------------------------------
// Netlify Runtime Shim
// ---------------------------------------------------------------------------

@val external require_: string => 'a = "require"
@get external getHandler: 'a => (Event.event, 'ctx) => promise<Event.response> = "handler"

let startDevServer = (handler, port) => {
  let server = Http.createServer(async (req, res) => {
    let body = await collectBody(req)
    let rawUrl = req->Http.url->Nullable.toOption->Option.getOrThrow
    let url = URL.make(rawUrl, ~base="http://localhost")
    let httpMethod: Event.httpMethod = Obj.magic(
      req->Http.method_->Nullable.toOption->Option.getOrThrow,
    )
    // TODO assert_that real Netlify event
    let event: Event.event = {
      path: url.pathname,
      httpMethod,
      headers: req->Http.headers,
      body: body == "" ? None : Some(body),
    }
    // HEAD requests are used by slugExist to assert_that if a note belongs to us.
    // Always return 200 so tests don't need actual note files.
    let response = if httpMethod == #HEAD {
      {Event.statusCode: 200}
    } else {
      await handler(event, Obj.magic(undefined))
    }
    respond(
      res,
      response.statusCode,
      response.headers->Option.getOr(Dict.make()),
      response.body->Option.getOr(""),
    )
  })
  Promise.make((resolve, _) => server->Http.listen(port, () => resolve()))
}

// ---------------------------------------------------------------------------
// Remote actor shim (:9999 HTTP)
// ---------------------------------------------------------------------------

let startRemoteActor = async (publicKey: string) => {
  let actorJson = JSON.stringify(
    Obj.magic({
      "@context": "https://www.w3.org/ns/activitystreams",
      "id": remoteActor,
      "type": "Person",
      "inbox": `http://localhost:${Int.toString(remotePort)}/inbox`,
      "publicKey": {
        "id": `${remoteActor}#main-key`,
        "owner": remoteActor,
        "publicKeyPem": publicKey,
      },
    }),
  )
  // The Follow test verifies that the local server sends back an Accept:
  //   1. The test calls waitForAccept(), storing resolve here and returning a pending Promise
  //   2. The test POSTs a Follow to the local server
  //   3. The local server processes it and POSTs an Accept to this shim's /inbox
  //   4. The /inbox handler calls resolve, completing the Promise so the test can verify the Accept
  let acceptWaiter: ref<option<string => unit>> = ref(None)
  let server = Http.createServer(async (req, res) => {
    let body = await collectBody(req)
    let method = req->Http.method_->Nullable.toOption->Option.getOr("GET")
    let url = req->Http.url->Nullable.toOption->Option.getOr("/")
    switch (method, url) {
    | ("GET", u) if u == `/users/${remoteUser}` =>
      respond(res, 200, [("Content-Type", "application/activity+json")]->Dict.fromArray, actorJson)
    | ("POST", "/inbox") =>
      acceptWaiter.contents->Option.forEach(resolve => resolve(body))
      acceptWaiter.contents = None
      respond(res, 200, Dict.make(), "")
    | _ => respond(res, 404, Dict.make(), "")
    }
  })
  let _ = await Promise.make((resolve, _) => server->Http.listen(remotePort, () => resolve()))
  () => Promise.make((resolve, _) => acceptWaiter.contents = Some(resolve))
}

// ---------------------------------------------------------------------------
// Test cases
// ---------------------------------------------------------------------------

let runTests = async (
  remotePrivateKey: string,
  tmpDataDir: string,
  waitForAccept: unit => promise<string>,
) => {
  let readData = relPath => {
    let full = Path.join([tmpDataDir, relPath])
    if Fs.existsSync(full) {
      Some(JSON.parseOrThrow(Fs.readFileAsUtf8Sync(full)))
    } else {
      None
    }
  }

  let inboxTest = (name, sampleFile, dataPath, id, addMode, ~expectAccept=false) =>
    runTest(name, async assert_that => {
      let pendingAccept = expectAccept ? Some(waitForAccept()) : None
      assert_that(collectionContains(readData(dataPath), id) !== addMode, "precondition failed")

      // The remote actor posts us an ActivityPub activity
      let body = sample(sampleFile)
      let res = await httpPost(
        devPort,
        "/inbox",
        body,
        signedHeaders(body, "/inbox", remotePrivateKey),
      )
      assert_that(res.status === 200, `status=${Int.toString(res.status)}`)

      switch pendingAccept {
      | Some(p) =>
        let accepted = await p
        let isAccept = try JSON.parseOrThrow(accepted)
        ->JSON.Decode.object
        ->Option.flatMap(d => d->Dict.get("type"))
        ->Option.flatMap(JSON.Decode.string)
        ->Option.map(t => t === "Accept") catch {
        | _ => None
        }->Option.getOr(false)
        assert_that(isAccept, `Accept not delivered; captured: ${accepted}`)
      | None => ()
      }

      let data = readData(dataPath)
      assert_that(
        collectionContains(data, id) === addMode,
        `collection state wrong; got: ${jsonStringify(data)}`,
      )
    })

  [
    await runTest("GET /actor", async assert_that => {
      let res = await httpGet(devPort, "/actor")
      let typeField = try JSON.parseOrThrow(res.body)
      ->JSON.Decode.object
      ->Option.flatMap(d => d->Dict.get("type"))
      ->Option.flatMap(JSON.Decode.string) catch {
      | _ => None
      }
      assert_that(
        res.status === 200 && typeField === Some("Person"),
        `status=${Int.toString(res.status)} type=${typeField->Option.getOr("none")}`,
      )
    }),
    await inboxTest("Follow", "follow.json", "followers", remoteActor, true, ~expectAccept=true),
    await inboxTest("Undo Follow", "unfollow.json", "followers", remoteActor, false),
    await inboxTest("Like", "like.json", "likes/test-note-1", remoteActor, true),
    await inboxTest("Undo Like", "unlike.json", "likes/test-note-1", remoteActor, false),
    await inboxTest("Announce", "announce.json", "announces/test-note-1", remoteActor, true),
    await inboxTest(
      "Undo Announce",
      "unannounce.json",
      "announces/test-note-1",
      remoteActor,
      false,
    ),
    await inboxTest("Create reply", "reply.json", "all-replies", noteId, true),
    await inboxTest("Delete", "delete.json", "all-replies", noteId, false),
  ]
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

let main = async () => {
  // 1. Generate ephemeral key pairs
  let localKeys = genRsaKeyPair()
  let remoteKeys = genRsaKeyPair()

  // 2. Temp data dir
  let tmpDataDir = Fs.mkdtempSync(Path.join([Os.tmpdir(), "lesspub-test-"]))

  // 3. Write fake actor.json into tmpDataDir
  let fakeActorJsonPath = Path.join([tmpDataDir, "actor.json"])
  Fs.writeFileAsUtf8Sync(
    fakeActorJsonPath,
    JSON.stringify(
      Obj.magic({
        "@context": ["https://www.w3.org/ns/activitystreams", "https://w3id.org/security/v1"],
        "id": `${baseUrl}/actor`,
        "type": "Person",
        "inbox": `${baseUrl}/inbox`,
        "publicKey": {
          "id": `${baseUrl}/actor#main-key`,
          "owner": `${baseUrl}/actor`,
          "publicKeyPem": localKeys.publicKey,
        },
      }),
    ),
  )

  // 4. Set process.env before loading Index.js (Config reads env at module load time)
  open Dict
  let env = Process.env
  env->set("AP_BASE_URL", baseUrl)
  env->set("AP_PRIVATE_KEY", localKeys.privateKey->String.replaceRegExp(/\n/g, "\\n"))
  env->set("AP_GH_TOKEN", "test")
  env->set("AP_GH_BASE_URL", `http://localhost:${Int.toString(ghShimPort)}`)
  env->set("AP_EXTRA_INBOXES", "")
  env->set("AP_GH_DATA_DIR", tmpDataDir)
  env->set("AP_ACTOR_JSON_PATH", fakeActorJsonPath)

  // 5. Load handler
  let handler = require_("../src/Index.js")->getHandler

  // 6. Start servers (await listen so they are ready before tests run)
  let waitForAccept = await startRemoteActor(remoteKeys.publicKey)
  await startGitHubShim(tmpDataDir, ghShimPort)
  await startDevServer(handler, devPort)

  // 7. Run tests
  let cleanup = () =>
    try Fs.rmSync(tmpDataDir) catch {
    | _ => ()
    }
  let results = try {
    await runTests(remoteKeys.privateKey, tmpDataDir, waitForAccept)
  } catch {
  | e => {
      cleanup()
      throw(e)
    }
  }
  cleanup()

  // 8. Report
  let allCheckings = results->Array.reduce(0, (s, r) => s + r.checkings)
  let allFailures = results->Array.reduce([], (acc, r) => acc->Array.concat(r.failures))
  let passing = results->Array.filter(r => r.failures->Array.length === 0)->Array.length
  let failing = results->Array.length - passing
  Console.log(
    `[Info] ${Int.toString(results->Array.length)} tests, ${Int.toString(
        passing,
      )} passing, ${Int.toString(failing)} failing, ${Int.toString(allCheckings)} checkings.`,
  )
  allFailures->Array.forEach(Console.log)
  Process.exit(
    if failing > 0 {
      1
    } else {
      0
    },
  )
}

main()
->Promise.catch(e => {
  Console.error(e)
  Process.exit(1)
  Promise.resolve()
})
->ignore
