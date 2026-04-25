open Node.Global

let headers = {"accept": "application/activity+json"}

let fetchKey = async keyId => {
  let res = await fetch(keyId, {"headers": headers})
  try (await res->json)
  ->Dict.get("publicKey")
  ->Option.flatMap(JSON.Decode.object)
  ->Option.flatMap(x => x->Dict.get("publicKeyPem"))
  ->Option.flatMap(JSON.Decode.string) catch {
  | JsExn(_) => None // Doesn't return a json
  }
}

let fetchInbox = async actor => {
  let res = await fetch(actor, {"headers": headers})
  try (await res->json)->Dict.get("inbox")->Option.flatMap(JSON.Decode.string) catch {
  | JsExn(_) => None
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
          ->JSON.stringify,
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
          ->JSON.stringify,
        },
      )
    ).ok

  open APObject
  let get = async path => {
    let res = await fetch(ghBaseURL ++ path, {"headers": headers})
    if res.ok {
      let dict = await res->json
      let content = dict->Dict.get("content")->Option.flatMap(JSON.Decode.string)->Option.map(btoa)
      let sha = dict->Dict.get("sha")->Option.flatMap(JSON.Decode.string)
      (content, sha)
    } else {
      (None, None)
    }
  }

  let insertToFile = async (ooi, path) => {
    let (collection, sha) = await path->get
    let collection =
      collection
      ->Option.flatMap(x => x->fromString->resultToOption)
      ->Option.getOr({
        id: baseURL ++ path,
        type_: #OrderedCollection,
        totalItems: 0,
        orderedItems: [],
      })

    let totalItems = collection.totalItems->Option.getOr(0)
    let orderedItems = collection.orderedItems->Option.getOr([])
    orderedItems->Array.some(x => x == ooi) || {
        collection.totalItems = Some(1 + totalItems)
        collection.orderedItems = Some([ooi]->Array.concat(orderedItems))
        await collection->toJSON->JSON.stringify(~space=4)->put(path, sha)
      }
  }

  let removeFromFile = async (ooi, path) => {
    let (collection, sha) = await path->get
    switch collection->Option.flatMap(x => x->fromString->resultToOption) {
    | None => true
    | Some(collection) => {
        let totalItems = collection.totalItems->Option.getOr(0)
        let orderedItems = collection.orderedItems->Option.getOr([])
        let id = ooi->getId
        Console.log3(totalItems, sha, id)
        switch (totalItems, orderedItems->Array.findIndexOpt(x => id == x->getId)) {
        | (_, None) => true
        | (1, Some(_)) => await delete(path, sha->Option.getOrThrow)
        | (_, Some(i)) => {
            collection.totalItems = Some(totalItems - 1)
            collection.orderedItems = Some(orderedItems->Array.filterWithIndex((_, j) => j != i))
            await collection->toJSON->JSON.stringify(~space=4)->put(path, sha)
          }
        }
      }
    }
  }
}
