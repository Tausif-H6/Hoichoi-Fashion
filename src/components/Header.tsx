"use client"
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/20/solid';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen]= useState(false);
  return (
    <header className="bg-[#0f0f0f]">
      <nav className='mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8' aria-label='Global'>
        <div className="flex lg:flex-1 items-center">
          {/* logo part  */}
          <Link href="/" className='-m-1.5 p-1.5'>
            <span className='sr-only'>Hoichoi Fashion</span>
            <div className="rounded-full overflow-hidden">
              <Image
                className='h-12 w-12' 
                src="/hoichoi.jpg"
                alt='hoichoi'
                width="48"
                height="48"
              />
            </div>
          </Link>
        </div>
        <div className='flex lg:hidden'>
          <button 
          type='button'
          className='-m-2.5 inline-flex items-center justify-center rounded-md text-white'
          onClick={()=> setMobileMenuOpen(true)}
          >
            <span className='sr-only'> Open Main Menu</span>
            <Bars3Icon className='h-6 w-6' aria-hidden="true"/>
            
          </button>

        </div>
      </nav>
    </header>
  );
}
