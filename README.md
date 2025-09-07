# 🌍 CountryHub - Explore the World

[![CI Pipeline](https://github.com/Sodbroil/rest-countries-explorer/actions/workflows/ci.yml/badge.svg)](https://github.com/Sodbroil/rest-countries-explorer/actions/workflows/ci.yml)
[![Vercel Deployment](https://img.shields.io/badge/Deployed%20on-Vercel-black?logo=vercel)](https://rest-countries-explorer.vercel.app)
[![Test Coverage](https://img.shields.io/badge/Coverage-78%25-brightgreen)](https://github.com/Sodbroil/rest-countries-explorer/actions)

A modern React application for exploring countries around the world with beautiful UI and advanced filtering capabilities.

## 🚀 Live Demo

👉 **[https://rest-countries-explorer.vercel.app](https://rest-countries-explorer.vercel.app)**

## ✨ Features

- **🌍 Explore All Countries** - Browse through 250+ countries
- **🔍 Smart Search** - Find countries by name
- **📍 Filter by Region** - Explore by continent
- **📱 Responsive Design** - Works on desktop and mobile
- **🎨 Modern UI** - Built with Tailwind CSS
- **⚡ Fast Performance** - Powered by Vite

## 🛠 Tech Stack

- **Frontend:** React 18 + TypeScript
- **Styling:** Tailwind CSS
- **Build Tool:** Vite
- **Testing:** Vitest + Testing Library
- **API:** REST Countries API
- **Deployment:** Vercel
- **CI/CD:** GitHub Actions

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/Sodbroil/rest-countries-explorer.git

# Install dependencies
npm install

# Start development server
npm run dev

# Run tests
npm test

# Build for production
npm run build
```

## 🧪 Testing

```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Run specific test files
npm test src/__tests__/services/countryService.test.ts
```

### Test Coverage

-   **Components:** 100% ✅
-   **Store:** 100% ✅
-   **Pages:** 100% ✅
-   **Services:** 73% ⚡
-   **Overall:** 78% 🎯
    

## 🏗 Project Structure

```bash
src/
├── components/          # React components
│   ├── CountryCard.tsx
│   └── CountryList.tsx
├── pages/              # Page components
│   └── HomePage.tsx
├── services/           # API services
│   └── countryService.ts
├── store/              # State management
│   └── countryStore.ts
├── __tests__/          # Test files
└── App.tsx             # Main app component
```

## 🔧 API Usage

Uses the [REST Countries API](https://restcountries.com/) with the following endpoints:

```bash
-   `GET /all` - Get all countries
-   `GET /alpha/{code}` - Get country by code
-   `GET /name/{name}` - Search countries by name
-   `GET /region/{region}` - Filter by region
```

## 🤝 Contributing

1.  Fork the project
2.  Create your feature branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request
    
## 📄 License

This project is licensed under the MIT License - see the [LICENSE](https://license/) file for details.

## 👨‍💻 Author

**Sodbroil** - [GitHub](https://github.com/Sodbroil)