# CarCar

Team:
* Person 1 - Adam Azai
* Person 2 - Which microservice?

CarCar is a Car Dealership website in which both customers and employees of the site can utilize for inquires of the vehicles in stock, schedule a service appointment, or recording a vehicle sale.

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
10. Verify that the containers were created within Docker Desktop and none of the containers have stopped running. In total there   should be 7 containers,
11. When the app's server is up and running the terminal window will display a message stating that the server was complied
12. Open your browser and input the url (localhost:3000)
13. The main page of CarCar will be on display when navigating to localhost:3000
14. Feel free to play around the site please send any feedback you have regarding the project.
## Design




## Service microservice

Explain your models and integration with the inventory
microservice, here.

## Sales microservice

Explain your models and integration with the inventory
microservice, here.
