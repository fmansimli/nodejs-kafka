import { EachMessagePayload } from "kafkajs";

import { Topics } from "../enums";
import { TaskCreatedEvent } from "../events/task-created.event";
import { BaseConsumer } from "./base.consumer";

export class TaskCreatedConsumer extends BaseConsumer<TaskCreatedEvent> {
  readonly topic = Topics.TASK_CREATED;
  readonly groupId = "task-created-group";

  onMessage(data: TaskCreatedEvent["data"], message: EachMessagePayload) {
    console.log(data, message);
  }
}
