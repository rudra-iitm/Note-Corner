import Navbar from '@/components/Navbar';
import { FC, ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return(
      <div>
        <Navbar/>
        {/* <div className='h-12 bg-zinc-200 z-30'></div> */}
        <div>{children}</div>
      </div>
    );
};

export default Layout;
