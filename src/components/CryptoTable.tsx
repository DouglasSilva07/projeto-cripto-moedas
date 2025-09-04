import React, { useState, useEffect } from 'react';
import type { CryptoCoin } from '../types/types';

interface CryptoTableProps {
  cryptoData: CryptoCoin[];
}

export const CryptoTable: React.FC<CryptoTableProps> = ({ cryptoData }) => {
  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });

  const [filter, setFilter] = useState<"all" | "fav" | "notFav">("all");

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  const filteredCoins = cryptoData
    .filter((coin) => {
      if (filter === "fav") return favorites.includes(coin.id);
      if (filter === "notFav") return !favorites.includes(coin.id);
      return true;
    })
    .slice(0, 10); //Limitar a 10 moedas



  //Preço e porcetagem
  const formatPrice = (price: number): string => {
    return price.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 6
    });
  };

  const formatPercentage = (percentage: number): string => {
    return `${percentage.toFixed(2)}%`;
  };

  return (
    <div className="w-full max-w-4xl mx-auto my-5">
      {/* Botões de filtro */}
      <div className="flex gap-3 justify-center mb-4">
        <button
          className={`px-4 py-2 rounded-lg ${filter === "all" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          onClick={() => setFilter("all")}
        >
          Todos
        </button>
        <button
          className={`px-4 py-2 rounded-lg ${filter === "fav" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          onClick={() => setFilter("fav")}
        >
          Favoritos
        </button>
        <button
          className={`px-4 py-2 rounded-lg ${filter === "notFav" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          onClick={() => setFilter("notFav")}
        >
          Não favoritos
        </button>
      </div>



      {/* Desktop Table */}
      <table className="hidden sm:table w-full bg-white rounded-lg overflow-hidden shadow-lg border-collapse text-2xl">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-3 text-center font-bold">
              ⭐
            </th>
            <th className="border border-gray-300 p-3 text-center font-bold"></th>
            <th className="border border-gray-300 p-3 text-center font-bold">Nome</th>
            <th className="border border-gray-300 p-3 text-center font-bold">Preço USD</th>
            <th className="border border-gray-300 p-3 text-center font-bold">Variação 24h</th>
          </tr>
        </thead>

        <tbody>
          {filteredCoins.map((coin) => (
            <tr key={coin.id}>
              <td className="border border-gray-300 p-3 text-center text-2xl">
                <button onClick={() => toggleFavorite(coin.id)}>
                  {favorites.includes(coin.id) ? "⭐" : "☆"}
                </button>
              </td>
              <td className="border border-gray-300 p-3 text-center">
                <img
                  src={coin.image}
                  alt={coin.name}
                  width="32"
                  height="32"
                  className="block mx-auto"
                  loading="lazy"
                />
              </td>
              <td className="border border-gray-300 p-3 text-center">{coin.name}</td>
              <td className="border border-gray-300 p-3 text-center">{formatPrice(coin.current_price)}</td>
              <td className={`border border-gray-300 p-3 text-center ${coin.price_change_percentage_24h >= 0 ? 'text-green-500' : 'text-red-500'
                }`}>
                {formatPercentage(coin.price_change_percentage_24h)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Mobile Cards */}
      <div className="sm:hidden space-y-4 p-4">
        {filteredCoins.map((coin) => (
          <div key={coin.id} className="border border-gray-300 rounded-lg p-3 shadow-sm bg-white">
            <div className="space-y-2">
              <div className="flex items-center gap-3 pb-2 border-b border-gray-200">
                <img
                  src={coin.image}
                  alt={coin.name}
                  width="32"
                  height="32"
                  loading="lazy"
                />
              </div>

              <button className='text-3xl' onClick={() => toggleFavorite(coin.id)}>
                {favorites.includes(coin.id) ? "⭐" : "☆"}
              </button>
            </div>

            <div className="flex justify-between items-center pb-2 border-b border-gray-200">
              <span className="font-bold text-gray-600">Nome:</span>
              <span>{coin.name}</span>
            </div>
            <div className="flex justify-between items-center pb-2 border-b border-gray-200">
              <span className="font-bold text-gray-600">Preço USD:</span>
              <span>{formatPrice(coin.current_price)}</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="font-bold text-gray-600">Variação 24h:</span>
              <span className={coin.price_change_percentage_24h >= 0 ? 'text-green-500' : 'text-red-500'}>
                {formatPercentage(coin.price_change_percentage_24h)}
              </span>
            </div>
          </div>

        ))}
      </div>
    </div>
  );
};