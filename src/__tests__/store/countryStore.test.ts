import { useCountryStore } from '../../store/countryStore';
import { countryService } from '../../services/countryService';
import { describe, it, expect, vi, beforeEach } from 'vitest';

// Мокаем сервис стран
vi.mock('../../services/countryService');

describe('Country Store', () => {
  const originalState = useCountryStore.getState();
  
  beforeEach(() => {
    useCountryStore.setState(originalState);
    vi.clearAllMocks();
  });

  it('should have initial state', () => {
    const state = useCountryStore.getState();
    expect(state.countries).toEqual([]);
    expect(state.loading).toBe(false);
    expect(state.error).toBeNull();
    expect(state.selectedCountry).toBeNull();
  });

  describe('fetchAllCountries', () => {
    it('should handle successful fetch', async () => {
      const mockCountries = [
        { 
          name: { common: 'Testland', official: 'Test Republic' }, 
          cca2: 'TL', 
          cca3: 'TST',
          flags: { png: 'test.png', svg: 'test.svg' },
          region: 'Test',
          population: 1000000,
          capital: ['Test City']
        }
      ];
      
      vi.mocked(countryService.getAllCountries).mockResolvedValueOnce(mockCountries);
      
      await useCountryStore.getState().fetchAllCountries();
      
      const state = useCountryStore.getState();
      expect(state.countries).toEqual(mockCountries);
      expect(state.loading).toBe(false);
      expect(state.error).toBeNull();
    });

    it('should handle API error', async () => {
      vi.mocked(countryService.getAllCountries).mockRejectedValueOnce(new Error('Network error'));
      
      await useCountryStore.getState().fetchAllCountries();
      
      const state = useCountryStore.getState();
      expect(state.error).toBe('Failed to fetch countries');
      expect(state.loading).toBe(false);
      expect(state.countries).toEqual([]);
    });
  });

  describe('fetchCountryByCode', () => { // ПРАВИЛЬНОЕ НАЗВАНИЕ!
    it('should set selected country on success', async () => {
      const mockCountry = { 
        name: { common: 'Testland', official: 'Test Republic' },
        cca2: 'TL',
        cca3: 'TST',
        flags: { png: 'test.png', svg: 'test.svg' },
        region: 'Test',
        population: 1000000,
        capital: ['Test City']
      };
      
      vi.mocked(countryService.getCountryByCode).mockResolvedValueOnce(mockCountry);
      
      await useCountryStore.getState().fetchCountryByCode('TL'); // ПРАВИЛЬНОЕ НАЗВАНИЕ!
      
      const state = useCountryStore.getState();
      expect(state.selectedCountry).toEqual(mockCountry);
      expect(state.loading).toBe(false);
      expect(state.error).toBeNull();
    });

    it('should handle fetchCountryByCode errors', async () => {
      vi.mocked(countryService.getCountryByCode).mockRejectedValueOnce(new Error('Not found'));
      
      await useCountryStore.getState().fetchCountryByCode('INVALID'); // ПРАВИЛЬНОЕ НАЗВАНИЕ!
      
      const state = useCountryStore.getState();
      expect(state.error).toBe('Failed to fetch country INVALID');
      expect(state.loading).toBe(false);
    });
  });

  describe('searchCountries', () => {
    it('should update countries with search results', async () => {
      const mockResults = [{ 
        name: { common: 'Found Country', official: 'Found Republic' },
        cca2: 'FC',
        cca3: 'FCO',
        flags: { png: 'found.png', svg: 'found.svg' },
        region: 'Test',
        population: 500000,
        capital: ['Found City']
      }];
      
      vi.mocked(countryService.searchCountries).mockResolvedValueOnce(mockResults);
      
      await useCountryStore.getState().searchCountries('test');
      
      const state = useCountryStore.getState();
      expect(state.countries).toEqual(mockResults);
      expect(state.loading).toBe(false);
      expect(state.error).toBeNull();
    });

    it('should handle search errors', async () => {
      vi.mocked(countryService.searchCountries).mockRejectedValueOnce(new Error('Search failed'));
      
      await useCountryStore.getState().searchCountries('test');
      
      const state = useCountryStore.getState();
      expect(state.error).toBe('Failed to search countries for test');
      expect(state.loading).toBe(false);
    });
  });

  describe('clearError', () => {
    it('should clear error message', () => {
      useCountryStore.setState({ error: 'Test error' });
      
      useCountryStore.getState().clearError();
      
      const state = useCountryStore.getState();
      expect(state.error).toBeNull();
    });
  });
});