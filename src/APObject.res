module StringOption = {
  type t<'a>
  type option<'a> = String(string) | Wrap('a)

  external fromString: string => t<'a> = "%identity"
  external fromJSObject: Type.Classify.object => t<'a> = "%identity"
  external wrap: 'a => t<'a> = "%identity"
  external unwrap: t<'a> => 'a = "%identity"

  let classify = (t: t<'a>) =>
    switch Type.Classify.classify(t) {
    | Type.Classify.String(string) => String(string)
    | Type.Classify.Object(obj_val) => Wrap(obj_val->fromJSObject->unwrap)
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
  open Dict
  open JSON
  let dict: dict<JSON.t> = o->Obj.magic
  switch dict->get("@context") {
  | Some(_) => () // Object created by APObject.t doesn't have the top level @context
  | None => dict->set("@context", "https://www.w3.org/ns/activitystreams"->Encode.string)
  }
  dict->Encode.object
}

let isJSONString = json => JSON.Decode.string(json)->Option.isSome

let rec validateJSON = json => {
  switch JSON.Decode.object(json) {
  | Some(dict) => {
      open Dict
      open! Option
      let id = dict->get("id")->map(isJSONString)
      let type_ = dict->get("type")->map(isJSONString)
      let obj = dict->get("object")->map(x => x->isJSONString || x->validateJSON)
      let orderedItems =
        dict
        ->get("orderedItems")
        ->flatMap(JSON.Decode.array)
        ->map(items => items->Array.every(x => x->isJSONString || x->validateJSON))
      switch (id, type_, obj, orderedItems) {
      | (Some(true), Some(true), None | Some(true), None | Some(true)) => true
      | _ => false
      }
    }

  | None => false
  }
}

let fromString = s =>
  try Ok(s->JSON.parseOrThrow) catch {
  | _ => Error("Error parsing JSON string")
  }->Result.flatMap(x =>
    if x->validateJSON {
      Ok(x->Obj.magic)
    } else {
      Error("JSON is not valid")
    }
  )

let resultToOption = r => r->Result.mapOr(None, x => Some(x))
