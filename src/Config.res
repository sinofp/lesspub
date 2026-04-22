open Dict

let env = Node.Process.env

let baseURL = env->get("AP_BASE_URL")->Option.getOrThrow
let privateKey = env->get("AP_PRIVATE_KEY")->Option.getOrThrow->String.replaceRegExp(/\\n/g, "\n")
let ghToken = env->get("AP_GH_TOKEN")->Option.getOrThrow
let ghBaseURL = env->get("AP_GH_BASE_URL")->Option.getOrThrow
let extraInboxes =
  env->get("AP_EXTRA_INBOXES")->Option.map(s => s->String.split(","))->Option.getOr([])

let actor = baseURL ++ "/actor"
let keyId = actor ++ "#main-key"

@module external actorJSON: JSON.t = "../../../../actor.json"
