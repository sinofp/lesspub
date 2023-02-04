open Handle
open Event
open Security.Signature
open! Object // Shadows parse

let handler = async (event, _): response => {
  // Don't print super long multiValueHeaders
  let {httpMethod, path, headers} = event
  Js.log({
    "httpMethod": httpMethod,
    "path": path,
    "headers": headers,
  })
  let post_verified = httpMethod == #POST && (await verify(event))
  Js.log2("post_verified:", post_verified)

  let activity = event.body->Option.map(fromString)
  activity->Option.forEach(x =>
    switch x {
    | Ok(obj) => Js.log2("body:", obj)
    | Error(msg) => Js.log2("Can't parse body as an ActivityStream Object:", msg)
    }
  )

  switch (httpMethod, path, post_verified, activity) {
  | (#GET, "/actor", _, _) => actor(event)
  | (#POST, _, false, _) => {statusCode: 401}
  | (#POST, "/inbox", _, Some(Ok({type_: #Follow} as act))) => await follow(act)
  | (#POST, "/inbox", _, Some(Ok({type_: #Create} as act))) => await create(act)
  | (#POST, "/inbox", _, Some(Ok({type_: #Like} as act))) => await like(act)
  | (#POST, "/inbox", _, Some(Ok({type_: #Undo} as act))) => await undo(act)
  | _ => {statusCode: 501}
  }
}
