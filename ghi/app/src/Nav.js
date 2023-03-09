import { NavLink } from 'react-router-dom';

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">CarCar</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li>
            <NavLink className="nav-link" to="manufacturers">Manufacturers</NavLink>
            </li>
            <li>
              <NavLink className="nav-link" to="/manufacturers/new">Create a manufacturer</NavLink>
            </li>
            <li>
              <NavLink className='nav-link' to="vehicles">Vehicles</NavLink>
            </li>
            <li>
              <NavLink className='nav-link' to="vehicles/new">Create a Vehicle</NavLink>
            </li>
            <li>
              <NavLink className='nav-link' to='appointments'>View Appointments</NavLink>
            </li>
            <li>
              <NavLink className='nav-link' to='appointments/new'>Create an Appointment</NavLink>
            </li>
            <li>
              <NavLink className='nav-link' to="inventory">Inventory</NavLink>
            </li>
            <li>
              <NavLink className='nav-link' to="technician">Technician</NavLink>
            </li>
            <li>
              <NavLink className='nav-link' to="inventory/new">Add to inventory</NavLink>
            </li>
            <li>
              <NavLink className='nav-link' to='records'>Service History</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Nav;
