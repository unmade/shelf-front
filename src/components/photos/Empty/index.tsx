import type React from 'react';

interface Props {
  title: string;
  description: string | React.ReactElement;
}

export default function Empty({ title, description }: Props) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center text-center">
      <p className="mt-4 px-2 text-xl font-semibold text-gray-800 sm:text-2xl lg:text-3xl dark:text-zinc-200">
        {title}
      </p>
      <div className="mt-4 mb-8 max-w-2xl px-10 text-base font-light sm:text-lg md:px-0 lg:mb-3 lg:text-xl">
        {description}
      </div>
    </div>
  );
}
