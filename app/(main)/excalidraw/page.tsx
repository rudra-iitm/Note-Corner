'use client';
import { Loader } from "@/components/Chat_ai";
import { SidebarDrawer } from "@/components/SidebarDrawer";
import { Card } from "@/components/ui/card";
import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";

const ExcalidrawWrapper = dynamic(
  async () => (await import("../../excalidrawWrapper")).default,
  {
    ssr: false,
  },
);

export default function Page() {
  const router = useRouter();

  const {status, data} = useSession();

  if (status == "loading") {
    return (<div className="flex justify-center items-center h-screen w-screen">
        <Loader size={'16'}/>
    </div>
  )
}

  if (status != "authenticated") {
      router.push("/sign-in");
  }
  
  return (
    <div>
      <SidebarDrawer urll='excalidraw'/>
      <div className="flex justify-center items-center mt-28">
        <Card>
          <ExcalidrawWrapper />
        </Card>
      </div>
    </div>     
  );
}