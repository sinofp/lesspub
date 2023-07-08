open Object
open Js.Promise2
open Fetch

@module("node:crypto") external randomUUID: unit => string = "randomUUID"

// Note: this function is only for testing if my message will be accepted.
// After all, what's the point to follow someone as a static blog?
let main = async () => {
  let actors = ["https://dvd.chat/users/9gt1gfwbnibzwcur"]
  let inboxes = await actors->Js.Array2.map(x => x->fetchInbox)->all
  let pairs = Array.zip(actors, inboxes)->Array.keepMap(((a, opt)) =>
    switch (a, opt) {
    | (_, None) => None
    | (_, Some(b)) => (a, b)->Some
    }
  )

  await pairs
  ->Js.Array2.map(((actor, inbox)) => {
    Js.log2("Sending to", inbox)

    let url = Handle.URL.make(inbox)
    Egress.post(
      url.host,
      url.pathname,
      {
        id: Config.actor ++ "/follow/" ++ randomUUID(),
        type_: #Follow,
        actor: Config.actor,
        object: actor->StringOption.fromString,
      },
    )
  })
  ->all
}

main()
->then(res => {
  Js.log(res)
  resolve()
})
->ignore
