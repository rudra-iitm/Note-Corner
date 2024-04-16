import { Metadata } from 'next';
import { FC, ReactNode } from 'react';
interface LayoutProps {
  children: ReactNode;
}
export const metadata: Metadata = {
    title: "Chat AI",
    description: "Chat with AI",
  };
  
const Layout: FC<LayoutProps> = ({ children }) => {
  return(
      <div>
        <div>{children}</div>
      </div>
    );
};

export default Layout;
