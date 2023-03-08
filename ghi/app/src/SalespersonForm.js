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
      const newSalesperson = await salespersonResponse.json()
      console.log(newSalesperson)
      setName('')
      setEmployeeNumber('')

    } else {
      console.log('Bad Salesperson Response')
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

            <div className="form-cloating mb-3">
              <input value={name} onChange={handleNameChange} name="name" placeholder="Salesperson Name" id="name" required type="text" className="form-control" />
            </div>

            <div className="form-cloating mb-3">
              <input value={employeeNumber} onChange={handleEmployeeNumberChange} name="name" placeholder="Employee Number" id="name" required type="text" className="form-control" />
            </div>

          <button className="btn btn-primary">Create</button>
          </form>
        </div>
      </div>
    </div>
  )
}
export default SalespersonForm
