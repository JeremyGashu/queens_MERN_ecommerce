import React from 'react';
import './App.css';

function App() {
  fetch('http://localhost:5000/items').then(res => res.json()).then(val => console.log(val)).catch(err => console.log(err))
  return (
    <div className="App">
      Hello
    </div>
  );
}

export default App;
