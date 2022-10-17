import kafka from "./client";

export class MyKafka {
  static async initialize() {
    let admin;
    try {
      admin = kafka.admin();
      await admin.connect();

      await admin.createTopics({
        topics: [
          { topic: "logs", numPartitions: 1 },
          { topic: "tasks", numPartitions: 1 },
        ],
      });
    } catch (error) {
      return Promise.reject(error);
    } finally {
      admin?.disconnect();
    }
  }

  static async getProducer() {
    const producer = kafka.producer();
    await producer.connect();
    return producer;
  }

  static async getConsumer(groupId: string) {
    const consumer = kafka.consumer({ groupId });
    await consumer.connect();
    return consumer;
  }
}
