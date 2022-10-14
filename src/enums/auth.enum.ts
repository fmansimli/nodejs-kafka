export enum Role {
  ADMIN = "8",
  USER = "4",
  AUTHOR = "9",
}

export enum Errors {
  NO_SESSION_FOUND = "NO_SESSION_FOUND",
  ACCESS_DENIED = "ACCESS_DENIED",
  TOKEN_EXPIRED = "TOKEN_EXPIRED",
  TOKEN_MALFORMED = "TOKEN_MALFORMED",
  NO_TOKEN_PROVIDED = "NO_TOKEN_PROVIDED",
  VALIDATION_ERROR = "VALIDATION_ERROR",
  WRONG_CREDENTIALS = "WRONG_CREDENTIALS",
  ONLY_FOR_TEST = "ONLY_FOR_TEST",
  ALREADY_EXISTS = "ALREADY_EXISTS",
  REDIS_CONNECTION_ERROR = "REDIS_CONNECTION_ERROR",
  MONGO_CONNECTION_ERROR = "MONGO_CONNECTION_ERROR",
  UNKNOWN_ERROR = "UNKNOWN_ERROR",
  NOT_FOUND = "NOT_FOUND",
}

export enum Messages {
  REGISTERED = "REGISTERED",
  SIGNED_IN = "SIGNED_IN",
  SIGNED_OUT = "SIGNED_OUT",
  INDEX_CREATED = "INDEX_CREATED",
  DATABASE_DROPPED = "DATABASE_DROPPED",
  COLLECTION_CREATED = "COLLECTION_CREATED",
  COLLECTION_DROPPED = "COLLECTION_DROPPED",
  REDIS_RESETED = "REDIS_RESETED",
  REDIS_TABLES_RESETED = "REDIS_TABLES_RESETED",
  REDIS_ROOT_KEYS_DELETED = "REDIS_ROOT_KEYS_DELETED",
  REDIS_ROOT_KEY_DELETED = "REDIS_ROOT_KEY_DELETED",
  REDIS_SUB_KEY_DELETED = "REDIS_SUB_KEY_DELETED",
}