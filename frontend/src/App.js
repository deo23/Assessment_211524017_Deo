// App.js
import React from 'react';
import FormBarang from './components/formBarang';
// import FormUpdateBarang from './components/FormUpdateBarang';
import ViewDataBarang from './components/ViewDataBarang';

function App() {
  return (
    <div>
      <h1>My Mini Market App</h1>
      {/* Add other components as needed */}
      <FormBarang />
      {/* <FormUpdateBarang /> */}
      <ViewDataBarang />
    </div>
  );
}

export default App;
