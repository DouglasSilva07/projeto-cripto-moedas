import React from 'react';
import { Header } from './components/Header';
import { CryptoTable } from './components/CryptoTable';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ErrorMessage } from './components/ErrorMessage';
import { useCrypto } from './hooks/useCrypto';

const App: React.FC = () => {
  const { cryptoData, loading, error } = useCrypto();

  const handleRetry = () => {
    // Força uma nova renderização recarregando a página
    window.location.reload();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-0 m-0 text-base">
      <Header />
      
      <main className="w-full flex justify-center">
        {loading && <LoadingSpinner />}
        
        {error && (
          <ErrorMessage 
            message={error} 
            onRetry={handleRetry}
          />
        )}
        
        {!loading && !error && cryptoData.length > 0 && (
          <CryptoTable cryptoData={cryptoData} />
        )}
        
        {!loading && !error && cryptoData.length === 0 && (
          <p className="text-center p-8 text-gray-500 italic">Nenhum dado encontrado.</p>
        )}
      </main>
    </div>
  );
};

export default App;