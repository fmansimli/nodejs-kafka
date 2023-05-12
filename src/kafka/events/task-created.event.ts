import { Topics } from "../enums";

enum Partitions {
  CLEANUP,
  RESTART,
}

export interface TaskCreatedEvent {
  topic: Topics.TASK_CREATED;
  partition: Partitions;
  data: {
    id: string;
    title: string;
    desc: string;
  };
}
