import React from 'react';
import './App.css';
import Lines from './charts/lines'
import Pie from './charts/pie'
import Sunburst from './charts/sunburst'

function App() {

  return (
    <div className="App">
      <Lines></Lines>
      <Pie></Pie>
      <Sunburst></Sunburst>
    </div>
  );

}

export default App;
