import Navbar from '@/components/Navbar';
import Image from 'next/image';
import { FC, ReactNode } from 'react';
import logo from "@/public/icon.svg"
import Link from 'next/link';
interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return(
      <div>
        {/* <div className='flex flex-row'> */}
          {/* <Link href='/'><Image src={logo} alt='logo' className='fixed h-12 w-12 left-40 top-4  rounded-2xl p-1'/></Link> */}
          <Navbar/>
        {/* </div> */}
        {/* <div className='h-12 bg-zinc-200 z-30'></div> */}
        <div>{children}</div>
      </div>
    );
};

export default Layout;
