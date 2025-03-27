import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import ProductCard from "../common/ProductCard"; // Ensure this import points to the right file
import { featuredProducts } from "../../../config/index"; // Ensure this import points to the right file

function FeaturesSection() {
    return (
        <section className="section">
             <div className="container  mx-auto px-4">
             <h2 className="text-3xl font-bold mb-6 text-center text-white">Featured Products</h2>
             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
             {featuredProducts.map((product, index) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                        >
                            <ProductCard product={product} />
                        </motion.div>
                    ))}
             </div>
             <div><Link
      to="/shop/listing"
      className="block mx-auto mt-10 px-8 py-3 border-2 border-purple-600 font-semibold rounded transition duration-300 ease-in-out text-center max-w-xs hover:bg-primary  text-white hover:bg-purple-700 "
    >
     View All Products
    </Link></div>
             </div>
        </section>
    );
}

export default FeaturesSection;