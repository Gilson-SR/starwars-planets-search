import React, { useContext } from 'react';
import myContext from '../context/myContext';

function NameFilter() {
  const { planet, handleChange } = useContext(myContext);
  return (
    <label htmlFor="name">
      <input
        data-testid="name-filter"
        id="name"
        value={ planet }
        onChange={ handleChange }
      />
    </label>
  );
}

export default NameFilter;
