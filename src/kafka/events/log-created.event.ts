import { Topics } from "../enums";

export enum Partitions {
  SYSTEM,
  DATABASE,
  AUTHENTICATION,
}

export interface LogCreatedEvent {
  topic: Topics.LOG_CREATED;
  partition: Partitions;
  data: {
    id: string;
    url: string;
  };
}
