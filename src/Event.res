type httpMethod = [#POST | #GET | #PUT | #DELETE | #HEAD]

type event = {
  path: string,
  queryStringParameters: Js.Dict.t<string>,
  httpMethod: httpMethod,
  headers: Js.Dict.t<string>,
  body: option<string>,
  isBase64Encoded: bool,
  netlifyGraphToken: option<string>,
}

type response = {
  statusCode: int,
  headers?: Js.Dict.t<string>,
  body?: string,
}
