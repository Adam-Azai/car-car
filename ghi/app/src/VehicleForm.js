import React, {useState, useEffect} from 'react'

function VehicleForm(){
    const [manufacturers, setManufacturers] = useState([]);
    const [manufacturer, setManufacturer] = useState('');
    const [name, setVehicle] = useState('');
    const [image, setImage] = useState('');

    const handleSubmit = async(event) =>{
        event.preventDefault()
        const data = {};
        console.log(data)
        data.name = name
        data.picture_url = image
        data.manufacturer_id = manufacturer
        const vehicleUrl = 'http://localhost:8100/api/models/'
        const fetchConfig ={
            method:'post',
            body: JSON.stringify(data),
            headers: {
                'Content-type':'application/json'
          },
        }
        const vehicleResponse = await fetch(vehicleUrl, fetchConfig)
        if (vehicleResponse.ok){
            const newVehicle = await vehicleResponse.json()
            console.log(newVehicle)
            setManufacturer('');
            setImage('');
            setVehicle('');
        } else {
            console.log('fail')
        }
        console.log(data)
    }

    const handleVehicleChange = (event) => {
        const value = event.target.value
        setVehicle(value)
    }
    const handleImageChange = (event) => {
        const value = event.target.value
        setImage(value)
    }
    const handleManufacturerChange = (event) => {
        const value = event.target.value
        setManufacturer(value)
    }



    // function below grabs the list of manufacturers so the drop down select can display the manufacturers we have in our database
    const  fetchManufacturerData = async () => {
        const manufacturerUrl = 'http://localhost:8100/api/manufacturers/'
        const manufacturerResponse = await fetch(manufacturerUrl);
            if (manufacturerResponse.ok){
                const manufacturerData = await manufacturerResponse.json()
                setManufacturers(manufacturerData.manufacturers)
            }
        }

    useEffect( () => {
        fetchManufacturerData()
    }, [])

    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className='shadow p-4 mt-4'>
                    <h2>Create a Vehicle</h2>
                <form onSubmit={handleSubmit} id="create-vehicle">
                    <div className="form-floating mb-3">
                        <input value={name} onChange={handleVehicleChange} name="name" placeholder="Vehicle Name" id='name' required type="text" className="form-control" />
                        <label htmlFor='name'>Vehicle Model Name</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input value={image} onChange={handleImageChange} name="picture_url" placeholder="Vehicle Picture" id="image" required type="url" className="form-control"/>
                        <label htmlFor="image">Vehicle Image</label>
                    </div>
                    <div className="form-floating mb-3">
                        <select onChange={handleManufacturerChange} value={manufacturer} id="manufacturer_id" name="manufacturer_id" className="form-select">
                            <option value=''>Vehicle's Manufacturer</option>
                            {manufacturers.map(manufacturer => {
                                return (
                                    <option key={manufacturer.id} value={manufacturer.id}>
                                        {manufacturer.name}
                                    </option>
                                )
                            })}
                        </select>
                    </div>
                    <button className="btn btn btn-primary">Create Vehicle</button>
                </form>
                </div>
            </div>
        </div>
    )
}
export default VehicleForm
