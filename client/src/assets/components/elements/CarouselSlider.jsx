import React from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import { Link } from 'react-router-dom';
// import "../elements/CarouselSlider.css" // Import the custom CSS file

const CarouselSlider = () => {
  return (
    <section className="h-screen min-h-[300px]">
      <Swiper
        modules={[Pagination, Autoplay, EffectFade]}
        effect="fade"
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000 }}
        loop
        className="h-full"
      >
        <SwiperSlide className="slide-right">
          <div
            className="h-full flex items-center justify-center text-center bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80')"
            }}
          >
            <div className="container mx-auto px-4">
              <motion.div
                className="max-w-xl mx-auto text-white"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h1 className="text-3xl md:text-5xl font-bold mb-5">Experience Sound Like Never Before</h1>
                <p className="text-base md:text-lg mb-8">Immerse yourself in crystal clear audio with our premium headphones</p>
                <Link to="/shop/headphones" className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-md transition-transform transform hover:bg-blue-700 hover:translate-y-[-3px]">Shop Now</Link>
              </motion.div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className="slide-right">
          <div
            className="h-full flex items-center justify-center text-center bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80')"
            }}
          >
            <div className="container mx-auto px-4">
              <motion.div
                className="max-w-xl mx-auto text-white"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h1 className="text-3xl md:text-5xl font-bold mb-5">Wireless Freedom</h1>
                <p className="text-base md:text-lg mb-8">Cut the cord with our latest true wireless earbuds</p>
                <Link to="/shop/earbuds" className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-md transition-transform transform hover:bg-blue-700 hover:translate-y-[-3px]">Explore Now</Link>
              </motion.div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className="slide-right">
          <div
            className="h-full flex items-center justify-center text-center bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1545454675-3531b543be5d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80')"
            }}
          >
            <div className="container mx-auto px-4">
              <motion.div
                className="max-w-xl mx-auto text-white"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h1 className="text-3xl md:text-5xl font-bold mb-5">Party Anywhere</h1>
                <p className="text-base md:text-lg mb-8">Powerful portable speakers for your next adventure</p>
                <Link to="/products/speakers" className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-md transition-transform transform hover:bg-blue-700 hover:translate-y-[-3px]">Discover More</Link>
              </motion.div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </section>
  );
};

export default CarouselSlider;