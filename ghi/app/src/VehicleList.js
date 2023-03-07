function VehicleList(props){
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
            {props.vehicles.map((vehicle) =>{
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
