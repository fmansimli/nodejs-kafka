import { Logger } from "../../services";
import { MyKafka } from "../index";
import { TaskTopic, KafkaTopics } from "../../enums/kafka.enum";

export const sendToTasks = async () => {
  let producer;
  try {
    producer = await MyKafka.getProducer();

    const _result = await producer.send({
      topic: KafkaTopics.TASKS,
      messages: [
        { value: "message 1 to tasks -> CREATE", partition: TaskTopic.CREATE },
        { value: "message 2 to tasks -> DELETE", partition: TaskTopic.DELETE },
      ],
    });
  } catch (error) {
    Logger.create(error);
  } finally {
    producer?.disconnect();
  }
};
