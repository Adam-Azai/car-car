import React from 'react'

class AppointmentForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            owner_name:"",
            vin:"",
            date:"",
            time:"",
            technician:"",
            technicians:[],
            reason:"",

        }
    }
    handleSubmit = async(event) => {
        event.preventDefault()
        const data = {...this.state}
        delete data.technicians
        const url = "http://localhost:8080/api/appointments/"
        const fetchConfig = {
            method:"post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type':'application/json'
            }
        }
        const response = await fetch(url, fetchConfig)
        if (response.ok){
            const newAppointment = await response.json()
            const reset = {
                owner_name:'',
                vin:'',
                date:'',
                time:'',
                technician:'',
                reason:'',
            }
            this.setState(reset)
        }

    }


     async componentDidMount() {
        const techUrl = 'http://localhost:8080/api/technicians/'
        const techResponse = await fetch(techUrl)
        if (techResponse.ok){
            const data = await techResponse.json()
            this.setState({technicians: data.technicians})
        }
     }

    handleChange = (event) => {
        const name = event.target.name
        const value = event.target.value
        this.setState({...this.state, [name]: value})
    }



    render (){
        return (
            <div className="row">
            <div className="offset-3 col-6">
            <div className="shadow p-4 mt-4">
                <h2>Schedule an Appointment</h2>
            <form id="create-appointment" onSubmit={this.handleSubmit} >
                <div className="form-floating mb-3">
                    <input value={this.state.owner_name} onChange={this.handleChange}  placeholder="name" required type="text" className="form-control" name="owner_name"/>
                    <label>Owner's Name</label>
                </div>
                   <div className="form-floating mb-3">
                    <input value={this.state.vin} onChange={this.handleChange}  placeholder="VIN" required type="text" className="form-control" name="vin"/>
                    <label>Vehicle Identification Number</label>
                </div>
                  <div className="form-floating mb-3">
                    <input value={this.state.date} onChange={this.handleChange}  placeholder="Date" required type="date" className="form-control" name="date"/>
                    <label>Date of Appointment</label>
                </div>
                  <div className="form-floating mb-3">
                    <input value={this.state.time} onChange={this.handleChange}  placeholder="Time" required type="time" className="form-control" name="time"/>
                    <label>Time of Appointment</label>
                </div>
                 <div className="mb-3">
                    <select  onChange={this.handleChange} value={this.state.technician}  id="technician" name="technician" className="form-select">
                      <option value="">Choose a Technician</option>
                    {this.state.technicians.map(technician => {
                        return (
                            <option key={technician.id} value={technician.technician_name}>
                                {technician.technician_name}
                            </option>
                        )
                    })}
                    </select>
                </div>
                   <div className="form-floating mb-3">
                    <input value={this.state.reason} onChange={this.handleChange}  placeholder="Reasoning" required type="text" className="form-control" name="reason"/>
                    <label>Reason for Appointment</label>
                </div>
                <button type='submit' className="btn btn-primary">Create</button>
                </form>
            </div>
            </div>
        </div>
        )
    }
















}
export default AppointmentForm
