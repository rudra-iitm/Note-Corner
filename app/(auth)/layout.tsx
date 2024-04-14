import { FC, ReactNode } from 'react';

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
  return(
      <div>
        <div>{children}</div>
      </div>
    );
};

export default AuthLayout;
