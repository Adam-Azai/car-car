import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import ManufacturerList from './ManufacturerList';
import VehicleList from './VehicleList';



function App(props) {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path='manufacturers' element={<ManufacturerList manufacturers={props.manufacturers} />}  />
          <Route path='vehicles'>
            <Route path='' element={<VehicleList vehicles={props.vehicles} />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
