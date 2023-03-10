# CarCar

Team:
* Adam Azai - Service Microservice
* Person 2 - Which microservice?

CarCar is a Car Dealership website in which both customers and employees of the site can utilize for inquires of the vehicles in stock, schedule a service appointment, or recording a vehicle sale.

The backend portion of this project was created with the use of Django, Python and JSON.

The frontend of this project was created with the use of Javascript, HTML, JSON, and CSS. With React rendering the front-end side of the application.

## Requirements to Run

1. A Browser (Google Chrome preferred)
2. Docker Desktop


## Running the project

To start CarCar in your browser please follow the instructions listed below.

1. Fork the gitlab repository by clicking on the Fork button located to the right of the project name
2. Navigate to the forked repository and clone the project url with HTTPS
3. Within your respective terminal window run the following code
    ```
    git clone "HTTPS project url"
    ```
4. Upon cloning a new directory will appear in the directory you cloned the repo into.
5. Navigate to the new directory named "Project-Beta"
6. This project relies on Docker to ensure an isolated environment for the app, start the Docker Desktop application.
7. Once Docker Desktop is running you will need to create a docker volume that will hold the data for CarCar with the following    command.
    ```
    docker volume create "beta-data"
    ```
8. Now build the docker images by running the command below in the project directory within your terminal command line
    ```
    docker compose build
    ```
9. Finally to build the containers and run the application run the command below in your terminal command line
    ```
    docker compose up
    ```
10. Verify that the containers were created within Docker Desktop and none of the containers have stopped running. In total there   should be 7 containers.
11. When the app's server is up and running the terminal window will display a message stating that the server was complied
12. Open your browser and input the url (localhost:3000)
13. The main page of CarCar will be on display when navigating to localhost:3000
14. Feel free to play around the site and please send any feedback you have regarding the project.

## Design
Below is a diagram that displays how the three microservices in the project communicate with one another to retrieve information from one another. The models of each microservice as well their fields are displayed as well.

https://i.imgur.com/UdfOD0g.png



![A diagram entailing the Architecture Design of our Project](https://i.imgur.com/peHxtbe.png)


## Service microservice

The purpose of the Service microservice is to handle the dealership's vehicle maintenance department. There are four features of the maintenance department that the Service microservice handles. The first feature is that an employee can register a new car technician that will be available for service appointments. The second feature is that any car owner can schedule a service appointment for their vehicle, one does not have to purchase a vehicle from the dealership to receive service. The third feature is a table to view upcoming scheduled service appointments with the capability of removing them from the table when a customer cancels the appointment or when the service has been completed. The table also informs technicians/concierge on which customers are VIPS, customers who bought the car from the dealership, in order to show preferential treatment to the VIP customers. The final feature is a search function for employees to pull the service history of a vehicle based on the vehicle's VIN.


There are three models for the Service microservice. The three models being a Technician models, a Service Appointment model and finally a VinVO models.

The Technician models is fairly simple, there are two character fields(technician_name and employee_id) to contain the technician's name and their employee id.

Technician Model
- technician_name: (string) name of the technician
- employee_number: (string) id number of the technician


The Service Appointment model is composed of multiple diverse fields. Within this model there are simple character fields to hold information such as the vehicle owner's name, the date/time of the appointment, reasoning for service appointment, and the vin of the vehicle being serviced. The vip and status fields are booleans that allow us to distinguish whether a customer is a vip or whether the service appointment was canceled/finished respectively. The technician field is a foreign key that pulls the technician_name data from the Technician Model in order to attach a single technician to a service appointment. The importance of this model is that the VIN field will be the determining factor of whether a customer is a VIP by polling data from the Inventory Microservice.

Service Appointment Model
- owner_name:(string) the name of the vehicle's owner
- date:(datefield) the date of the appointment
- time: (timefield), the time of the appointment
- reason: (string) why is the car getting serviced(oil change, tire change, battery replacement)
- vin: (string) the Vehicle Identification Number of the car being serviced
- vip: (boolean) if the car was purchased from our dealership then a vip status icon is displayed
- status: (boolean) whether the car's service is done or the appointment was canceled
- technician: (foreign key:string), the technician who will be working on the vehicle


Finally the VinVO model is a Value Object model that holds that data that is being polled from the Inventory microservice's automobile model. The service poll application gathers the vins of the automobiles we had in our inventory to compare whether the vin of customers scheduling a service appointment matches. If the vin field of a service appointment has been within the inventory of cars in the past this signifies that the customer purchased the vehicle from the dealership. Customers who purchase and service their car at the same dealership are labeled as VIPS and are given preferential treatment.

VinVO Model
- import_href: (string) the automobile's href
- vin: (string) the VINs of automobiles that were in our inventory in the past

The value objects in this microservice would be the VIN, date and time. The three of these objects do not have an id necessarily attached to them and when created are not changed in the lifetime(immutable). A vehicle's VIN can not be changed once a VIN is assigned to the vehicle. In this project the date and times for appointments are unchangeable, an appointment can only be canceled or finished. If the date and time of an appointment could be altered without deleting the original appointment then the date and time fields for service appointment would not be value objects. We use the vin as a value object as we do not base the vin on its identity but rather the state of the VIN, if the state of the VIN matches the state of the vin being inputted to the appointment form,then a customer is set to a VIP status.

The Service Microservice is located on port 8080, its api being accessible by your browser on localhost:8080

## Service API

The service microservice has fully-accessible API that holds the technicians, and service appointments. It has functional RESTful endpoints for the Technician and Service Appointment models.

The tables below will describe how to access the endpoints as well as the URLS for them as well.

### Service Appointment API

From Insomnia and your browser, you can access the service appointment endpoints at the following urls.

| Action                             |   Method      |                   URL                                             |
|:----------------------------------:|:-------------:|:-----------------------------------------------------------------:|
| List appointments                  | GET           | http://localhost:8080/api/appointments/                           |
| Get appointments by VIN            | GET           | http://localhost:8080/api/appointments/records/str:vin_vo_id      |
| Create appointment                 | POST          | http://localhost:8080/api/appointments/                           |
| Delete appointment by id           | DELETE        | http://localhost:8080/api/appointments/int:id                        |
| Cancel/Finish appointment status   | PUT           | http://localhost:8080/api/appointments/int:id                        |

Creating an appointment requires the vehicle owner name, date of the appointment, time of the appointment, reason for the appointment, the technician who will be service the vehicle, and a VIN(17 letters).
```
    {
	"owner_name":"Billy",
	"date": "2023-03-07",
	"time":"10:50:30",
	"reason": "Oil change",
	"technician": "Samantha",
	"vin": "A1B2C3D4E5F6G7H8I"
}
```
The return value of creating an appointment, updating an appointment, and getting an appointment by its VIN, is its id, owner_name, data, time, reason, vin, a technician object with: technician's id, technician name, employee_number, vip, and status. If the vin matches a vin that is within the inventory api then the vip boolean would return true, on default it returns false. Status will always return false when creating an appointment as the appointment was just created and has not been completed nor canceled. If the appointment is being updated then only the status will updated to be set to true.
```
{
	"id": 1,
	"owner_name": "Billy",
	"date": "2023-03-07",
	"time": "10:50:30",
	"reason": "Oil change",
	"vin": "A1B2C3D4E5F6G7H8I",
	"technician": {
		"id": 1,
		"technician_name": "Samantha",
		"employee_number": "23"
	},
	"vip": false,
	"status": false
}
```
The list of appointments is a dictionary with the key of "appointments" set to a list of appointments
```

	"appointments": [
		{
			"id": 1,
			"owner_name": "Billy",
			"date": "2023-03-07",
			"time": "10:50:30",
			"reason": "Oil change",
			"vin": "A1B2C3D4E5F6G7H8I",
            "technician": {
                "id": 1,
                "technician_name": "Samantha",
                "employee_number": "23"
            },
            "vip": false,
            "status": false
		},
		{
			"id": 2,
			"owner_name": "Eddie",
			"date": "2023-03-09",
			"time": "00:56:00",
			"reason": "Oil change",
			"vin": "5J8TB18208A013941",
			"technician": {
				"id": 2,
				"technician_name": "Imron",
				"employee_number": "31"
			},
			"vip": false,
			"status": false
		},
    ]

```
Return value of deleting an appointment by its id is a simple delete message on whether the appointment was successfully deleted
```
{
    "deleted':true
}
```

### Technician API

From Insomnia and your browser, you can access the service appointment endpoints at the following urls.

| Action                             |   Method      |                   URL                     |
|:----------------------------------:|:-------------:|:-----------------------------------------:|
| List technicians                   | GET           | http://localhost:8080/api/technicians/    |
| Create technician                  | POST          | http://localhost:8080/api/technicians/    |

Creating a technician requires just the technician's name as well as their employee id.
```
{
	"technician_name":"Imron",
	"employee_number":"1"
}
```
The return of creating a technician simply returns the id of the technician alongside the technician's name and employee id
```
{
    	"id": 1,
			"technician_name": "Imron",
			"employee_number": "1"
}
```
Getting the list of technicians returns a dictionary with the key of "technicians' set to a list of technicians
```
{
    "technicians": [
		{
			"id": 1,
			"technician_name": "Imron",
			"employee_number": "1"
		},
		{
			"id": 2,
			"technician_name": "Derek",
			"employee_number": "39"
		}
	]
}
```


## Sales microservice

Explain your models and integration with the inventory
microservice, here.




## Inventory microservice

The purpose of the Inventory microservice is to handle the storage and information of vehicles that the dealership contains, essentially an inventory of the dealership. There are six features within the Inventory microservice. The first feature is creating a manufacturer, an employee can input the manufacturers that the dealership may have/had in their inventory and with the second feature, display the manufacturers in a simple table. The other four features follow the same principle, with the pairs being a create form and viewing table of the inputted data of the form. An employee can input a model type of a vehicle(prius, camry, civic), an image of that vehicle along with a manufacturer, one that was added to the manufacturers database, that is displayed with a simple table. The last two features are a form that an employee can add an individual car to the dealership inventory by inputting the car's vin, year, color and the model type that the dealership offers.

There are three models for the Inventory microservice. The three models are a Manufacturer model, VehicleModel, and a Automobile model.

The Manufacturer model is simply one character field for the name of the manufacturer, the vehicle model pulls the name of the manufacturer with a foreign key field. One manufacturer can have multiple models and vehicles but a vehicle nor vehicle model can not have multiple manufacturers. Have you heard of a Toyota x Rolls Royce vehicle before? If so, please let us know.

Manufacturer
- name: (string) name of a manufacturer


The VehicleModel model can be quite confusing given the attached model to the word vehicle. VehicleModel refers to a Vehicles model, a prius for example or a corolla. The VehicleModel model contains three fields. A character field for the name of the model, an url field for an image of that type of model, and a foreign key field as this model pulls a manufacturer name from the manufacturer model as every car model has a manufacturer that made the vehicle.

VehicleModel
- name:(string) name of the vehicle model, not to be confused with the name field for manufacturer above
- picture_url: (url) image of the model type
- manufacturer: (foreign key, string) name of the manufacturer


The last model is a the Automobile model. This model is for the addition of a single vehicle to the dealership's inventory of cars. These four fields contain the information that are usually the key items people look for in a car when browsing at a dealership. A character field for the color of the car, a positive integer field for the year of the car, a character field for the VIN, and finally a foreign key field for the car's model type. The VIN is the most important field for the entire project as the Service Microservice and Sales Microservice both poll the Inventory microservice for the VIN field. It is the integration point for microservices to communicate with one another.

Automobile Model
- color:(string) the color of the vehicle
- year:(positive integer) the year of the car
- vin:(string) VIN
- model:(string) the name of the model type this car is

The value objects in this microservice would be the vin, year of the car, and the manufacturer of the vehicle. Each of these objects are immutable and are utilized by their state, not their identity. A vehicle's VIN can not be changed once assigned, another car manufacturer can't take the car away and remake it under their brand and the year of a car will be always be stagnant. The vin is polled both by Service and Sales to determine whether a customer is a vip, and to determine whether the car is available for sale as availability of a vehicle is tied to the VIN of the vehicle.
