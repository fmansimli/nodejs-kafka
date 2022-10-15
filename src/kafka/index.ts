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

  static async createTopic(topic: string, numPartitions: number) {
    let admin;
    try {
      admin = kafka.admin();
      await admin.connect();
      await admin.createTopics({
        topics: [{ topic, numPartitions }],
      });
    } catch (error) {
      return Promise.reject(error);
    } finally {
      admin?.disconnect();
    }
  }

  static async getProducer() {
    let producer;
    try {
      producer = kafka.producer();
      await producer.connect();
      const result = await producer.send({
        topic: "logs",
        messages: [
          { value: "message 1 to logs", partition: 0 },
          { value: "message 2 to logs", partition: 1 },
        ],
      });
      return producer;
    } catch (error) {
      return Promise.reject(error);
    } finally {
      producer?.disconnect();
    }
  }

  static async getConsumer() {
    let consumer;
    try {
      consumer = kafka.consumer({
        groupId: "test_cg1",
      });

      await consumer.subscribe({
        topic: "logs",
        fromBeginning: true,
      });

      await consumer.run({
        eachMessage: async result => {
          console.log(`${result.message.value}=>partition:${result.partition}`);
        },
      });
      return consumer;
    } catch (error) {
      return Promise.reject(error);
    } finally {
      consumer?.disconnect();
    }
  }
}
