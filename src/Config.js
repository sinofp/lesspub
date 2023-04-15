// Generated by ReScript, PLEASE EDIT WITH CARE

import * as Js_dict from "rescript/lib/es6/js_dict.js";
import * as Js_string from "rescript/lib/es6/js_string.js";
import * as Belt_Option from "rescript/lib/es6/belt_Option.js";
import * as ActorJson from "../../../../actor.json";

var baseURL = Belt_Option.getExn(Js_dict.get(process.env, "AP_BASE_URL"));

var privateKey = Belt_Option.getExn(Js_dict.get(process.env, "AP_PRIVATE_KEY")).replace(/\\n/g, "\n");

var ghToken = Belt_Option.getExn(Js_dict.get(process.env, "AP_GH_TOKEN"));

var ghBaseURL = Belt_Option.getExn(Js_dict.get(process.env, "AP_GH_BASE_URL"));

var extraInboxes = Belt_Option.getWithDefault(Belt_Option.map(Js_dict.get(process.env, "AP_EXTRA_INBOXES"), (function (param) {
            return Js_string.split(",", param);
          })), []);

var actor = baseURL + "/actor";

var keyId = actor + "#main-key";

var actorJSON = ActorJson;

export {
  baseURL ,
  privateKey ,
  ghToken ,
  ghBaseURL ,
  extraInboxes ,
  actor ,
  keyId ,
  actorJSON ,
}
/* baseURL Not a pure module */
