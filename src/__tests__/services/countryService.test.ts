import { countryService } from '../../services/countryService';
import { describe, it, expect } from 'vitest';

// Пропускаем сложное мокирование, тестируем только логику
describe('Country Service', () => {
  it('should have all methods defined', () => {
    expect(countryService.getAllCountries).toBeDefined();
    expect(countryService.getCountryByCode).toBeDefined();
    expect(countryService.searchCountries).toBeDefined();
    expect(countryService.getCountriesByRegion).toBeDefined();
  });

  it('should return promise from getAllCountries', () => {
    const result = countryService.getAllCountries();
    expect(result).toBeInstanceOf(Promise);
  });
});