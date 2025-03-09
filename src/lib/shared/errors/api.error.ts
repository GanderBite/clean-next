export class ApiError extends Error {
  public code: number;

  constructor(code: number, message: string, options?: ErrorOptions) {
    super(message, options);
    this.code = code;
  }
}
