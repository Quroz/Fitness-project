# Fitness-project
The web app & server is deployed here: https://652d71402f5f0b3d0024ed9f--gleaming-daifuku-5def17.netlify.app/

## Description
This project was done in the course DH2643 Advanced Interaction Programming (7.5Hp). The goal of the project was to create a web application that uses a backend API and a frontend client. The application should be able to create, read, update and delete data from the backend API. The application should also be able to handle user authentication and authorization. The application should be responsive and work on both mobile and desktop.

The website is a gym-app application where users can track their progress, and their workouts, create workout plans, get inspiration from over 1300+ exercises from an API and much more. The application is built with React and uses a backend API built with Node.js and Express.js. The application uses a Schema database (MongoDB) to store data on the server. The application is responsive and works on both mobile and desktop (although it is not optimized for mobile).

## Technologies

- React
- Node.js
- Express.js
- MongoDB (Specifically Moongoose) 

## How to run 
This section describes how to run the application:

### How to run it locally
1. Clone the repository
2. Run `npm install` in frontend folder
3. Run `npm install` in backend folder
4. `cd backend` and run `node server.js`
5. `cd frontend` and run `npm start`

### How to run with Docker
1. https://hub.docker.com/repository/docker/rakinali/fitness-project/general
2. Pull the containers from docker
3. Run both of them at the same time
4. Start the app, open localhost:3000

In the case that you want to create the images yourself then there's a docker-compose.yml file in the root directory which you could use.
1. docker-compose up
2. Localhost:3000 

## Possible points to collect
The Google grading template has been sent in Canvas. We were aiming for a C due to all of us having a lot of other courses in parallel.  

## Architecture:
https://docs.google.com/presentation/d/1qhnhDeCZBnA7_4QMujJmt4iGFCCg8lkphMHKV_GBGS0/edit?usp=sharing

