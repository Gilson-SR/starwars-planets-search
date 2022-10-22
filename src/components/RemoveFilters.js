import React, { useContext } from 'react';
import myContext from '../context/myContext';

function RemoveFilters() {
  const { filters, clearFilters, removeFilter } = useContext(myContext);

  const handleClearAllFilters = () => {
    clearFilters();
  };

  const handleRemoveFilter = (id) => {
    removeFilter(filters, id);
  };

  return (
    <section>
      <div>
        {
          filters.map(({ id, params }) => (
            <div
              data-testid="filter"
              key={ id }
            >
              <span>
                {`${params.column} ${params.comparison} ${params.value} `}
              </span>
              <button
                type="button"
                onClick={ () => handleRemoveFilter(id) }
              >
                Remove Filter
              </button>
            </div>
          ))
        }
      </div>
      {
        filters.length > 0
        && (
          <button
            data-testid="button-remove-filters"
            type="button"
            onClick={ handleClearAllFilters }
          >
            Remove All Filters
          </button>
        )
      }
    </section>
  );
}

export default RemoveFilters;
