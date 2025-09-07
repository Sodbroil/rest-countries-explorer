import { useEffect, useState } from 'react';
import { useCountryStore } from '../store/countryStore';
import { CountryCard } from '../components/CountryCard';

export const HomePage = () => {
  const { countries, loading, error, fetchAllCountries } = useCountryStore();
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchAllCountries();
  }, [fetchAllCountries]);

  const filteredCountries = countries.filter(country =>
    country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div className="text-center py-8">Loading countries...</div>;
  if (error) return <div className="text-center py-8 text-red-500">Error: {error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">CountryHub</h1>
      
      {/* Поиск */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search countries..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Список стран */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredCountries.map((country) => (
          <CountryCard key={country.cca3} country={country} />
        ))}
      </div>

      {filteredCountries.length === 0 && !loading && (
        <div className="text-center py-8 text-gray-500">
          No countries found
        </div>
      )}
    </div>
  );
};