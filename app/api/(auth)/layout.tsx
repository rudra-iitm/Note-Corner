import { FC, ReactNode } from 'react';

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
  return(
      <div>
        <div className='h-12 bg-zinc-200'></div>
        <div>{children}</div>
      </div>
    );
};

export default AuthLayout;
