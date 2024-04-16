console.log("Server is starting...");

import { createServer } from "node:http";
import next from "next";
import { Server } from "socket.io";
import cors from "cors";
import axios from "axios";
// Enable CORS

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost"
const port = 6969;
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port });



const handler = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer(handler);

  const io = new Server(httpServer, {
    cors: {
      origin: "*",
    }
  });

  io.on("connection", (socket) => {
    console.log("a user connected", socket.id);
    socket.on("invite", async (data) => {
      const { senderEmail, receiverEmail, receiverId, docId } = data;
      console.log("invite", senderEmail, receiverEmail, receiverId, docId);
      io.to(receiverId).emit("invite", { senderEmail, receiverEmail, docId });
      await axios.post("http://localhost:3000/api/collabration/invite", {
        senderEmail,
        receiverEmail,
        docId,
      });
    });
    socket.on("accept", async (data) => {
      const { senderEmail, receiverEmail, senderId, receiverId, docId } = data;
      console.log("accept", senderEmail, receiverEmail, senderId, receiverId, docId);
      const room = docId;
      socket.join(room);
      io.sockets.sockets.get(receiverId).join(room);
      io.to(senderId).emit("accept", { senderEmail, receiverEmail });
      await axios.post("http://localhost:3000/api/collabration/accept", {
        senderEmail,
        receiverEmail,
        docId,
      });
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
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
});