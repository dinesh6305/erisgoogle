import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';

const GoogleAuth = () => {
  const handleGoogleLogin = () => {
    window.open('http://localhost:5000/api/auth/google', '_self');
  };

  return (
    <button
      onClick={handleGoogleLogin}
      className="w-full flex items-center justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-800"
    >
      <FontAwesomeIcon icon={faGoogle} className="h-5 w-5 mr-2" />
      Login with Google
    </button>
  );
};

export default GoogleAuth;