import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import Navigation from '../Navigation';

afterEach(() => {
  cleanup();
});

describe("Navigation Component Tests", () => {

  test('should render Navigation component', () => {
    render(<Navigation />);
    const navigationElement = screen.getByTestId('nav-test');
    expect(navigationElement).toBeInTheDocument();
  });
  
  test('should render virta logo', () => {
    render(<Navigation />);
    const logoElement = screen.getByTestId('virta-logo-test');
    expect(logoElement).toBeInTheDocument();
  });
  
  test('should render current time containing span element', () => {
    render(<Navigation />);
    const currentTimeSpanElement = screen.getByTestId('current-time-test');
    expect(currentTimeSpanElement).toBeInTheDocument();
  });
  
  test('should contain text Buses arriving to', () => {
    render(<Navigation />);
    const navigationElement = screen.getByTestId('nav-test');
    expect(navigationElement).toHaveTextContent('Buses arriving to');
  });
});
