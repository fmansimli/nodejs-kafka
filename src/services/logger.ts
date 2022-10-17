export class Logger implements ILogger {
  static create(error: any) {
    console.error("logger -->", error);
  }
}

export interface ILogger {
  type?: string;
}
