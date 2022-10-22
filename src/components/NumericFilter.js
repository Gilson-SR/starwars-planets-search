import React, { useContext, useEffect, useState } from 'react';
import myContext from '../context/myContext';

const filtering = (id, column, comparison, value) => (
  { id,
    f: (element) => {
      switch (comparison) {
      case 'maior que':
        return Number(element[column]) > Number(value);
      case 'menor que':
        return Number(element[column]) < Number(value);
      case 'igual a':
        return Number(element[column]) === Number(value);
      default:
        return false;
      }
    },
    params: { column, comparison, value },
  }
);

function NumericFilter() {
  const [columnFilter, setColumnFilter] = useState('population');
  const [comparisonFilter, setComparisonFilter] = useState('maior que');
  const [numericFilter, setNumberFilter] = useState('0');
  const {
    addFilter,
    columnOptions,
    setColumnOptions,
    id,
  } = useContext(myContext);

  useEffect(() => {
    setColumnFilter(columnOptions[0] || '');
  }, [columnOptions]);

  const handleColumnFilter = ({ target: { value } }) => {
    setColumnFilter(value);
  };

  const handleComparisonFilter = ({ target: { value } }) => {
    setComparisonFilter(value);
  };

  const handleNumericFilter = ({ target: { value } }) => {
    setNumberFilter(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setColumnOptions((oldState) => oldState.filter((option) => option !== columnFilter));
    addFilter(filtering(id, columnFilter, comparisonFilter, numericFilter));
  };

  return (
    <div>
      {columnOptions.length > 0
      && (
        <form onSubmit={ handleSubmit }>
          <label htmlFor="column">
            <select
              data-testid="column-filter"
              id="column"
              value={ columnFilter }
              onChange={ handleColumnFilter }
            >
              {
                columnOptions.map((option) => (
                  <option key={ option } value={ option }>{option}</option>
                ))
              }
            </select>
          </label>
          <label htmlFor="comparison">
            <select
              data-testid="comparison-filter"
              id="comparison"
              value={ comparisonFilter }
              onChange={ handleComparisonFilter }
            >
              <option value="maior que">maior que</option>
              <option value="menor que">menor que</option>
              <option value="igual a">igual a</option>
            </select>
          </label>
          <label htmlFor="numeric">
            <input
              data-testid="value-filter"
              type="numeric"
              value={ numericFilter }
              onChange={ handleNumericFilter }
            />
          </label>
          <button
            data-testid="button-filter"
            type="submit"
          >
            Filter
          </button>
        </form>
      )}
    </div>

  );
}

export default NumericFilter;
