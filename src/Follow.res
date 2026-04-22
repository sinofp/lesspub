open APObject
open! Promise // shadows ignore
open Fetch

// Note: this function is only for testing if my message will be accepted.
// After all, what's the point to follow someone as a static blog?
let main = async () => {
  let actors = ["https://dvd.chat/users/9gt1gfwbnibzwcur"]
  let inboxes = await actors->Array.map(x => x->fetchInbox)->all
  let pairs = Array.zip(actors, inboxes)->Array.filterMap(((a, opt)) =>
    switch (a, opt) {
    | (_, None) => None
    | (_, Some(b)) => (a, b)->Some
    }
  )

  await pairs
  ->Array.map(((actor, inbox)) => {
    Console.log2("Sending to", inbox)

    let url = Node.URL.make(inbox)
    Egress.post(
      url.host,
      url.pathname,
      {
        id: Config.actor ++ "/follow/" ++ Node.Crypto.randomUUID(),
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
  Console.log(res)
  resolve()
})
->ignore
