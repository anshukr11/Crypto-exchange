export interface Cryptocurrency {
    id: string;
    rank: string;
    symbol: string;
    name: string;
    priceUsd: string;
    marketCapUsd: string;
}
  
export interface CryptocurrencyDetails extends Cryptocurrency {
    supply: string;
    maxSupply: string;
    volumeUsd24Hr: string;
    changePercent24Hr: string;
}