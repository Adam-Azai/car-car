import React, {useEffect, useState} from 'react'

function ServiceAppointmentList(){
    const [appointments, setAppointment]= useState([])



    const fetchData = async () => {
        const url = 'http://localhost:8080/api/appointments'
        try{
            const response = await fetch(url)
            if(response.ok){
                const data = await response.json()
                setAppointment(data.appointments)
            }
        } catch (e){
            console.error(e)
        }
    }
    useEffect(() =>{
        fetchData()
    }, [])


    const vip = async () => {
        if (appointments.vip == true){
            return (<img src="https://cdn-icons-png.flaticon.com/512/3557/3557655.png"/> )
        }
    }

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
            {appointments.map((appointment) =>{
                return (
                    <tr key={appointment.id}>
                        <td>{appointment.owner_name}</td>
                        {appointment.vip == true &&
                            <td><img src='https://cdn-icons-png.flaticon.com/512/3557/3557655.png' width="40px"/></td>
                        }
                        {appointment.vip == false &&
                            <td><img src="https://st.depositphotos.com/1054979/3064/v/450/depositphotos_30640773-stock-illustration-loser-stamp.jpg" width="60px"/></td>
                        }
                    </tr>
                )
            })}
        </tbody>
        </table>
        </>
    )
}
export default ServiceAppointmentList
