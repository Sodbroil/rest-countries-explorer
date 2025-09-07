import { render, screen } from '@testing-library/react';
import App from '../App';
import { describe, it, expect, vi } from 'vitest';

// Мокаем хранилище чтобы контролировать состояние
vi.mock('../store/countryStore', () => ({
  useCountryStore: () => ({
    countries: [
      {
        name: { common: 'Test Country' },
        cca2: 'TC',
        flags: { png: 'test.png' },
        region: 'Test',
        population: 1000000,
        capital: ['Test City']
      }
    ],
    loading: false,
    error: null,
    fetchAllCountries: vi.fn(),
  }),
}));

describe('App Component', () => {
  it('should render without crashing', () => {
    const { container } = render(<App />);
    expect(container).toBeInTheDocument();
  });

  it('should display app content', () => {
    render(<App />);
    
    // Проверяем основные элементы
    expect(screen.getByText('CountryHub')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Search countries...')).toBeInTheDocument();
    expect(screen.getByText('Test Country')).toBeInTheDocument();
  });

  it('should be a function component', () => {
    expect(typeof App).toBe('function');
  });
});