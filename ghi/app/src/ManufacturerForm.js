import React, { useState } from 'react';

function ManufacturerForm(props) {
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
      console.log(newManufacturer)
      setManufacturer('');
    }
  }

  const handleManufacturerChange = event => {
    const value = event.target.value
    setManufacturer(value)
  }


return (
  <div className="row">
    <div className="offset-3 col-6">
      <div className="shadow p-4 mt-4">
      <h2>Create a manufacturer</h2>
      <form id="create-manufacturer" onSubmit={handleSubmit}>
          <div className="form-floating mb-3">
            <input value={manufacturer} onChange={handleManufacturerChange}  placeholder="name" required type="text" className="form-control" name="name"/>
            <label>Manufacturers</label>
          </div>
          <button className="btn btn-primary">Create</button>
        </form>
      </div>
    </div>
  </div>

)

}; // end

export default ManufacturerForm;
