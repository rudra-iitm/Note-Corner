"use client";
import { ToggleButton } from "./SidebarDrawer"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion"
import { FaRegStickyNote } from "react-icons/fa";
import { GiNotebook } from "react-icons/gi";
import { RiRobot2Fill } from "react-icons/ri";
import { FaTrashAlt } from "react-icons/fa";
import { IoSendSharp, IoSettingsSharp } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";
import { MdInsertInvitation, MdLogin, MdLogout } from "react-icons/md";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { title } from "process";
import axios from "axios";
import { PlusSquare, User } from "lucide-react";
import { MdDraw } from "react-icons/md";
import { socket } from "../app/(main)/page";
import { color } from "framer-motion";

const Sidebar = ({urll,toggleDrawer}: {urll:string,toggleDrawer: () => void}) => {
  const { data: session, status } = useSession();
  // const currentUrl = window.location.pathname;
  // const currentUrl = router.asPath;
  // router.
  // useEffect(() => {
  //   console.log(router.basePath);
  // }, []);

  // const currentUrlArray = currentUrl.split("/");
  // urll==='#'?console.log(1):console.log(2);
  // console.log(urll);

  const [notes, setNotes] = useState([]);

  useEffect(() => {
    async function getData() {
      const { data : { data } } = await axios.get("/api/docnotes");
      console.log(data);
      setNotes(data);
    }
    getData();
  }, [])

  const router = useRouter();
  const [invites, setInvites] = useState<{
    senderEmail: string;
    receiverEmail: string;
    docId: string;
  }[]>([]);
  useEffect(() => {
    const getInvites = async () => {
      const res = await axios.get("/api/user/invites");
      console.log("data", res);
      // setInvites(data?.data || []);
    }
    getInvites();
  }, [])
  const { data } = useSession();
  const userEmail = data?.user?.email;
  const acceptInvite = async (senderEmail : string) => {
    const res1 = await axios.get(`/api/user/email/${userEmail}`);
    const receiverId = res1.data.socketId;
    const res2 = await axios.get(`/api/user/email/${senderEmail}`);
    const senderId = res2.data.socketId;
    socket.emit("accept", { receiverEmail : userEmail, receiverId, senderEmail, senderId });
  }
  useEffect(() => {
    socket.on("invite", (data) => {
      console.log("invitation",data);
      setInvites(prev => [data, ...prev]);
    });
  }, []);
  return (
    <div>
        <div id="docs-sidebar" className="hs-overlay [--auto-close:lg] hs-overlay-open:translate-x-0 -translate-x-full transition-all duration-300 transform hidden fixed top-0 start-0 bottom-0 z-[60] w-64 bg-white border-e border-gray-200 pt-7 pb-10 overflow-y-auto sm:block sm:translate-x-0 sm:end-auto sm:bottom-0 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-slate-700 dark:[&::-webkit-scrollbar-thumb]:bg-slate-500 dark:bg-gray-800 dark:border-gray-700">
        <div className="px-6">
            <a className="flex-none text-xl font-semibold dark:text-white" href="/" aria-label="Brand">Note Corner</a>
            <ToggleButton toggleDrawer={toggleDrawer} />
            <div>
            </div>
        </div>
          <nav className="hs-accordion-group p-6 w-full flex flex-col flex-wrap" data-hs-accordion-always-open>
            <ul className="space-y-1.5">
              <li>
                <a className={`flex items-center gap-x-3.5 py-2 px-2.5 text-sm  rounded-lg hover:bg-gray-100 dark:bg-gray-900 dark:text-white ${urll==='/'?'text-blue-500':'text-slate-700'}`} href="/">
                  <svg className="size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" ><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
                  Home
                </a>
              </li>
              <li>
                <a className={`flex items-center gap-x-3.5 py-2 px-2.5 text-sm  rounded-lg hover:bg-gray-100 dark:bg-gray-900 dark:text-white ${urll==='profile'?'text-blue-500':'text-slate-700'}`} href="/profile">
                  <User className="size-4" />
                  Profile
                </a>
              </li>
              <li><a className={`flex items-center gap-x-3.5 py-2 px-2.5 text-sm rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900 dark:text-slate-400 dark:hover:text-slate-300 ${urll==='docsnote'?'text-blue-500':'text-slate-700'}`} href="/docsnote">
                <PlusSquare className="size-4" />
                New Doc
              </a></li>
              <li>
                <Accordion type="single" collapsible className="py-0 px-2.5 gap-x-3.5 rounded-lg hover:bg-gray-100 dark:bg-gray-900 dark:text-white">
                    <AccordionItem value="item-1" className="border-0">
                        <AccordionTrigger className={`text-[13px] text-slate-700 font-normal py-2.5 my-0 ${notes.length === 0 ? 'hidden' : ''}`}>
                        <a className={`flex items-center gap-x-3.5 text-sm rounded-lg dark:bg-gray-900 dark:text-white  ${urll==='docsnoteid'?'text-blue-500':'text-slate-700'}`} href="#">
                                <FaRegStickyNote className="size-4"/>
                                Notes
                        </a>
                            </AccordionTrigger>
                        <AccordionContent>
                        <ul className="space-y-1.5">
                          {notes.map(({title, id}) => (
                            <li key={id}>
                                <Link href={`/docsnote/${id}`} className="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-slate-700 rounded-lg hover:bg-gray-200 dark:bg-gray-900 dark:text-white">
                                <GiNotebook className="size-4" />
                                {title || "Untitled"}
                                </Link>
                            </li>
                          ))}
                        </ul>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
              </li>

              <li><a className={`flex items-center gap-x-3.5 py-2 px-2.5 text-sm rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900 dark:text-slate-400 dark:hover:text-slate-300 ${urll==='chat-ai'?'text-blue-500':'text-slate-700'}`} href="/chat-ai">
                <RiRobot2Fill className="size-4" />
                Ask AI
              </a></li>
              <li><a className={`flex items-center gap-x-3.5 py-2 px-2.5 text-sm rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900 dark:text-slate-400 dark:hover:text-slate-300 ${urll==='calendar'?'text-blue-500':'text-slate-700'}`} href="/calendar">
                <svg className="size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/><path d="M8 14h.01"/><path d="M12 14h.01"/><path d="M16 14h.01"/><path d="M8 18h.01"/><path d="M12 18h.01"/><path d="M16 18h.01"/></svg>
                Calendar
              </a></li>
              <li><a className={`flex items-center gap-x-3.5 py-2 px-2.5 text-sm rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900 dark:text-slate-400 dark:hover:text-slate-300 ${urll==='to-do'?'text-blue-500':'text-slate-700'}`} href="/to-do">
                <svg className="size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
                To Do
              </a></li>
              <li><a className={`flex items-center gap-x-3.5 py-2 px-2.5 text-sm rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900 dark:text-slate-400 dark:hover:text-slate-300 ${urll==='excalidraw'?'text-blue-500':'text-slate-700'}`} href="/excalidraw">
                <MdDraw className="size-4" />
                Excalidraw
              </a></li>
              <li>
                <Accordion type="single" collapsible className="py-0 px-2.5 gap-x-3.5 rounded-lg hover:bg-gray-100 dark:bg-gray-900 dark:text-white">
                    <AccordionItem value="item-1" className="border-0">
                        <AccordionTrigger className={`text-[13px] text-slate-700 font-normal py-2.5 my-0 ${notes.length === 0 ? 'hidden' : ''}`}>
                        <a className="flex items-center gap-x-3.5 text-sm text-slate-700 rounded-lg dark:bg-gray-900 dark:text-white" href="#">
                                <IoSendSharp/>
                                Invites
                        </a>
                            </AccordionTrigger>
                        <AccordionContent>
                        <ul className="space-y-1.5">
                          {invites.map(({senderEmail}) => (
                            <li key={senderEmail} onClick={() => {
                              setInvites([]);
                              acceptInvite(senderEmail);
                            }
                            }>
                                {senderEmail}
                            </li>
                          ))}
                        </ul>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
              </li>
            </ul>
            <ul className="pt-4 mt-4 space-y-2 font-medium border-t border-gray-200 dark:border-gray-700">
            {/* <li>
            <a href="#" className="flex items-center p-2 text-gray-900 transition duration-75 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group">
               <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 17 20">
                  <path d="M7.958 19.393a7.7 7.7 0 0 1-6.715-3.439c-2.868-4.832 0-9.376.944-10.654l.091-.122a3.286 3.286 0 0 0 .765-3.288A1 1 0 0 1 4.6.8c.133.1.313.212.525.347A10.451 10.451 0 0 1 10.6 9.3c.5-1.06.772-2.213.8-3.385a1 1 0 0 1 1.592-.758c1.636 1.205 4.638 6.081 2.019 10.441a8.177 8.177 0 0 1-7.053 3.795Z"/>
               </svg>
               <span className="ms-3">About Us</span>
            </a>
         </li>
         <li>
            <a href="#" className="flex items-center p-2 text-gray-900 transition duration-75 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group">
               <FaTrashAlt className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
               <span className="ms-3">Trash</span>
            </a>
         </li>
         <li>
            <a href="#" className="flex items-center p-2 text-gray-900 transition duration-75 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group">
               <IoSettingsSharp className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
               <span className="ms-3">Settings</span>
            </a>
         </li> */}
         <li>
            <Link href="/sign-in" onClick={() =>{ if(status==="authenticated"){signOut({callbackUrl: '/'})}else{router.push("/sign-in")}}}
            className="flex items-center p-2 text-gray-900 transition duration-75 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group">
                {status==="authenticated"?<MdLogin className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />:<MdLogin className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />}
               {status==="authenticated"?<span className="ms-3">Log out</span>:<span className="ms-3">Log in</span>}
            </Link>
         </li>
         </ul>
          </nav>
        </div>
    </div>
  )
}

export default Sidebar