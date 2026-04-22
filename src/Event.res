type httpMethod = [#POST | #GET | #PUT | #DELETE | #HEAD]

type event = {
  path: string,
  queryStringParameters: dict<string>,
  httpMethod: httpMethod,
  headers: dict<string>,
  body: option<string>,
  isBase64Encoded: bool,
  netlifyGraphToken: option<string>,
}

type response = {
  statusCode: int,
  headers?: dict<string>,
  body?: string,
}
