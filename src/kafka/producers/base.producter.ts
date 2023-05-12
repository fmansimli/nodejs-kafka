import { Kafka, Producer } from "kafkajs";
import { Topics } from "../enums";

interface Event {
  topic: Topics;
  data: any;
  partition: any;
}

export abstract class BaseProducer<T extends Event> {
  abstract topic: T["topic"];
  private producer: Producer;

  constructor(client: Kafka) {
    this.producer = client.producer();
  }

  async produce(partition: T["partition"], data: T["data"]) {
    await this.producer.connect();
    const result = await this.producer.send({
      topic: this.topic,
      messages: [{ partition, value: JSON.stringify(data) }],
    });

    return result;
  }
}
