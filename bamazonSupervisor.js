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
    message: "What would you like to do?",
    choices: ["View the Product Sales by Department", "Create a New Department", "End the Session"]
  }]).then(function(ans){
    switch(ans.doThing){
      case "View the Product Sales by Department": viewProductByDept();
      break;
      case "Create a New Department": createNewDept();
      break;
      case "End the Session": console.log('Thank you');
    }
  });
}

//view product sales by department
function viewProductByDept(){
  //prints the items for sale and their details
  connection.query('SELECT * FROM Departments', function(err, res){
    if(err) throw err;
    console.log('Product Sales by Department');
    console.log('----------------------------')

    for(var i = 0; i<res.length;i++){
      console.log("Department ID: " + res[i].DepartmentID + " | " + "Department Name: " + res[i].Department_Name + " | " + "Over Head Cost: " + (res[i].OverHeadCosts).toFixed(2) + " | " + "Product Sales: " + (res[i].TotalSales).toFixed(2) + " | " + "Total Profit: " + (res[i].TotalSales - res[i].OverHeadCosts).toFixed(2));
      console.log('-------------------------')
    }
    start();
  })
}

  //create a new department
  function createNewDept(){
    console.log('Creating New Department');
    inquirer.prompt([
    {
      type: "input",
      name: "deptName",
      message: "Department Name: "
    }, {
      type: "input",
      name: "overHeadCost",
      message: "Over Head Cost: ",
      default: 0,
      validate: function(val){
        if(isNaN(val) === false){return true;}
        else{return false;}
      }
    }, {
      type: "input",
      name: "prodSales",
      message: "Product Sales: ",
      default: 0,
      validate: function(val){
        if(isNaN(val) === false){return true;}
        else{return false;}
      }
    }
    ]).then(function(ans){
      connection.query('INSERT INTO Departments SET ?',{
        Department_Name: ans.deptName,
        OverHeadCosts: ans.overHeadCost,
        TotalSales: ans.prodSales
      }, function(err, res){
        if(err) throw err;
        console.log('Another department was added.');
      })
      start();
    });
  }

start();

