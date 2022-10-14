import { Kafka } from "kafkajs";

const kafka = new Kafka({
  clientId: "kafka_client",
  brokers: [process.env.KAFKA_URL as string],
});

export default kafka;
