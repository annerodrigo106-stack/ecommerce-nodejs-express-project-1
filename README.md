# ecommerce-nodejs-express-project-1

**This project will by no means be production grade**

Node JS express ecommerce project
🌶️ ExpressEats: Restaurant E-Commerce Prototype 🍽️ Welcome to ExpressEats, a foundational Node.js and Express.js prototype for a restaurant's online ordering system. This - project demonstrates basic e-commerce functionality using in-memory data for a quick and simple setup.

✨ Features The current application includes the following core functionalities:

View Menu: Browse a list of available food items. 📜 Add to Cart: Select items and add them to an in-memory shopping cart. 🛒 View Cart: Review selected items and total cost. 💰 🚀 Getting Started To run this project locally, make sure you have Node.js installed. Prerequisites

## Requirements
You need Node JS and NPM installed.

## Usage
```
cd ecommerce-express-restaurant-main
```
Create a .env file with your mongo connection string and the port you want the server to run on, also the cloudinary api keys for file upload, the contents of the .env file should look like below
```
MONGO_URI=<YOUR MONGO CONNECTION STRING>
PORT=3000
CLOUDINARY_CLOUD_NAME=<your values>
CLOUDINARY_API_KEY=<your values>
CLOUDINARY_API_SECRET=<your values>
```
```
npm install
node uploadData.js // To upload test data to mongo cloud database
node app.js
```
The server will start at http://localhost:3000.

Once that's done open the manage.html (located in: front_end/manage.html) file in your browser

## To do List

🏗️ Future Enhancements This project is a starting point. The following essential e-commerce features are planned for future releases:

 - User Accounts: Implement user registration, login, and authentication system. 👤

 - Checkout & Payments: Add a secure checkout flow with integrated payment processing (e.g., Stripe, PayPal). 💳

 - Order Management: Create an admin interface to manage orders, update menu items, and track inventory. 👨‍🍳

 - Database Integration: Replace in-memory data with a persistent database (e.g., Mongo) to store user data, and orders permanently. 🐘
 - 💅 Error Handling: Implement robust error handling and validation for user inputs.
 - ❌ Deployment: Set up continuous integration and deployment pipelines for easy updates. ☁️

## Partially completed features

 - Cloudinary image upload and display  on manage.html page feature is complete, You can use the images in the images folder to test the image upload functionality.

 - Database Integration: Replace in-memory data with a persistent database (e.g., Mongo) to store menus data permamnently. 🐘 
 - - Create One
 - - get all
 - - get one by id
 - - upload image by id


 - Image: Implement product image uploads.
 - Front end integration partially complete: The front end that supports the CRUD operations for the product data is paritally complete and exists in the manage.html file in the front_end folder.

## Some Screen shots
![manage.html](https://github.com/annerodrigo106-stack/ecommerce-nodejs-express-project-1/blob/main/images/Screenshot%202025-12-23%20015055.jpg)


![manage.html 2](https://github.com/annerodrigo106-stack/ecommerce-nodejs-express-project-1/blob/main/images/Screenshot%202025-12-23%20015651.jpg)
