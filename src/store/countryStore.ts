import { create } from 'zustand';
import { countryService, type Country } from '../services/countryService';

interface CountryState {
  countries: Country[];
  loading: boolean;
  error: string | null;
  selectedCountry: Country | null;
  
  fetchAllCountries: () => Promise<void>;
  fetchCountryByCode: (code: string) => Promise<void>;
  searchCountries: (name: string) => Promise<void>;
  clearError: () => void;
}

export const useCountryStore = create<CountryState>((set) => ({
  countries: [],
  loading: false,
  error: null,
  selectedCountry: null,

  fetchAllCountries: async () => {
    set({ loading: true, error: null });
    try {
      const countries = await countryService.getAllCountries();
      set({ countries, loading: false });
    } catch (error) {
      set({ error: 'Failed to fetch countries', loading: false });
    }
  },

  fetchCountryByCode: async (code: string) => {
    set({ loading: true, error: null });
    try {
      const country = await countryService.getCountryByCode(code);
      set({ selectedCountry: country, loading: false });
    } catch (error) {
      set({ error: `Failed to fetch country ${code}`, loading: false });
    }
  },

  searchCountries: async (name: string) => {
    set({ loading: true, error: null });
    try {
      const countries = await countryService.searchCountries(name);
      set({ countries, loading: false });
    } catch (error) {
      set({ error: `Failed to search countries for ${name}`, loading: false });
    }
  },

  clearError: () => set({ error: null }),
}));