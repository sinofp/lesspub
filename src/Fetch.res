type response = {ok: bool}
@module("node-fetch") external fetch: (string, 'a) => promise<response> = "default"
@send external text: response => promise<string> = "text"
@send external json: response => promise<Js.Dict.t<Js.Json.t>> = "json"

let headers = {"accept": "application/activity+json"}

let fetchKey = async keyId => {
  let res = await fetch(keyId, {"headers": headers})
  try (await res
  ->json)
  ->Js.Dict.get("publicKey")
  ->Option.flatMap(Js.Json.decodeObject)
  ->Option.flatMap(x => x->Js.Dict.get("publicKeyPem"))
  ->Option.flatMap(Js.Json.decodeString) catch {
  | Js.Exn.Error(_) => None // Doesn't return a json
  }
}

let fetchInbox = async actor => {
  let res = await fetch(actor, {"headers": headers})
  try (await res->json)->Js.Dict.get("inbox")->Option.flatMap(Js.Json.decodeString) catch {
  | Js.Exn.Error(_) => None
  }
}

module GitHub = {
  let atob = s => s->Node.Buffer.fromString->Node.Buffer.toStringWithEncoding(#base64)
  let btoa = s => s->Node.Buffer.fromStringWithEncoding(#base64)->Node.Buffer.toString

  open Config
  // I only access files under `static', and expect path starts with `/'
  // It makes generating public accessable id easier
  let headers = {
    "accept": "application/vnd.github+json",
    "authorization": "Bearer " ++ ghToken,
    "x-gitHub-api-version": "2022-11-28",
  }

  let put = async (content, path, sha: option<string>) =>
    (
      await fetch(
        ghBaseURL ++ path,
        {
          "method": #PUT,
          "headers": headers,
          "body": {
            "message": "Update ActivityPub file",
            "committer": {"name": "LessPub Bot", "email": "no-email@example.com"},
            "content": atob(content),
            "sha": sha, // Only needed for updating
          }
          ->Obj.magic
          ->Js.Json.stringify,
        },
      )
    ).ok

  let delete = async (path, sha) =>
    (
      await fetch(
        ghBaseURL ++ path,
        {
          "method": #DELETE,
          "headers": headers,
          "body": {
            "message": "Delete ActivityPub file",
            "committer": {"name": "LessPub Bot", "email": "no-email@example.com"},
            "sha": sha,
          }
          ->Obj.magic
          ->Js.Json.stringify,
        },
      )
    ).ok

  let get = async path => {
    let res = await fetch(ghBaseURL ++ path, {"headers": headers})
    if res.ok {
      let dict = await res->json
      let content =
        dict->Js.Dict.get("content")->Option.flatMap(Js.Json.decodeString)->Option.map(btoa)
      let sha = dict->Js.Dict.get("sha")->Option.flatMap(Js.Json.decodeString)
      (content, sha)
    } else {
      (None, None)
    }
  }

  open Object
  let insertToFile = async (ooi, path) => {
    let (collection, sha) = await path->get
    let collection =
      collection
      ->Option.flatMap(x => x->fromString->resultToOption)
      ->Option.getWithDefault({
        id: baseURL ++ path,
        type_: #OrderedCollection,
        totalItems: 0,
        orderedItems: [],
      })

    let {totalItems, orderedItems} = collection
    orderedItems->Js.Array2.includes(ooi) || {
        collection.totalItems = Some(1 + totalItems)
        collection.orderedItems = Some([ooi]->Js.Array2.concat(orderedItems))
        await collection->toJSON->Js.Json.stringify->put(path, sha)
      }
  }

  let removeFromFile = async (ooi, path) => {
    let (collection, sha) = await path->get
    switch collection->Option.flatMap(x => x->fromString->resultToOption) {
    | None => true
    | Some(collection) => {
        let {totalItems, orderedItems} = collection
        let id = ooi->getId
        Js.log3(totalItems, sha, id)
        switch (totalItems, orderedItems->Js.Array2.findIndex(x => id == x->getId)) {
        | (_, -1) => true
        | (1, _) => await delete(path, sha->Option.getExn)
        | (_, i) => {
            let _ = orderedItems->Js.Array2.removeCountInPlace(~pos=i, ~count=1)
            collection.totalItems = Some(totalItems - 1)
            collection.orderedItems = Some(orderedItems)
            await collection->toJSON->Js.Json.stringify->put(path, sha)
          }
        }
      }
    }
  }
}
