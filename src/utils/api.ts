// src/utils/api.ts

import axios from 'axios';
import { Cryptocurrency, CryptocurrencyDetails } from '../types/types';

const API_BASE_URL = 'https://api.coincap.io/v2';

export const fetchCryptocurrencies = async (limit: number = 10, offset: number = 0): Promise<Cryptocurrency[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/assets?limit=${limit}&offset=${offset}`);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching cryptocurrencies:', error);
    throw error;
  }
};

export const fetchCryptocurrencyDetails = async (id: string): Promise<CryptocurrencyDetails> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/assets/${id}`);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching cryptocurrency details:', error);
    throw error;
  }
};