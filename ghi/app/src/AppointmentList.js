function ServiceAppointmentList(){
    return (
        <>
        <table className="table table-striped">
        <thead>
          <tr>
            <th>Customer</th>
            <th>VIP</th>
            <th>Date and Time of Appointment</th>
            <th>Reason for Service</th>
            <th>Vehicle Identification Number</th>
            <th>Technician</th>
          </tr>
        </thead>
        <tbody>
            {/* {props.manufacturers.map((manufacturer) =>{
                return (
                    <tr key={}>
                        <td>{manufacturer.name}</td>
                    </tr>
                )
            })} */}
        </tbody>
        </table>
        </>
    )
}
export default ServiceAppointmentList
