'use client'

import { NavData } from '@/types-db';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavBarProps {
  navbarData: NavData[];
}

const NavBar = ({ navbarData }: NavBarProps) => {

  const pathname = usePathname ();

  return (
    <nav className="bg-[#1b263b] py-4 h-20 flex items-center">
      <div className="container mx-auto flex justify-between items-center">
        <div className='flex flex-row items-center gap-2 ml-4 md:ml-0'>
          <Link href="/">
            <p className="text-white text-xl md:text-3xl font-bold uppercase hover:text-red-600 
            transition-all duration-300 ease-in-out">
              Oxytech Records
            </p>
          </Link>
            {/* <Image 
              src='/images/logo-sound.png'
              alt='logo-sound'
              width={40}
              height={40}
              className='object-cover'
            /> */}
        </div>

        <div className=' items-center gap-x-6 hidden md:flex'>
          <ul className="flex space-x-6 uppercase">
            {navbarData.map((item, index) => (
              <li key={index}>
                <Link href={item.href}>
                  <p 
                    className={`text-red-500 font-medium relative hover:text-red-400
                    ${pathname === item.href ? 'border-b-2 border-purple-700' : ''}`}
                  >
                    {item.name}
                  </p>
                </Link>
              </li>
            ))}
          </ul>          
          <div>
            <Link href="/send-demo">
              <p className="bg-red-500 hover:bg-red-600 text-gray-200 font-bold py-2 px-4 rounded
              transition-all duration-300">
                Send Demo
              </p>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;