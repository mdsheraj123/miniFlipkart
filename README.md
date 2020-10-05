# miniFlipkart
Backend for simple E-Commerce application

Dehaat
Backend Project

Hi! Here below goes the project. All the best!

To start off, evaluation will be on below criteria:
●	Designing a well thought out modular architecture
●	Writing a clean, well-commented, error-handled code
●	Consistency using Git commits
●	Correctness around edge-cases
●	Performance and integrity from a scalability perspective

Final Deliverable:
Please create a private repository on Github and add username dehaat-hire as a contributor. Please don't create a public repo, as that would make your solution public for others to see.
Problem Statement
To implement a small ecommerce web application backend with the below features. Features have been grouped by 3 different user types (roles) - admin, customer and sales-agent.

Admin:
//Login using username: and password:
//localhost:3000/api/auth/register
//localhost:3000/api/auth/login
//Use Token for private queries
1.	
2.	Create users for roles (customer, sales-agent) 
// POST on /api/auth/addaccount with username:, password: and access:
// access is "Admin" "Customer" or "SalesAgent"
3.	Create new products and update existing products. 
// GET POST AND PATCH /api/auth/marketItem
// For POST fields are  name:, colour:, size:, type:, description:, price:, stock:, status:
// status is "Sale" "NotSale"
a.	Update product info
b.	Update current price
c.	Update current stock level
d.	Update product status - currently eligible for selling

* See Notes below for details of product entity.

Customer:
1.	Login using mobile number and an OTP (mocking OTP will be sufficient) 
// POST ON /api/auth/login with username: and password:
2.	View products for sale 
// GET ON /api/marketItem/forsale
3.	Place an order for multiple products:
a.	While placing a new order, the customer's last purchase price for every product that has been purchased in the past should be shown along with the current price. 
// GET on /api/order/
b.	Only products which are “In stock” should be allowed to order. 
// POST on /api/order/ with _id:
4.	View past orders Get on /api/order/

Sales Agent:
1.	Login using username and password. /api/auth/login
2.	View orders for all customers /api/order/all
3.	Process an Order:
a.	Update order status [“Accepted”, “Delivered”, “Cancelled”] post on /api/order/all
b.	On order accept:
i.	An SMS is sent to the customer (Hint: Make it asynchronous.)//will do

Notes:
●	Product
Fields - name, description, price, stock, etc. 

A product can have multiple variants which could differ in attributes like size, colour, texture etc.

Example - 
Red 15-inch V140 laptop
Blue 13-inch V140 laptop
are two product variants where
Red and Blue are values of color attribute
15-inch and 13-inch are values of size attribute
V140 is the product

●	Don’t need to send actual SMSs. Mocking is sufficient.
●	Use appropriate design patterns (Decorator, Singleton, etc.)
