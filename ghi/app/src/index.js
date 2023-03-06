import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));




async function loadEverything(){
  const manufacturerResponse = await fetch('http://localhost:8100/api/manufacturers/')

  if (manufacturerResponse.ok){
    const data = await manufacturerResponse.json()
    root.render(
      <React.StrictMode>
        <App manufacturers={data.manufacturers} />
      </React.StrictMode>
    );
  } else {
    console.error(manufacturerResponse)
  }
}
loadEverything()
