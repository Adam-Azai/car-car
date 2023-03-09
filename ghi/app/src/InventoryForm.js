import React, { useEffect, useState } from 'react';

function AutomobileForm(){
  const [color, setColor] = useState('');
  const [year, setYear] = useState('');
  const [vin, setVin] = useState('');
  const [model, setModel] = useState('');
  const [models, setModels] = useState([]);

  const handleSubmit = async(event) =>{
    event.preventDefault();

    const data = {}
    data.color = color
    data.year = year
    data.vin = vin
    data.model_id = model
    const automobileUrl = 'http://localhost:8100/api/automobiles/'
    const fetchConfig ={
      method: 'post',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      },
    }
    const automobileResponse = await fetch(automobileUrl, fetchConfig)
    if (automobileResponse.ok) {
      const newAutomobile = await automobileResponse.json()
      setColor('');
      setYear('');
      setVin('');
      setModel('');
    }
  }
  const handleColorChange = (event) => {
    const value = event.target.value
    setColor(value)
  }

  const handleYearChange = (event) => {
    const value = event.target.value
    setYear(value)
  }

  const handleVinChange = (event) => {
    const value = event.target.value
    setVin(value)
  }

  const handleModelChange = (event) => {
    const value = event.target.value
    setModel(value)
  }

  const fetchModelData = async () => {
    const modelUrl = 'http://localhost:8100/api/models/'
    const modelResponse = await fetch(modelUrl);
      if (modelResponse.ok) {
        const modelData = await modelResponse.json();
        setModels(modelData.models)
      }
  }
  useEffect( () => {
    fetchModelData()
  }, [])
  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h2>Add an Automobile to the Inventory</h2>
          <form onSubmit={handleSubmit} id="add-automobile">


            <div className='form-floating mb-3'>
              <input value={color} onChange={handleColorChange} name="name" placeholder="Color" id="name" required type="text" className="form-control" />
              <label> </label>
            </div>

            <div className='form-floating mb-3'>
              <input value={year} onChange={handleYearChange} name="name" placeholder="Year" id="name" required type="text" className="form-control" />
            </div>

            <div className='form-floating mb-3'>
              <input value={vin} onChange={handleVinChange} name="name" placeholder="VIN" id="name" required type="text" className="form-control" />
            </div>


            <div className="form-floating mb-3">
              <select onChange={handleModelChange} value={model} id="model_id" name="auto_id" className="form-select">
                <option value=''>Choose a model</option>
                {models.map(model => {
                  return (
                    <option key={model.id} value={model.id}>
                      {model.name}
                    </option>
                  )
                })}
              </select>
            </div>
            <button className="btn btn-primary">Create</button>

          </form>
        </div>
      </div>
    </div>

  )
}//end of AutomobileForm function
export default AutomobileForm
