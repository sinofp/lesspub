@send external joinWith: (array<string>, string) => string = "join"

open Node

module Hash = {
  let get = text => Crypto.createHash("sha256")->Crypto.update(text)->Crypto.digest("base64")
}

let sign = data =>
  "sha256"
  ->Crypto.sign(data->Buffer.fromString, Config.privateKey)
  ->Buffer.toStringWithEncoding(#base64)

let verify = (data, publicKey, signature) =>
  Crypto.verify(
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
    ->Dict.get("digest")
    ->Option.mapOr(false, x => x == "SHA-256=" ++ Hash.get(event.body->Option.getOr("")))

  let verifySignature = async (event: event, keyId, headers: array<string>, signature) =>
    (await Fetch.fetchKey(keyId))->Option.mapOr(false, publicKey => {
      let to_be_signed =
        headers
        ->Array.map(h =>
          switch (h, event.headers->Dict.get(h)) {
          | ("(request-target)", _) =>
            `(request-target): ${(event.httpMethod :> string)->String.toLowerCase} ${event.path}`
          | (_, Some(v)) => h ++ ": " ++ v
          | (_, None) => h ++ ": "
          }
        )
        ->joinWith("\n")
      verify(to_be_signed, publicKey, signature)
    })

  let parse = headers =>
    headers
    ->Dict.get("signature")
    ->Option.map(s => {
      let dict =
        s
        ->String.split(",")
        ->Array.map(x => {
          let i = x->String.indexOf("=")
          (
            x->String.slice(~start=0, ~end=i),
            x->String.slice(~start=i + 2, ~end=x->String.length - 1),
          )
        })
        ->Dict.fromArray
      let keyId = dict->Dict.get("keyId")
      let signature = dict->Dict.get("signature")
      let algorithm = dict->Dict.get("algorithm")
      let headers = dict->Dict.get("headers")->Option.map(s => s->String.split(" "))
      (keyId, signature, algorithm, headers)
    })

  let verify = async (event: event) =>
    switch event.headers->parse {
    | Some(Some(keyId), Some(signature), Some(_), Some(headers)) =>
      event->verifyDigest && (await event->verifySignature(keyId, headers, signature))
    | _ => false
    }
}
