import mergeTW from '@/utils/mergeTW';
import { HTMLAttributes } from 'react';

interface Props extends HTMLAttributes<HTMLTextAreaElement> {
  className?: string;
  value?: string;
}

export const CommentTextarea = ({ className = '', ...props }: Props) => (
  <textarea
    {...props}
    className={`text-sm text-gray-400 border p-3 rounded-md border-gray-700 focus:border-gray-300 bg-transparent w-full outline-none h-32 duration-150 ${mergeTW(
      className
    )}`}
  />
);
