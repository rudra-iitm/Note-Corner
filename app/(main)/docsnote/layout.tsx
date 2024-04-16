import { Metadata } from 'next';
import { FC, ReactNode } from 'react';
interface LayoutProps {
  children: ReactNode;
}
export const metadata: Metadata = {
    title: "DocsNote",
    description: "Create and edit documents with DocsNote",
  };
  
const Layout: FC<LayoutProps> = ({ children }) => {
  return(
      <div>
        <div>{children}</div>
      </div>
    );
};

export default Layout;
