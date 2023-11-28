// App.js
import React from 'react';
import FormBarang from './components/formBarang';
// import FormUpdateBarang from './components/FormUpdateBarang';
import ViewDataBarang from './components/ViewDataBarang';
import FormKasir from './components/formKasir';
import ViewDataKasir from './components/ViewDataKasir';
import FormTenan from './components/formTenan';
import ViewDataTenan from './components/ViewDataTenan';


function App() {
  return (
    <div>
      <h1>Assessment Deo</h1>
      {/* Add other components as needed */}
      <FormBarang />
      {/* <FormUpdateBarang /> */}
      <ViewDataBarang />
      <FormKasir />
      <ViewDataKasir />
      <FormTenan />
      <ViewDataTenan />

    </div>
  );
}

export default App;
