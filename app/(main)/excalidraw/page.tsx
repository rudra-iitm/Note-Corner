import { SidebarDrawer } from "@/components/SidebarDrawer";
import { Card } from "@/components/ui/card";
import dynamic from "next/dynamic";

const ExcalidrawWrapper = dynamic(
  async () => (await import("../../excalidrawWrapper")).default,
  {
    ssr: false,
  },
);

export default function Page() {
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