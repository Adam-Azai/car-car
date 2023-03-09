import React, { useEffect, useState } from 'react';

function SalesRecordList() {
  const [records, setRecords] = useState([]);
  const [salespeople, setSalespeople] = useState([]);
  const [salespersonId, setSalespersonId] = useState('');


  const fetchSalesRecords = async () => {
    const url = 'http://localhost:8090/api/salesrecords/';
    try {
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setRecords(data.salesrecords);
      }
    } catch (e) {
      console.error(e);
    }
  };


  const fetchSalespeople = async () => {
    const url = 'http://localhost:8090/api/salespeople';
    try {
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setSalespeople(data.salespeople);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchSalesRecords();
    fetchSalespeople();
  }, []);


  const handleSalespersonChange = (event) => {
    const salespersonId = event.target.value;
      setSalespersonId(salespersonId);
  };

  // how to is "? in react js = ternary operator // check if the id is a truthy value it will set the original (unfulktered), if false/ then return original array
  //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator
  // this code is causing ESLint warnings in my terminal... due to the nature of soft comparison ...
  const filteredRecords = salespersonId ? records.filter((record) => record.salesperson.id == salespersonId) : records;


  return (
    <>
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-1 mt-1"></div>
        <label>Filter by Salesperson:</label>
    <select className="form-control" value={salespersonId} onChange={handleSalespersonChange}>
      <option value="">All Sales</option>
      {salespeople.map((salesperson) => (
        <option key={salesperson.id} value={salesperson.id}>
          {salesperson.name}
        </option>
      ))}
    </select>
          </div>
        </div>
    <table className="table table-striped">
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
        {filteredRecords.map((record) => (
          <tr key={record.id}>
            <td>{record.salesperson.name}</td>
            <td>{record.salesperson.employee_number}</td>
            <td>{record.customer.name}</td>
            <td>{record.automobile.vin}</td>
            <td>{record.sales_price}</td>
          </tr>
        ))}
      </tbody>
    </table>
    </>
  );
}// end of function
export default SalesRecordList;
