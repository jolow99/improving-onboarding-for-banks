# Collaboration between Singapore University of Technology and Design (SUTD) and DBS
By improving potential DBS users onboarding process, we aim to increase user conversion rate so as to broaden DBS's customer base.

# How It Works
- Frontend is built using React and Tailwind CSS
- Backend is built with Ruby on Rails
- E2E automated test cases were implemented after writing tests in Cucumber 

# User Stories

As a foreigner, currently I have to manually fill up many forms in order to register a bank account for me and my children. As such, How can we make the onboarding process more seamless for foreigners to reduce drop-off rate?

Summary of features:

<li> Multi-User Registrations</li>
<li> Form Autofill</li>
<li> Multi-device and Autosave </li>
<br>


## To run the backend locally

`cd backend/customer`
<br>

on initial setup:
<br> `bundle install && rails db:migrate && rails server`
<br>
From here on after, running just `rails server` is enough.
<br> backend will be hosted locally on localhost:3000
<br>
<br>
models for the user and child table can be found under `./app/models` folder, while the api call for google cloud VISION AI service can also be found in the same folder with file named `vision.rb`
<br>
<br>
methods in controllers for the user and child can be found under the `./app/controllers/api/v1` and `./app/controllers` folder respectively.

## To run the frontend locally

`cd frontend/ && npm install`
<br>
` npm start --port 3001`
<br> frontend would be hosted locally on localhost:3001

`./src` folder:

- `/components` folder includes all reusable components needed for the application
- `/pages` folder includes the code for the different pages for our application. The name of the routes correspond to the Javascript file it uses. E.g. `/details` route corresponds to the `Details.js` file. More information on the routes can be found in `/App.js`

`/services` folder:
<br>
Contains code that does requests to respective API calls

`/utilities` folder:
<br>
`./constants.js` contains the different API routes for doing CRUD operations on the backend database

## Cucumber test cases

`cd frontend/ && npm test` to run the cucumber test cases
<br>
Cucumber test cases can be found under the `./features` folder.
<br>
`./features` folder:

- `/step_definitions` folder: contains the necessary steps to fulfill the different user stories as stated in their respective `.feature` file
- `/support` folder: contains the necessary setup for the selenium webdriver to perform UI testing on headless chrome to fulfill the user stories as stated in the Cucumber scenarios in `.feature` files
