module StringOption = {
  type t<'a>
  type option<'a> = String(string) | Wrap('a)

  external fromString: string => t<'a> = "%identity"
  external fromJSObject: Js.Types.obj_val => t<'a> = "%identity"
  external wrap: 'a => t<'a> = "%identity"
  external unwrap: t<'a> => 'a = "%identity"

  let classify = (t: t<'a>) =>
    switch Js.Types.classify(t) {
    | JSString(string) => String(string)
    | JSObject(obj_val) => Wrap(obj_val->fromJSObject->unwrap)
    | _ => failwith("Unreachable code")
    }
}

type typeName = [
  | #OrderedCollection
  | #Accept
  | #Announce
  | #Create
  | #Delete
  | #Follow
  | #Like
  | #Note
  | #Undo
]

type rec t = {
  id: string,
  @as("type") type_: typeName,
  actor?: string,
  object?: objectOrId,
  published?: string,
  url?: string,
  to?: array<string>,
  cc?: array<string>,
  content?: string,
  inReplyTo?: string,
  mutable totalItems?: int,
  mutable orderedItems?: array<objectOrId>,
}
and objectOrId = StringOption.t<t>

let getId = ooi =>
  switch ooi->StringOption.classify {
  | String(id) => id
  | Wrap(obj) => obj.id
  }

let toJSON = (o: t) => {
  open Js.Dict
  open Js.Json
  let dict: Js.Dict.t<Js.Json.t> = o->Obj.magic
  switch dict->get("@context") {
  | Some(_) => () // Object created by Object.t doesn't have the top level @context
  | None => dict->set("@context", "https://www.w3.org/ns/activitystreams"->string)
  }
  dict->object_
}

let isJSONString = json =>
  switch Js.Json.classify(json) {
  | Js.Json.JSONString(_) => true
  | _ => false
  }

let rec validateJSON = json => {
  switch Js.Json.classify(json) {
  | Js.Json.JSONObject(dict) => {
      open Js.Dict
      open Js.Json
      open! Option
      let id = dict->get("id")->map(isJSONString)
      let type_ = dict->get("type")->map(isJSONString)
      let obj = dict->get("object")->map(x => x->isJSONString || x->validateJSON)
      let orderedItems =
        dict
        ->get("orderedItems")
        ->flatMap(decodeArray)
        ->map(Js.Array.every(x => x->isJSONString || x->validateJSON))
      switch (id, type_, obj, orderedItems) {
      | (Some(true), Some(true), None | Some(true), None | Some(true)) => true
      | _ => false
      }
    }

  | _ => false
  }
}

let fromString = s =>
  try Ok(s->Js.Json.parseExn) catch {
  | _ => Error("Error parsing JSON string")
  }->Result.flatMap(x =>
    if x->validateJSON {
      Ok(x->Obj.magic)
    } else {
      Error("JSON is not valid")
    }
  )

let resultToOption = r => r->Result.mapWithDefault(None, x => Some(x))
