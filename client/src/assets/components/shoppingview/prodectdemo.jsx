import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchProductsDetails, selectProductDetails, selectIsLoading, selectError } from '@/store/shop/shopproduct';
import { FiShoppingCart } from 'react-icons/fi';
import { Star } from 'lucide-react';
import { Card, CardContent } from '../ui/Card';

const Productdemo = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const productDetails = useSelector(selectProductDetails);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  console.log(id)

  useEffect(() => {
    if (id) {
      dispatch(fetchProductsDetails({ id }));
    }
  }, [dispatch, id]);
  console.log(productDetails)

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!productDetails) {
    return <p>Product not found</p>;
  }

  const product = productDetails;
  console.log(product,"product")

  return (
    <Card className="bg-[#252525] text-white rounded-lg shadow-lg overflow-hidden">
      {/* Product Image Section */}
      <div className="relative">
        <img
          src={product[0
            
          ].image1}
          alt={product.productName}
          className="w-full h-96 object-cover"
        />
        {/* Discount Badge */}
        {product.discount && (
          <span className="absolute top-2 left-2 bg-purple-600 text-white text-xs font-semibold px-2 py-1 rounded-md">
            {`-${product.discount}%`}
          </span>
        )}
      </div>

      {/* Product Details */}
      <CardContent className="p-6 mt-2">
        <p className="text-sm text-white">{product.category}</p>
        <h3 className="text-2xl font-semibold text">{product.productName}</h3>

        {/* Pricing */}
        <div className="flex items-center space-x-2 mt-2">
          <span className="text-2xl font-bold text-purple-500">${product.price}</span>
          {product.oldPrice && (
            <span className="text-gray-400 line-through">${product.oldPrice}</span>
          )}
        </div>

        {/* Rating */}
        <div className="flex items-center space-x-1 text-yellow-400 mt-1">
          {[...Array(product.rating)].map((_, i) => (
            <Star key={i} className="w-5 h-5 fill-current" />
          ))}
          <span className="text-sm text-gray-400">({product.reviews})</span>
        </div>

        {/* Description */}
        <p className="text-gray-300 mt-4">{product.description}</p>

        {/* CTA Buttons */}
        <div className="flex justify-between items-center mt-4 gap-3">
          <button className="text-center border border-gray-600 text-white py-2 px-4 rounded-lg">
            Add to Wishlist
          </button>
          <button className="text-center bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg">
            Buy Now
          </button>
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

export default Productdemo;