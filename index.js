// Generated by ReScript, PLEASE EDIT WITH CARE
'use strict';

var Handle = require("./Handle.js");
var $$Object = require("./Object.js");
var Security = require("./Security.js");
var Belt_Option = require("rescript/lib/js/belt_Option.js");

async function handler($$event, param) {
  var httpMethod = $$event.httpMethod;
  var path = $$event.path;
  console.log({
        httpMethod: httpMethod,
        path: path,
        headers: $$event.headers
      });
  var post_verified = httpMethod === "POST" && await Security.Signature.verify($$event);
  console.log("post_verified:", post_verified);
  var activity = Belt_Option.map($$event.body, $$Object.fromString);
  Belt_Option.forEach(activity, (function (x) {
          if (x.TAG === /* Ok */0) {
            console.log("body:", x._0);
            return ;
          }
          console.log("Can't parse body as an ActivityStream Object:", x._0);
        }));
  if (httpMethod === "GET") {
    if (path === "/actor") {
      return Handle.actor($$event);
    } else {
      return {
              statusCode: 501
            };
    }
  }
  if (httpMethod !== "POST") {
    return {
            statusCode: 501
          };
  }
  if (!post_verified) {
    return {
            statusCode: 401
          };
  }
  if (path !== "/inbox") {
    return {
            statusCode: 501
          };
  }
  if (activity === undefined) {
    return {
            statusCode: 501
          };
  }
  if (activity.TAG !== /* Ok */0) {
    return {
            statusCode: 501
          };
  }
  var act = activity._0;
  var match = act.type;
  if (match === "Follow") {
    return await Handle.follow(act);
  } else if (match === "Create") {
    return await Handle.create(act);
  } else if (match === "Like") {
    return await Handle.like(undefined, act);
  } else if (match === "Undo") {
    return await Handle.undo(act);
  } else {
    return {
            statusCode: 501
          };
  }
}

exports.handler = handler;
/* Handle Not a pure module */
