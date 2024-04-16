// "use client"

// import { Button } from "@/components/ui/button";
// import axios from "axios";
// import { useSession } from "next-auth/react";
// import { useEffect, useState } from "react";
// import io from "socket.io-client";

// const socket = io("http://localhost:6969");

// const page = () => {
//   const session = useSession();
//   // console.log("session",session);
//   const [userEmail, setUserEmail] = useState(session.data?.user?.email);
//   const invite = async () => {
//     const res1 = await axios.get(`/api/users/${receiverEmail}`);
//     const receiverId = res1.data.socketId;
//     const res2 = await axios.get(`/api/users/${userEmail}`);
//     const senderId = res2.data.socketId;
//     socket.emit("invite", { receiverEmail, receiverId, senderEmail : userEmail, senderId });
//   }
//   const accept = async () => {
//     const res1 = await axios.get(`/api/users/${userEmail}`);
//     const receiverId = res1.data.socketId;
//     const res2 = await axios.get(`/api/users/${senderEmail}`);
//     const senderId = res2.data.socketId;
//     socket.emit("accept", { receiverEmail : userEmail, receiverId, senderEmail, senderId });
//   }
//   useEffect(() => {
//     const setSocketId = async () => {
//       await axios.post(`/api/users/setSocketId`, { email : userEmail, socketId : socket.id });
//     }
//     setSocketId();
//     socket.on("invite", (data) => {
//       console.log(data);
//     });
//     socket.on("accept", (data) => {
//       console.log(data);
//     });
//   }, []);
//   return (
//     <div>
//       <Button>Invite</Button>
//     </div>
//   )
// }

// export default page