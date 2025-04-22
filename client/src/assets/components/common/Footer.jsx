import React from 'react';
import { Link } from 'react-router-dom';
import { FiFacebook, FiTwitter, FiInstagram, FiYoutube } from 'react-icons/fi';

const Footer = () => {
    return (
        <footer className="bg-card  text-white bg-[#25252] mt-5">
            <div className="container mx-auto text-center">
                <div className="grid grid-cols-2 gap-10 md:grid-cols-4 lg:grid-cols-4 mb-16 p-5">
                    <div>
                        <div className="text-2xl font-extrabold mb-5 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">ERIS</div>
                        <span className="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent text-4xl font-bold  ">Eris</span>
                        <div className="flex gap-4 mt-5 items-center justify-center">
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center text-text border-2 border-white shadow-[0px_0px_15px_5px_rgba(128,0,128,0.5)] transition-all duration-300 ease-in-out hover:bg-primary hover:bg-[#252525] transform hover:-translate-y-0.5">
                                <FiFacebook />
                            </a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center text-text border-2 border-white shadow-[0px_0px_15px_5px_rgba(128,0,128,0.5)] transition-all duration-300 ease-in-out hover:bg-primary hover:bg-[#252525] transform hover:-translate-y-0.5">
                                <FiTwitter />
                            </a>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center text-text border-2 border-white shadow-[0px_0px_15px_5px_rgba(128,0,128,0.5)] transition-all duration-300 ease-in-out hover:bg-primary hover:bg-[#252525] transform hover:-translate-y-0.5">
                                <FiInstagram />
                            </a>
                            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center text-text border-2 border-white shadow-[0px_0px_15px_5px_rgba(128,0,128,0.5)] transition-all duration-300 ease-in-out hover:bg-primary hover:bg-[#252525] transform hover:-translate-y-0.5">
                                <FiYoutube />
                            </a>
                        </div>
                    </div>


                    <div>
                        <h3 className="text-xl font-semibold mb-5 hover:text-purple-400">Products</h3>
                        <div className="flex flex-col gap-2">
                            <Link to="/products/earphones" className="text-text opacity-80 transition-colors duration-300 ease-in-out hover:text-primary hover:text-purple-400">Earphones</Link>
                            <Link to="/products/headphones" className="text-text opacity-80 transition-colors duration-300 ease-in-out hover:text-primary hover:text-purple-400">Headphones</Link>
                            <Link to="/products/speakers" className="text-text opacity-80 transition-colors duration-300 ease-in-out hover:text-primary hover:text-purple-400">Speakers</Link>
                            <Link to="/products/watches" className="text-text opacity-80 transition-colors duration-300 ease-in-out hover:text-primary hover:text-purple-400">Smart Watches</Link>
                            <Link to="/products/accessories" className="text-text opacity-80 transition-colors duration-300 ease-in-out hover:text-primary hover:text-purple-400">Accessories</Link>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-xl font-semibold mb-5 hover:text-purple-400">Support</h3>
                        <div className="flex flex-col gap-2">
                            <Link to="/support/faq" className="text-text opacity-80 transition-colors duration-300 ease-in-out hover:text-primary hover:text-purple-400">FAQs</Link>
                            <Link to="/support/warranty" className="text-text opacity-80 transition-colors duration-300 ease-in-out hover:text-primary hover:text-purple-400">Warranty</Link>
                            <Link to="/support/track-order" className="text-text opacity-80 transition-colors duration-300 ease-in-out hover:text-primary hover:text-purple-400">Track Order</Link>
                            <Link to="/support/shipping" className="text-text opacity-80 transition-colors duration-300 ease-in-out hover:text-primary hover:text-purple-400">Shipping</Link>
                            <Link to="/support/returns" className="text-text opacity-80 transition-colors duration-300 ease-in-out hover:text-primary hover:text-purple-400">Returns</Link>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-xl font-semibold mb-5 hover:text-purple-400">Company</h3>
                        <div className="flex flex-col gap-2">
                            <Link to="/about" className="text-text opacity-80 transition-colors duration-300 ease-in-out  hover:text-purple-400">About Us</Link>
                            <Link to="/contact" className="text-text opacity-80 transition-colors duration-300 ease-in-out  hover:text-purple-400">Contact Us</Link>
                            <Link to="/careers" className="text-text opacity-80 transition-colors duration-300 ease-in-out  hover:text-purple-400">Careers</Link>
                            <Link to="/press" className="text-text opacity-80 transition-colors duration-300 ease-in-out  hover:text-purple-400">Press</Link>
                            <Link to="/blog" className="text-text opacity-80 transition-colors duration-300 ease-in-out  hover:text-purple-400">Blog</Link>
                        </div>
                    </div>
                </div>

                <div className="flex justify-between items-center pt-5 border-t border-border flex-col gap-5 text-center md:gap-0 md:flex-row">
                    <p className="text-text opacity-70 text-sm">&copy; {new Date().getFullYear()} Eris. All rights reserved.</p>
                    <div className="flex gap-5 flex-col sm:flex-row">
                        <Link to="/privacy" className="text-text opacity-70 text-sm transition-colors duration-300 ease-in-out hover:text-primary">Privacy Policy</Link>
                        <Link to="/terms" className="text-text opacity-70 text-sm transition-colors duration-300 ease-in-out hover:text-primary">Terms of Service</Link>
                        <Link to="/sitemap" className="text-text opacity-70 text-sm transition-colors duration-300 ease-in-out hover:text-primary">Sitemap</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;