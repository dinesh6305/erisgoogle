import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShoppingCart, ChevronLeft, Star, Sparkles } from 'lucide-react';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import { fetchProductsDetails, resetProductDetails, selectProductDetails, selectIsLoading, selectError } from '@/store/shop/shopproduct';
import { useSelector, useDispatch } from 'react-redux';
import Shoppingheader from "../../components/shoppingview/header";
import { addToCart } from '../../../store/shop/cart-slice';
import { toast } from 'react-hot-toast'; // Using react-hot-toast instead of react-toastify

const ProductDetail = ({ userId }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(0);
  const [addStatus, setAddStatus] = useState('default'); // 'default', 'adding', 'added'
  const productDetails = useSelector(selectProductDetails);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    if (id) {
      dispatch(fetchProductsDetails({ id }));
    }

    return () => {
      dispatch(resetProductDetails());
    };
  }, [dispatch, id]);

  const handleAddToCart = async () => {
    console.log("UserId:", userId); // Debugging userId value
    if (!userId) { // Check if userId is undefined or null
      // Show toast notification if user is not logged in
      toast.error('User is not authenticated. Please login to add items to the cart.', {
        position: 'top-right',
        duration: 3000,
        style: {
          background: "#9333EA",
          color: '#ffffff',
          border: '1px solid #DDD',
          padding: '16px',
          borderRadius: '8px',
        },
      });
      return;
    }
  
    if (!productDetails) {
      console.error('Product details are not available!');
      return;
    }
  
    const productId = productDetails._id;
    const quantity = 1; // Default quantity to add
  
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
  
      // Show success toast
      toast.success('Item Add to cart!', {
        position: 'top-right',
        duration: 3000,
        style: {
          background: "#9333EA",
          color: '#ffffff',
          border: '1px solid #DDD',
          padding: '16px',
          borderRadius: '8px',
        },
      });
  
      // Reset status after 2 seconds
      setTimeout(() => {
        setAddStatus('default');
      }, 2000);
    } catch (error) {
      console.error('Add to Cart Error:', error);
      setAddStatus('default');
      // Show error toast
      toast.error('Failed to add item to cart. Please try again.');
    }
  };

  const handleBuyNow = () => {
    console.log("UserId:", userId); // Debugging userId value
    if (!userId) { // Check if userId is undefined or null
      // Show toast notification if user is not logged in
      toast.error('User is not authenticated. Please login to proceed with the purchase.', {
        position: 'top-right',
        duration: 3000,
        style: {
          background: "#9333EA",
          color: '#ffffff',
          border: '1px solid #DDD',
          padding: '16px',
          borderRadius: '8px',
        },
      });
      return;
    }

    if (!productDetails) {
      console.error('Product details are not available!');
      return;
    }

    const productId = productDetails._id;

    if (!productId) {
      console.error('Product ID is undefined!');
      return;
    }

    // Navigate to checkout page or handle purchase logic
    navigate(`/checkout?productId=${productId}`);
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

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!productDetails) {
    return <p>Product not found</p>;
  }

  // Only include images that actually exist (not null, undefined, or empty)
  const productImages = [];
  if (productDetails.image1) productImages.push(productDetails.image1);
  if (productDetails.image2) productImages.push(productDetails.image2);
  if (productDetails.image3) productImages.push(productDetails.image3);
  if (productDetails.image4) productImages.push(productDetails.image4);

  return (
    <div className="page-transition pt-28 pb-20 bg-black">
      <Shoppingheader />

      <div className="container mx-auto p-4 pt-6 pb-6 md:p-5">
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center text-white hover:text-purple-600 mb-8 transition-colors"
        >
          <ChevronLeft className="h-5 w-5 mr-1" />
          Back to Products
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <div 
              className="rounded-2xl overflow-hidden bg-gray-900 p-4 shadow-md border border-gray-100 mb-4"
            >
              <Zoom overlayBgColorEnd="rgba(55, 65, 81, 0.9)">
                <img 
                  src={productImages.length > 0 ? productImages[selectedImage] : ''} 
                  alt={productDetails.productName} 
                  className="w-full h-[300px] sm:h-[400px] object-contain"
                />
              </Zoom>
            </div>
            
            {/* Only display thumbnails if there is more than one image */}
            {productImages.length > 1 && (
              <div className="flex gap-2 mt-4 justify-center">
                {productImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`rounded-lg overflow-hidden transition-all h-12 w-12 sm:h-16 sm:w-16 ${
                      selectedImage === idx 
                        ? 'ring-2 ring-purple-600 ring-offset-2' 
                        : 'opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="bg-gray-900 p-5 rounded-2xl shadow-md border lg:h-[300px]">
            <div>
              <div 
                className="inline-flex items-center bg-purple-100 text-purple-700 rounded-full px-3 py-1 text-xs font-medium mb-2"
              >
                <Sparkles className="h-3.5 w-3.5 mr-1" />
                {productDetails.category}
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mt-1">{productDetails.productName}</h1>
              
              <div className="flex items-center mt-2">
                <div className="flex text-yellow-400">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <span className="ml-2 text-sm text-gray-500">124 reviews</span>
              </div>
            </div>

            <p 
              className="text-2xl sm:text-3xl font-bold text-purple-700"
            >
              RS:-{productDetails.price}
            </p>

            <div className="pt-6 space-x-4 flex justify-between relative">
              <button 
                onClick={handleBuyNow}
                className="w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-purple-600 to-purple-800 py-2 sm:py-4 text-white font-medium shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
              >
                Buy Now
              </button>
              <button 
                onClick={handleAddToCart}
                disabled={addStatus === 'adding'}
                className={`w-full flex items-center justify-center gap-2 rounded-lg ${
                  addStatus === 'added' 
                    ? 'bg-green-600 hover:bg-green-700' 
                    : 'bg-gradient-to-r from-purple-600 to-purple-800'
                } py-2 sm:py-4 text-white font-medium shadow-lg hover:shadow-xl transition-all hover:-translate-y-1`}
              >
                <ShoppingCart className="h-5 w-5" />
                {getButtonText()}
              </button>
            </div>
          </div>
        </div>
        <div className="space-y-6 bg-gray-900 p-4 sm:p-8 rounded-2xl shadow-md border w-full mt-20">
          <p className="text-white leading-relaxed">
            {productDetails.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;