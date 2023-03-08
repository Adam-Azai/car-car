import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));


async function loadEverything(){
  const manufacturerResponse = await fetch('http://localhost:8100/api/manufacturers/')
  const inventoryResponse = await fetch('http://localhost:8100/api/automobiles/')

  if (manufacturerResponse.ok && inventoryResponse.ok){
    const manufacturerData = await manufacturerResponse.json()
    const inventoryData = await inventoryResponse.json()
    root.render(
      <React.StrictMode>
        <App manufacturers={manufacturerData.manufacturers}  automobiles={inventoryData.autos} />
      </React.StrictMode>
    );
  } else {
    console.error(manufacturerResponse)
  }
}
loadEverything()
