import { render } from '@testing-library/react';
import React from 'react';
import useInfiniteScroll from '../../hooks/useInfiniteScroll';

describe('useInfiniteScroll', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should call callback when scrolled near bottom', () => {
    const callback = jest.fn();

    Object.defineProperty(document.documentElement, 'scrollTop', {
      configurable: true,
      get: () => 100,
    });
    Object.defineProperty(document.documentElement, 'clientHeight', {
      configurable: true,
      get: () => 800,
    });
    Object.defineProperty(document.documentElement, 'scrollHeight', {
      configurable: true,
      get: () => 850,
    });

    Object.defineProperty(window, 'pageYOffset', {
      configurable: true,
      get: () => 100,
    });

    const TestComponent = () => {
      useInfiniteScroll(callback);
      return <div>Test</div>;
    };

    render(<TestComponent />);

    window.dispatchEvent(new Event('scroll'));

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('should NOT call callback when not scrolled near bottom', () => {
    const callback = jest.fn();

    Object.defineProperty(document.documentElement, 'scrollTop', {
      configurable: true,
      get: () => 0,
    });
    Object.defineProperty(document.documentElement, 'clientHeight', {
      configurable: true,
      get: () => 800,
    });
    Object.defineProperty(document.documentElement, 'scrollHeight', {
      configurable: true,
      get: () => 1000,
    });

    Object.defineProperty(window, 'pageYOffset', {
      configurable: true,
      get: () => 0,
    });

    const TestComponent = () => {
      useInfiniteScroll(callback);
      return <div>Test</div>;
    };

    render(<TestComponent />);

    window.dispatchEvent(new Event('scroll'));

    expect(callback).not.toHaveBeenCalled();
  });
});
