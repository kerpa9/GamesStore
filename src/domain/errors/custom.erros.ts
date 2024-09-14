export class CatchError extends Error {
  constructor(public readonly message: string, public readonly status: number) {
    super(message);
  }
  static badRequest(message: string) {
    return new CatchError(message, 400);
  }

  static unAuthorized(message: string) {
    return new CatchError(message, 401);
  }

  static notFound(message: string) {
    return new CatchError(message, 404);
  }

  static internalServer(message: string) {
    return new CatchError(message, 500);
  }
}
