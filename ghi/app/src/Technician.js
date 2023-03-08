import React, { useState} from 'react'

function Technician() {
    const [technicianName, setTechnicianName] = useState('')
    const [employeeNumber, setID] = useState('')

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {}
        console.log(data)
        data.technician_name = technicianName
        data.employee_number = employeeNumber
        const technicianUrl = "http://localhost:8080/api/technicians/"
        const fetchConfig = {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json/'
            },
        };
        const technicianResponse = await fetch(technicianUrl, fetchConfig)
        if (technicianResponse.ok){
            const newTechnician = await technicianResponse.json()
            setTechnicianName("");
            setID("");
            alert(`${technicianName} has been added to our Employee Directory`)
            console.log(newTechnician)
        } else{
            console.log('why')
        }
    }
    const handleTechnicianChange= (event) => {
        const value = event.target.value
        setTechnicianName(value)
    }
    const handleIDChange =(event) => {
        const value = event.target.value
        setID(value)

    }
    return(
        <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Create a Technician</h1>
            <form onSubmit={handleSubmit} id="create-technician-form">
              <div className="form-floating mb-3">
                <input onChange={handleTechnicianChange} value={technicianName} placeholder="Technician Name" required type="text" id="technician_name"  name="technician_name" className="form-control"/>
                <label htmlFor="technician_name">Technician's Name</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange={handleIDChange} value={employeeNumber} placeholder="ID" required type="text" id="employee_number" name="employee_number" className="form-control"/>
                <label htmlFor="employee_number">Employee ID</label>
              </div>
              <div className='text-center'>
              <button type="submit" className="btn btn-primary">Create</button>
              </div>
            </form>
         </div>
        </div>
        </div>
    )
}
export default Technician
