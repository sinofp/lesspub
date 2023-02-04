open Js.Dict

@val external env: t<string> = "process.env"

let baseURL = env->get("AP_BASE_URL")->Option.getExn
let privateKey = env->get("AP_PRIVATE_KEY")->Option.getExn
let ghToken = env->get("AP_GH_TOKEN")->Option.getExn
let ghBaseURL = env->get("AP_GH_BASE_URL")->Option.getExn

let actor = baseURL ++ "/actor"
let keyId = actor ++ "#main-key"

let functionPath = "/.netlify/functions/lesspub"
