# BAMazon

The project had the goal to create an online store system like Amazon using Node.js and MySQL.

# How to get started

1) Clone repo.
2) Run command in Terminal or Gitbash 'npm install'
3) Run command depending which mode you would like to be on:
    a) Customer - 'node customer.js'
    b) Manager - 'node manager.js'
    c) Supervisor - 'node supervisor.js'
4) Press 'ctrl + c' to exit each mode

# Functions of JavaScript Files

1. `bamazonCustomer.js`

    1) Displays/Prints the all products in the store.

    2) Prompts the customer which product they would like to purchase by the ID number.

    3) Asks the customer for the desired quantity.

      a) If there is enough quantity of the product, it will return the total for that purchase.
      b) If there is not enough of the product, it will tell the user that there isn't enough.
      c) If the purchase goes through, it updates the quantity of the product to reflect the purchase.
      d) It will also update the product sales in the department table.
<img src="App%20Photos/bamazonCustomer.png" width="800">

-----------------------

2. `bamazonManager.js`

    * Starts with a menu:
        * View the Products for Sale
        * View Low Inventory
        * Add to Inventory
        * Add a New Product
        * End the Session

    * If the manager selects `View the Products for Sale`, it lists all of the products in the store including all of their details.

    * If the manager selects `View Low Inventory`, it'll list all the products with less than five items in its StockQuantity column.

    * If the manager selects `Add to Inventory`, it allows the manager to select a product and add inventory.

    * If the manager selects `Add a New Product`, it allows the manager to add a new product to the store.

    * If the manager selects `End the Session`, it ends the session and doesn't go back to the menu.
<img src="App%20Photos/bamazonManaager.png" width="800">
-----------------------

3. `bamazonSupervisor.js`

    * Starts with a menu:
        * View Product Sales by Department
        * Create New Department
        * End the Session

    * If the manager selects `View Product Sales by Department`, it lists the Department Sales and calculates the total sales from the overhead cost and product sales.

    * If the manager selects `Create New Department`, it allows the manager to create a new department and input current overhead costs and product sales. If there are none, by default it will set at 0.

    * If the manager selects `End the Session`, it ends the session and doesn't go back to the menu.
<img src="App%20Photos/bamazonSupervisor.png" width="800">

# Technologies used
1) Node.js
2) Inquire NPM Package
    a) in terminal run 'npm install inquirer'
3) MYSQL NPM Package 
    b) in terminal run 'npm install mysql'

#Prerequisites

- Create a MYSQL database called 'bamazon', reference schema.sql

