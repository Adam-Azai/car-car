import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import ManufacturerList from './ManufacturerList';
import VehicleList from './VehicleList';
import ManufacturerForm from './ManufacturerForm';
import InventoryList from './InventoryList';

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
          <Route path="inventory">
            <Route path='' element={<InventoryList automobiles={props.automobiles} />}  />
          </Route>
          <Route path='manufacturers'>
            <Route path="" element={<ManufacturerList manufacturers={props.manufacturers} />}  />
            <Route path="new" element={<ManufacturerForm />} />
            </Route>

        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
