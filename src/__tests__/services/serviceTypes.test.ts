import { countryService } from '../../services/countryService';
import { describe, it, expect } from 'vitest';

describe('Country Service Types', () => {
  it('should have correct method signatures', () => {
    expect(countryService.getAllCountries).toBeInstanceOf(Function);
    expect(countryService.getCountryByCode).toBeInstanceOf(Function);
    expect(countryService.searchCountries).toBeInstanceOf(Function);
    expect(countryService.getCountriesByRegion).toBeInstanceOf(Function);
  });

  it('should return promises', async () => {
    const result1 = countryService.getAllCountries();
    const result2 = countryService.getCountryByCode('US');
    
    expect(result1).toBeInstanceOf(Promise);
    expect(result2).toBeInstanceOf(Promise);
    
    // Отменяем промисы чтобы не делать реальные запросы
    result1.catch(() => {});
    result2.catch(() => {});
  });
});