export default class HttpError extends Error {
  constructor(...params) {
    super(...params);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, HttpError);
    }
  }

  notAuthorized(name, message) {
    this.status = 401;
    this.name = name;
    this.message = message;
    return this;
  }
  badRequest(name, message) {
    this.status = 400;
    this.name = name;
    this.message = message;
    return this;
  }
  conflict(name, message) {
    this.status = 409;
    this.name = name;
    this.message = message;
    return this;
  }
  notFound(name, message) {
    this.status = 404;
    this.name = name;
    this.message = message;
    return this;
  }
}
