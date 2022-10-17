import http from "http";

import app from "./app";
import { MyDatabase, AppConfig } from "./config";
import { MyKafka } from "./kafka";
import { listenToLogs } from "./kafka/consumers/logs.consumer";

AppConfig.initialize();

const httpServer = http.createServer(app);

const PORT = process.env.PORT || 5000;

httpServer.listen(PORT, async () => {
  try {
    await MyDatabase.ping();
    await MyKafka.initialize();
    listenToLogs();
    listenToLogs();
  } catch (error: any) {
    console.log("error! ->", JSON.stringify(error));
  } finally {
    console.log(`@@@@ server is running on http://localhost:${PORT} ...`);
  }
});
