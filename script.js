// Function to collect employee data
const collectEmployees = function() {
  const employeesArray = [];
  
  do {
    const firstName = prompt(`Enter the employee's first name:`);

    // If the user cancels or leaves the first name empty, exit the loop
    if (firstName === null || firstName.trim() === '') {
      break;
    }

    const lastName = prompt(`Please enter the employee's last name:`);
    
    // If the user cancels the last name prompt, exit the loop
    if (lastName === null) {
      break;
    }

    const salaryInput = prompt(`Please enter the employee's salary:`);

    // If the user cancels without entering salary, exit the loop
    if (salaryInput === null) {
      break;
    }

    const salary = parseFloat(salaryInput);

    if (isNaN(salary)) {
      alert("Invalid input for salary. It will default to $0.");
    }

    const employee = {
      firstName: firstName,
      lastName: lastName,
      salary: isNaN(salary) ? 0 : salary
    };
    employeesArray.push(employee);

  } while (confirm('Would you like to add another employee?'));

  return employeesArray;
};

// Function to calculate and display the average salary
const displayAverageSalary = function(employeesArray) {
  let totalSalary = 0;

  for (let i = 0; i < employeesArray.length; i++) {
    totalSalary += employeesArray[i].salary;
  }

  const averageSalary = totalSalary / employeesArray.length;
  console.log(`The average salary is $${averageSalary.toFixed(2)}`);
};

// Function to select and display a random employee
const getRandomEmployee = function(employeesArray) {
  const randomIndex = Math.floor(Math.random() * employeesArray.length);
  const randomEmployee = employeesArray[randomIndex];
  console.log(`Random employee: ${randomEmployee.firstName} ${randomEmployee.lastName}`);
};

// Event listener for 'Add Employees' button
const addEmployeesBtn = document.querySelector('#add-employees-btn');
addEmployeesBtn.addEventListener('click', function() {
  const employees = collectEmployees();
  
  if (employees.length > 0) {
    console.table(employees);
    displayAverageSalary(employees);
    getRandomEmployee(employees);
  } else {
    console.log("No employees added.");
  }
});


/*
  ====================
  STARTER CODE
  Do not modify any of the code below this line:
*/

// Display employee data in an HTML table
const displayEmployees = function(employeesArray) {
  // Get the employee table
  const employeeTable = document.querySelector('#employee-table');

  // Clear the employee table
  employeeTable.innerHTML = '';

  // Loop through the employee data and create a row for each employee
  for (let i = 0; i < employeesArray.length; i++) {
    const currentEmployee = employeesArray[i];

    const newTableRow = document.createElement("tr");

    const firstNameCell = document.createElement("td");
    firstNameCell.textContent = currentEmployee.firstName;
    newTableRow.append(firstNameCell);

    const lastNameCell = document.createElement("td");
    lastNameCell.textContent = currentEmployee.lastName;
    newTableRow.append(lastNameCell);

    const salaryCell = document.createElement("td");
    // Format the salary as currency
    salaryCell.innerHTML = currentEmployee.salary.toLocaleString("en-US", {
      style: "currency",
      currency: "USD"
    });

    newTableRow.append(salaryCell);

    employeeTable.append(newTableRow);
  }
}

const trackEmployeeData = function() {
  const employees = collectEmployees();

  console.table(employees);

  displayAverageSalary(employees);

  console.log('==============================');

  getRandomEmployee(employees);

  employees.sort(function(a,b) {
    if (a.lastName < b.lastName) {
      return -1;
    } else {
      return 1;
    }
  });

  displayEmployees(employees);
}

// Add event listener to 'Add Employees' button
addEmployeesBtn.addEventListener('click', trackEmployeeData);