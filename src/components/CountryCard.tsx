import type { Country } from '../services/countryService';

interface CountryCardProps {
  country: Country;
}

export const CountryCard = ({ country }: CountryCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
      <img 
        src={country.flags.png} 
        alt={`Flag of ${country.name.common}`}
        className="w-full h-40 object-cover rounded-md mb-3"
      />
      <h3 className="text-xl font-semibold text-gray-800 mb-2">
        {country.name.common}
      </h3>
      <p className="text-gray-600">
        <strong>Region:</strong> {country.region}
      </p>
      <p className="text-gray-600">
        <strong>Population:</strong> {country.population.toLocaleString()}
      </p>
      {country.capital && (
        <p className="text-gray-600">
          <strong>Capital:</strong> {country.capital[0]}
        </p>
      )}
    </div>
  );
};