open Js.Dict

@val external env: t<string> = "process.env"

let baseURL = env->get("AP_BASE_URL")->Option.getExn
let privateKey =
  env->get("AP_PRIVATE_KEY")->Option.getExn->Js.String2.replaceByRe(%re("/\\n/g"), "\n")
let ghToken = env->get("AP_GH_TOKEN")->Option.getExn
let ghBaseURL = env->get("AP_GH_BASE_URL")->Option.getExn

let actor = baseURL ++ "/actor"
let keyId = actor ++ "#main-key"

@module external actorJSON: Js.Json.t = "../../../../actor.json"
