// Setting up the header of application
"use client"

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect } from 'react'

function Header() {
    const path = usePathname();
    useEffect(() => {
        console.log(path);
    }, []);

    return (
        <div className='flex p-4 items-center justify-between bg-gradient-to-br from-blue-50 to-white shadow-sm'>
            {/* Logo on the left */}
            <Link href="/" className="text-2xl font-bold">
                FlashCardGPT
            </Link>

            {/* Right-aligned header Menu items */}
            <ul className='flex gap-6 ml-auto'>
                 <Link href={"/dashboard"}>
                    <li className={`hover:text-black hover:font-bold transition-all
                    cursor-pointer
                    ${path == '/dashboard' && 'text-black font-bold'}
                    `}
                    >Get Started</li>
                </Link>
                <Link href={"/dashboard"}>
                    <li className={`hover:text-black hover:font-bold transition-all
                    cursor-pointer
                    ${path == '/dashboard' && 'text-black font-bold'}
                    `}
                    >Dashboard</li>
                </Link>
                <Link href={"/dashboard/upgrade"}>
                    <li className={`hover:text-black hover:font-bold transition-all
                    cursor-pointer
                    ${path == '/dashboard/upgrade' && 'text-black font-bold'}
                    `}>Upgrade</li>
                </Link>
            </ul>

            
        </div>
    );
}

export default Header;