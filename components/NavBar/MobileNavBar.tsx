'use client'

import { useState } from 'react';
import Link from 'next/link';
import { NavData } from '@/types-db';
import { usePathname } from 'next/navigation';

interface MobileNavBarProps {
  navbarData: NavData[];
}

const MobileNavBar = ({ navbarData }: MobileNavBarProps) => {

  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex md:hidden absolute top-2 right-0 z-50 items-center">
      <div className='flex items-center'>
        <button onClick={toggleMenu} className="text-white text-xl p-4 focus:outline-none 
        hover:text-red-600 transition-all duration-300">
          {isOpen ? (
            <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
        {isOpen ? (
          <div className="absolute top-[72px] right-0 bg-opacity-75 bg-[#111212] backdrop-filter backdrop-blur-md p-4">
            <ul className="space-y-4">
              {navbarData.map((item, index) => (
                <li key={index}>
                  <Link href={item.href}>
                    <p className={`text-white font-medium 
                    ${pathname === item.href ? 'text-red-600' : ''}`}>
                      {item.name}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default MobileNavBar;