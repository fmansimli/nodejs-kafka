import { Topics } from "../enums";
import { TaskCreatedEvent } from "../events/task-created.event";
import { BaseProducer } from "./base.producter";

export class TaskCreatedProducer extends BaseProducer<TaskCreatedEvent> {
  readonly topic = Topics.TASK_CREATED;
}
