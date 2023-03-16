import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import ManufacturerList from './ManufacturerList';
import VehicleList from './VehicleList';
import ManufacturerForm from './ManufacturerForm';
import VehicleForm from './VehicleForm';
import InventoryList from './InventoryList';
import Technician from './Technician';
import ServiceAppointmentList from './AppointmentList';
import AutomobileForm from './InventoryForm';
import SalesCustomerForm from './SalesCustomerForm';
import SalespersonForm from './SalespersonForm';
import SalesRecordList from './SalesRecordsList';
import SalesRecordForm from './SalesRecordForm';

import AppointmentForm from './AppointmentForm';
import History from './ServiceHistory';
function App(props) {
  return (
    <BrowserRouter>
      <Nav />
      <div >
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path='vehicles'>
            <Route path='' element={<VehicleList/>} />
            <Route path='new' element={<VehicleForm />} />
          </Route>
          <Route path="inventory">
            <Route path='' element={<InventoryList />}  />
            <Route path='new' element={<AutomobileForm automobiles={props.vehicles} />} />
          </Route>
          <Route path="appointments">
            <Route path="" element={<ServiceAppointmentList/>} />
            <Route path='new' element={<AppointmentForm/>} />
          </Route>
          <Route path='manufacturers'>
            <Route path="" element={<ManufacturerList />}  />
            <Route path="new" element={<ManufacturerForm />} />
          </Route>
          <Route path='technician' element={<Technician/>}/>
          <Route path="customer/new" element={<SalesCustomerForm/>}/>
          <Route path="salesperson/new" element={<SalespersonForm/>}/>
          <Route path="salesrecords">
            <Route path="" element={<SalesRecordList/>} />
            <Route path="new" element={<SalesRecordForm/>}/>
          </Route>
          <Route path="records" element={<History/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
