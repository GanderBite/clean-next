export class InvalidInputError extends Error {
  constructor(
    public errors: Record<string, string[]>,
    message = 'Invalid input',
  ) {
    super(message);
    this.name = 'InvalidInputError';
  }
}
