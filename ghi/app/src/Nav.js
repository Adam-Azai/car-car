import { NavLink } from 'react-router-dom';
import "./index.css"


function Nav() {
  return (
    <>
    <nav className="navbar navbar-expand-lg navbar-dark">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">CarCar</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <div className="dropdown">
          <button className="btn dropdown-toggle text-white " type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" >
            Manufacturer
          </button>
          <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <NavLink className="dropdown-item nav-link dropdown-item text-dark" to="manufacturers">Manufacturers</NavLink>
            <NavLink className="nav-link dropdown-item text-dark" to="/manufacturers/new">Create a manufacturer</NavLink>
          </div>
          </div>
          <div className="dropdown">
          <button className="btn dropdown-toggle text-white " type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" >
            Vehicles
          </button>
          <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <NavLink className="nav-link dropdown-item text-dark" to="vehicles">Vehicles</NavLink>
            <NavLink className="nav-link dropdown-item text-dark" to="vehicles/new">Create a Vehicle</NavLink>
          </div>
          </div>
          <div className="dropdown">
          <button className="btn dropdown-toggle text-white " type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" >
            Inventory
          </button>
          <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <NavLink className='nav-link dropdown-item text-dark' to="inventory">Inventory</NavLink>
            <NavLink className="nav-link dropdown-item text-dark" to="inventory/new">Add to inventory</NavLink>
          </div>
          </div>
          <div className="dropdown">
          <button className="btn dropdown-toggle text-white " type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" >
            Appointments
          </button>
          <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <NavLink className='nav-link dropdown-item text-dark' to='appointments'>View Appointments</NavLink>
            <NavLink className="nav-link dropdown-item text-dark" to="appointments/new">Schedule a Service Appointment</NavLink>
          </div>
          </div>
          <div className="dropdown">
          <button className="btn dropdown-toggle text-white " type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" >
            Record of Sales
          </button>
          <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <NavLink className='nav-link dropdown-item text-dark text-center' to="salesrecords">Sales Records</NavLink>
            <NavLink className="nav-link dropdown-item text-dark text-center"  to="salesrecords/new">Record a Sale</NavLink>
          </div>
          </div>
          <li>
              <NavLink className='nav-link' to='records'>Service History</NavLink>
          </li>
          <li>
              <NavLink className='nav-link' to="technician">Register a Technician</NavLink>
          </li>
          <li>
              <NavLink className='nav-link' to="customer/new">Create Customer</NavLink>
          </li>
          <li>
              <NavLink className='nav-link' to="salesperson/new">Create Salesperson</NavLink>
          </li>

          </ul>
        </div>
      </div>
    </nav>

  {/* <div className="container foot">
  <footer className="py-5">
    <div className="row">
      <div className="col-6 col-md-2 mb-3">
        <h5>Section</h5>
        <ul className="nav flex-column">
          <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-muted">Home</a></li>
          <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-muted">Features</a></li>
          <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-muted">Pricing</a></li>
          <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-muted">FAQs</a></li>
          <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-muted">About</a></li>
        </ul>
      </div>

      <div className="col-6 col-md-2 mb-3">
        <h5>Section</h5>
        <ul className="nav flex-column">
          <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-muted">Home</a></li>
          <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-muted">Features</a></li>
          <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-muted">Pricing</a></li>
          <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-muted">FAQs</a></li>
          <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-muted">About</a></li>
        </ul>
      </div>

      <div className="col-6 col-md-2 mb-3">
        <h5>Section</h5>
        <ul className="nav flex-column">
          <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-muted">Home</a></li>
          <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-muted">Features</a></li>
          <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-muted">Pricing</a></li>
          <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-muted">FAQs</a></li>
          <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-muted">About</a></li>
        </ul>
      </div>

    </div>
  </footer>
  </div> */}
    </>
  )
}

export default Nav;
