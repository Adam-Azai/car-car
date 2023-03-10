# CarCar

Team:
* Adam Azai - Service Microservice
* Joshua Evangelista - Sales Microservice

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
13. The main page of CarCar will be on display when navigating to localhost:3000 in your browser
14. Feel free to play around the site and please send any feedback you have regarding the project.

## Design
Below is a diagram that displays how the three microservices in the project communicate with one another to retrieve information from one another. The models of each microservice as well their fields are displayed as well.

https://i.imgur.com/UdfOD0g.png



![A diagram entailing the Architecture Design of our Project](https://i.imgur.com/eju7Qbc.png)


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
- reason: (textfield) why is the car getting serviced (oil change, tire change, battery replacement)
- vin: (string) the Vehicle Identification Number of the car being serviced
- vip: (boolean) if the car was purchased from our dealership then a vip status icon is displayed
- status: (boolean) whether the car's service is done or the appointment was canceled
- technician: (foreign key:string), the technician who will be working on the vehicle


Finally the VinVO model is a Value Object model that holds that data that is being polled from the Inventory microservice's automobile model. The service poll application gathers the vins of the automobiles we had in our inventory to compare whether the vin of customers scheduling a service appointment matches. If the vin field of a service appointment has been within the inventory of cars in the past this signifies that the customer purchased the vehicle from the dealership. Customers who purchase and service their car at the same dealership are labeled as VIPS and are given preferential treatment.

VinVO Model
- import_href: (string) the automobile's href
- vin: (string) the VINs of automobiles that were in our inventory in the past

The value objects in this microservice would be the VIN, date and time. The three of these objects do not have an id necessarily attached to them and when created are not changed in their lifetime(immutable). A vehicle's VIN can not be changed once a VIN is assigned to the vehicle. In this project the date and times for appointments are unchangeable, an appointment can only be canceled or finished. If the date and time of an appointment could be altered without deleting the original appointment then the date and time fields for service appointment would not be value objects. We use the vin as a value object as we do not base the vin on its identity but rather the state of the VIN, if the state of the VIN matches the state of the vin being inputted to the appointment form,then a customer is set to a VIP status.

The Service Microservice is located on port 8080, its api being accessible by your browser on localhost:8080

## Service API

The service microservice has fully-accessible Service API that holds the technicians, and service appointments. It has functional RESTful endpoints for the Technician and Service Appointment models.

The tables below will describe how to access the endpoints as well as the URLS for them as well.


<details>
<summary><h3>Service Appointment API</h3></summary>


From Insomnia and your browser, you can access the service appointment endpoints at the following urls.

| Action                             |   Method      |                   URL                                             |
|:----------------------------------:|:-------------:|:-----------------------------------------------------------------:|
| List appointments                  | GET           | http://localhost:8080/api/appointments/                           |
| Get appointments by VIN            | GET           | http://localhost:8080/api/appointments/records/str:vin_vo_id      |
| Create appointment                 | POST          | http://localhost:8080/api/appointments/                           |
| Delete appointment by id           | DELETE        | http://localhost:8080/api/appointments/int:id                     |
| Cancel/Finish appointment status   | PUT           | http://localhost:8080/api/appointments/int:id                     |

The str:vin_vo_id refers to simply inputting the vin itself at the end of the url.
int:id being the id of the appointment, whose value is an integer

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

</details>


<details>
<summary><h3>Technician API</h3></summary>

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
</details>


## Sales microservice

For the sales microservice, the main goal is to aid in inventory management and sales record organization. One of the features allows you to create a potential customer that is tied to their phone number, name and address; the customer can then be selected for a sale. It will also allow you to create a salesperson; the salesperson’s information are stored with name and employee number.  With consideration to an automobile being added by the inventory microservice, if a specific automobile has yet to have been sold, the automobile will populate on the drop down menu when creating a sales record transaction. In the feature for recording a sal;, you are able to select an [unsold] automobile choose a salesperson, choose a customer, and enter in the sales price. That newly recorded transaction will now be listed in the sales record list, and in that list you will find a table that displays the salesperson, Employee number, the purchaser, associated VIN, and the sales price. If you desire to see the sales record of a particular salesperson, use the “Filter by Salesperson” drop down menu. The sales microservice polls automobile information from the inventory microservice; without an automobile from the inventory microservice, the sales microservice would not have a VIN number to use to record a sale.

The microservice for sales operate off of 4 models:
The customer model will take in name, address, and phone number of a potential customer.
	The Customer model:
		-name: customer’s name
		-address: customer’s address
		-phone: customer’s phone number

The salesperson model takes in the name and employee number
	The Salesperson model:
		-name: salesperson’s name
		-employee_number: salesperson’s employee number

The automobileVO is the value object that takes in the specific automobile and creates reference to the automobile by vin number while binding its sold status. Do keep in mind that django / json has the ability to id / serialize data in its objects.

	The AutomobileVO model:
		-vin: vin number of automobile
		-availability: the sold status of a particular vehicle

The purpose of the sales record is to tie in all the previously mentioned models to record a sales transaction.

	The SalesRecord model:
		-customer: purchaser of automobile
		-automobile: automobile to be purchased
		-salesperson: seller of automobile
		-salesprice: agreed selling price of automobile.



To access the entire inventory regardless of availability status:
<details>
<summary><h3>Automobile API</h3></summary>

| Action                             |   Method      |                   URL                                             |
|:----------------------------------:|:-------------:|:-----------------------------------------------------------------:|
| Automobile Inventory List          | GET           | http://localhost:8090/api/automobilelist/                         |


</details>


<details>
<summary><h3>Customer API</h3></summary>

| Action                             |   Method      |                   URL                                             |
|:----------------------------------:|:-------------:|:-----------------------------------------------------------------:|
| Customer List                      | GET           | http://localhost:8090/api/customers/                              |
| Create Potential Customer          | POST          | http://localhost:8090/api/customers/                              |

```
An example of the json body for the create customer POST request:
{
	"name": "Dohv",
	"address": "13 Skyrim Ln",
	"phone": "10010088454"
}
```

</details>

<details>
<summary><h3>Sales Record API</h3></summary>


| Action                             |   Method      |                   URL                                             |
|:----------------------------------:|:-------------:|:-----------------------------------------------------------------:|
| Sales Record List                  | GET           | http://localhost:8090/api/salesrecords/                           |
| Create a Sales Record              | POST          | http://localhost:8090/api/salesrecords/                           |
| Get Specific Salesperson's Records | GET           | http://localhost:8090/api/salesrecords/:id/                       |
| Delete a specific Sales Record     | Delete        | http://localhost:8090/api/salesrecords/:id/                       |

An example of the json body for the sale record POST request:
```
    {
	"salesperson": "Jennifer",
	"automobile": "567VIN",
	"customer": "Joshua",
	"sales_price": "$1000"
    }
```
</details>

<details>
<summary><h3>Saleperson API</h3></summary>

| Action                             |   Method      |                   URL                                             |
|:----------------------------------:|:-------------:|:-----------------------------------------------------------------:|
| Salesperson List                   | GET           | http://localhost:8090/api/salespeople/                            |
| Create a Salesperson               | POST          | http://localhost:8090/api/salespeople/                            |

An example of the json body for the Create a Salesperson POST request:
```
{
	"name": "Haas",
	"employee_number": "00004"
}
```
</details>

## Inventory microservice

The purpose of the Inventory microservice is to handle the storage and information of vehicles that the dealership contains, essentially an inventory of the dealership. There are six features within the Inventory microservice. The first feature is creating a manufacturer, an employee can input the manufacturers that the dealership may have/had in their inventory and with the second feature, display the manufacturers in a simple table. The other four features follow the same principle, with the pairs being a create form and viewing table of the inputted data of the form. An employee can input a model type of a vehicle(prius, camry, civic), an image of that vehicle along with a manufacturer, one that was added to the manufacturers database, that is displayed with a simple table. The last two features are a form that an employee can add an individual car to the dealership inventory by inputting the car's vin, year, color and the model type that the dealership offers.

There are three models for the Inventory microservice. The three models are a Manufacturer model, a VehicleModel, and a Automobile model.

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

The value objects in this microservice would be the vin,  and the manufacturer of the vehicle. Each of these objects are immutable and are utilized by their state, not their identity. A vehicle's VIN can not be changed once assigned, another car manufacturer can't take the car away and remake it under their brand. The vin is polled both by Service and Sales to determine whether a customer is a vip, and to determine whether the car is available for sale as availability of a vehicle is tied to the VIN of the vehicle.

## Inventory API

The Inventory has fully-accessible Inventory API that can keep track of the automobile inventory for the automobile dealership. The api is located at port 8100. If you wish to access it from your browser simply navigate to localhost:8100

The tables below will describe how to access the endpoints as well as the URLS for them as well.




<details>
<summary><h3>Manufacturers API</h3></summary>

From Insomnia and your browser, you can access the manufacturer endpoints at the following URLs.

| Action                             |   Method      |                   URL                      	|
|:----------------------------------:|:-------------:|:--------------------------------------------:|
| List manufacturers                 | GET           | http://localhost:8100/api/manufacturers/     |
| Create a manufacturer              | POST          | http://localhost:8100/api/manufacturers/     |
| Get a specific manufacturer		     | GET			     | http://localhost:8100/api/manufacturers/:id/ |
| Update a specific manufacturer	   | PUT	         | http://localhost:8100/api/manufacturers/:id/ |
| Delete a specific manufacturer	   | DELETE	       | http://localhost:8100/api/manufacturers/:id/ |

int:id being the id of the manufacturer, whose value is an integer.

Creating and updating a manufacturer requires only the manufacturer's name.
```
{
  "name": "Chrysler"
}
```
The return value of creating, getting, and updating a single manufacturer is its name, href, and id.
```
{
  "href": "/api/manufacturers/1/",
  "id": 1,
  "name": "Chrysler"
}
```
The list of manufacturers is a dictionary with the key "manufacturers" set to a list of manufacturers.
```
{
  "manufacturers": [
    {
      "href": "/api/manufacturers/1/",
      "id": 1,
      "name": "Daimler-Chrysler"
    }
  ]
}
```
</details>

<details>
<summary><h3>VehicleModels API</h3></summary>

From Insomnia and your browser, you can access the vehicle model endpoints at the following URLs.

| Action                             |   Method      |                   URL                     	      |
|:----------------------------------:|:-------------:|:------------------------------------------------:|
| List vehicle models                | GET           | http://localhost:8100/api/models/     		        |
| Create a vehicle model             | POST          | http://localhost:8100/api/models/     		        |
| Get a specific vehicle model		   | GET			     | http://localhost:8100/api/models/int:id/ 	      |
| Update a specific vehicle model	   | PUT	         | http://localhost:8100/api/manufacturers/int:id/  |
| Delete a specific vehicle model	   | DELETE	       | http://localhost:8100/api/manufacturers/int:id/  |

int:id being the id of the vehicle, whose value is an integer

Creating and updating a vehicle model requires the model name, a URL of an image, and the id of the manufacturer.
```
{
  "name": "Sebring",
  "picture_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Chrysler_Sebring_front_20090302.jpg/320px-Chrysler_Sebring_front_20090302.jpg",
  "manufacturer_id": 1
}
```
Updating a vehicle model can take the name and/or the picture URL.
```
{
  "name": "Sebring",
  "picture_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Chrysler_Sebring_front_20090302.jpg/320px-Chrysler_Sebring_front_20090302.jpg"
}
```
Getting the detail of a vehicle model, or the return value from creating or updating a vehicle model, returns the model's information and the manufacturer's information.
```
{
  "href": "/api/models/1/",
  "id": 1,
  "name": "Sebring",
  "picture_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Chrysler_Sebring_front_20090302.jpg/320px-Chrysler_Sebring_front_20090302.jpg",
  "manufacturer": {
    "href": "/api/manufacturers/1/",
    "id": 1,
    "name": "Daimler-Chrysler"
  }
}
```
Getting a list of vehicle models returns a list of the detail information with the key "models".
```
{
  "models": [
    {
      "href": "/api/models/1/",
      "id": 1,
      "name": "Sebring",
      "picture_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Chrysler_Sebring_front_20090302.jpg/320px-Chrysler_Sebring_front_20090302.jpg",
      "manufacturer": {
        "href": "/api/manufacturers/1/",
        "id": 1,
        "name": "Daimler-Chrysler"
      }
    }
  ]
}
```
</details>

<details>
<summary><h3>Automobile API</h3></summary>

From Insomnia and your browser, you can access the automobile endpoints at the following URLs.
| Action                             |   Method      |                   URL                     	   |
|:----------------------------------:|:-------------:|:-----------------------------------------------:|
| List automobiles                   | GET           | http://localhost:8100/api/automobiles/     	   |
| Create an automobile               | POST          | http://localhost:8100/api/automobiles/     	   |
| Get a specific automobile			     | GET			     | http://localhost:8100/api/automobiles/:vin/ 	   |
| Update a specific automobile   	   | PUT	         | http://localhost:8100/api/automobiles/:vin/     |
| Delete a specific automobile  	   | DELETE	       | http://localhost:8100/api/autopmobiles/:vin/    |

:vin being the vin of the vehicle at the end of the url, just like str:vin_vo_id

You can create an automobile with its color, year, VIN, and the id of the vehicle model.
```
{
  "color": "red",
  "year": 2012,
  "vin": "1C3CC5FB2AN120174",
  "model_id": 1
}
```
As noted, you query an automobile by its VIN. For example, you would use the URL

http://localhost:8100/api/automobiles/1C3CC5FB2AN120174/

to get the details for the car with the VIN "1C3CC5FB2AN120174". The details for an automobile include its model and manufacturer.
```
{
  "href": "/api/automobiles/1C3CC5FB2AN120174/",
  "id": 1,
  "color": "yellow",
  "year": 2013,
  "vin": "1C3CC5FB2AN120174",
  "model": {
    "href": "/api/models/1/",
    "id": 1,
    "name": "Sebring",
    "picture_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Chrysler_Sebring_front_20090302.jpg/320px-Chrysler_Sebring_front_20090302.jpg",
    "manufacturer": {
      "href": "/api/manufacturers/1/",
      "id": 1,
      "name": "Daimler-Chrysler"
    }
  }
}
```
You can update the color and/or year of an automobile.
```
{
  "color": "red",
  "year": 2012
}
```
Getting a list of automobiles returns a dictionary with the key "autos" set to a list of automobile information.
```
{
  "autos": [
    {
      "href": "/api/automobiles/1C3CC5FB2AN120174/",
      "id": 1,
      "color": "yellow",
      "year": 2013,
      "vin": "1C3CC5FB2AN120174",
      "model": {
        "href": "/api/models/1/",
        "id": 1,
        "name": "Sebring",
        "picture_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Chrysler_Sebring_front_20090302.jpg/320px-Chrysler_Sebring_front_20090302.jpg",
        "manufacturer": {
          "href": "/api/manufacturers/1/",
          "id": 1,
          "name": "Daimler-Chrysler"
        }
      }
    }
  ]
}
```
</details>
