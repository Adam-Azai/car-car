import React, {useEffect, useState} from 'react'
import "./index.css"

function History() {
    const [vin, setVin] = useState('')
    const [appointments, setAppointments] = useState([])

    const handleSubmit = async (event) => {
        event.preventDefault()
        const appointmentsUrl = `http://localhost:8080/api/appointments/records/${vin}`
        try{
            const response = await fetch(appointmentsUrl)
            if(response.ok){
                const data = await response.json()
                setAppointments(data.appointments)
            }
        } catch (e){
            console.error(e)
        }
    }

    const table = appointments.map((appointment) => {
        return  (
            <tbody key= {appointment.id}>
                        <tr>
                        <td>{appointment.vin}</td>
                        <td>{appointment.owner_name}</td>
                        <td>{new Date(appointment.date).toLocaleDateString()}</td>
                        <td>{String(appointment.time)}</td>
                        <td>{appointment.technician.technician_name}</td>
                        <td>{appointment.reason}</td>
                        </tr>
            </tbody>
        )
    })
    const handleChange = (event) => {
        const value = event.target.value
        setVin(value)
    }
        return(
            <>
             <div className="row">
                <form id='search-vin-history' >
                    <div className='form mb-3 mt-3'>
                        <input placeholder='VIN' className="form-control search" width="50%" name='vin' id="vin" onChange={handleChange} value={vin} required type="text"/>
                        <button type='button' className="btn btn-primary btn-sm" onClick={handleSubmit} >Search VIN</button>
                    </div>
                </form>
            </div>
            <h1 className="text-center">Service History</h1>
            <table className="table table-striped">
                <thead>
                <tr>
                    <th>VIN</th>
                    <th>Customer Name</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Technician</th>
                    <th>Reason for Visit</th>

                </tr>
                    </thead>
                    {table}
                    </table>
                </>
        )
    }
export default History
