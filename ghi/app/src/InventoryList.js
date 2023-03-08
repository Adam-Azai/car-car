import React, {useEffect, useState} from 'react'

function InventoryList() {
  const [autos, setAutomobile] = useState([])

  const fetchData = async () => {
    const automobileUrl = 'http://localhost:8100/api/automobiles/'
    try{
      const response = await fetch(automobileUrl)
        if(response.ok){
          const data = await response.json()
          setAutomobile(data.autos)
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
      <thead>
        <tr>
          <th>VIN</th>
          <th>Color</th>
          <th>Year</th>
          <th>Model</th>
          <th>Manufacturer</th>
        </tr>
      </thead>
      <tbody>
        {autos.map((auto) =>{
          return (
            <tr key={auto.id}>
              <td>{auto.vin}</td>
              <td>{auto.color}</td>
              <td>{auto.year}</td>
              <td>{auto.model.name}</td>
              <td>{auto.model.manufacturer.name}</td>
            </tr>
          )
        })}
      </tbody>
    </table>
    </>
  )
}

export default InventoryList;
