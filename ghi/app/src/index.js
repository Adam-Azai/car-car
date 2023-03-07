import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));




async function loadEverything(){
  const manufacturerResponse = await fetch('http://localhost:8100/api/manufacturers/')
  const vehicleResponse = await fetch('http://localhost:8100/api/models/')
  if (manufacturerResponse.ok && vehicleResponse.ok){
    const manufacturerData = await manufacturerResponse.json()
    const vehicleData = await vehicleResponse.json()
    root.render(
      <React.StrictMode>
        <App manufacturers={manufacturerData.manufacturers} vehicles={vehicleData.models} />
      </React.StrictMode>
    );
  } else {
    console.error(manufacturerResponse)
  }
}
loadEverything()
