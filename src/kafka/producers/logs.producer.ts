import { Logger } from "../../services";
import { MyKafka } from "../index";
import { LogTopic, KafkaTopics } from "../../enums/kafka.enum";

export const sendToLogs = async () => {
  let producer;
  try {
    producer = await MyKafka.getProducer();

    const _result = await producer.send({
      topic: KafkaTopics.LOGS,
      messages: [
        { value: "message 1 to logs -> SYSTEM", partition: LogTopic.SYSTEM },
        { value: "message 2 to logs -> DB", partition: LogTopic.DB },
      ],
    });
  } catch (error) {
    Logger.create(error);
  } finally {
    producer?.disconnect();
  }
};
