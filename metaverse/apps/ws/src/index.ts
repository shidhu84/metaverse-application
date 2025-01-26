import { WebSocketServer } from "ws";
import { User } from "./class/User";

const wss = new WebSocketServer({ port: 3001 });

wss.on("connection", function connection(ws) {
  console.log("User connected");

  let user = new User(ws);

  ws.on("close", () => {
    console.log("User Disconnected");
    user?.destroy();
  });
});
