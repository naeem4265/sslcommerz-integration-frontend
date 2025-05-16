# THPI Get Together Frontend

This is the frontend application for the THPI Get Together event registration system. It's built with Vue 3, TypeScript, and PrimeVue.

## Features

- Beautiful landing page with THPI campus showcase
- User-friendly registration form
- Multiple payment method integration (bKash, Nagad, Rocket, DBBL)
- Responsive design for all devices

## Prerequisites

- Node.js (v16 or higher)
- npm (v7 or higher)

## Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd thpi-get-together-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and add your environment variables:
```env
VITE_API_URL=http://localhost:3000
```

4. Start the development server:
```bash
npm run dev
```

5. Build for production:
```bash
npm run build
```

## Project Structure

- `src/views/` - Page components
- `src/components/` - Reusable UI components
- `src/router/` - Vue Router configuration
- `src/assets/` - Static assets (images, styles)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 