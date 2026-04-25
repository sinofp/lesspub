open APObject

let main = async () => {
  let path_public = Node.Path.join(["public", "outbox"])
  let path_static = Node.Path.join(["static", "outbox"])
  let outbox = try Node.Fs.readFileAsUtf8Sync(path_public) catch {
  | JsExn(_) => Node.Fs.readFileAsUtf8Sync(path_static)
  }
  let orderedItems = (fromString(outbox)->Result.getOrThrow).orderedItems->Option.getOr([])

  let last_create_note = switch orderedItems->Array.getUnsafe(0)->StringOption.classify {
  | String(_) => failwith("I need the Create Object, not Create id")
  | Wrap(obj) => obj
  }
  Console.log2("I will send the last note:", last_create_note->toJSON)

  let path = Node.Path.join(["static", "followers"])
  let followers = Node.Fs.readFileAsUtf8Sync(path)
  // Shadows fromString
  let orderedItems = (fromString(followers)->Result.getOrThrow).orderedItems->Option.getOr([])
  let followers = orderedItems->Array.map(x =>
    switch x->StringOption.classify {
    | String(actor) => actor
    | Wrap(_) => failwith("Followers should be string")
    }
  )
  // TODO sharedInbox
  let inboxes =
    (
      await followers
      ->Array.map(actor =>
        Fetch.fetchInbox(actor)->Promise.catch(e => {
          Console.log2("Failed to fetch inbox for:", actor)
          Console.log2("Error:", e)
          Promise.resolve(None)
        })
      )
      ->Promise.all
    )
    ->Array.filterMap(x => x)
    ->Array.concat(Config.extraInboxes)

  await inboxes
  ->Array.map(x => {
    Console.log2("Sending to", x)
    Egress.post(x, last_create_note)
  })
  ->Promise.all
}

main()
->Promise.then(res => {
  Console.log(res)
  Promise.resolve()
})
->ignore
