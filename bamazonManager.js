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

function start(){
  inquirer.prompt([{
    type: "list",
    name: "doThing",
    message: "What is it you'd like to do?",
    choices: ["View Products available for Sale", "See Low Inventory", "Add to Inventory", "Add a New Product"," End the Session"]
  }]).then(function(ans){
     switch(ans.doThing){
      case "View Products available for Sale": viewProducts();
      break;
      case "See Low Inventory": viewLowInventory();
      break;
      case "Add to Inventory": addToInventory();
      break;
      case "Add a New Product": addNewProduct();
      break;
      case "End the Session": console.log('Thank you.');
    }
  });
}

//Shows all inventory
function viewProducts(){
  console.log('Viewing Products');

  connection.query('SELECT * FROM products', function(err, res){
  if(err) throw err;
  console.log('-----------------------------')

  for(var i = 0; i<res.length;i++){
    console.log("ID: " + res[i].Item_ID + " | " + "Product: " + res[i].Product_Name + " | " + "Department: " + res[i].Department_Name + " | " + "Price: " + res[i].Price + " | " + "QTY: " + res[i].Stock_Quantity);
    console.log('---------------------------')
  }

  start();
  });
}

//Shows items with a quantity that is less than 5
function viewLowInventory(){
  console.log('Viewing Low Quantity');

  connection.query('SELECT * FROM products', function(err, res){
  if(err) throw err;
  console.log('------------------------------')

  for(var i = 0; i<res.length;i++){
    if(res[i].Stock_Quantity <= 5){
    console.log("ID: " + res[i].Item_ID + " | " + "Product: " + res[i].Product_Name + " | " + "Department: " + res[i].Department_Name + " | " + "Price: " + res[i].Price + " | " + "QTY: " + res[i].Stock_Quantity);
    console.log('----------------------------');
    }
  }

  start();
  });
}

//displays prompt to add more of an item to the store and asks how much
function addToInventory(){
  console.log('Adding to Inventory');

  connection.query('SELECT * FROM products', function(err, res){
  if(err) throw err;
  var itemArray = [];
  //pushes each item into an itemArray
  for(var i=0; i<res.length; i++){
    itemArray.push(res[i].Product_Name);
  }

  inquirer.prompt([{
    type: "list",
    name: "product",
    choices: itemArray,
    message: "Which item would you like to add quantity to?"
  }, {
    type: "input",
    name: "qty",
    message: "How much stock would you like to add?",
    validate: function(value){
      if(isNaN(value) === false){return true;}
      else{return false;}
    }
    }]).then(function(ans){
      var currentQty;
      for(var i=0; i<res.length; i++){
        if(res[i].Product_Name === ans.product){
          currentQty = res[i].Stock_Quantity;
        }
      }
      connection.query('UPDATE products SET ? WHERE ?', [
        {Stock_Quantity: currentQty + parseInt(ans.qty)},
        {Product_Name: ans.product}
        ], function(err, res){
          if(err) throw err;
          console.log('The quantity was updated.');
          start();
        });
      })
  });
}

//allows manager to add a completely new product to store
function addNewProduct(){
  console.log('Adding New Product');
  var deptNames = [];

  //grab name of departments
  connection.query('SELECT * FROM Departments', function(err, res){
    if(err) throw err;
    for(var i = 0; i<res.length; i++){
      deptNames.push(res[i].Department_Name);
    }
  })

  inquirer.prompt([{
    type: "input",
    name: "product",
    message: "Product: ",
    validate: function(value){
      if(value){return true;}
      else{return false;}
    }
  }, {
    type: "list",
    name: "department",
    message: "Department: ",
    choices: deptNames
  }, {
    type: "input",
    name: "price",
    message: "Price: ",
    validate: function(value){
      if(isNaN(value) === false){return true;}
      else{return false;}
    }
  }, {
    type: "input",
    name: "quantity",
    message: "Quantity: ",
    validate: function(value){
      if(isNaN(value) == false){return true;}
      else{return false;}
    }
  }]).then(function(ans){
    connection.query('INSERT INTO products SET ?',{
      Product_Name: ans.product,
      Department_Name: ans.department,
      Price: ans.price,
      Stock_Quantity: ans.quantity
    }, function(err, res){
      if(err) throw err;
      console.log('Another item was added to the store.');
    })
    start();
  });
}

start();