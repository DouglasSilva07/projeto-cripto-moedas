import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="flex justify-center items-center">
      <h1 className="flex items-center">
        <img 
          src="/images/logo-live-crypto.jpg" 
          alt="Live Crypto Logo" 
          className="h-auto w-40"
        />
      </h1>
    </header>
  );
};