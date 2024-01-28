import { IconGithub, IconGoogle } from '@/components/Icons';
import Button from '@/components/ui/Button/Button';
import mergeTW from '@/utils/mergeTW';
import { HTMLAttributes } from 'react';

interface ProviderType extends HTMLAttributes<HTMLButtonElement> {
  isLoad?: boolean;
  className?: string;
  onClick?: () => void;
}

export const GithubProvider = ({ isLoad, className, ...props }: ProviderType) => (
  <Button
    {...props}
    isLoad={isLoad}
    child={<IconGithub />}
    className={mergeTW(
      `text-sm font-medium mt-4 mx-auto flex text-white bg-slate-800 hover:bg-slate-600 active:bg-gray-100 ${className}`
    )}>
    Continue with Github
  </Button>
);

export const GoogleProvider = ({ isLoad, className, ...props }: ProviderType) => (
  <Button
    {...props}
    isLoad={isLoad}
    child={<IconGoogle />}
    className={mergeTW(
      `text-sm font-medium mt-2 mx-auto flex text-gray-400 border border-gray-700 bg-transparent hover:text-gray-800 hover:bg-gray-50 duration-200 ${className}`
    )}>
    Continue with Google
  </Button>
);
