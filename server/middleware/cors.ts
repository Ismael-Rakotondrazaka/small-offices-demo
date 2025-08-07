export default defineEventHandler((event) => {
  setResponseHeaders(event, {
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Headers': '*',
    'Access-Control-Allow-Methods': 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Expose-Headers': '*',
  });
});
