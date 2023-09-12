// Generated by ReScript, PLEASE EDIT WITH CARE
'use strict';

var Curry = require("rescript/lib/js/curry.js");
var Fetch = require("./Fetch.js");
var Config = require("./Config.js");
var Egress = require("./Egress.js");
var $$Object = require("./Object.js");
var Js_dict = require("rescript/lib/js/js_dict.js");
var Nodeurl = require("node:url");
var Js_string = require("rescript/lib/js/js_string.js");
var Belt_Option = require("rescript/lib/js/belt_Option.js");
var Caml_option = require("rescript/lib/js/caml_option.js");
var Nodecrypto = require("node:crypto");

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
        id: Config.actor + "/follow/" + Nodecrypto.randomUUID(),
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
    return (await fetch(Config.baseURL + slug, {
                  method: "HEAD"
                })).ok;
  }
  catch (exn){
    return false;
  }
}

async function nonTextReaction(pathPrefix, undo, incoming) {
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
  var path = pathPrefix + slug;
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

function like(param, param$1) {
  return nonTextReaction("/likes", param, param$1);
}

function announce(param, param$1) {
  return nonTextReaction("/announces", param, param$1);
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
  if (match === "Announce") {
    return await nonTextReaction("/announces", true, obj$1);
  } else if (match === "Follow") {
    return await unfollow(obj$1);
  } else if (match === "Like") {
    return await nonTextReaction("/likes", true, obj$1);
  } else {
    return {
            statusCode: 501,
            body: "I can only Undo Follow or Like"
          };
  }
}

exports.actor = actor;
exports.$$URL = $$URL;
exports.follow = follow;
exports.unfollow = unfollow;
exports.noteBaseLength = noteBaseLength;
exports.noteId2Slug = noteId2Slug;
exports.slugExist = slugExist;
exports.nonTextReaction = nonTextReaction;
exports.like = like;
exports.announce = announce;
exports.create = create;
exports.$$delete = $$delete;
exports.undo = undo;
/* noteBaseLength Not a pure module */
