open Security
open Config
open APObject

let post = (host, path, activity) => {
  let body = JSON.stringify(activity->toJSON)
  let date = Date.make()->Date.toUTCString
  let digest = "SHA-256=" ++ Hash.get(body)
  // TODO extract duplicate logic
  let to_be_signed = `(request-target): post ${path}\nhost: ${host}\ndate: ${date}\ndigest: ${digest}`
  let signature = sign(to_be_signed)
  let fetch_options = {
    "method": #POST,
    "body": body,
    "headers": {
      "content-type": "application/activity+json",
      "host": host,
      "date": date,
      "digest": digest,
      "signature": `keyId="${keyId}",algorithm="rsa-sha256",headers="(request-target) host date digest",signature="${signature}"`,
    },
  }
  Console.log2("I will send:", fetch_options)
  Fetch.fetch(`https://${host}${path}`, fetch_options)
}
