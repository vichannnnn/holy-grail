import { ReactElement, ReactNode } from 'react';

interface SectionBoxProps {
  icon: ReactElement;
  title: string;
  children: ReactNode;
}

export const SectionBox = ({ icon, title, children }: SectionBoxProps) => {
  return (
    <>
      <h2 className='text-xl font-semibold mt-8 flex items-center '>
        {icon}
        {title}
      </h2>
      <div className='bg-[#F1F2EE] dark:bg-[#2d2d2d] p-6 rounded-lg space-y-4'>{children}</div>
    </>
  );
};
