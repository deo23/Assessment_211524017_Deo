// App.js
import React from 'react';
import FormBarang from './components/formBarang';
// import FormUpdateBarang from './components/FormUpdateBarang';
import ViewDataBarang from './components/ViewDataBarang';
import FormKasir from './components/formKasir';
import ViewDataKasir from './components/ViewDataKasir';

function App() {
  return (
    <div>
      <h1>My Mini Market App</h1>
      {/* Add other components as needed */}
      <FormBarang />
      {/* <FormUpdateBarang /> */}
      <ViewDataBarang />
      <FormKasir />
      <ViewDataKasir />
    </div>
  );
}

export default App;
