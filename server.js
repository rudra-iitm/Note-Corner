console.log("Server is starting...");

import { createServer } from "node:http";
import next from "next";
import { Server } from "socket.io";
// import { host } from "./constants.js";

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost"
const port = 6969;
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer(handler);

  const io = new Server(httpServer);

  io.on("connection", (socket) => {
    socket.on("invite", (data) => {
      const { senderEmail, receiverEmail, receiverId, docId } = data;
      io.to(receiverId).emit("invite", { senderEmail, receiverEmail, docId });
    });
    socket.on("accept", (data) => {
      const { senderEmail, receiverEmail, senderId, receiverId, docId } = data;
      const room = docId;
      socket.join(room);
      io.sockets.sockets.get(receiverId).join(room);
      io.to(senderId).emit("accept", { senderEmail, receiverEmail });
    });
    socket.on("editing", (data) => {
      const { docId, editorId, text } = data;
      socket.to(docId).emit("editing", { editorId, text });
    });
    socket.on("disconnect", () => {
      console.log("user disconnected");
    });
  });

  httpServer
    .once("error", (err) => {
      // console.log("error aagaya hai")
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
});