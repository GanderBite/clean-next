export class InvalidCredentialsError extends Error {
  constructor(options?: ErrorOptions) {
    super('Invalid email or password', options);
  }
}
