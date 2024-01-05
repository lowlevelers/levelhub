import mergeTW from '@/utils/mergeTW';
import { HTMLAttributes } from 'react';

interface Props extends HTMLAttributes<HTMLTextAreaElement> {
  className?: string;
  value?: string;
  validate?: {};
  required?: boolean;
}

export default ({ className, validate, ...props }: Props) => (
  <textarea
    {...props}
    {...validate}
    className={mergeTW(
      `px-3 py-2 bg-slate-700/70 hover:bg-slate-700/40 focus:bg-slate-700/40 text-sm text-gray-300 placeholder-gray-500 outline-none border border-gray-800 focus:border-gray-600 shadow-sm rounded-lg duration-200 ${className}`
    )}></textarea>
);
