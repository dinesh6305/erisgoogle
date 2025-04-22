import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../../store/shop/cart-slice';
import { Link } from 'react-router-dom';
import { FiShoppingCart } from 'react-icons/fi';
import { Star } from 'lucide-react';
import { Card, CardContent } from '../ui/Card';
import { toast } from 'react-hot-toast'; // Importing react-hot-toast

const ProductCard = ({ product, userId, handleGetproductdetails }) => {
  const dispatch = useDispatch();
  const [addStatus, setAddStatus] = useState('default'); // 'default', 'adding', 'added'

  const handleAddToCart = async () => {
    if (!userId) {
      // Show toast notification if user is not logged in
      toast.error('User is not authenticated. Please login to add items to the cart.', {
        position: 'top-right',
        duration: 3000,
        style: {
          background: "#9333EA", // Purple background
          color: '#ffffff', // White text
          border: '1px solid #DDD', // Optional border
          padding: '16px', // Add some padding
          borderRadius: '8px', // Rounded corners
        },
      });
      return;
    }

    // Log the product object to verify its structure
    console.log('Product:', product);

    const productId = product._id;
    const quantity = 1; // Default quantity to add

    // Ensure productId is defined
    if (!productId) {
      console.error('Product ID is undefined!');
      return;
    }

    // Set status to 'adding'
    setAddStatus('adding');

    console.log('Adding to cart:', {
      userId,
      productId,
      quantity,
    });

    try {
      const response = await dispatch(addToCart({ userId, productId, quantity })).unwrap();
      console.log('Add to Cart Response:', response);
      // Set status to 'added'
      setAddStatus('added');

      // Reset status after 2 seconds
      setTimeout(() => {
        setAddStatus('default');
      }, 2000);
    } catch (error) {
      console.error('Add to Cart Error:', error);
      // Reset status on error
      setAddStatus('default');
    }
  };

  const handleBuyNow = () => {
    if (!userId) {
      // Show toast notification if user is not logged in
      toast.error('User is not authenticated. Please login to proceed with the purchase.', {
        position: 'top-right',
        duration: 3000,
        style: {
          background: "#9333EA", // Purple background
          color: '#ffffff', // White text
          border: '1px solid #DDD', // Optional border
          padding: '16px', // Add some padding
          borderRadius: '8px', // Rounded corners
        },
      });
      return;
    }

    // Redirect to checkout page
    console.log(`Navigating to checkout for product ID ${product._id}`);
  };

  // Determine button text based on status
  const getButtonText = () => {
    switch (addStatus) {
      case 'adding':
        return 'Adding...';
      case 'added':
        return 'Added to Cart';
      default:
        return 'Add to Cart';
    }
  };

  return (
    <Card className="bg-[#252525] text-white rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105">
      <div className="relative">
        <img src={product.image1} alt={product.name} className="w-full h-56 object-cover" />
        {product.discount && (
          <span className="absolute top-2 left-2 bg-purple-600 text-white text-xs font-semibold px-2 py-1 rounded-md">
            {`-${product.discount}%`}
          </span>
        )}
      </div>
      <CardContent className="p-4 mt-2">
        <p className="text-sm text-gray-400">{product.category}</p>
        <h3 className="text-xl font-semibold">{product.productName}</h3>
        <div className="flex items-center space-x-2 mt-2">
          <div className='flex justify-between w-full'>
            <span className="text-lg font-bold text-purple-500 line-through">${product.price}</span>
            <span className="text-purple-500 text-lg font-bold">${product.salePrice}</span>
          </div>
        </div>
        <div className="flex items-center space-x-1 text-yellow-400 mt-1">
          {/* Static Stars */}
          {[1, 2, 3, 4, 5].map((star) => (
            <Star key={star} className="w-4 h-4 fill-current" />
          ))}
          <span className="text-sm text-gray-400">({product.reviews})</span>
        </div>
        <div className="flex justify-between items-center mt-4 gap-3">
          <Link to={`/product/${product._id}`} className="w-[70%] text-center border border-gray-600 text-white py-2 rounded-lg">
            View Details
          </Link>
          <button
            onClick={handleBuyNow}
            className="w-[34%] text-center bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg"
          >
            Buy Now
          </button>
        </div>
        <button
          onClick={handleAddToCart}
          disabled={addStatus === 'adding'}
          className={`w-full ${
            addStatus === 'added' 
              ? 'bg-green-600 hover:bg-green-700' 
              : 'bg-purple-700 hover:bg-purple-800'
          } text-white flex items-center justify-center mt-3 py-3 transition-colors duration-300`}
        >
          <FiShoppingCart className="mr-2" />
          {getButtonText()}
        </button>
      </CardContent>
    </Card>
  );
};

export default ProductCard;