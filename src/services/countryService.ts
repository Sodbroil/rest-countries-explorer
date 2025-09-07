import axios from 'axios';

// Базовый URL API
const API_BASE_URL = 'https://restcountries.com/v3.1';

// Поля которые нам нужны
const FIELDS = 'name,cca2,cca3,flags,region,population,capital';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

// Типы для данных
export interface Country {
  name: {
    common: string;
    official: string;
  };
  cca2: string;
  cca3: string;
  flags: {
    png: string;
    svg: string;
  };
  region: string;
  population: number;
  capital?: string[];
}

// Основные методы API
export const countryService = {
  async getAllCountries(): Promise<Country[]> {
    try {
      const response = await apiClient.get<Country[]>(`/all?fields=${FIELDS}`);
      return response.data;
    } catch (error) {
      console.error('API Error:', error);
      throw new Error('Failed to fetch countries. Please check your internet connection.');
    }
  },

  async getCountryByCode(code: string): Promise<Country> {
    const response = await apiClient.get<Country[]>(`/alpha/${code}?fields=${FIELDS}`);
    return response.data[0];
  },

  async searchCountries(name: string): Promise<Country[]> {
    const response = await apiClient.get<Country[]>(`/name/${name}?fields=${FIELDS}`);
    return response.data;
  },

  async getCountriesByRegion(region: string): Promise<Country[]> {
    const response = await apiClient.get<Country[]>(`/region/${region}?fields=${FIELDS}`);
    return response.data;
  }
};