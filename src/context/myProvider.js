import React, { useEffect, useMemo, useState } from 'react';
import { node } from 'prop-types';
import MyContext from './myContext';

function Provider({ children }) {
  const [dataAPI, setDataAPI] = useState([]);

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

  const context = useMemo(() => ({
    dataAPI,
  }), [dataAPI]);

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
