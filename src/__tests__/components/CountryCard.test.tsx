import { render, screen } from '@testing-library/react';
import { CountryCard } from '../../components/CountryCard';
import type { Country } from '../../services/countryService'; // Добавляем type import
import { describe, it, expect } from 'vitest';


// Mock данные для тестов
const mockCountry: Country = { // Явно указываем тип
  name: { 
    common: 'Testland', 
    official: 'Test Republic' 
  },
  cca2: 'TL',
  cca3: 'TST',
  flags: { 
    png: 'https://test.com/flag.png', 
    svg: 'https://test.com/flag.svg' 
  },
  region: 'Test Region',
  population: 1000000,
  capital: ['Test City']
};

describe('CountryCard', () => {
  it('should render country information correctly', () => {
    render(<CountryCard country={mockCountry} />);
    
    expect(screen.getByText('Testland')).toBeInTheDocument();
    expect(screen.getByText('Test Region')).toBeInTheDocument();
    expect(screen.getByText('1,000,000')).toBeInTheDocument();
    expect(screen.getByText('Test City')).toBeInTheDocument();
  });

  it('should display flag image with correct alt text', () => {
    render(<CountryCard country={mockCountry} />);
    
    const flagImage = screen.getByAltText('Flag of Testland');
    expect(flagImage).toBeInTheDocument();
    expect(flagImage).toHaveAttribute('src', 'https://test.com/flag.png');
  });

  it('should handle missing capital gracefully', () => {
    const countryWithoutCapital: Country = { 
      ...mockCountry, 
      capital: undefined 
    };
    
    render(<CountryCard country={countryWithoutCapital} />);
    
    expect(screen.getByText('Testland')).toBeInTheDocument();
    expect(screen.queryByText('Capital:')).not.toBeInTheDocument();
  });
});