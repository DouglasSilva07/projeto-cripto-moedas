import React from 'react';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onRetry }) => {
  return (
    <div className="flex flex-col items-center p-8 text-center">
      <p className="text-red-500 mb-4 font-bold">Erro: {message}</p>
      {onRetry && (
        <button 
          onClick={onRetry} 
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors duration-300 cursor-pointer"
        >
          Tentar novamente
        </button>
      )}
    </div>
  );
};