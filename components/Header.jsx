import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { FaBars, FaTimes } from 'react-icons/fa';
import { DarkModeToggle } from '.';

const NavLink = ({ href, children, onClick }) => {
    return (
        <li>
            <Link href={href} className='hover:text-gray-400' onClick={onClick}>
                {children}
            </Link>
        </li>
    );
};

const Header = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };
    return (
        <header className="bg-primary text-white dark:bg-gray-800 dark:text-white px-6 py-4">
            <div className="container mx-auto flex items-center justify-between">
                <div className="flex items-center hover:animate-pulse">
                    <Link href="/" >
                        <Image src="/robo.png" alt="Robo Pulse Logo" width={40} height={40} />
                    </Link>
                    <Link href="/">
                        <h1 className="text-xl ml-4 font-roboto">Robo Pulse</h1>
                    </Link>
                </div>
                <div className="hidden md:flex gap-8">
                    <nav>
                        <ul className="flex space-x-4">
                            <NavLink href="/">Home</NavLink>
                            <NavLink href="/news">Categories</NavLink>
                            <NavLink href="/about">About</NavLink>
                            <NavLink href="/contact">Contact</NavLink>
                        </ul>
                    </nav>
                    <DarkModeToggle />
                </div>
                <button
                    className="md:hidden focus:outline-none"
                    onClick={toggleMobileMenu}
                >
                    <FaBars className='text-xl' />
                </button>
            </div>
            {isMobileMenuOpen && (
                <div className="fixed top-0 left-0 w-full h-full z-20">
                    <div
                        className="fixed top-0 left-0 w-full h-full bg-black opacity-50"
                        onClick={toggleMobileMenu}
                    ></div>
                    <nav className={`fixed top-0 left-0 w-64 h-full bg-primary dark:bg-gray-800 text-white z-30 transform transition-transform duration-700 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                        <div className="flex items-center justify-end py-4 px-6">
                            <button
                                className="focus:outline-none"
                                onClick={toggleMobileMenu}
                            >
                                <FaTimes className="text-xl" />
                            </button>
                        </div>
                        <ul className="flex flex-col space-y-2 px-6 py-4">
                            <NavLink href="/" onClick={toggleMobileMenu}>
                                Home
                            </NavLink>
                            <NavLink href="/news" onClick={toggleMobileMenu}>
                                Categories
                            </NavLink>
                            <NavLink href="/about" onClick={toggleMobileMenu}>
                                About
                            </NavLink>
                            <NavLink href="/contact" onClick={toggleMobileMenu}>
                                Contact
                            </NavLink>
                        </ul>
                        <div className="px-6 mt-4">
                            <DarkModeToggle />
                        </div>
                    </nav>
                </div>
            )}
        </header>
    );
};

export default Header;
