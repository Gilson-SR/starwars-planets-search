import React, { useContext } from 'react';
import myContext from '../context/myContext';

function NumericFilter() {
  const {
    columnFilter,
    handleColumnFilter,
    numericFilter,
    handleNumericFilter,
    comparisonFilter,
    handleComparisonFilter,
    toggleColumnFilter,
  } = useContext(myContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    toggleColumnFilter();
  };

  return (
    <form onSubmit={ handleSubmit }>
      <label htmlFor="column">
        <select
          data-testid="column-filter"
          id="column"
          value={ columnFilter }
          onChange={ handleColumnFilter }
        >
          <option value="population">population</option>
          <option value="orbital_period">orbital_period</option>
          <option value="diameter">diameter</option>
          <option value="rotation_period">rotation_period</option>
          <option value="surface_water">surface_water</option>
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
  );
}

export default NumericFilter;
