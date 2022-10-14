export class Logger implements ILogger {
  static create(error: any) {
    console.error(error);
  }
}

export interface ILogger {
  type?: string;
}
