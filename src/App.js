import React from 'react';
import './App.css';
import Table from './components/Table';
import Provider from './context/myProvider';
import Filters from './components/Filters';
import RemoveFilters from './components/RemoveFilters';

function App() {
  return (
    <Provider>
      <Filters />
      <RemoveFilters />
      <Table />
    </Provider>
  );
}

export default App;
