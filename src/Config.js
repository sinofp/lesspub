// Generated by ReScript, PLEASE EDIT WITH CARE
'use strict';

var Js_dict = require("rescript/lib/js/js_dict.js");
var Js_string = require("rescript/lib/js/js_string.js");
var Belt_Option = require("rescript/lib/js/belt_Option.js");
var ActorJson = require("../../../../actor.json");

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

exports.baseURL = baseURL;
exports.privateKey = privateKey;
exports.ghToken = ghToken;
exports.ghBaseURL = ghBaseURL;
exports.extraInboxes = extraInboxes;
exports.actor = actor;
exports.keyId = keyId;
exports.actorJSON = actorJSON;
/* baseURL Not a pure module */
