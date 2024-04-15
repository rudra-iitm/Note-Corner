import { Button } from "@/components/ui/button";
import io from "socket.io-client";

const socket = io("http://localhost:6969");



const page = () => {
  return (
    <div>
      <Button>Invite</Button>
    </div>
  )
}

export default page