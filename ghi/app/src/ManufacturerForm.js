import React, { useState, useEffect, useRef } from 'react';
import { Messages } from 'primereact/messages'

function ManufacturerForm() {
  const [manufacturer, setManufacturer] = useState('');
  const msg = useRef(null)

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

  const successMessage = () => {
    msg.current.show([
        { severity: 'success', summary: 'Success', detail: 'Message Content', sticky: true},
    ]);
};

return (
  <>
  <div className="row center" id="manufacturer" >
  <div className="shadow p-5">
  <img src="https://media.designrush.com/articles/1651/conversions/_1526480503_147_car-preview.jpg"  />
  <div className="col" id='create-manufacturer'>
      <h2>Create a manufacturer</h2>
      <form onSubmit={handleSubmit}>
          <div className="form-floating mb-3">
            <input value={manufacturer} onChange={handleManufacturerChange}  placeholder="name" required type="text" className="form-control" name="name"/>
            <label>Manufacturers</label>
          </div>
          <button onClick={successMessage} className="btn btn-primary">Create</button>
        </form>
      </div>
    </div>
  </div>
    </>
)
}; // end

export default ManufacturerForm;
