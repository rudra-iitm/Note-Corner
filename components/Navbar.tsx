"use client";
import  { useEffect, useState } from "react";
import { HoveredLink, Menu, MenuItem} from "./ACui/navbar-menu";

import { LocateFixedIcon, Lock, LogIn, LogOutIcon, TicketIcon, Train, UserIcon, UserPlus, UserSquare2 } from "lucide-react";

const Navbar = () => {
//   const token=Cookies.get('token');
  const [userDet,setUserDet]=useState(null);

  const [active, setActive] = useState<string | null>(null);
    return (
        <div className="fixed top-6 inset-x-0 max-w-md mx-auto z-20">
        <Menu setActive={setActive}>
          <MenuItem setActive={setActive} active={active} item="Trains">
            <div className="flex flex-col space-y-4 text-sm">
              <HoveredLink href="/book-ticket"><div className="flex flex-row space-x-2"><TicketIcon className="h-5 w-4"/> <h1>Book Tickets</h1></div></HoveredLink>
              <HoveredLink href="/train-search"><div className="flex flex-row space-x-2"><Train className="h-5 w-4"/> <h1>Search Trains</h1></div></HoveredLink>
              <HoveredLink href="/station-search"><div className="flex flex-row space-x-2"><LocateFixedIcon className="h-5 w-4"/> <h1>Search Stations</h1></div></HoveredLink>
              <HoveredLink href="/"><div className="flex flex-row space-x-2"><TicketIcon className="h-5 w-4"/> <h1>PNR Enquiry</h1></div></HoveredLink>
            </div>
          </MenuItem>
          {
          userDet ? 
          <MenuItem setActive={setActive} active={active} item="Account">
            <div className="flex flex-col space-y-4 text-sm">
              <HoveredLink href="/dashboard"><div className="flex flex-row space-x-2"><UserIcon className="h-5 w-4"/> <h1>My Profile</h1></div></HoveredLink>
              <HoveredLink href="/passenger"><div className="flex flex-row space-x-2"><UserSquare2 className="h-5 w-4"/> <h1>Passenger List</h1></div></HoveredLink>
              <HoveredLink href="/reset-password"><div className="flex flex-row space-x-2"><Lock className="h-5 w-4"/> <h1>Change Password</h1></div></HoveredLink>
              <HoveredLink href="/signout"><div className="flex flex-row space-x-2"><LogOutIcon className="h-5 w-4"/> <h1>Logout</h1></div></HoveredLink>
            </div>
          </MenuItem>
          :
          <MenuItem setActive={setActive} active={active} item="Account">
            <div className="flex flex-col space-y-4 text-sm">
              <HoveredLink href="/sign-in"><div className="flex flex-row space-x-2"><LogIn className="h-5 w-4"/> <h1>Login</h1></div></HoveredLink>
              <HoveredLink href="/sign-up"><div className="flex flex-row space-x-2"><UserPlus className="h-5 w-4"/> <h1>Register</h1></div></HoveredLink>
            </div>
          </MenuItem>
          }
        </Menu>
      </div>
    )
  }
  
  export default Navbar
  