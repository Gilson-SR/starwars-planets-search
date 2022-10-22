import React, { useEffect, useMemo, useState } from 'react';
import { node } from 'prop-types';
import MyContext from './myContext';

const INITIAL_STATE = [
  'population',
  'orbital_period',
  'diameter',
  'rotation_period',
  'surface_water',
];

function Provider({ children }) {
  const [dataAPI, setDataAPI] = useState([]);
  const [planet, setPlanet] = useState('');
  const [filters, setFilters] = useState([]);
  const [id, setID] = useState(0);
  const [columnOptions, setColumnOptions] = useState(INITIAL_STATE);

  useEffect(() => {
    const apiPlanets = async () => {
      try {
        const endPoint = 'https://swapi.dev/api/planets';
        const request = await fetch(endPoint);
        const { results } = await request.json();
        const planets = results.filter((element) => delete element.residents);
        setDataAPI(planets);
      } catch (error) {
        console.log(error);
      }
    };
    apiPlanets();
  }, []);

  const handleNameFilter = ({ target: { value } }) => {
    setPlanet(value);
  };

  const addFilter = (filtering) => {
    setFilters((filter) => [...filter, filtering]);
    setID((pID) => pID + 1);
  };

  const removeFilter = (listFilter, idFilter) => {
    const filterOption = listFilter.find((filter) => filter.id === idFilter)
      .params.column;
    setFilters((oldFilters) => oldFilters.filter((filter) => filter.id !== idFilter));
    setColumnOptions((oldColumnOptions) => [...oldColumnOptions, filterOption]);
  };

  const clearFilters = () => {
    setFilters([]);
    setColumnOptions(INITIAL_STATE);
  };

  const context = useMemo(
    () => ({
      dataAPI,
      planet,
      handleNameFilter,
      addFilter,
      filters,
      columnOptions,
      setColumnOptions,
      clearFilters,
      removeFilter,
      id,
    }),
    [dataAPI, planet, filters, columnOptions, id],
  );

  return <MyContext.Provider value={ context }>{children}</MyContext.Provider>;
}

Provider.propTypes = {
  children: node,
}.isRequired;

export default Provider;
