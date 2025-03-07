# Star Wars Planet Explorer

A modern web application built with Next.js that allows users to explore planets from the Star Wars universe. The application features a responsive design, smooth animations, and an intuitive filtering system.

## 🚀 Features

- **Planet List**: Browse through all planets from the Star Wars universe
- **Filtering System**: Filter planets by different categories
- **Responsive Design**: Optimized for both desktop and mobile devices
- **Smooth Animations**: Enhanced user experience with Framer Motion animations
- **Error Handling**: Robust error handling for API requests
- **Loading States**: Clear loading indicators for better UX

## 🛠 Technology Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Testing**: Jest & React Testing Library
- **API**: SWAPI (Star Wars API)

## 📋 Prerequisites

Before running this project, make sure you have:

- Node.js 20.x or later
- npm (comes with Node.js)

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/lipemarcel/ecommerce-challenge.git
   cd ecommerce-challenge
   ```

2. **Install dependencies**
   ```bash
   npm install --legacy-peer-deps
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open the application**
   Navigate to [http://localhost:3000](http://localhost:3000) in your browser

## 🧪 Running Tests

To run the test suite:
```bash
npm test
```

To run tests in watch mode:
```bash
npm test -- --watch
```

## 🏗 Project Structure

```
├── app/
│   ├── components/         # React components
│   ├── interfaces/        # TypeScript interfaces
│   ├── services/         # API services
│   └── page.tsx          # Main page component
├── public/              # Static files
└── tests/              # Test files
```

## 🎯 Key Components

### PlanetsList
- Main component that displays the list of planets
- Handles data fetching and state management
- Implements filtering functionality

### FilterNavigation
- Provides filtering options for planets
- Features smooth dropdown animations
- Responsive design for all screen sizes

### PlanetsService
- Handles all API interactions
- Implements error handling
- Manages data pagination

## 🔄 State Management

The application uses React's built-in state management with:
- `useState` for local component state
- `useEffect` for side effects and data fetching
- Custom hooks for reusable logic

## 🎨 Styling

- Utilizes Tailwind CSS for responsive design
- Custom animations with Framer Motion
- Consistent theme throughout the application

## 🔧 Configuration

The project includes several configuration files:
- `next.config.js` - Next.js configuration
- `tailwind.config.js` - Tailwind CSS configuration
- `jest.config.js` - Testing configuration

## 🚀 Deployment

The application is configured for deployment on GitHub Pages:

1. Push changes to the main branch
2. GitHub Actions will automatically:
   - Build the application
   - Deploy to GitHub Pages

The live version can be accessed at: https://lipemarcel.github.io/ecommerce-challenge/

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Authors

- Felipe Marcel - Initial work and maintenance

## 🙏 Acknowledgments

- Star Wars API (SWAPI) for providing the data
- Next.js team for the amazing framework
- Framer Motion for the animation library
