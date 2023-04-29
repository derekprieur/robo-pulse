import React from 'react';

const About = () => {
    return (
        <div className="bg-background dark:bg-gray-900 min-h-screen">
            <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8">
                <h1 className="text-primary dark:text-white text-3xl font-semibold mb-8">About Us</h1>
                <div className="rounded-lg overflow-hidden shadow-md bg-white dark:bg-gray-800 p-4 md:p-6 lg:p-8">
                    <p className="text-secondary dark:text-white mb-4">
                        Welcome to our news platform! Our mission is to provide you with the latest and most relevant news in robotics, artificial intelligence, machine learning, and automation.
                    </p>
                    <p className="text-secondary dark:text-white mb-4">
                        We believe that staying informed about these cutting-edge technologies is crucial to understanding the world we live in and shaping our future.
                    </p>
                    <p className="text-secondary dark:text-white mb-4">
                        Our platform aggregates top headlines from various sources, allowing you to stay up-to-date with ease. In addition, we offer personalized features such as favoriting articles and filtering news based on your preferences.
                    </p>
                    <p className="text-secondary dark:text-white">
                        Thank you for choosing our platform for your news consumption. We hope you find it informative and enjoyable.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default About;
