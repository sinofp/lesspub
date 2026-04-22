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
}

module Fs = {
  @module("node:fs") external readFileAsUtf8Sync: (string, @as("utf8") _) => string = "readFileSync"
}

module Path = {
  @module("node:path") @variadic external join: array<string> => string = "join"
}

module Process = {
  @val external env: dict<string> = "process.env"
}

module URL = {
  type t = {host: string, pathname: string}
  @module("node:url") @new external make: string => t = "URL"
}
