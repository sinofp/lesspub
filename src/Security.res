module Hash = {
  type t
  @module("node:crypto") external create: string => t = "createHash"
  @send external update: (t, string) => t = "update"
  @send external digest: (t, string) => string = "digest"
  let get = text => create("sha256")->update(text)->digest("base64")
}

open Node

@module("node:crypto")
external sign': (string, Buffer.t, string) => Buffer.t = "sign"
let sign = data =>
  "sha256"->sign'(data->Buffer.fromString, Config.privateKey)->Buffer.toStringWithEncoding(#base64)

@module("node:crypto")
external verify': (string, Buffer.t, string, Buffer.t) => bool = "verify"
let verify = (data, publicKey, signature) =>
  verify'(
    "sha256",
    data->Buffer.fromString,
    publicKey,
    signature->Buffer.fromStringWithEncoding(#base64),
  )

module Signature = {
  open Event

  // Only use this function for POST because it requires body & digest
  let verifyDigest = (event: event) =>
    event.headers
    ->Js.Dict.get("digest")
    ->Option.mapWithDefault(false, x =>
      x == "SHA-256=" ++ Hash.get(event.body->Option.getWithDefault(""))
    )

  let verifySignature = async (event: event, keyId, headers: array<string>, signature) =>
    (await Fetch.fetchKey(keyId))->Option.mapWithDefault(false, publicKey => {
      let to_be_signed =
        headers
        ->Js.Array2.map(h =>
          switch (h, event.headers->Js.Dict.get(h)) {
          | ("(request-target)", _) =>
            `(request-target): ${(event.httpMethod :> string)->Js.String2.toLowerCase} ${event.path}`
          | (_, Some(v)) => h ++ ": " ++ v
          }
        )
        ->Js.Array2.joinWith("\n")
      verify(to_be_signed, publicKey, signature)
    })

  let parse = headers =>
    headers
    ->Js.Dict.get("signature")
    ->Option.map(s => {
      open Js.String2
      open! Js.Dict // Shadows get
      let dict =
        s
        ->split(",")
        ->Js.Array2.map(x => {
          let i = x->indexOf("=")
          (x->slice(~from=0, ~to_=i), x->slice(~from=i + 2, ~to_=x->length - 1))
        })
        ->fromArray
      let keyId = dict->get("keyId")
      let signature = dict->get("signature")
      let algorithm = dict->get("algorithm")
      let headers = dict->get("headers")->Option.map(s => s->split(" "))
      (keyId, signature, algorithm, headers)
    })

  let verify = async (event: event) =>
    switch event.headers->parse {
    | Some(Some(keyId), Some(signature), Some(_), Some(headers)) =>
      event->verifyDigest && await event->verifySignature(keyId, headers, signature)
    | _ => false
    }
}
