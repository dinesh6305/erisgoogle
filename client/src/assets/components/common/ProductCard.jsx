import React from "react";
import { Link } from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi";
import { Star } from "lucide-react";
import { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from "../ui/Card";

const ProductCard = ({ product }) => {
  return (
    <Card className="bg-[#252525] text-white rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105">
      {/* Product Image Section */}
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-56 object-cover"
        />
        {/* Discount Badge */}
        {product.discount && (
          <span className="absolute top-2 left-2 bg-purple-600 text-white text-xs font-semibold px-2 py-1 rounded-md">
            {`-${product.discount}%`}
          </span>
        )}
      </div>

      {/* Product Details */}
      <CardContent className="p-4 mt-2">
        <p className="text-sm text-gray-400">{product.category}</p>
        <h3 className="text-xl font-semibold">{product.name}</h3>

        {/* Pricing */}
        <div className="flex items-center space-x-2 mt-2">
          <span className="text-lg font-bold text-purple-500">${product.price}</span>
          {product.oldPrice && (
            <span className="text-gray-400 line-through">${product.oldPrice}</span>
          )}
        </div>

        {/* Rating */}
        <div className="flex items-center space-x-1 text-yellow-400 mt-1">
          {[...Array(product.rating)].map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-current" />
          ))}
          <span className="text-sm text-gray-400">({product.reviews})</span>
        </div>

        {/* CTA Buttons */}
        <div className="flex justify-between items-center mt-4 gap-3">
          <Link to={`/product/${product.id}`} className="w-[70%] text-center border border-gray-600 text-white py-2 rounded-lg">
            View Details
          </Link>
          <Link to={`/checkout/${product.id}`} className="w-[34%] text-center bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg">
            Buy Now
          </Link>
        </div>

        {/* Add to Cart */}
        <button className="w-full bg-purple-700 hover:bg-purple-800 text-white flex items-center justify-center mt-3 py-3">
          <FiShoppingCart className="mr-2" />
          Add to Cart
        </button>
      </CardContent>
    </Card>
  );
};

export default ProductCard;