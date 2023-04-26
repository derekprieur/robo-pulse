import React from 'react';
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';

const SocialLink = ({ href, ariaLabel, children }) => {
    return (
        <a href={href} target="_blank" rel="noopener noreferrer" aria-label={ariaLabel}>
            {children}
        </a>
    );
};

const Footer = () => {
    return (
        <footer className="bg-primary text-white dark:bg-gray-800 dark:text-white px-6 py-4">
            <div className="container mx-auto px-4">
                <div className="flex flex-wrap justify-between gap-2 items-center">
                    <div>
                        <p>&copy; {new Date().getFullYear()} Robo Pulse. All rights reserved.</p>
                    </div>
                    <div className="flex space-x-4">
                        <SocialLink
                            href="https://www.facebook.com"
                            ariaLabel="Facebook"
                        >
                            <FaFacebook size={24} />
                        </SocialLink>
                        <SocialLink
                            href="https://www.twitter.com"
                            ariaLabel="Twitter"
                        >
                            <FaTwitter size={24} />
                        </SocialLink>
                        <SocialLink
                            href="https://www.linkedin.com"
                            ariaLabel="LinkedIn"
                        >
                            <FaLinkedin size={24} />
                        </SocialLink>
                        <SocialLink
                            href="https://www.instagram.com"
                            ariaLabel="Instagram"
                        >
                            <FaInstagram size={24} />
                        </SocialLink>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
