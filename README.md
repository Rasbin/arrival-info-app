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
npm start
```

Runs the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

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

## API Integration

This app uses the HSL Digitransit API to fetch real-time bus arrival data. The GraphQL query fetches:

- Stop name
- Route information (ID and short name)
- Arrival times (in seconds since midnight)
- Arrival delays

For more information about the API, visit [Digitransit API Documentation](https://digitransit.fi/en/developers/apis/1-routing-api/)

## Recent Improvements

- ✅ Added proper error handling and loading states
- ✅ Removed TypeScript @ts-expect-error suppressions
- ✅ Refactored time calculations into reusable utilities
- ✅ Real-time clock updates in Navigation
- ✅ Improved code organization and maintainability
- ✅ Removed unused dependencies

## Known Issues & Future Work

See [TODO.md](./TODO.md) for additional improvements planned.

## Technologies Used

- React 18.2.0
- TypeScript 4.8.4
- React Testing Library
- CSS3

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
