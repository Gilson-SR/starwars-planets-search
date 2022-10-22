import React, { useContext } from 'react';
import myContext from '../context/myContext';

function NameFilter() {
  const { planet, handleNameFilter } = useContext(myContext);
  return (
    <label htmlFor="name">
      <input
        data-testid="name-filter"
        id="name"
        value={ planet }
        onChange={ handleNameFilter }
      />
    </label>
  );
}

export default NameFilter;
