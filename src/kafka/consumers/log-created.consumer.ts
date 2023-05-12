import { EachMessagePayload } from "kafkajs";

import { BaseConsumer } from "./base.consumer";

import { LogCreatedEvent } from "../events/log-created.event";
import { Topics } from "../enums";

export class LogCreatedConsumer extends BaseConsumer<LogCreatedEvent> {
  readonly topic = Topics.LOG_CREATED;
  readonly groupId = "log_created_group";

  onMessage(data: LogCreatedEvent["data"], message: EachMessagePayload) {
    console.log(data, message);
  }
}
