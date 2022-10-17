import { Logger } from "../../services";
import { MyKafka } from "../index";
import { KafkaTopics } from "../../enums/kafka.enum";

export const listenToLogs = async () => {
  let consumer;
  try {
    consumer = await MyKafka.getConsumer("test");
    await consumer.subscribe({
      topic: KafkaTopics.LOGS,
      fromBeginning: true,
    });

    await consumer.run({
      eachMessage: async result => {
        console.log(`${result.message.value}=>partition:${result.partition}`);
      },
    });
  } catch (error) {
    Logger.create(error);
    consumer?.disconnect();
  }
};
