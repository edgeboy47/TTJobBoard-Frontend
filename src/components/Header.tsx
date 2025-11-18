import React from 'react'
import { TT } from 'country-flag-icons/react/3x2'

const Header = () => {
  return (
    <header className="w-full bg-gray-50 rounded-md shadow flex justify-center">
      <div className='flex flex-row p-6 max-w-5xl w-full gap-4 items-center'>
        <h1 className='text-5xl font-semibold'>TT Job Board  </h1>
        <TT className='w-12 h-12' />
      </div>
    </header>
  );
};

export default Header;
