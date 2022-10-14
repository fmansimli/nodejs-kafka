import kafka from "./client";

export class KafkaManager {
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
}
