import { countryService } from '../../services/countryService';
import { describe, it, expect } from 'vitest';

describe('Country Service Edge Cases', () => {
  it('should have all methods defined', () => {
    expect(countryService.getAllCountries).toBeDefined();
    expect(countryService.getCountryByCode).toBeDefined();
    expect(countryService.searchCountries).toBeDefined();
    expect(countryService.getCountriesByRegion).toBeDefined();
  });

  it('should handle method calls without throwing sync errors', () => {
    expect(() => countryService.getAllCountries()).not.toThrow();
    expect(() => countryService.getCountryByCode('US')).not.toThrow();
    expect(() => countryService.searchCountries('test')).not.toThrow();
    expect(() => countryService.getCountriesByRegion('europe')).not.toThrow();
  });

  it('should return promises from all methods', () => {
    const result1 = countryService.getAllCountries();
    const result2 = countryService.getCountryByCode('US');
    const result3 = countryService.searchCountries('test');
    const result4 = countryService.getCountriesByRegion('europe');
    
    expect(result1).toBeInstanceOf(Promise);
    expect(result2).toBeInstanceOf(Promise);
    expect(result3).toBeInstanceOf(Promise);
    expect(result4).toBeInstanceOf(Promise);
    
    // Отменяем промисы чтобы не делать реальные запросы
    result1.catch(() => {});
    result2.catch(() => {});
    result3.catch(() => {});
    result4.catch(() => {});
  });
});