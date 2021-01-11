# Build-A-Burger 🍔 

An interactive custom burger-building and ordering web app, built with React.js, Redux state management framework, React Router DOM, CSS and Google Firebase. Users can create a customer account,
construct a custom burger from a list of ingredients, place an order with their contact details, send this order to the Firebase backend, and review past orders. Sign up / sign in authorisation is provided.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Getting started

Fork and clone this project to your local machine, and once in the directory run `npm install` from your terminal.

### Prerequisites

The latest version of [Node.js](https://nodejs.org/).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

## Front End

View the deployed application, hosted on Netlify here: [INSERT NETLIFY LINK]

## Back End

### Google Firebase Realtime Database

The back end for this project is a personal Firebase Realtime Database. Contact the author with any issues / queries: samuel.lea@live.co.uk

### Github

To view the Github repo for the front end of this project, see here: [https://github.com/samuellea/build-a-burger/]

## Instructions for use / example user flow

* Using your browser, navigate to the front end of this project either via the above Netlify link, or by running this project locally and navigating to https://localhost:3000
* From the **/auth** page, create a new account using a dummy email and password and clicking **Sign Up**, or click **Switch To Sign-In** and enter the following ready-made dummy login credentials, omitting apostrophes:
  - **email**: 'test@test.com'
  - **password**: 'password123'
* After successful sign-in, you will be redirected to the **/burgerbuilder** page. Customise your burger by clicking the **Less** / **More** buttons - the burger visualiser and total price will change in response to the number of ingredients selected.
* Once you are happy with your burger, click **Order Now** to view a summary of your burger, its ingredients and the total price. **Cancel** to make further alterations, **Continue** to checkout your burger.
* On the subsequent /checkout page, click **Continue**, enter your contact data and select a delivery method. Once this form is complete, click **Order**.
* Voila - your order has been submitted to the Firebase server! You can check this by clicking the **Orders** tab in the navbar, which displays a list of orders associated with the logged-in account.
* Click **Logout** in the navbar when you are done - bon appetit! 🍔