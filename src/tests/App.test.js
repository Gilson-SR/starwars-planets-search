import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import dataApi from './Mock/dataApi';
import Provider from '../context/myProvider';
import userEvent from '@testing-library/user-event';

describe('', () => {

  beforeEach(() => {
    global.fetch = jest.fn().mockResolvedValue({
      json: () => Promise.resolve(dataApi),
    });
  });

  it('Testando os filtros', async () => {
    render(
      <Provider>
        <App />
      </Provider>
    );

    const nameFilter = screen.getByTestId('name-filter');
    const columnFilter = screen.getByTestId('column-filter');
    const comparisonFilter = screen.getByTestId('comparison-filter');
    const valueFilter = screen.getByTestId('value-filter');
    const buttonFilter = screen.getByTestId('button-filter');

    const elements = [
      nameFilter,
      columnFilter,
      comparisonFilter,
      valueFilter,
      buttonFilter,
    ]

    elements.forEach((element) => {
      expect(element).toBeInTheDocument();
    })

    const tatooine = await screen.findByText('Tatooine', undefined, { timeout: 2000 });
    expect(tatooine).toBeInTheDocument();

    userEvent.type(nameFilter, 'Alderaan');
    expect(screen.getAllByRole('row').length).toBe(2);
    userEvent.clear(nameFilter);

    userEvent.selectOptions(columnFilter, 'diameter');
    userEvent.selectOptions(comparisonFilter, 'menor que');
    userEvent.type(valueFilter, '10000');
    userEvent.click(buttonFilter);
    expect(screen.getAllByRole('row').length).toBe(4);

    userEvent.selectOptions(columnFilter, 'diameter');
    userEvent.selectOptions(comparisonFilter, 'maior que');
    userEvent.clear(valueFilter);
    userEvent.type(valueFilter, '5000');
    userEvent.click(buttonFilter);
    expect(screen.getAllByRole('row').length).toBe(3);

    userEvent.selectOptions(columnFilter, 'surface_water');
    userEvent.selectOptions(comparisonFilter, 'igual a');
    userEvent.clear(valueFilter);
    userEvent.type(valueFilter, '100');
    userEvent.click(buttonFilter);
    expect(screen.getAllByRole('row').length).toBe(2);
  });

  it('Testando a ordenação', async () => {
    render(
      <Provider>
        <App />
      </Provider>
    );
    
    const columnSort = screen.getByTestId('column-sort');
    const inputAsc = screen.getByTestId('column-sort-input-asc');
    const inputDesc = screen.getByTestId('column-sort-input-desc');
    const buttonSort = screen.getByTestId('column-sort-button');

    const elements = [
      columnSort,
      inputAsc,
      inputDesc,
      buttonSort,
    ]

    elements.forEach((element) => {
      expect(element).toBeInTheDocument();
    })

    const tatooine = await screen.findByText('Tatooine', undefined, { timeout: 2000 });
    expect(tatooine).toBeInTheDocument();

    userEvent.selectOptions(columnSort, 'diameter');
    userEvent.click(inputDesc);
    userEvent.click(buttonSort);
    expect(screen.getAllByRole('row')[1]).toHaveTextContent(/Bespin/i);

    userEvent.click(inputAsc);
    userEvent.click(buttonSort);
    expect(screen.getAllByRole('row')[1]).toHaveTextContent(/Endor/i);
  });
});
