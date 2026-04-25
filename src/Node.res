module Global = {
  @val external __dirname: string = "__dirname"

  type response = {ok: bool, status: int}
  @val external fetch: (string, 'a) => promise<response> = "fetch"
  @send external json: response => promise<dict<JSON.t>> = "json"

  // Below is only used for test
  @send external text: response => promise<string> = "text"
  @val external setTimeout: (unit => unit, int) => unit = "setTimeout"
}

module Buffer = {
  type t

  @val @scope("Buffer") external fromString: string => t = "from"
  @val @scope("Buffer") external fromStringWithEncoding: (string, [< #base64 | #utf8]) => t = "from"
  @send external toString: t => string = "toString"
  @send external toStringWithEncoding: (t, [< #base64 | #utf8]) => string = "toString"
}

module Crypto = {
  type hash
  @module("node:crypto") external createHash: string => hash = "createHash"
  @send external update: (hash, string) => hash = "update"
  @send external digest: (hash, string) => string = "digest"
  @module("node:crypto") external sign: (string, Buffer.t, string) => Buffer.t = "sign"
  @module("node:crypto") external verify: (string, Buffer.t, string, Buffer.t) => bool = "verify"
  @module("node:crypto") external randomUUID: unit => string = "randomUUID"
  // Below is only used for test
  type keyPair = {privateKey: string, publicKey: string}
  @module("node:crypto")
  external generateKeyPairSync: (string, 'opts) => keyPair = "generateKeyPairSync"
}

module Fs = {
  @module("node:fs") external readFileAsUtf8Sync: (string, @as("utf8") _) => string = "readFileSync"
  // Below is only used for test
  @module("node:fs")
  external writeFileAsUtf8Sync: (string, string, @as("utf8") _) => unit = "writeFileSync"
  @module("node:fs")
  external mkdirSync: (string, @as(json`{"recursive": true}`) _) => unit = "mkdirSync"
  @module("node:fs") external existsSync: string => bool = "existsSync"
  @module("node:fs") external mkdtempSync: string => string = "mkdtempSync"
  @module("node:fs") external rmSync: (string, @as(json`{"recursive": true}`) _) => unit = "rmSync"
}

module Path = {
  @module("node:path") @variadic external join: array<string> => string = "join"
  // Below is only used for test
  @module("node:path") external dirname: string => string = "dirname"
  @module("node:path") external resolve: string => string = "resolve"
}

module Process = {
  @val external env: dict<string> = "process.env"
  // Below is only used for test
  @val external exit: int => unit = "process.exit"
}

module URL = {
  type t = {host: string, pathname: string}
  @module("node:url") @new external make: (string, ~base: string=?) => t = "URL"
}

// Below is only used for test
module Http = {
  type incomingMessage
  type serverResponse
  type server
  @module("node:http")
  external createServer: ((incomingMessage, serverResponse) => 'a) => server = "createServer"
  @send external listen: (server, int, unit => unit) => unit = "listen"
  @get external method_: incomingMessage => Nullable.t<string> = "method"
  @get external url: incomingMessage => Nullable.t<string> = "url"
  @get external headers: incomingMessage => dict<string> = "headers"
  @send external writeHead: (serverResponse, int, dict<string>) => unit = "writeHead"
  @send external end_: (serverResponse, string) => unit = "end"
  @send external setEncoding: (incomingMessage, string) => unit = "setEncoding"
  @send external onData: (incomingMessage, @as("data") _, string => unit) => unit = "on"
  @send external onEnd: (incomingMessage, @as("end") _, unit => unit) => unit = "on"
}

module Os = {
  @module("node:os") external tmpdir: unit => string = "tmpdir"
}

module Date = {
  type t
  @new external make: unit => t = "Date"
  @send external toUTCString: t => string = "toUTCString"
}
