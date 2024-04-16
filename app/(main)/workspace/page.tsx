"use client";

import { useRouter } from 'next/navigation';
import { useSession } from "next-auth/react";
import DocsEditor from '@/components/DocsEditor';
import { SidebarDrawer } from '@/components/SidebarDrawer';
import { useEffect, useState } from 'react';
import axios from 'axios';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { socket } from '../page';

const page = () => {
    const router = useRouter();

  const { status, data } = useSession();
  const userEmail = data?.user?.email;
  const [availableUsers, setAvailableUsers] = useState([]);
  useEffect(() => {
    const fetchUsers = async () => {
      const { data } = await axios.get(`/api/collabration/avaliable`);
      setAvailableUsers(data.filter((user : any) => user.email != userEmail)  || []);
    }
    fetchUsers();
  }, []);
    if (status != "authenticated" && status != "loading") {
        router.push("/sign-in");
    }
    // useEffect(() => {
    //   const setSocketId = async () => {
    //     await axios.post(`/api/user/setSocketId`, { email : userEmail, socketId : socket.id });
    //   }
    //   console.log("socket",socket, "email", userEmail);
    //   setSocketId();
    // }, [socket, userEmail]);
    const invite = async (receiverEmail : string) => {
      const res1 = await axios.get(`/api/user/email/${receiverEmail}`);
      const receiverId = res1.data.socketId;
      const res2 = await axios.get(`/api/user/email/${userEmail}`);
      const senderId = res2.data.socketId;
      socket.emit("invite", { receiverEmail, receiverId, senderEmail : userEmail, senderId });
    }
    // const accept = async (senderEmail : string) => {
    //   const res1 = await axios.get(`/api/user/${userEmail}`);
    //   const receiverId = res1.data.socketId;
    //   const res2 = await axios.get(`/api/user/${senderEmail}`);
    //   const senderId = res2.data.socketId;
    //   socket.emit("accept", { receiverEmail : userEmail, receiverId, senderEmail, senderId });
    // }
    return (
    <div>
      <SidebarDrawer urll="workspace"/>
      <Select onValueChange={(email) => invite(email)}>
        <SelectTrigger className="w-[180px] fixed top-20 right-5">
          <SelectValue placeholder="Collaborate" />
        </SelectTrigger>
        <SelectContent>
          {availableUsers.map((user : any) => <SelectItem value={user.email}>{user.email}</SelectItem>)}
        </SelectContent>
      </Select>
      <DocsEditor/>
    </div>
  )
}

export default page
