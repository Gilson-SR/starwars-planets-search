import React, { useEffect, useMemo, useState } from 'react';
import { node } from 'prop-types';
import MyContext from './myContext';

function Provider({ children }) {
  const [dataAPI, setDataAPI] = useState([]);
  const [planet, setPlanet] = useState('');
  const [columnFilter, setColumnFilter] = useState('population');
  const [numericFilter, setNumericFilter] = useState('0');
  const [comparisonFilter, setComparisonFilter] = useState('maior que');
  const [activeColumnFilter, setActiveColumnFilter] = useState(false);

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

  const handleColumnFilter = ({ target: { value } }) => {
    setColumnFilter(value);
  };

  const handleNumericFilter = ({ target: { value } }) => {
    setNumericFilter(value);
  };

  const handleComparisonFilter = ({ target: { value } }) => {
    setComparisonFilter(value);
  };

  const toggleColumnFilter = () => setActiveColumnFilter(true);

  const context = useMemo(
    () => ({
      dataAPI,
      planet,
      handleNameFilter,
      columnFilter,
      handleColumnFilter,
      comparisonFilter,
      handleComparisonFilter,
      numericFilter,
      handleNumericFilter,
      activeColumnFilter,
      toggleColumnFilter,
    }),
    [dataAPI, planet, columnFilter, comparisonFilter, numericFilter, activeColumnFilter],
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
