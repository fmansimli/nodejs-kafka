import { Topics } from "../enums";
import { LogCreatedEvent } from "../events/log-created.event";
import { BaseProducer } from "./base.producter";

export class LogCreatedProducer extends BaseProducer<LogCreatedEvent> {
  readonly topic = Topics.LOG_CREATED;
}
