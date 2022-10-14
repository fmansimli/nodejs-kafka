import { createClient } from "redis";
import { Logger } from "../services";

const client = createClient({ url: process.env.REDIS_URL });

client.on("error", error => {
  Logger.create(error);
});

client.connect();

class Redis {
  static getClient() {
    return client;
  }
}

export default Redis;
