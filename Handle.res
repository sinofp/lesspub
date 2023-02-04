open Event
open Object

let actor = (e: event) =>
  switch e.headers->Js.Dict.get("accept")->Belt.Option.map(Js.String.startsWith("text/html")) {
  | Some(true) => {statusCode: 302, headers: [("Location", Config.baseURL)]->Js.Dict.fromArray}
  | _ => {
      statusCode: 200,
      headers: [("Content-Type", "application/activity+json")]->Js.Dict.fromArray,
      body: Config.actorJSON->Js.Json.stringify,
    }
  }

module URL = {
  type t = {
    host: string,
    pathname: string,
  }
  @module("node:url") @new external make: string => t = "URL"
}

@module("node:crypto") external randomUUID: unit => string = "randomUUID"

open Fetch

let follow = async incoming =>
  switch incoming.actor {
  | None => {statusCode: 400, body: "Where's your actor?"}
  | Some(actor) =>
    switch await fetchInbox(actor) {
    | None => {statusCode: 400, body: "Where's your inbox?"}
    | Some(inbox) => {
        let url = URL.make(inbox)
        let res = await Egress.post(
          url.host,
          url.pathname,
          {
            id: randomUUID(),
            type_: #Accept,
            actor: Config.actor,
            object: incoming->StringOption.wrap,
          },
        )
        if (
          res.ok &&
          await actor->StringOption.fromString->GitHub.insertToFile("/followers")
        ) {
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

let noteBaseLength = (Config.baseURL ++ "/note")->Js.String2.length
// example.com/note/slug => /slug
let noteId2Slug = id => id->Js.String2.sliceToEnd(~from=noteBaseLength)

let slugExist = async slug => (await fetch(Config.baseURL ++ slug, {"method": #HEAD})).ok

let like = async incoming =>
  switch (incoming.actor, incoming.object) {
  | (Some(actor), Some(object)) =>
    switch object->StringOption.classify {
    | Wrap(_) => {statusCode: 501, body: "Give me only the object id, please"}
    | String(id) => {
        let slug = id->noteId2Slug
        let forMe = await slug->slugExist
        let path = slug ++ "-likes.jsonld"
        if !forMe || await actor->StringOption.fromString->GitHub.insertToFile(path) {
          {statusCode: 200}
        } else {
          {statusCode: 500, body: "Can't update DB"}
        }
      }
    }
  | _ => {statusCode: 400, body: "I need both actor and object"}
  }

let create = async incoming =>
  switch incoming.object {
  | Some(object) =>
    switch object->StringOption.classify {
    | String(_) => {statusCode: 501, body: "Give me the whole object, please"}
    | Wrap({type_: #Note, inReplyTo} as obj) => {
        let slug = inReplyTo->noteId2Slug
        let forMe = await slug->slugExist
        let path = slug ++ "-replies.jsonld"
        if !forMe || await obj->StringOption.wrap->GitHub.insertToFile(path) {
          {statusCode: 200}
        } else {
          {statusCode: 500, body: "Can't update DB"}
        }
      }

    | Wrap(_) => {statusCode: 400, body: "I only support reply"}
    }
  | None => {statusCode: 400, body: "I need object"}
  }

let undo = async incoming =>
  switch incoming.object {
  | Some(object) =>
    switch object->StringOption.classify {
    | String(_) => {statusCode: 501, body: "Give me the whole object, please"}
    | Wrap({type_: #Follow} as obj) => await unfollow(obj)
    | Wrap(_) => {statusCode: 501}
    }
  | None => {statusCode: 400, body: "I need object"}
  }
