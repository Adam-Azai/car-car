import React, { useState, useEffect, useRef, Component } from 'react';
// import { Messages } from 'primereact/messages';

function ManufacturerForm() {

  const [manufacturer, setManufacturer] = useState('');


  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {};
    data.name = manufacturer

    const manufacturerUrl ='http://localhost:8100/api/manufacturers/';
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    }
    const response = await fetch(manufacturerUrl, fetchConfig);
    if (response.ok) {
      const newManufacturer = await response.json();
      setManufacturer('');
    }
  }

  const handleManufacturerChange = event => {
    const value = event.target.value
    setManufacturer(value)
  }

//   const successMessage = () => {
//     msg.current.show([
//         { severity: 'success', summary: 'Success', detail: 'Message Content', sticky: true},
//     ]);
// };



return (
  <>

  <div className="container-fluid" id="manufacturer-form">
  <div className="shadow-lg p-3 mb-5 bg-body-tertiary rounded">
  <div className="row">
  <div className="col-md-6" >
  <img className='img-fluid' src="https://media.designrush.com/articles/1651/conversions/_1526480503_147_car-preview.jpg"  />
  </div>
  <div className="col-md-5 text-center" id="create-manufacturer" >
  <div className="little-bit-down">
      <h4 className='text-center'>Create a manufacturer</h4>
  <form onSubmit={handleSubmit}>
          <div className="form-floating mb-3">
            <input value={manufacturer} onChange={handleManufacturerChange}  placeholder="name" required type="text" className="form-control" name="name"/>
            <label>Manufacturers</label>
          </div>
          <button  className="btn btn-primary">Create</button>
        </form>
        </div>
  </div>
    </div>
    </div>
    </div>
    </>
)
}; // end

export default ManufacturerForm;
