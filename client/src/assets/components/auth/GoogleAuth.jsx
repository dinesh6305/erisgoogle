import React from 'react';

const GoogleAuth = () => {
  const handleGoogleLogin = () => {
    window.open('http://localhost:5000/api/auth/google', '_self');
  };

  return (
    <button 
      onClick={handleGoogleLogin} 
      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
    >
      Login with Google
    </button>
  );
};

export default GoogleAuth;