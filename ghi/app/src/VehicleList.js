import React, { useEffect, useState } from 'react';



function VehicleList(){
     const[vehicles, setVehicle] = useState([])

     const fetchData = async () => {
        const url = 'http://localhost:8100/api/models/'
        try{
            const response = await fetch(url)
            if(response.ok){
            const data = await response.json()
            setVehicle(data.models)
            }
        } catch (e) {
            console.error(e)
        }
    }

    useEffect( () =>{
        fetchData()
    }, [])

    return (
        <>
        <table className="table table-striped">
        <thead>
          <tr>
            <th>Vehicle models</th>
            <th>Manufacturer</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
            {vehicles.map((vehicle) =>{
                return (
                    <tr key={vehicle.id}>
                        <td>{vehicle.name}</td>
                        <td>{vehicle.manufacturer.name}</td>
                        <td><img src={vehicle.picture_url} className="img-fluid" width="250px" alt="Responsive image"/></td>
                    </tr>
                )
            })}
        </tbody>
        </table>
        </>
    )
}
export default VehicleList;
