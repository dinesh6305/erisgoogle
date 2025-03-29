import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import CarouselSlider from "@/assets/components/elements/CarouselSlider";
import { categories } from "../../../config/index";
import FeaturesSection from "@/assets/components/elements/FeaturesSection";
import Fotter from "@/assets/components/common/Footer";
import Footer from "@/assets/components/common/Footer";

function ShoppingHome() {
    return (
        <div className="bg-black">
            <CarouselSlider />
            <section className="py-8">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold mb-6 text-center text-white">Shop By Category</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 lg:ml-[30%]">
                        {categories.map((category, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="relative bg-white shadow-md rounded-lg overflow-hidden transform transition-transform duration-300 h-52"
                            >
                                <Link to={`/products/${category.slug}`} className="block w-full h-full">
                                    <img
                                        src={category.image}
                                        alt={category.name}
                                        className="w-full h-full object-cover transition-transform duration-500 transform hover:scale-110"
                                    />
                                    <div className="absolute bottom-5 left-5 z-10 text-white text-xl font-semibold">
                                        {category.name}
                                    </div>
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-center justify-center opacity-0 transition-opacity duration-300 hover:opacity-100">
                                        <span className="text-white bg-purple-500 px-5 py-2 rounded-md font-semibold">
                                            View All
                                        </span>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
            <FeaturesSection />
            <section className="text-center">
                <div className=" bg-[#252525]  mt-3 rounded-2xl p-6 text-center">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 items-center justify-center">
                        <motion.div
                            className="p-8 text-center rounded-lg transition-transform duration-300 ease-in-out"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            viewport={{ once: true }}
                            whileHover={{ translateY: -5 }}
                        >
                            <div className="text-5xl mb-4">🚚</div>
                            <h3 className="text-xl font-semibold mb-2 text-white">Free Shipping</h3>
                            <p className="text-white">On all orders above $50</p>
                        </motion.div>
                        <motion.div
                            className="p-8 text-center rounded-lg transition-transform duration-300 ease-in-out"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            viewport={{ once: true }}
                            whileHover={{ translateY: -5 }}
                        >
                            <div className="text-5xl mb-4">🔄</div>
                            <h3 className="text-xl font-semibold mb-2 text-white">Easy Returns</h3>
                            <p className="text-white">30-day return policy</p>
                        </motion.div>
                        <motion.div
                            className="p-8 text-center rounded-lg transition-transform duration-300 ease-in-out"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            viewport={{ once: true }}
                            whileHover={{ translateY: -5 }}
                        >
                            <div className="text-5xl mb-4">🔒</div>
                            <h3 className="text-xl font-semibold mb-2 text-white">Secure Checkout</h3>
                            <p className="text-white">100% protected payments</p>
                        </motion.div>
                        <motion.div
                            className="p-8 text-center rounded-lg transition-transform duration-300 ease-in-out"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            viewport={{ once: true }}
                            whileHover={{ translateY: -5 }}
                        >
                            <div className="text-5xl mb-4">🎧</div>
                            <h3 className="text-xl font-semibold mb-2 text-white">Premium Quality</h3>
                            <p className="text-white">2-year warranty on all products</p>
                        </motion.div>
                    </div>
                </div>
            </section>
            <Footer/>


        </div>
    );
}

export default ShoppingHome;