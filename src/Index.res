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

  let handlers = t =>
    switch t {
    | #Follow => follow
    | #Create => create
    | #Like => like(~undo=false)
    | #Undo => undo
    | #Delete => delete
    | #Accept | #Note | #OrderedCollection =>
      _ => Js.Promise2.resolve({statusCode: 400, body: "Why are you sending this to me?"})
    }

  switch (httpMethod, path, post_verified, activity) {
  | (#GET, "/actor", _, _) => actor(event)
  | (#POST, _, false, _) => {statusCode: 401}
  | (#POST, "/inbox", _, Some(Ok(_ as act))) => await act.type_->handlers(act)
  | _ => {statusCode: 501}
  }
}
