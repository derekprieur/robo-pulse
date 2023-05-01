import React, { useState } from 'react';
import { toast } from 'react-hot-toast';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('https://formspree.io/f/xnqywabw', {
            method: 'POST', headers: { 'Content-Type': 'application/json', }, body: JSON.stringify(formData),
        });

        if (response.ok) {
            toast.success('Message sent successfully!', {
                duration: 5000,
            });
            setFormData({
                name: '',
                email: '',
                message: '',
            });
        } else {
            toast.error('An error occurred. Please try again.', {
                duration: 5000,
            });
        }
    };
    return (
        <div className="bg-background dark:bg-gray-900 min-h-screen">
            <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8 max-w-4xl">
                <h1 className="text-primary dark:text-white text-3xl font-semibold mb-8">Contact Us</h1>
                <div className="rounded-lg overflow-hidden shadow-md bg-white dark:bg-gray-800 p-4 md:p-6 lg:p-8">
                    <p className="text-secondary dark:text-white mb-4">
                        If you have any questions, comments, or suggestions, please feel free to reach out to us using the form below.
                    </p>
                    <p className="text-secondary dark:text-white mb-4">
                        We'd love to hear from you!
                    </p>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-secondary dark:text-white text-sm font-bold mb-2" htmlFor="name">
                                Name
                            </label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-secondary dark:text-white leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="Your Name" name="name" value={formData.name} onChange={handleChange} />
                        </div>
                        <div className="mb-4">
                            <label className="block text-secondary dark:text-white text-sm font-bold mb-2" htmlFor="email">
                                Email
                            </label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-secondary dark:text-white leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="Your Email" name="email" value={formData.email} onChange={handleChange} />
                        </div>
                        <div className="mb-4">
                            <label className="block text-secondary dark:text-white text-sm font-bold mb-2" htmlFor="message">
                                Message
                            </label>
                            <textarea className="shadow appearance-none border rounded w-full py-2 px-3 text-secondary dark:text-white h-32 leading-tight focus:outline-none focus:shadow-outline" id="message" placeholder="Your Message" name="message" value={formData.message} onChange={handleChange}
                            ></textarea>
                        </div>
                        <div className="flex items-center justify-between">
                            <button className="bg-primary dark:bg-gray-200 hover:bg-primary/80 dark:hover:bg-gray-400 text-white dark:text-gray-900 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-300" type="submit">
                                Send
                            </button>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    );
};

export default Contact;
