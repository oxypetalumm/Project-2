var tableData_2017 = data_2017;

// console.log(data)

// define and connect table body
var tableBody = d3.select('tbody');

//create function for the table body
function buildTable(crime){
  tableBody.html("");
  crime.forEach((row) => {
    var tRow = tableBody.append('tr');
    Object.values(row).forEach((value) => {
      let cell = tRow.append("td");
        cell.text(value);
    })
  });
}

buildTable(tableData_2017);
