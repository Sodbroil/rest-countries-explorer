import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { HomePage } from '../../pages/HomePage';
import { useCountryStore } from '../../store/countryStore';
import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('../../store/countryStore');

describe('HomePage', () => {
  const mockStore = {
    countries: [
      {
        name: { common: 'Germany', official: 'Federal Republic of Germany' },
        cca2: 'DE',
        cca3: 'DEU',
        flags: { png: 'https://flagcdn.com/w320/de.png', svg: 'https://flagcdn.com/de.svg' },
        region: 'Europe',
        population: 83240525,
        capital: ['Berlin']
      },
      {
        name: { common: 'France', official: 'French Republic' },
        cca2: 'FR',
        cca3: 'FRA',
        flags: { png: 'https://flagcdn.com/w320/fr.png', svg: 'https://flagcdn.com/fr.svg' },
        region: 'Europe', 
        population: 67391582,
        capital: ['Paris']
      }
    ],
    loading: false,
    error: null,
    fetchAllCountries: vi.fn(),
    searchCountries: vi.fn() // Это не используется в компоненте!
  };

  beforeEach(() => {
    vi.mocked(useCountryStore).mockReturnValue(mockStore);
  });

  it('should display list of countries', () => {
    render(<HomePage />);
    
    expect(screen.getByText('Germany')).toBeInTheDocument();
    expect(screen.getByText('France')).toBeInTheDocument();
  });

  it('should filter countries when searching', async () => {
    render(<HomePage />);
    
    // Вводим текст в поиск
    const searchInput = screen.getByPlaceholderText('Search countries...');
    await userEvent.type(searchInput, 'Germany');
    
    // Германия должна остаться, Франция - исчезнуть
    expect(screen.getByText('Germany')).toBeInTheDocument();
    expect(screen.queryByText('France')).not.toBeInTheDocument();
  });

  it('should show "no countries" message when no matches', async () => {
    render(<HomePage />);
    
    const searchInput = screen.getByPlaceholderText('Search countries...');
    await userEvent.type(searchInput, 'NonExistentCountry');
    
    expect(screen.getByText('No countries found')).toBeInTheDocument();
    expect(screen.queryByText('Germany')).not.toBeInTheDocument();
    expect(screen.queryByText('France')).not.toBeInTheDocument();
  });

  it('should show loading state', () => {
    const loadingStore = { ...mockStore, loading: true };
    vi.mocked(useCountryStore).mockReturnValue(loadingStore);
    
    render(<HomePage />);
    expect(screen.getByText('Loading countries...')).toBeInTheDocument();
  });
});