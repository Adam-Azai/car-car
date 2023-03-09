import React, { useEffect, useState } from 'react'

function SalesRecordList() {
  const [records, setRecords] = useState([])
  // const [id, setId] = useState =([])

  const fetchData = async () => {
    const recordsUrl = 'http://localhost:8090/api/salesrecords/'
    // const employeeRecordUrl = `http://localhost:8090/api/salesrecords/${id}`
    try {
      // const employeeResponse = await fetch(employeeRecordUrl)
      // if(employeeResponse.ok) {
      //   const data = await employeeResponse.json()
      //   setId(data.employeeRecords)
      // }

      const response = await fetch(recordsUrl)
      if(response.ok) {
        const data = await response.json()
        setRecords(data.salesrecords)
      }
    } catch(e){
      console.error(e)
    }
  }
  useEffect(() =>{
    fetchData()
}, [])

  return (
    <>

    <table className="table table-striped">
    <select class="form-control">
      <option>Filter by Salesperson</option>
    </select>
      <thead>
        <tr>
          <th>Salesperson</th>
          <th>Employee #</th>
          <th>Purchaser</th>
          <th>VIN</th>
          <th>Sale Price</th>
        </tr>
      </thead>
      <tbody>
        {records.map( (record) => {
          return (
            <tr key={record.id}>
              <td>{ record.salesperson.name }</td>
              <td>{ record.salesperson.employee_number }</td>
              <td>{ record.customer.name }</td>
              <td>{ record.automobile.vin }</td>
              <td>{ record.sales_price}</td>
            </tr>
          )
        }
        )}
      </tbody>
    </table>

    </>//end of fragment
  )//end of return



}//end of function
export default SalesRecordList
