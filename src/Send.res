open Object
open Js.Promise2

let main = async () => {
  let path_public = Node.Path.join(["public", "outbox"])
  let path_static = Node.Path.join(["static", "outbox"])
  let outbox = try Node.Fs.readFileAsUtf8Sync(path_public) catch {
  | Js.Exn.Error(_) => Node.Fs.readFileAsUtf8Sync(path_static)
  }
  let {orderedItems} = fromString(outbox)->Result.getExn

  let last_create_note = switch orderedItems->Js.Array2.unsafe_get(0)->StringOption.classify {
  | String(_) => failwith("I need the Create Object, not Create id")
  | Wrap(obj) => obj
  }
  Js.log2("I will send the last note:", last_create_note->toJSON)

  let path = Node.Path.join(["static", "followers"])
  let followers = Node.Fs.readFileAsUtf8Sync(path)
  // Shadows fromString
  let {orderedItems} = fromString(followers)->Result.getExn
  let followers = orderedItems->Js.Array2.map(x =>
    switch x->StringOption.classify {
    | String(actor) => actor
    | Wrap(_) => failwith("Followers should be string")
    }
  )
  // TODO sharedInbox
  let inboxes =
    (await followers
    ->Js.Array2.map(Fetch.fetchInbox)
    ->all)
    ->Array.keepMap(x => x)
    ->Array.concat(Config.extraInboxes)

  await inboxes
  ->Js.Array2.map(x => {
    Js.log2("Sending to", x)
    let {host, pathname} = x->Handle.URL.make
    Egress.post(host, pathname, last_create_note)
  })
  ->all
}

main()
->then(res => {
  Js.log(res)
  resolve()
})
->ignore
