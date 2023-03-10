import React, {useEffect, useState} from 'react'

function ServiceAppointmentList(){
    const [appointments, setAppointments]= useState([])
    const fetchData = async () => {
        const url = 'http://localhost:8080/api/appointments'
        try{
            const response = await fetch(url)
            if(response.ok){
                const data = await response.json()
                setAppointments(data.appointments)
            }
        } catch (e){
            console.error(e)
        }
    }
    useEffect(() =>{
        fetchData()
    }, [])
    const cancel = (id) => async() => {
        const statusUrl = `http://localhost:8080/api/appointments/${id}/`
        const fetchConfig = {
            method:"put",
            body: JSON.stringify({}),
            headers: {
                'Content-Type':'application/json'
            }
        }
        const statusResponse = await fetch(statusUrl, fetchConfig)
        if (statusResponse.ok){
            const updated = await statusResponse.json()
            fetchData()
        }
    }


    const table = appointments.map((appointment) => {
        return  (
            <tbody  key= {appointment.id} >
                        {appointment.status == false && <tr>
                        <td>{appointment.owner_name}</td>
                        {appointment.vip == true && <td><img src='https://cdn-icons-png.flaticon.com/512/3557/3557655.png' width="40px"/></td>}
                        {appointment.vip == false && <td><img src="https://st.depositphotos.com/1054979/3064/v/450/depositphotos_30640773-stock-illustration-loser-stamp.jpg" width="60px"/></td>}
                        <td>{new Date(appointment.date).toLocaleDateString('en-US')}</td>
                        <td>{String(appointment.time)}</td>
                        <td>{appointment.reason}</td>
                        <td>{appointment.vin}</td>
                        <td>{appointment.technician.technician_name}</td>
                        {appointment.status == false && <td>Unfinished</td>}
                        {appointment.status == true && <td>Completed</td>}
                        <td><button type="submit" onClick={cancel(appointment.id)} className="btn btn-danger">Cancel</button>    <button onClick={cancel(appointment.id)} type="submit" className="btn btn-success">Finished</button></td>
                        </tr>
                        }
            </tbody>
        )
    })

    return (
        <>
        <table className="table table-striped">
        <thead>
          <tr>
            <th>Customer</th>
            <th>VIP</th>
            <th>Date</th>
            <th>Time</th>
            <th>Reason for Service</th>
            <th>Vehicle Identification Number</th>
            <th>Technician</th>
            <th>Status</th>
          </tr>
        </thead>
            {table}
        </table>
        </>
    )
    }
export default ServiceAppointmentList
