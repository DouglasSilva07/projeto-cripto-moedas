import { useState, useEffect } from 'react';
import { cryptoApi } from '../services/cryptoApi';
import type { CryptoCoin } from '../types/types';

export const useCrypto = () => {
  const [cryptoData, setCryptoData] = useState<CryptoCoin[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCryptoData = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await cryptoApi.getCryptoMarkets();
        
        // Ordenar por preço (maior para menor) 
        const sortedData = data.sort((a, b) => b.current_price - a.current_price);
        setCryptoData(sortedData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro desconhecido');
      } finally {
        setLoading(false);
      }
    };

    fetchCryptoData();
  }, []);

  return { cryptoData, loading, error };
};