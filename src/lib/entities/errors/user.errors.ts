export class UserUsernameTakenError extends Error {
  constructor(username: string, options?: ErrorOptions) {
    super(`Username: "${username}" is taken`, options);
  }
}

export class UserEmailTakenError extends Error {
  constructor(email: string, options?: ErrorOptions) {
    super(`Email: "${email}" is taken`, options);
  }
}

export class UserNotFoundError extends Error {
  constructor(options?: ErrorOptions) {
    super(`User not found`, options);
  }
}
