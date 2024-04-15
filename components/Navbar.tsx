"use client";
import  { useState } from "react";
import { HoveredLink, Menu, MenuItem} from "./ACui/navbar-menu";

import { Dock, Lock, LogIn, LogOutIcon, PlusSquare, Settings, SparkleIcon, UserIcon, UserPlus } from "lucide-react";
import { IconBrandTeams, IconBrandWikipedia } from "@tabler/icons-react";
import { useSession } from "next-auth/react";

const Navbar = () => {
  // const [userDet,setUserDet]=useState("not authorised");
  const {status, data} = useSession();

  // if (status === "authenticated") {
  //   setUserDet("authorised");
  // }
  // else{setUserDet("authorised");}
  
  const [active, setActive] = useState<string | null>(null);
    return (
        <div className="fixed top-6 inset-x-0 max-w-md mx-auto">
        <Menu setActive={setActive}>
          <MenuItem setActive={setActive} active={active} item="Features">
            <div className="flex flex-col space-y-4 text-sm">
              <HoveredLink href="/chat-ai"><div className="flex flex-row space-x-2"><SparkleIcon className="h-5 w-4"/><h1>AI</h1></div></HoveredLink>
              <HoveredLink href="/docsnote"><div className="flex flex-row space-x-2"><Dock className="h-5 w-4"/> <h1>Docs</h1></div></HoveredLink>
              <HoveredLink href="/station-search"><div className="flex flex-row space-x-2"><IconBrandWikipedia className="h-5 w-4"/> <h1>Wikis</h1></div></HoveredLink>
            </div>
          </MenuItem>
          <MenuItem setActive={setActive} active={active} item="Workflows">
            <div className="flex flex-col space-y-4 text-sm">
              <HoveredLink href="/book-ticket"><div className="flex flex-row space-x-2"><PlusSquare className="h-5 w-4"/> <h1>New Page</h1></div></HoveredLink>
              <HoveredLink href="/train-search"><div className="flex flex-row space-x-2"><IconBrandTeams className="h-5 w-4"/> <h1>New Workspace</h1></div></HoveredLink>
            </div>
          </MenuItem>
          {
          status==="authenticated" ? 
          <MenuItem setActive={setActive} active={active} item="Account">
            <div className="flex flex-col space-y-4 text-sm">
              <HoveredLink href="/dashboard"><div className="flex flex-row space-x-2"><UserIcon className="h-5 w-4"/> <h1>My Account</h1></div></HoveredLink>
              <HoveredLink href="/passenger"><div className="flex flex-row space-x-2"><Settings className="h-5 w-4"/> <h1>Setting</h1></div></HoveredLink>
              <HoveredLink href="/reset-password"><div className="flex flex-row space-x-2"><Lock className="h-5 w-4"/> <h1>Change Password</h1></div></HoveredLink>
              <HoveredLink href="/signout"><div className="flex flex-row space-x-2"><LogOutIcon className="h-5 w-4"/> <h1>Logout</h1></div></HoveredLink>
            </div>
          </MenuItem>
          :
          <MenuItem setActive={setActive} active={active} item="Account">
            <div className="flex flex-col space-y-4 text-sm">
              <HoveredLink href="/sign-in"><div className="flex flex-row space-x-2"><LogIn className="h-5 w-4"/> <h1>Login</h1></div></HoveredLink>
              <HoveredLink href="/sign-up"><div className="flex flex-row space-x-2"><UserPlus className="h-5 w-4"/> <h1>SignUp</h1></div></HoveredLink>
            </div>
          </MenuItem>
          }
        </Menu>
      </div>
    )
  }
  
  export default Navbar
  