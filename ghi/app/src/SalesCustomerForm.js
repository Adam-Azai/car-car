import React, { useState } from 'react'

function SalesCustomerForm() {
  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [phone, setPhone] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {}
    data.name = name
    data.address = address
    data.phone = phone

    const customerUrl = 'http://localhost:8090/api/customers/'
    const fetchConfig = {
      method: 'post',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      },
    }
    const customerResponse = await fetch(customerUrl, fetchConfig)
    if (customerResponse.ok) {
      const newCustomer = await customerResponse.json()
      console.log(newCustomer)
      setName('')
      setAddress('')
      setPhone('')
    } else {
      console.log('Bad Customer Response')
    }
  }
  const handleNameChange = (event) => {
    const value = event.target.value
    setName(value)
  }

  const handleAddressChange = (event) => {
    const value = event.target.value
    setAddress(value)
  }

  const handlePhoneChange = (event) => {
    const value = event.target.value
    setPhone(value)
  }
  return (
    <div className="row">
      <div className="offset-3 col6">
        <div className="shadow p-4 mt-4">
          <h1>Create a Customer</h1>
          <form onSubmit={handleSubmit}>

            <div className="form-cloating mb-3">
              <input value={name} onChange={handleNameChange} name="name" placeholder="Customer Name" id="name" required type="text" className="form-control" />
            </div>

            <div className="form-cloating mb-3">
              <input value={address} onChange={handleAddressChange} name="name" placeholder="Customer Address" id="name" required type="text" className="form-control" />
            </div>

            <div className="form-cloating mb-3">
              <input value={phone} onChange={handlePhoneChange} name="name" placeholder="Customer Phone Number" id="name" required type="text" className="form-control" />
            </div>
          <button className="btn btn-primary">Create</button>
          </form>
        </div>
      </div>
    </div>
  )
}// function end
export default SalesCustomerForm
