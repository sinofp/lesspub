// Generated by ReScript, PLEASE EDIT WITH CARE
'use strict';

var Fs = require("fs");
var Path = require("path");
var Fetch = require("./Fetch.js");
var Config = require("./Config.js");
var Egress = require("./Egress.js");
var $$Object = require("./Object.js");
var Nodeurl = require("node:url");
var Belt_Array = require("rescript/lib/js/belt_Array.js");
var Pervasives = require("rescript/lib/js/pervasives.js");
var Belt_Result = require("rescript/lib/js/belt_Result.js");
var Js_promise2 = require("rescript/lib/js/js_promise2.js");

async function main(param) {
  var path = Path.join("public", "outbox");
  var outbox = Fs.readFileSync(path, "utf8");
  var match = Belt_Result.getExn($$Object.fromString(outbox));
  var orderedItems = match.orderedItems;
  if (orderedItems !== undefined) {
    var obj = $$Object.StringOption.classify(orderedItems[0]);
    var last_create_note;
    last_create_note = obj.TAG === /* String */0 ? Pervasives.failwith("No String") : obj._0;
    console.log("I will send the last note:", $$Object.toJSON(last_create_note));
    var path$1 = Path.join("static", "followers");
    var followers = Fs.readFileSync(path$1, "utf8");
    var match$1 = Belt_Result.getExn($$Object.fromString(followers));
    var orderedItems$1 = match$1.orderedItems;
    if (orderedItems$1 !== undefined) {
      var followers$1 = orderedItems$1.map(function (x) {
            var actor = $$Object.StringOption.classify(x);
            if (actor.TAG === /* String */0) {
              return actor._0;
            } else {
              return Pervasives.failwith("Followers should be string");
            }
          });
      var inboxes = Belt_Array.concat(Belt_Array.keepMap(await Promise.all(followers$1.map(Fetch.fetchInbox)), (function (x) {
                  return x;
                })), Config.extraInboxes);
      return await Promise.all(inboxes.map(function (x) {
                      console.log("Sending to", x);
                      var match = new Nodeurl.URL(x);
                      return Egress.post(match.host, match.pathname, last_create_note);
                    }));
    }
    throw {
          RE_EXN_ID: "Match_failure",
          _1: [
            "Send.res",
            18,
            2
          ],
          Error: new Error()
        };
  }
  throw {
        RE_EXN_ID: "Match_failure",
        _1: [
          "Send.res",
          7,
          2
        ],
        Error: new Error()
      };
}

Js_promise2.then(main(undefined), (function (res) {
        console.log(res);
        return Promise.resolve(undefined);
      }));

exports.main = main;
/*  Not a pure module */
