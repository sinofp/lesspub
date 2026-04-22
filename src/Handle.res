open Event
open APObject

let actor = (e: event) =>
  switch e.headers->Dict.get("accept")->Option.map(s => s->String.startsWith("text/html")) {
  | Some(true) => {statusCode: 302, headers: [("Location", Config.baseURL)]->Dict.fromArray}
  | _ => {
      statusCode: 200,
      headers: [("Content-Type", "application/activity+json")]->Dict.fromArray,
      body: Config.actorJSON->JSON.stringify,
    }
  }

open Fetch

let follow = async incoming =>
  switch incoming.actor {
  | None => {statusCode: 400, body: "Where's your actor?"}
  | Some(actor) =>
    switch await fetchInbox(actor) {
    | None => {statusCode: 400, body: "Where's your inbox?"}
    | Some(inbox) => {
        open Node
        let url = URL.make(inbox)
        let res = await Egress.post(
          url.host,
          url.pathname,
          {
            id: Config.actor ++ "/follow/" ++ Crypto.randomUUID(),
            type_: #Accept,
            actor: Config.actor,
            object: incoming->StringOption.wrap,
          },
        )
        if res.ok && (await actor->StringOption.fromString->GitHub.insertToFile("/followers")) {
          {statusCode: 200}
        } else {
          {statusCode: 500, body: "Can't post Accept activity or can't update DB"}
        }
      }
    }
  }

let unfollow = async incoming =>
  switch incoming.actor {
  | None => {statusCode: 400, body: "Where's your actor?"}
  | Some(actor) =>
    if await actor->StringOption.fromString->GitHub.removeFromFile("/followers") {
      {statusCode: 200}
    } else {
      {statusCode: 500, body: "Can't update DB"}
    }
  }

let noteBaseLength = (Config.baseURL ++ "/note")->String.length
// example.com/note/slug => /slug
let noteId2Slug = id => id->String.slice(~start=noteBaseLength)

let slugExist = async slug =>
  try (await fetch(Config.baseURL ++ slug, {"method": #HEAD})).ok catch {
  | _ => false // FetchError: ENOTFOUND
  }

let nonTextReaction = async (~pathPrefix, ~undo, incoming) =>
  switch (incoming.actor, incoming.object) {
  | (Some(actor), Some(object)) => {
      let slug = object->getId->noteId2Slug
      let forMe = await slug->slugExist
      let path = pathPrefix ++ slug
      let update = undo ? GitHub.removeFromFile : GitHub.insertToFile
      if !forMe || (await actor->StringOption.fromString->update(path)) {
        {statusCode: 200}
      } else {
        {statusCode: 500, body: "Can't update DB"}
      }
    }

  | _ => {statusCode: 400, body: "I need both actor and object"}
  }

let like = nonTextReaction(~pathPrefix="/likes", ...)

let announce = nonTextReaction(~pathPrefix="/announces", ...)

let create = async incoming =>
  switch incoming.object {
  | Some(object) =>
    switch object->StringOption.classify {
    | String(_) => {statusCode: 501, body: "Give me the whole object, please"}
    | Wrap({type_: #Note, inReplyTo} as obj) => {
        let slug = inReplyTo->noteId2Slug
        let forMe = await slug->slugExist
        let path = "/replies" ++ slug
        if !forMe || (await obj->StringOption.wrap->GitHub.insertToFile(path)) {
          {statusCode: 200}
        } else {
          {statusCode: 500, body: "Can't update DB"}
        }
      }

    | Wrap(_) => {statusCode: 400, body: "I only support reply"}
    }
  | None => {statusCode: 400, body: "I need object"}
  }

let delete = async incoming =>
  switch incoming.object {
  | Some(object) => {
      let slug = object->getId->noteId2Slug
      let forMe = await slug->slugExist
      let path = "/replies" ++ slug // Assumption: the only thing can be deleted is a reply
      if !forMe || (await object->GitHub.removeFromFile(path)) {
        {statusCode: 200}
      } else {
        {statusCode: 500, body: "Can't update DB"}
      }
    }

  | None => {statusCode: 400, body: "I need object"}
  }

let undo = async incoming =>
  switch incoming.object {
  | Some(object) =>
    switch object->StringOption.classify {
    | String(_) => {statusCode: 501, body: "Give me the whole object, please"}
    | Wrap({type_: #Follow} as obj) => await unfollow(obj)
    | Wrap({type_: #Like} as obj) => await like(obj, ~undo=true)
    | Wrap({type_: #Announce} as obj) => await announce(obj, ~undo=true)
    | Wrap(_) => {statusCode: 501, body: "I can only Undo Follow or Like"}
    }
  | None => {statusCode: 400, body: "I need object"}
  }
