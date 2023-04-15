// Generated by ReScript, PLEASE EDIT WITH CARE

import * as Curry from "rescript/lib/es6/curry.js";
import * as Fetch from "./Fetch.js";
import * as Config from "./Config.js";
import * as Egress from "./Egress.js";
import * as $$Object from "./Object.js";
import * as Js_dict from "rescript/lib/es6/js_dict.js";
import * as Nodeurl from "node:url";
import * as Js_string from "rescript/lib/es6/js_string.js";
import * as NodeFetch from "node-fetch";
import * as Belt_Option from "rescript/lib/es6/belt_Option.js";
import * as Caml_option from "rescript/lib/es6/caml_option.js";
import * as Nodecrypto from "node:crypto";

function actor(e) {
  var match = Belt_Option.map(Js_dict.get(e.headers, "accept"), (function (param) {
          return Js_string.startsWith("text/html", param);
        }));
  if (match !== undefined && match) {
    return {
            statusCode: 302,
            headers: Caml_option.some(Js_dict.fromArray([[
                        "Location",
                        Config.baseURL
                      ]]))
          };
  }
  return {
          statusCode: 200,
          headers: Caml_option.some(Js_dict.fromArray([[
                      "Content-Type",
                      "application/activity+json"
                    ]])),
          body: JSON.stringify(Config.actorJSON)
        };
}

var $$URL = {};

async function follow(incoming) {
  var actor = incoming.actor;
  if (actor === undefined) {
    return {
            statusCode: 400,
            body: "Where's your actor?"
          };
  }
  var inbox = await Fetch.fetchInbox(actor);
  if (inbox === undefined) {
    return {
            statusCode: 400,
            body: "Where's your inbox?"
          };
  }
  var url = new Nodeurl.URL(inbox);
  var res = await Egress.post(url.host, url.pathname, {
        id: Nodecrypto.randomUUID(),
        type: "Accept",
        actor: Config.actor,
        object: Caml_option.some(incoming)
      });
  if (res.ok && await Fetch.GitHub.insertToFile(actor, "/followers")) {
    return {
            statusCode: 200
          };
  } else {
    return {
            statusCode: 500,
            body: "Can't post Accept activity or can't update DB"
          };
  }
}

async function unfollow(incoming) {
  var actor = incoming.actor;
  if (actor !== undefined) {
    if (await Fetch.GitHub.removeFromFile(actor, "/followers")) {
      return {
              statusCode: 200
            };
    } else {
      return {
              statusCode: 500,
              body: "Can't update DB"
            };
    }
  } else {
    return {
            statusCode: 400,
            body: "Where's your actor?"
          };
  }
}

var noteBaseLength = (Config.baseURL + "/note").length;

function noteId2Slug(id) {
  return id.slice(noteBaseLength);
}

async function slugExist(slug) {
  try {
    return (await NodeFetch(Config.baseURL + slug, {
                  method: "HEAD"
                })).ok;
  }
  catch (exn){
    return false;
  }
}

async function like(undoOpt, incoming) {
  var undo = undoOpt !== undefined ? undoOpt : false;
  var match = incoming.actor;
  var match$1 = incoming.object;
  if (match === undefined) {
    return {
            statusCode: 400,
            body: "I need both actor and object"
          };
  }
  if (match$1 === undefined) {
    return {
            statusCode: 400,
            body: "I need both actor and object"
          };
  }
  var slug = $$Object.getId(Caml_option.valFromOption(match$1)).slice(noteBaseLength);
  var forMe = await slugExist(slug);
  var path = "/likes" + slug;
  var update = undo ? Fetch.GitHub.removeFromFile : Fetch.GitHub.insertToFile;
  if (!forMe || await Curry._2(update, match, path)) {
    return {
            statusCode: 200
          };
  } else {
    return {
            statusCode: 500,
            body: "Can't update DB"
          };
  }
}

async function create(incoming) {
  var object = incoming.object;
  if (object === undefined) {
    return {
            statusCode: 400,
            body: "I need object"
          };
  }
  var obj = $$Object.StringOption.classify(Caml_option.valFromOption(object));
  if (obj.TAG === /* String */0) {
    return {
            statusCode: 501,
            body: "Give me the whole object, please"
          };
  }
  var obj$1 = obj._0;
  if (obj$1.type !== "Note") {
    return {
            statusCode: 400,
            body: "I only support reply"
          };
  }
  var inReplyTo = obj$1.inReplyTo;
  if (inReplyTo === undefined) {
    return {
            statusCode: 400,
            body: "I only support reply"
          };
  }
  var slug = inReplyTo.slice(noteBaseLength);
  var forMe = await slugExist(slug);
  var path = "/replies" + slug;
  if (!forMe || await Fetch.GitHub.insertToFile(obj$1, path)) {
    return {
            statusCode: 200
          };
  } else {
    return {
            statusCode: 500,
            body: "Can't update DB"
          };
  }
}

async function $$delete(incoming) {
  var object = incoming.object;
  if (object === undefined) {
    return {
            statusCode: 400,
            body: "I need object"
          };
  }
  var object$1 = Caml_option.valFromOption(object);
  var slug = $$Object.getId(object$1).slice(noteBaseLength);
  var forMe = await slugExist(slug);
  var path = "/replies" + slug;
  if (!forMe || await Fetch.GitHub.removeFromFile(object$1, path)) {
    return {
            statusCode: 200
          };
  } else {
    return {
            statusCode: 500,
            body: "Can't update DB"
          };
  }
}

async function undo(incoming) {
  var object = incoming.object;
  if (object === undefined) {
    return {
            statusCode: 400,
            body: "I need object"
          };
  }
  var obj = $$Object.StringOption.classify(Caml_option.valFromOption(object));
  if (obj.TAG === /* String */0) {
    return {
            statusCode: 501,
            body: "Give me the whole object, please"
          };
  }
  var obj$1 = obj._0;
  var match = obj$1.type;
  if (match === "Follow") {
    return await unfollow(obj$1);
  } else if (match === "Like") {
    return await like(true, obj$1);
  } else {
    return {
            statusCode: 501,
            body: "I can only Undo Follow or Like"
          };
  }
}

export {
  actor ,
  $$URL ,
  follow ,
  unfollow ,
  noteBaseLength ,
  noteId2Slug ,
  slugExist ,
  like ,
  create ,
  $$delete ,
  undo ,
}
/* noteBaseLength Not a pure module */
