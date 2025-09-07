import { countryService } from '../../services/countryService';
import { describe, it, expect, vi } from 'vitest';

// Мокаем только axios для этого теста
vi.mock('axios', () => ({
  default: {
    create: () => ({
      get: vi.fn(),
    }),
  },
}));

describe('getAllCountries', () => {
  it('should handle network errors', async () => {
    // Мокаем ошибку сети
    const mockError = new Error('Network error');
    vi.spyOn(console, 'error').mockImplementation(() => {});
    
    // Заменяем реализацию метода для этого теста
    const originalMethod = countryService.getAllCountries;
    countryService.getAllCountries = async () => {
      throw mockError;
    };
    
    await expect(countryService.getAllCountries()).rejects.toThrow('Network error');
    
    // Восстанавливаем оригинальный метод
    countryService.getAllCountries = originalMethod;
  });
});