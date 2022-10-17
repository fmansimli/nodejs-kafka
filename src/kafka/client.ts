import { Kafka } from "kafkajs";

const KAFKA_URL = process.env.KAFKA_URL as string;

const kafka = new Kafka({ clientId: "kafka_client", brokers: [KAFKA_URL] });

export default kafka;
