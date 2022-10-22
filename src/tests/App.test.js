import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';
import dataApi from './Mock/dataApi'

describe("", () => {
  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(dataApi),
      })
    );
  });

  test("", async () => {
    render(<App />);
    expect(fetch).toHaveBeenCalled();
    const filterName = screen.getByTestId("name-filter");
    expect(filterName).toBeInTheDocument();
    userEvent.type(filterName, "oo");
    expect(filterName).toHaveValue("oo");
    const planets = await screen.findAllByTestId("planet-name");
    expect(planets).toHaveLength(2);
  });
});
