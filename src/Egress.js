// Generated by ReScript, PLEASE EDIT WITH CARE

import * as Config from "./Config.js";
import * as $$Object from "./Object.js";
import * as Security from "./Security.js";

function post(host, path, activity) {
  var body = JSON.stringify($$Object.toJSON(activity));
  var date = new Date().toUTCString();
  var digest = "SHA-256=" + Security.Hash.get(body);
  var to_be_signed = "(request-target): post " + path + "\nhost: " + host + "\ndate: " + date + "\ndigest: " + digest + "";
  var signature = Security.sign(to_be_signed);
  var fetch_options = {
    method: "POST",
    body: body,
    headers: {
      "content-type": "application/activity+json",
      host: host,
      date: date,
      digest: digest,
      signature: "keyId=\"" + Config.keyId + "\",algorithm=\"rsa-sha256\",headers=\"(request-target) host date digest\",signature=\"" + signature + "\""
    }
  };
  console.log("I will send:", fetch_options);
  return fetch("https://" + host + "" + path + "", fetch_options);
}

export {
  post ,
}
/* Config Not a pure module */
