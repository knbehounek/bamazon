var mysql = require('mysql');
var inquirer = require('inquirer');

//create connection to db
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "root",
  database: "bamazon"
})

function start() {
  //prints the items for sale and their details
  connection.query('SELECT * FROM Products', function (err, res) {
    if (err) throw err;

    console.log('Welcom to Bamazon')
    console.log('-------------------------------------')

    for (var i = 0; i < res.length; i++) {
      console.log("ID: " + res[i].Item_ID + " | " + "Product: " + res[i].Product_Name + " | " + "Department: " + res[i].Department_Name + " | " + "Price: " + res[i].Price + " | " + "QTY: " + res[i].Stock_Quantity);
      console.log('-----------------------------------')
    }

    console.log(' ');
    inquirer.prompt([
      {
        type: "input",
        name: "id",
        message: "What is the ID of the product you are looking to purchase?",
        validate: function (value) {
          if (isNaN(value) == false && parseInt(value) <= res.length && parseInt(value) > 0) {
            return true;
          } else {
            return false;
          }
        }
      },
      {
        type: "input",
        name: "qty",
        message: "How much of the product would you like to purchase?",
        validate: function (value) {
          if (isNaN(value)) {
            return false;
          } else {
            return true;
          }
        }
      }
    ]).then(function (answer) {
      var whatToBuy = (answer.id) - 1;
      var howMuchToBuy = parseInt(answer.qty);
      var grandTotal = parseFloat(((res[whatToBuy].Price) * howMuchToBuy).toFixed(2));

      //check if quantity is sufficient
      if (res[whatToBuy].Stock_Quantity >= howMuchToBuy) {
        //after purchase, updates quantity in Products
        connection.query("UPDATE products SET ? WHERE ?", [
          { Stock_Quantity: (res[whatToBuy].Stock_Quantity - howMuchToBuy) },
          { Item_ID: answer.id }
        ], function (err, result) {
          if (err) throw err;
          console.log("Thanks! Your total is $" + grandTotal.toFixed(2) + ". Plan on your item(s) being shipped to you in 3-5 business days.");
        });

        connection.query("SELECT * FROM Departments", function (err, deptRes) {
          if (err) throw err;
          var index;
          for (var i = 0; i < deptRes.length; i++) {
            if (deptRes[i].Department_Name === res[whatToBuy].Department_Name) {
              index = i;
            }
          }

          //updates totalSales in departments table
          connection.query("UPDATE Departments SET ? WHERE ?", [
            { TotalSales: deptRes[index].TotalSales + grandTotal },
            { Department_Name: res[whatToBuy].Department_Name }
          ], function (err, deptRes) {
            if (err) throw err;
            //console.log("Updated Dept Sales.");
          });
        });

      } else {
        console.log("Sorry, there's not enough in stock!");
      }

      reprompt();
    })
  })
}

//asks if they would like to purchase another item
function reprompt() {
  inquirer.prompt([{
    type: "confirm",
    name: "reply",
    message: "Would you like to purchase any other items?"
  }]).then(function (answer) {
    if (answer.reply) {
      start();
    } else {
      console.log("See you again soon!");
    }
  });
}

start();