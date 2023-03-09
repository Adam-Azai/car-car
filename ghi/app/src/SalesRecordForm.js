import React, { useEffect, useState } from 'react';

function SalesRecordForm(){
  const [automobile, setAutomobile] = useState('');
  const [automobiles, setAutomobiles] = useState([]);
  const [salesperson, setSalesperson] = useState('');
  const [customer, setCustomer] = useState('');
  const [sales_price, setSalesPrice] = useState('');

  const handleSubmit = async(event) => {
    event.preventDefault();

    const data = {}

    data.automobile = automobile
    data.salesperson = salesperson
    data.customer = customer
    data.sales_price = sales_price

    const salesRecordUrl ='http://localhost:8090/api/salesrecords/'
    const fetchConfig = {
      method: 'post',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      },
    }
    const salesRecordResponse = await fetch(salesRecordUrl, fetchConfig)
    if (salesRecordResponse.ok) {
      const newSalesRecord = await salesRecordResponse.json()
      setAutomobile('');
      setSalesperson('');
      setCustomer('');
      setSalesPrice('');
    } else {
      console.log('Bad Sales Record Response')
    }
  }
  const handleAutomobileChange = (event) => {
    const value = event.target.value
    setAutomobile(value)
  }

  const handleSalespersonChange = (event) => {
    const value = event.target.value
    setSalesperson(value)
  }

  const handleCustomerChange = (event) => {
    const value = event.target.value
    setCustomer(value)
  }

  const handleSalesPriceChange = (event) => {
    const value = event.target.value
    setSalesPrice(value)
  }

  const fetchModelData = async () => {
    const automobileUrl = 'http://localhost:8090/api/automobilelist/'
    const automobileResponse = await fetch(automobileUrl);
      if (automobileResponse.ok) {
        const automobileData = await automobileResponse.json();
        // if automobileData.automobiles.availability == false
        setAutomobiles(automobileData.automobiles)

      }
  }
  useEffect( () => {
    fetchModelData()
  }, [])
  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h2>Record a new sale</h2>
          <form onSubmit={handleSubmit} id="automobile">

          <div className="form-floating mb-3">
              <select onChange={handleAutomobileChange} value={automobile} id="automobile_id" name="automobile_id" className="form-select">
                <option value=''>Choose an Automobile</option>
                {automobiles.filter(automobile => automobile.availability).map(automobile => {
                  return (
                    <option key={ automobile.id } value={ automobile.id }>
                      {automobile.vin}
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

}//end of function
export default SalesRecordForm
