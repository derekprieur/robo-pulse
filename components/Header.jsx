import React, { useState } from 'react';
import Link from 'next/link';
import { TbRobot, TbRobotOff } from 'react-icons/tb';

const NavLink = ({ href, children }) => {
    return (
        <li>
            <Link href={href} className="text-[#626a6c]">
                {children}
            </Link>
        </li>
    );
};

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <header className="absolute top-0 left-0 right-0 bg-[#fdfdfd] py-2 px-6 w-full md:w-[90%] md:mx-auto z-50">
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <img src="robo.png" alt="Robo Pulse Logo" className="h-10 w-10 mr-2" />
                    <h1 className="text-[#121611] font-bold text-xl">Robo Pulse</h1>
                </div>
                <nav className="hidden md:block">
                    <ul className="flex items-center space-x-4">
                        <NavLink href="/">Home</NavLink>
                        <NavLink href="/features">Features</NavLink>
                        <NavLink href="/pricing">Pricing</NavLink>
                        <NavLink href="/contact">Contact</NavLink>
                    </ul>
                </nav>
                {!menuOpen ?
                    <TbRobot className='text-2xl md:hidden text-black cursor-pointer' onClick={toggleMenu} />
                    : <TbRobotOff className='text-2xl md:hidden text-black cursor-pointer' onClick={toggleMenu} />
                }
            </div>
            <nav
                className={`${menuOpen ? 'block' : 'hidden'
                    } md:hidden mt-4 absolute top-16 left-0 w-full bg-primary z-10 transition-all duration-300 ease-in-out`}
            >
                <div className="bg-gray-800 rounded-lg shadow-md py-6 px-8">
                    <ul className="flex flex-col items-start space-y-2">
                        <NavLink href="/">Home</NavLink>
                        <NavLink href="/features">Features</NavLink>
                        <NavLink href="/pricing">Pricing</NavLink>
                        <NavLink href="/contact">Contact</NavLink>
                    </ul>
                </div>
            </nav>
        </header>
    );

};

export default Header;
