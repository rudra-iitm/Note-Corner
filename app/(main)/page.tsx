"use client";
import { SocialIcon } from 'react-social-icons'
import { Boxes, BoxesCore } from "@/components/ACui/background-boxes";
import { TypewriterEffectSmooth } from "@/components/ACui/typewriter-effect";
import { motion, useScroll, useTransform } from "framer-motion";
import img2 from "@/public/img3.png";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { SidebarDrawer } from "@/components/SidebarDrawer";
import { ChatBot } from "@/components/ChatBot";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import io from "socket.io-client";
import axios from "axios";
import { HomeIcon, MailIcon, Phone, TicketCheck } from 'lucide-react';

export const socket = io("http://localhost:6969");

export default function Home() {
  const session = useSession();
  const userEmail = session.data?.user?.email;
  useEffect(() => {
    const setSocketId = async () => {
      await axios.post(`/api/user/setSocketId`, { email : userEmail, socketId : socket.id });
    }
    console.log("socket",socket, "email", userEmail);
    setSocketId();
  }, [socket, userEmail]);
  const router = useRouter();
  const features = [{
    title: "Create Notes",
    description: "Create notes with ease and convenience.",
    image: "../../manage-tasks.png",
    link: "/to-do",
  },{
    title: "Ask Ai",
    description: "Ask Ai for help in problems.",
    image: "../../ask-ai.png",
    link: "/chat-ai",
  },{
    title: "Manage Events",
    description: "Manage events on the calendar with ease",
    image: "../../manage-events.png",
    link: "/calendar",
  }]
  const startHandler = () => {
    router.push("/docsnote");
  }
  // const textRef = useRef<HTMLElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: textRef });
  const y = useTransform(scrollYProgress, [0, 1], [-90, 90]);
  const words = [
    {
      text: "Experience ",
    },
    {
      text: "Seamless ",
    },
    {
      text: "Productivity ",
    },
    {
      text: "in a ",
    },
    {
      text: "Workspace.",
      className: "text-blue-500 dark:text-blue-500",
    },
  ];
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [windowWidth, setWindowWidth] = useState<number>(0);
  useEffect(()=>{
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener('resize', handleResize);
    setWindowWidth(window.innerWidth);
    const divAnimate=()=>{
      const inner = document.querySelector<HTMLDivElement>("#inner");
      const innerRect = inner?.getBoundingClientRect();
      const textEL = document.querySelector<HTMLDivElement>("#textEl");
      const imgEL = document.querySelector<HTMLDivElement>("#imgEl");
      const text1 = document.querySelector<HTMLParagraphElement>("#text1");
      const text2 = document.querySelector<HTMLParagraphElement>("#text2");
      if (!inner || !innerRect || !textEL || !imgEL || !text1 || !text2) return;
      const k = 300;
      const opacity = 1 - (window.scrollY /k);
      inner.style.opacity = opacity.toString();
      const rotationAngle = window.scrollY / 10;
      const textSize = 100 + window.scrollY / 10;
      textEL.style.transition = "transform 0.1s linear";
      textEL.style.transform = `translateX(${-(window.scrollY)}px) rotate(${-rotationAngle}deg) scale(${textSize / 100})`;
      imgEL.style.transition = "transform 0.1s linear";
      imgEL.style.transform = `translateX(${(window.scrollY)}px) rotate(${rotationAngle}deg)`;
      const rootEl = document.querySelector<HTMLDivElement>("#inner");
      if (rootEl) {
        rootEl.style.overflowY = "hidden";
      }
      const text3 = document.querySelector<HTMLParagraphElement>("#text3");
      if (text3) {
        const opacity = Math.min(window.scrollY / 400, 1);
        const fontSize = 40 + window.scrollY / 50;
        text3.style.opacity = opacity.toString();
        text3.style.fontSize = `${fontSize}px`;
        const text3Rect = text3.getBoundingClientRect();
        const text3Top = text3Rect.top;
        if (text3Top < text3Rect.height*4 + 8 ) {
          const opacity1 = Math.min(text3Top/130, 1);
          const fontSize1 = 40 + text3Top/ 30;
          text3.style.opacity = opacity1.toString();
          text3.style.transition = "font-size 0.1s linear";
          text3.style.fontSize = `${fontSize1}px`;
        }
      }

    };
    document.addEventListener("scroll", divAnimate);
    return () => {document.removeEventListener("scroll", divAnimate);window.removeEventListener('resize', handleResize);}
  },[])
  if(windowSize.width>=1024)
  {
    return (
    <div className="h-[120rem] w-full flex flex-col justify-start items-center pt-2 overflow-x-hidden -z-10">
      <SidebarDrawer urll="/"/>
    <motion.div className='flex flex-row overflow-x-hidden overflow-y-hidden h-[39rem] z-20 pt-10' id='inner'>
    <motion.div className="flex flex-col gap-7 items-center justify-center px-4 w-1/2 h-full" id='textEl'
        initial={{
          opacity: 0,
          x: -100
        }}
        whileInView={{
        opacity: 1,
        x: 0, // Slide in to its original position
        transition: {
          duration: 0.7 // Animation duration
          }}}>
          <h1 id="text1" className="text-black dark:text-white font-mono font-extrabold lg:text-6xl  md:text:5xl sm:text-4xl">Note Corner</h1>
          <p id="text2" className="dark:text-white text-3xl text-center font-bold "> Create, organize, collaborate.
          <br/>
          Empowered by Artificial Intelligence.</p>
          <button id="start" onClick={()=>{startHandler();}} style={{ boxShadow: "1px 1px 20px black, -1px -1px 20px black" }} className="py-3  text-lg font-semibold rounded-2xl cursor-pointer dark:text-white  px-8">Start Creating Docs Now</button>
        </motion.div>
        <motion.div id="imgEl" className="h-full w-1/2 flex justify-center items-center m-4"
            initial={{
              opacity: 0,
              x: 100
            }}
          whileInView={{
          opacity: 1,
          x: 0, // Slide in to its original position
          transition: {
            duration: 0.7 // Animation duration
          }}}>
          <div className="h-4/5 w-full p-1 rounded-2xl border-2">
          <Image src={img2} alt="logo" className="h-full w-full rounded-2xl p-2 "/>
          </div>
      </motion.div>
    </motion.div>
    <TypewriterEffectSmooth words={words} className="pb-0"/>
    <ChatBot/>
    <h3 className="text-9xl mt-40">Features</h3>
    <div className="w-full flex justify-between items-center gap-5 px-5 mt-20">
      {features.map((feature, index) => (
        <Link key={index} href={feature.link}>
          <Card>
            <CardHeader>
              <CardTitle>{feature.title}</CardTitle>
              <CardDescription>{feature.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <img src={feature.image} alt="logo" className="h-full w-full rounded-2xl p-2 "/>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
    <div className='w-full flex flex-row pt-72 '>
        <div className='w-1/2 h-40 mt-20 bg-zinc-900 flex flex-row items-center justify-center space-x-4'>
            <h1 className='text-center text-zinc-300 font-serif pr-4'>Establish Communication With Us</h1>
            <SocialIcon url="mailto:shivam181106@gmail.com" className='h-8 w-8 text-zinc-300 items-center justify-center'/>
            <SocialIcon url="https://www.linkedin.com/in/shivam-jaiswal-54088a266/" className='h-8 w-8 text-zinc-300 items-center justify-center'/>
            <SocialIcon url="https://twitter.com" className='h-8 w-8 text-zinc-300 items-center justify-center'/>
            <SocialIcon url="https://instagram.com" className='h-8 w-8 text-zinc-300 items-center justify-center'/>
            <SocialIcon url="https://youtube.com" className='h-8 w-8 text-zinc-300 items-center justify-center'/>
        </div>
        <div className='h-40 mt-20 border-l-2 border-zinc-600'></div>
        <div className='w-1/2 h-40 mt-20 bg-zinc-900'>
        <div className='flex flex-row'>
          <div  className='mx-auto mb-md-0 mb-4 text-zinc-200 pt-2'>
              <h6 className='font-bold mb-3 uppercase'>Useful links</h6>
              <p>
                <a href='/chat-ai' className='font-mono text-zinc-200 hover:text-blue-400'>
                  Ask AI
                </a>
              </p>
              <p>
                <a href='/docsnote' className='font-mono text-zinc-200 hover:text-blue-400'>
                  DocsNote
                </a>
              </p>
              <p>
                <a href='/calendar' className='font-mono text-zinc-200 hover:text-blue-400'>
                  Calendar
                </a>
              </p>
              <p>
                <a href='/to-do' className='font-mono text-zinc-200 hover:text-blue-400'>
                  Todo
                </a>
              </p>
            </div>

            <div  className='mx-auto mb-md-0 mb-4 text-white pt-2'>
              <h6 className='font-bold mb-3 uppercase'>Contact</h6>
              <p className='flex flex-row'>
                <HomeIcon className='h-6 w-6 text-zinc-300 justify-center pr-2 items-end'/>
                Mandi, Himachal Pradesh, India
              </p>
              <p className='flex flex-row'>
              <MailIcon className='h-6 w-6 text-zinc-300 justify-center pr-2 items-end'/>
                shivam181106@gmail.com
              </p>
              <p className='flex flex-row'>
              <Phone className='h-6 w-6 text-zinc-300 justify-center pr-2 items-end'/> + 9628498661
              </p>
              <p className='flex flex-row'>
              <TicketCheck className='h-6 w-6 text-zinc-300 justify-center pr-2 items-end'/> + 99999999999
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className='text-center p-4 bg-zinc-300 bottom-0 w-full'>
        © 2024 Copyright  :
        <a className='font-medium pl-2' href='https://mdbootstrap.com/'>
          Note Corner
        </a>
      </div>
    </div>
  );
}else if(windowSize.width>=640){
  return(
    <div className="h-[110rem] w-full flex flex-col justify-start items-center pt-2 overflow-x-hidden -z-10">
      <SidebarDrawer urll="/"/>
    <motion.div className='flex flex-row overflow-x-hidden overflow-y-hidden h-[39rem] z-20'>
    <motion.div className="flex flex-col gap-7 items-center justify-center px-4 w-full h-full"
        initial={{
          opacity: 0,
          y: -100
        }}
        whileInView={{
        opacity: 1,
        y: 0, // Slide in to its original position
        transition: {
          duration: 0.7 // Animation duration
          }}}>
          <h1 id="text1" className="text-black dark:text-white font-mono font-extrabold lg:text-6xl  md:text:5xl sm:text-4xl text-4xl">Note Corner</h1>
          <p id="text2" className="dark:text-white text-3xl text-center font-bold "> Create, organize, collaborate.
          <br/>
          Empowered by Artificial Intelligence.</p>
          <button id="start" onClick={()=>{startHandler();}} style={{ boxShadow: "1px 1px 20px black, -1px -1px 20px black" }} className="py-3  text-lg font-semibold rounded-2xl cursor-pointer dark:text-white  px-8">Start Creating Docs Now</button>
        </motion.div>
      </motion.div>
      <TypewriterEffectSmooth words={words} className="pb-0"/>
      <ChatBot/>
      <h3 className="text-5xl mt-40 font-bold font-serif">Features</h3>
      <div className="w-full flex justify-between items-center gap-5 px-5 mt-20">
        {features.map((feature, index) => (
          <Link key={index} href={feature.link}>
            <Card>
            <CardHeader>
              <CardTitle>{feature.title}</CardTitle>
              <CardDescription>{feature.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <img src={feature.image} alt="logo" className="h-full w-full rounded-2xl p-2 "/>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
    <div className='w-full flex flex-row pt-72 '>
        <div className='w-1/2 h-40 mt-20 bg-zinc-900 flex flex-row items-center justify-center space-x-4'>
            <h1 className='text-center text-zinc-300 font-serif pr-4'>Establish Communication With Us</h1>
            <SocialIcon url="mailto:shivam181106@gmail.com" className='h-8 w-8 text-zinc-300 items-center justify-center'/>
            <SocialIcon url="https://www.linkedin.com/in/shivam-jaiswal-54088a266/" className='h-8 w-8 text-zinc-300 items-center justify-center'/>
            <SocialIcon url="https://twitter.com" className='h-8 w-8 text-zinc-300 items-center justify-center'/>
            <SocialIcon url="https://instagram.com" className='h-8 w-8 text-zinc-300 items-center justify-center'/>
            <SocialIcon url="https://youtube.com" className='h-8 w-8 text-zinc-300 items-center justify-center'/>
        </div>
        <div className='h-40 mt-20 border-l-2 border-zinc-600'></div>
        <div className='w-1/2 h-40 mt-20 bg-zinc-900'>
        <div className='flex flex-row'>
          <div  className='mx-auto mb-md-0 mb-4 text-zinc-200 pt-2'>
              <h6 className='font-bold mb-3 uppercase'>Useful links</h6>
              <p>
                <a href='/chat-ai' className='font-mono text-zinc-200 hover:text-blue-400'>
                  Ask AI
                </a>
              </p>
              <p>
                <a href='/docsnote' className='font-mono text-zinc-200 hover:text-blue-400'>
                  DocsNote
                </a>
              </p>
              <p>
                <a href='/calendar' className='font-mono text-zinc-200 hover:text-blue-400'>
                  Calendar
                </a>
              </p>
              <p>
                <a href='/to-do' className='font-mono text-zinc-200 hover:text-blue-400'>
                  Todo
                </a>
              </p>
            </div>

            <div  className='mx-auto mb-md-0 mb-4 text-white pt-2'>
              <h6 className='font-bold mb-3 uppercase'>Contact</h6>
              <p className='flex flex-row'>
                <HomeIcon className='h-6 w-6 text-zinc-300 justify-center pr-2 items-end'/>
                Mandi, Himachal Pradesh, India
              </p>
              <p className='flex flex-row'>
              <MailIcon className='h-6 w-6 text-zinc-300 justify-center pr-2 items-end'/>
                shivam181106@gmail.com
              </p>
              <p className='flex flex-row'>
              <Phone className='h-6 w-6 text-zinc-300 justify-center pr-2 items-end'/> + 9628498661
              </p>
              <p className='flex flex-row'>
              <TicketCheck className='h-6 w-6 text-zinc-300 justify-center pr-2 items-end'/> + 99999999999
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className='text-center p-4 bg-zinc-300 bottom-0 w-full'>
        © 2024 Copyright  :
        <a className='font-medium pl-2' href='https://mdbootstrap.com/'>
          Note Corner
        </a>
      </div>
    </div>

  )
}
else{
  return(
    <div className="h-[150rem] w-full flex flex-col justify-start items-center pt-2 overflow-x-hidden -z-50">
      <SidebarDrawer urll="/"/>
    <motion.div className='flex flex-row overflow-x-hidden overflow-y-hidden h-[39rem] z-10'>
    <motion.div className="flex flex-col gap-7 items-center justify-center px-4 w-full h-full"
        initial={{
          opacity: 0,
          y: -100
        }}
        whileInView={{
        opacity: 1,
        y: 0, // Slide in to its original position
        transition: {
          duration: 0.7 // Animation duration
          }}}>
          <h1 id="text1" className="text-black dark:text-white font-mono font-extrabold lg:text-6xl  md:text:5xl sm:text-4xl text-4xl">Note Corner</h1>
          <p id="text2" className="dark:text-white text-3xl text-center font-bold "> Create, organize, collaborate.
          <br/>
          Empowered by Artificial Intelligence.</p>
          <button id="start" onClick={()=>{startHandler();}} style={{ boxShadow: "1px 1px 20px black, -1px -1px 20px black" }} className="py-3  text-lg font-semibold rounded-2xl dark:text-white px-8 z-50 cursor-pointer">Start Creating Docs Now</button>
        </motion.div>
      </motion.div>
      <ChatBot/>
      <h3 className="text-5xl mt-20 font-bold font-serif">Features</h3>
      <div className="w-full flex justify-center items-center gap-5 px-5 mt-20 flex-col">
        {features.map((feature, index) => (
          <Link key={index} href={feature.link}>
            <Card>
            <CardHeader>
              <CardTitle>{feature.title}</CardTitle>
              <CardDescription>{feature.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <img src={feature.image} alt="logo" className="h-full w-full rounded-2xl p-2 "/>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
    <div className='w-full flex flex-row pt-72 '>
        <div className='h-40 mt-20 border-l-2 border-zinc-600'></div>
        <div className='w-full h-40 mt-20 bg-zinc-900'>
        <div className='flex flex-row'>
          <div  className='mx-auto mb-md-0 mb-4 text-zinc-200 pt-2'>
              <h6 className='font-bold mb-3 uppercase'>Useful links</h6>
              <p>
                <a href='/chat-ai' className='font-mono text-zinc-200 hover:text-blue-400'>
                  Ask AI
                </a>
              </p>
              <p>
                <a href='/docsnote' className='font-mono text-zinc-200 hover:text-blue-400'>
                  DocsNote
                </a>
              </p>
              <p>
                <a href='/calendar' className='font-mono text-zinc-200 hover:text-blue-400'>
                  Calendar
                </a>
              </p>
              <p>
                <a href='/to-do' className='font-mono text-zinc-200 hover:text-blue-400'>
                  Todo
                </a>
              </p>
            </div>

            <div  className='mx-auto mb-md-0 mb-4 text-white pt-2'>
              <h6 className='font-bold mb-3 uppercase'>Contact</h6>
              <p className='flex flex-row'>
                <HomeIcon className='h-6 w-6 text-zinc-300 justify-center pr-2 items-end'/>
                Mandi, Himachal Pradesh, India
              </p>
              <p className='flex flex-row'>
              <MailIcon className='h-6 w-6 text-zinc-300 justify-center pr-2 items-end'/>
                shivam181106@gmail.com
              </p>
              <p className='flex flex-row'>
              <Phone className='h-6 w-6 text-zinc-300 justify-center pr-2 items-end'/> + 9628498661
              </p>
              <p className='flex flex-row'>
              <TicketCheck className='h-6 w-6 text-zinc-300 justify-center pr-2 items-end'/> + 99999999999
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className='text-center p-4 bg-zinc-300 bottom-0 w-full'>
        © 2024 Copyright  :
        <a className='font-medium pl-2' href='https://mdbootstrap.com/'>
          Note Corner
        </a>
      </div>
    </div>

  )
}
}
