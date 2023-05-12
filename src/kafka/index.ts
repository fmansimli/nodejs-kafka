import { Kafka } from "kafkajs";

class KafkaWrapper {
  private _client?: Kafka;

  get client(): Kafka {
    if (!this._client) {
      throw new Error("Kafka client has not been initialized yet!");
    }
    return this._client;
  }

  async initialize(url: string, clientId: string) {
    this._client = new Kafka({ clientId, brokers: [url] });

    const admin = this._client.admin();
    await admin.connect();

    await admin.createTopics({
      topics: [
        { topic: "logs", numPartitions: 1 },
        { topic: "tasks", numPartitions: 1 },
      ],
    });

    admin.disconnect();
  }
}

export const kafkaWrapper = new KafkaWrapper();
