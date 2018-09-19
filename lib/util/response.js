export default function response(statusCode, body) {
  return {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    statusCode,
    body: JSON.stringify(body)
  };
}
