import React, { useEffect, useMemo, useState } from 'react';
import { node } from 'prop-types';
import MyContext from './myContext';

function Provider({ children }) {
  const [dataAPI, setDataAPI] = useState([]);
  const [planet, setPlanet] = useState('');
  const [filters, setFilters] = useState([]);
  const [id, setID] = useState(0);

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

  const context = useMemo(
    () => ({
      dataAPI,
      planet,
      handleNameFilter,
      addFilter,
      filters,
      id,
    }),
    [
      dataAPI,
      planet,
      filters,
      id,
    ],
  );

  return (
    <MyContext.Provider value={ context }>
      { children }
    </MyContext.Provider>
  );
}

Provider.propTypes = {
  children: node,
}.isRequired;

export default Provider;
