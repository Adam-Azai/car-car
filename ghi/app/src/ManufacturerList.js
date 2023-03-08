import React, { useEffect, useState } from 'react';

function ManufacturerList(){
    const [manufacturers, setManufacturer] = useState([])

    const fetchData = async () => {
        const url = 'http://localhost:8100/api/manufacturers/'
        try{
            const response = await fetch(url)
            if(response.ok){
                const data = await response.json()
                setManufacturer(data.manufacturers)
            }
        } catch (e){
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
            <th>Manufacturer</th>
          </tr>
        </thead>
        <tbody>
            {manufacturers.map((manufacturer) =>{
                return (
                    <tr key={manufacturer.id}>
                        <td>{manufacturer.name}</td>
                    </tr>
                )
            })}
        </tbody>
        </table>
        </>
    )
}
export default ManufacturerList;
