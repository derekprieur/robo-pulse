import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { signInWithPopup, signOut as firebaseSignOut, onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/router';

import { setUser } from '../redux/userSlice';
import { auth, provider } from '../firebaseConfig';
import { FaBars, FaTimes } from 'react-icons/fa';
import { DarkModeToggle } from '.';

const NavLink = ({ href, children, onClick }) => {
    const router = useRouter();
    const isActive = router.pathname === href;

    return (
        <li>
            <Link href={href} className={`${isActive && 'underline underline-offset-4 decoration-2 decoration-gray-400'} hover:text-gray-400`} onClick={onClick}>
                {children}
            </Link>
        </li>
    );
};

const Header = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.currentUser);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const signInWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            const { displayName, email, photoURL } = result.user;
            dispatch(setUser({ displayName, email, photoURL }));
            setIsMobileMenuOpen(false);
        } catch (error) {
            console.error('Error signing in:', error);
        }
    };

    const signOut = async () => {
        try {
            await firebaseSignOut(auth);
            dispatch(setUser(null));
            setIsMobileMenuOpen(false);
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                const { displayName, email, photoURL } = user;
                dispatch(setUser({ displayName, email, photoURL }));
            } else {
                dispatch(setUser(null));
            }
        });

        return () => {
            unsubscribe();
        };
    }, [dispatch]);

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
                <div className="hidden md:flex gap-8 items-center">
                    <nav>
                        <ul className="flex space-x-4 items-center">
                            <NavLink href="/">Home</NavLink>
                            <NavLink href="/categories">Categories</NavLink>
                            <NavLink href="/about">About</NavLink>
                            <NavLink href="/contact">Contact</NavLink>
                        </ul>
                    </nav>
                    <DarkModeToggle />
                    {user ? (
                        <>
                            <Link href="/profile">
                                <Image
                                    src={user.photoURL || '/default-avatar.png'}
                                    alt="User avatar"
                                    className="rounded-full cursor-pointer"
                                    width={32}
                                    height={32}
                                />
                            </Link>
                            <button onClick={signOut} className="text-sm ml-2">Sign Out</button>
                        </>
                    ) : (
                        <button onClick={signInWithGoogle} className="text-sm">Sign In</button>
                    )}
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
                            <NavLink href="/categories" onClick={toggleMobileMenu}>
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
                        <div className='px-6 mt-4'>
                            {user ? (
                                <>
                                    <Link href="/profile">
                                        <Image
                                            src={user.photoURL || '/default-avatar.png'}
                                            alt="User avatar"
                                            className="rounded-full cursor-pointer mb-2"
                                            width={32}
                                            height={32}
                                        />
                                    </Link>
                                    <button onClick={signOut} className="text-sm">Sign Out</button>
                                </>
                            ) : (
                                <button onClick={signInWithGoogle} className="text-sm">Sign In</button>
                            )}
                        </div>
                    </nav>
                </div>
            )}
        </header>
    );
};

export default Header;
