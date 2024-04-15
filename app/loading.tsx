import { Loader } from "@/components/Chat_ai";

export default function Loading() {
    // You can add any UI inside Loading, including a Skeleton.
    return (<div className="flex justify-center items-center h-screen w-screen">
            <Loader size={'16'}/>
    </div>
    )
  }