import { Button } from "@/components/ui/button";
import axios from "axios";
import { useEffect } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:6969");



const page = () => {
  const invite = async () => {
    const { data : { receiverEmai, receiverId } } = await axios.get("/api/users/:email");
    const { data : { senderEmail, senderId } } = await axios.get("/api/users/:email");
    socket.emit("invite", { receiverEmai, receiverId, senderEmail, senderId });
  }
  const accept = async () => {
    const { data : { receiverEmai, receiverId } } = await axios.get("/api/users/:email");
    const { data : { senderEmail, senderId } } = await axios.get("/api/users/:email");
    socket.emit("accept", { receiverEmai, receiverId, senderEmail, senderId });
  }
  useEffect(() => {
    socket.on("invite", (data) => {
      console.log(data);
    });
    socket.on("accept", (data) => {
      console.log(data);
    });
  }, []);
  return (
    <div>
      <Button>Invite</Button>
    </div>
  )
}

export default page