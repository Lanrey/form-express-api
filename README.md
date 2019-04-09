# form-express-api


This backend application was built with express, because of its minimal approach to getting work done.

The Overall architecture for the backend application consists of three main services:

1. Cpu service - This service retrieves the cpu's data every second using the OS module, and node's setInterval method.
   The data collected is stored in a mongoDB database.

   WHY MONGODB?

   - Since there is a constraint of getting data every second, and the values retrieved from the os.cpus() method is an        
     Object. Creating the objects and having to create relationship mappings as per (Server => Cores) will result in more 
     
     computations, as opposed to storing directly has objects, which is what mongodb is good at.

   Also the CPU Service is a **child process** separate from the parent process, this is a separation of concern, as computating 
   
   an intensive calculation within the same process as the other services isn't a scalable thing to do.

The file for the CPU service can be found <services/cpu_service.js>

2. Analytical Service - This service retrieves the values from the database, and computes the cpu % utilization and average % utilization. It uses mongoDB streams functionality to query the database. 

The file can be found <services/analytical_service.js>


3. Pusher Service - This service provides real time updates to the web application, new data is computed at an interval and then sent to the web application.

Also Google Cloud Platform was used in deploying the application


HOW TO RUN

- Clone repo
- Install packages
- go to root directory
- setup environment using the .env.example
- run npm start

- URL : "https://form-plus-express-api.appspot.com/"
