import http from "http";

import app from "./app";
import { MyDatabase, AppConfig } from "./config";
import { kafkaWrapper } from "./kafka";

AppConfig.initialize();

const httpServer = http.createServer(app);

const PORT = process.env.PORT || 5000;
const KAFKA_URL = process.env.KAFKA_URL as string;
const KAFKA_CLIENT_ID = process.env.KAFKA_CLIENT_ID as string;

httpServer.listen(PORT, async () => {
  try {
    await MyDatabase.ping();
    await kafkaWrapper.initialize(KAFKA_URL, KAFKA_CLIENT_ID);
  } catch (error: any) {
    console.log("error! ->", JSON.stringify(error));
  } finally {
    console.log(`@@@@ server is running on http://localhost:${PORT} ...`);
  }
});
