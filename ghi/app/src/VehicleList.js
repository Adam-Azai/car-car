import React, { useEffect, useState } from 'react';

function VehicleCard(props){
    return(
        <div className='col-sm'>
            {props.list.map(vehicle => {
                return (
                    <div key ={vehicle.id} className="card text-center mb-0 mt-5 shadow">
                        <img src={vehicle.picture_url} className="card-img-top" />
                        <div className='card-body'>
                            <h5 className="card-title">{vehicle.name}</h5>
                            <p className="card-text"><small className="text-muted">{vehicle.manufacturer.name}</small></p>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

function VehicleList(){
     const[vehicles, setVehicle] = useState([],)
     const [vehicleCard, setVehicleCards] = useState([],[],[],[])

     const fetchData = async () => {
        const url = 'http://localhost:8100/api/models/'
        try{
            const response = await fetch(url)
            if(response.ok){
            const data = await response.json()
            setVehicle(data.models)



            const requests = [];
            for (let model of data.models) {
              const detailUrl = `http://localhost:8100${model.href}`;
              requests.push(fetch(detailUrl));
            }
            // Wait for all of the requests to finish
            // simultaneously
            const responses = await Promise.all(requests);
            // Set up the "columns" to put the conference
            // information into
            const columns = [[], [], [], []];
            // Loop over the conference detail responses and add
            // each to to the proper "column" if the response is
            // ok
            let i = 0;
            for (const modelResponse of responses) {
              if (modelResponse.ok) {
                const details = await modelResponse.json();
                columns[i].push(details);
                i = i + 1;
                if (i > 3) {
                  i = 0;
                }
              } else {
                console.error(modelResponse);
              }
            }

            // Set the state to the new list of three lists of
            // conferences
            setVehicleCards(columns);

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
        <div className="custom-container" id='rat' >
        <h2 className='text-center mt-3'>All Available Car Models</h2>
        <div className="row ">
            {vehicleCard.map((vehicleList, index) =>{
                return (
                    <VehicleCard key={index} list={vehicleList} />
                )
            })}
        </div>
        </div>
        </>
    )
}
export default VehicleList;


         {/* <table className="table table-striped">
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
        </table> */}
