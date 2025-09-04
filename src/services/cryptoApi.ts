export class CryptoApiService {
  private readonly baseUrl = "https://api.coingecko.com/api/v3";

  async getCryptoMarkets(): Promise<CryptoCoin[]> {
    try {
      const url = `${this.baseUrl}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1`;
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data: CryptoCoin[] = await response.json();
      return data;
    } catch (error) {
      console.error('Erro ao buscar dados das criptomoedas:', error);
      throw error;
    }
  }
}

export const cryptoApi = new CryptoApiService();