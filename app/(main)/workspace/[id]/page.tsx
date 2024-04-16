"use client";

interface PageProps {
    params: { id: string };
}

import { useRouter } from 'next/navigation';
import { useSession } from "next-auth/react";
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
import { socket } from '../../page';
import DocsById from '@/components/DockById';

const page : React.FC<PageProps> = ({ params }) => {
    const { id } = params;
    const [dock, setDock] = useState({ title : "", content : [] });
    const [dockKey, setDockKey] = useState(1);
    useEffect(() => {
      const fetchDock = async () => {
        const { data } = await axios.get(`/api/docnotes/${id}`);
        console.log("data",data);
        setDock(data);
        setDockKey(prev => prev + 1);
      }
      fetchDock();
      console.log("dock",dock.content, typeof(dock.content));
    }, [id]);
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
    const invite = async (receiverEmail : string) => {
      const res1 = await axios.get(`/api/user/email/${receiverEmail}`);
      const receiverId = res1.data;
      socket.emit("invite", { receiverEmail, receiverId, senderEmail : userEmail, docId: id });
    }
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
      <DocsById key={dockKey} props={id} title={dock.title} content={dock.content}/>
    </div>
  )
}

export default page
