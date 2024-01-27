import React from 'react';

export default function Welcome() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center text-center">
      <p className="mt-4 px-2 text-xl font-semibold text-gray-800 dark:text-zinc-200 sm:text-2xl lg:text-3xl">
        No favorites yet!
      </p>
      <div className="mb-8 mt-4 text-base font-light sm:text-lg lg:mb-3 lg:text-xl">
        <p>
          Start curating your special moments by marking photos as favorites.
          <br />
          Tap the heart icon on any photo you want to appear here
        </p>
      </div>
    </div>
  );
}
