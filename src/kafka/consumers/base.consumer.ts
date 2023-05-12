import { Kafka, Consumer, EachMessagePayload } from "kafkajs";
import { Topics } from "../enums";

interface Event {
  topic: Topics;
  data: any;
}

export abstract class BaseConsumer<T extends Event> {
  abstract topic: T["topic"];
  abstract groupId: string;
  abstract onMessage(data: T["data"], message: EachMessagePayload): void;

  private consumer?: Consumer;
  protected ackWait = 5 * 1000;

  constructor(client: Kafka) {
    this.init(client);
  }

  private init(client: Kafka) {
    this.consumer = client.consumer({ groupId: this.groupId });
  }

  async listen(callback: (value: EachMessagePayload) => void) {
    if (!this.consumer) {
      throw new Error("consumer has not been initialized yet!");
    }

    await this.consumer.connect();
    await this.consumer.subscribe({
      topic: this.topic,
      fromBeginning: true,
    });

    await this.consumer.run({
      eachMessage: async data => {
        const _data = this.parseMessage(data);
        this.onMessage(_data, data);
        callback(_data);
      },
    });
  }

  parseMessage(data: EachMessagePayload) {
    if (data.message.value) {
      return JSON.parse(data.message.value.toString("utf8"));
    }
    return null;
  }
}
