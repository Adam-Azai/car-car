import React, { useState } from 'react'

function SalespersonForm() {
  const [name, setName] = useState('')
  const [employeeNumber, setEmployeeNumber] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {}
    data.name = name
    data.employee_number = employeeNumber

    const salespersonUrl = 'http://localhost:8090/api/salespeople/'
    const fetchConfig = {
      method: 'post',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      },
    }
    const salespersonResponse = await fetch(salespersonUrl, fetchConfig)
    if (salespersonResponse.ok) {


      setName('')
      setEmployeeNumber('')

    }
  }
  const handleNameChange = (event) => {
    const value = event.target.value
    setName(value)
  }

  const handleEmployeeNumberChange = (event) => {
    const value = event.target.value
    setEmployeeNumber(value)
  }

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Create a Salesperson</h1>
          <form onSubmit={handleSubmit}>

            <div className="form-floating mb-3">
              <input value={name} onChange={handleNameChange} name="name" placeholder="Salesperson Name" id="name" required type="text" className="form-control" />
              <label>Sales Person Name</label>
            </div>

            <div className="form-floating mb-3">
              <input value={employeeNumber} onChange={handleEmployeeNumberChange}  placeholder="Employee Number: ex.'xxxxx'" id="name" required type="number" min="-99999" max="99999" className="form-control" />
              <label>Employee Number</label>
            </div>

          <button className="btn btn-primary">Create</button>
          </form>
        </div>
      </div>
    </div>
  )
}
export default SalespersonForm
