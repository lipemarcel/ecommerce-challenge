# Star Wars Characters Explorer

A modern web application built with Next.js that allows users to explore characters from the Star Wars universe. The application features a responsive design, smooth animations, and an intuitive filtering system.

## 🚀 Features

- **Character List**: Browse through all characters from the Star Wars universe
- **Filtering System**: Filter characters by planets
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

## ⚠️ Deployment Status

The application is currently configured for GitHub Pages deployment, but the deployment is temporarily not working due to technical issues being addressed. Local development remains fully functional.

## 🔮 Future Implementations

1. **Advanced Filtering**
   - Multiple filter selection
   - Search by character name
   - Filter by additional attributes (species, vehicles, etc.)

2. **Enhanced User Experience**
   - Detailed character profiles
   - Interactive character relationships map
   - Favorite characters functionality

3. **Performance Optimizations**
   - Implement data caching
   - Add infinite scroll
   - Optimize image loading and compression

4. **Additional Features**
   - User authentication
   - Personal collections
   - Character comparison tool
   - Timeline view of character appearances

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
│   ├── components/
│   │   ├── __tests__/        # Component tests
│   │   └── ...              # React components
│   ├── interfaces/          # TypeScript interfaces
│   ├── services/
│   │   ├── api/
│   │   │   ├── __tests__/   # API service tests
│   │   │   └── ...         # API services
│   │   └── ...
│   └── page.tsx            # Main page component
└── public/                # Static files
```

The project follows a modular structure where:
- Tests are located alongside their respective components and services
- Each major feature has its own directory
- Components and services are organized by domain
- Tests follow the `__tests__` naming convention

## 🎯 Key Components

### CharactersList
- Main component that displays the list of characters
- Handles data fetching and state management
- Implements filtering functionality

### FilterNavigation
- Provides filtering options for characters by planets
- Features smooth dropdown animations
- Responsive design for all screen sizes

### CharacterCard
- Displays individual character information
- Responsive layout with hover animations
- Optimized image loading

## 🔄 State Management

The application uses React's built-in state management with:
- `useState` for local component state
- `useEffect` for side effects and data fetching
- Custom hooks for reusable logic

## 🎨 Styling

- Utilizes Tailwind CSS for responsive design
- Custom animations with Framer Motion
- Consistent theme throughout the application

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Author

- Fellipe Marcel - Initial work and maintenance

## 🙏 Acknowledgments

- Star Wars API (SWAPI) for providing the data
- Next.js team for the amazing framework
- Framer Motion for the animation library