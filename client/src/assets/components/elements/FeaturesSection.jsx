import React, { useEffect } from 'react';
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import ProductCard from "../common/ProductCard"; // Ensure this import points to the right file
import { fetchLimitedProducts, selectProducts, selectIsLoading, selectError } from '../../../store/shop/shopproduct'; // Ensure this import points to the right file

function FeaturesSection({ userId }) {
    const dispatch = useDispatch();
    const products = useSelector(selectProducts);
    const isLoading = useSelector(selectIsLoading);
    const error = useSelector(selectError);

    useEffect(() => {
        // Fetch limited products
        dispatch(fetchLimitedProducts({ filterParams: {}, sortParams: "price-lowtohigh", limit: 5 }));
    }, [dispatch]);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <section className="section">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold mb-6 text-center text-white">Featured Products</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {products.map((product, index) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                        >
                            <ProductCard product={product} userId={userId} />
                        </motion.div>
                    ))}
                </div>
                <div>
                    <Link
                        to="/shop/listing"
                        className="block mx-auto mt-10 px-8 py-3 border-2 border-purple-600 font-semibold rounded transition duration-300 ease-in-out text-center max-w-xs hover:bg-primary text-white hover:bg-purple-700"
                    >
                        View All Products
                    </Link>
                </div>
            </div>
        </section>
    );
}

export default FeaturesSection;