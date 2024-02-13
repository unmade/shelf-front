import React from 'react';

interface Props {
  title: string;
  description: string | React.ReactElement;
}

export default function Empty({ title, description }: Props) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center text-center">
      <p className="mt-4 px-2 text-xl font-semibold text-gray-800 dark:text-zinc-200 sm:text-2xl lg:text-3xl">
        {title}
      </p>
      <div className="mb-8 mt-4 max-w-2xl px-10 text-base font-light sm:text-lg md:px-0 lg:mb-3 lg:text-xl">
        {description}
      </div>
    </div>
  );
}
