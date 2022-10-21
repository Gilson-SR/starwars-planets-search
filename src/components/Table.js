import React, { useContext } from 'react';
import myContext from '../context/myContext';

function Table() {
  const { dataAPI, planet } = useContext(myContext);

  const filterPlanet = (element) => element.name.toUpperCase()
    .includes(planet.toUpperCase());

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Rotation Period</th>
          <th>Orbital Period</th>
          <th>Diameter</th>
          <th>Climate</th>
          <th>Gravity</th>
          <th>Terrain</th>
          <th>Surface Water</th>
          <th>Population</th>
          <th>Films</th>
          <th>Created</th>
          <th>Edited</th>
          <th>URL</th>
        </tr>
      </thead>
      <tbody>
        {
          dataAPI?.filter(filterPlanet).map((element) => (
            <tr key={ element.name }>
              <td>{ element.name }</td>
              <td>{ element.rotation_period }</td>
              <td>{ element.orbital_period }</td>
              <td>{ element.diameter }</td>
              <td>{ element.climate }</td>
              <td>{ element.gravity }</td>
              <td>{ element.terrain }</td>
              <td>{ element.surface_water }</td>
              <td>{ element.population }</td>
              <td>
                {
                  element.films.map((url) => (
                    <span key={ url }>
                      <a href={ url }>{ url }</a>
                    </span>
                  ))
                }
              </td>
              <td>{ element.created }</td>
              <td>{ element.edited }</td>
              <td>
                <a href={ element.url }>{ element.url }</a>
              </td>
            </tr>
          ))
        }
      </tbody>
    </table>
  );
}

export default Table;
