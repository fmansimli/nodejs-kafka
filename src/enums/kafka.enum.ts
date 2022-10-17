export enum LogTopic {
  SYSTEM,
  DB,
  NETWORK,
}

export enum TaskTopic {
  CREATE,
  UPDATE,
  DELETE,
}

export enum KafkaTopics {
  LOGS = "logs",
  TASKS = "tasks",
}
