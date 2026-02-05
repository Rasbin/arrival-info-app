# Arrival Info App

A real-time public transportation arrival information display built with React and TypeScript. This application fetches bus arrival data from the HSL (Helsinki Regional Transport) Digitransit API and displays upcoming bus arrivals with delay information.

## Features

- Real-time bus arrival information
- Live clock showing current time
- Delay indicators (green for on-time, red for delayed)
- Waiting time calculation
- Responsive design for mobile and desktop
- Error handling with user-friendly messages
- Loading state feedback

## Project Structure

```
src/
├── api/
│   └── arrivalsQuery.tsx      # GraphQL query for HSL Digitransit API
├── components/
│   ├── Dashboard.tsx           # Main content displaying bus arrivals
│   ├── Navigation.tsx          # Header with logo and current time
│   └── __tests__/
│       └── App.test.tsx        # Component tests
├── images/
│   ├── bus.png                 # Bus icon
│   └── VirtaLogo.tsx          # Company logo component
├── utils/
│   └── timeConverter.tsx       # Time calculation utilities
├── App.tsx                     # Main application component
├── App.css                     # Application styles
└── index.tsx                   # React entry point
```

## Getting Started

### Prerequisites

- Node.js 16+
- npm or yarn

### Installation

```bash
npm install
```

### Running the Application

```bash
npm run dev
```

This runs both the **Express proxy server** (port 5000) and the **React frontend** (port 3000) simultaneously.

**Note:** Both the proxy server and frontend must be running. The frontend communicates with the local proxy to avoid CORS issues with the Digitransit API.

### Building for Production

```bash
npm run build
```

Builds the app for production to the `build` folder.

### Running Tests

```bash
npm test
```

Launches the test runner in interactive watch mode.

## Architecture

The application uses a **three-tier architecture** to handle CORS restrictions:

```
┌─────────────────────────┐
│   React Frontend        │
│   (Port 3000)           │
│   - Displays UI         │
│   - User interactions   │
└────────────┬────────────┘
             │
             ↓ HTTP Requests
┌─────────────────────────┐
│  Express Proxy Server   │
│  (Port 5000)            │
│  - Handles CORS         │
│  - Routes requests      │
└────────────┬────────────┘
             │
             ↓ HTTPS Requests
┌─────────────────────────┐
│  Digitransit API        │
│  (api.digitransit.fi)   │
│  - GraphQL endpoint     │
│  - Real-time data       │
└─────────────────────────┘
```

### Why the Proxy Server?

The Digitransit API doesn't allow direct requests from browser due to CORS policy. The Express proxy server:

- ✅ Accepts requests from the React frontend on port 5000
- ✅ Automatically handles CORS headers
- ✅ Forwards requests to the external API
- ✅ Returns responses to the frontend

## API Integration

This app uses the HSL Digitransit API to fetch real-time bus arrival data. The GraphQL query fetches:

- Stop name
- Route information (ID and short name)
- Arrival times (in seconds since midnight)
- Arrival delays

For more information about the API, visit [Digitransit API Documentation](https://digitransit.fi/en/developers/apis/1-routing-api/)

### Backend Endpoint

**POST** `http://localhost:5000/api/arrivals`

The proxy server endpoint that forwards requests to Digitransit API.

## Development vs Production

### Development

Use `npm run dev` to run both services together.

### Production

For production deployment:

1. Build the React app: `npm run build`
2. Deploy the `build/` folder to a static hosting service (Vercel, Netlify, etc.)
3. Deploy `server.js` to a Node.js hosting service (Heroku, AWS, etc.)
4. Update the API endpoint in `src/App.tsx` to point to your production server URL

## Recent Improvements

- ✅ Added proper error handling and loading states
- ✅ Removed TypeScript @ts-expect-error suppressions
- ✅ Refactored time calculations into reusable utilities
- ✅ Real-time clock updates in Navigation
- ✅ Improved code organization and maintainability
- ✅ Removed unused dependencies
- ✅ **Fixed CORS errors with Express proxy server**
- ✅ Added concurrently for simultaneous dev server running

## Troubleshooting

### CORS Errors

- Ensure both the backend and frontend are running
- Check that frontend is calling `http://localhost:5000/api/arrivals`
- Verify backend is running on port 5000

### Server won't start on port 5000

- Check if another process is using the port
- Change the `PORT` in `server.js` if needed

### See [DEVELOPMENT.md](./DEVELOPMENT.md) for more setup details

## Technologies Used

- React 18.2.0
- TypeScript 4.8.4
- Express.js 4.18.2
- CORS 2.8.5
- Node-fetch 2.7.0
- React Testing Library
- CSS3

## Project Files

- **server.js** - Express proxy server for handling CORS
- **src/App.tsx** - Main React component
- **src/components/** - React components (Dashboard, Navigation)
- **src/utils/** - Utility functions (time conversion)
- **DEVELOPMENT.md** - Detailed development guide
- **TODO.md** - Progress tracking

## License

This project is part of the practice portfolio.

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
