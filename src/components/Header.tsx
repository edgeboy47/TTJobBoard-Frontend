import React from 'react'
import * as motion from 'motion/react-client'
import { TT } from 'country-flag-icons/react/3x2'

const Header = () => {
  return (
    <header className="w-full bg-gray-50 rounded-md shadow flex justify-center">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className='flex flex-row p-6 max-w-5xl w-full gap-4 items-center'>
        <h1 className='text-5xl font-semibold'>TT Job Board  </h1>
        <TT className='w-12 h-12' />
      </motion.div>
    </header>
  );
};

export default Header;
