import React from 'react';
import { Link } from 'react-router-dom';

const StaticCartPage = () => {
  const cartItems = [
    {
      _id: '1',
      productName: 'Product 1',
      productType: 'Category 1',
      price: 69.95,
      quantity: 1,
      image: 'https://via.placeholder.com/50'
    },
    {
        _id: '1',
        productName: 'Product 1',
        productType: 'Category 1',
        price: 69.95,
        quantity: 1,
        image: 'https://via.placeholder.com/50'
      },
      {
        _id: '1',
        productName: 'Product 1',
        productType: 'Category 1',
        price: 69.95,
        quantity: 1,
        image: 'https://via.placeholder.com/50'
      },
      {
        _id: '1',
        productName: 'Product 1',
        productType: 'Category 1',
        price: 69.95,
        quantity: 1,
        image: 'https://via.placeholder.com/50'
      },
      {
        _id: '1',
        productName: 'Product 1',
        productType: 'Category 1',
        price: 69.95,
        quantity: 1,
        image: 'https://via.placeholder.com/50'
      },
      {
        _id: '1',
        productName: 'Product 1',
        productType: 'Category 1',
        price: 69.95,
        quantity: 1,
        image: 'https://via.placeholder.com/50'
      },
      {
        _id: '1',
        productName: 'Product 1',
        productType: 'Category 1',
        price: 69.95,
        quantity: 1,
        image: 'https://via.placeholder.com/50'
      }
  ];

  return (
    <div className="p-4 h-screen bg-black flex items-center justify-center">
      <div className="mt-10 h-screen bg-gray-900 p-10 text-white w-full max-w-4xl text-center relative overflow-y-auto">
        <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
        {cartItems.length === 0 ? (
          <div>Your cart is empty. <Link to="/shop/home" className="text-blue-500">Continue Shopping</Link></div>
        ) : (
          <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-1 w-full grid-cols-1">
            {cartItems.map(item => (
              <div key={item._id} className="bg-gray-800 p-4 rounded-lg shadow-md">
                <div className="flex  items-center justify-between gap-4">
                  <img src={item.image} alt={item.productName} className="w-16 h-16 object-cover rounded-md" />
                  <div className="flex flex-col sm:flex-row justify-between items-center w-full">
                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-5 justify-center sm:mr-2">
                      <h2 className="text-sm">{item.productName}</h2>
                      <p className="text-sm text-white">Category: {item.productType}</p>
                      <p className="text-sm text-white">Price: ${item.price}</p>
                      <p className="text-sm text-white">Quantity: {item.quantity}</p>
                      <p className="text-sm text-gray-400">Total: ${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-4 justify-center mt-2 sm:mt-0">
                      <button className="px-2 py-1 bg-purple-700 hover:bg-purple-800 text-white rounded">+</button>
                      <button className="px-2 py-1 bg-purple-700 hover:bg-purple-800 text-white rounded">-</button>
                      <button className="px-2 py-1 bg-red-600 text-white rounded">Remove</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default StaticCartPage;