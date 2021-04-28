var tableData_2018 = data_2018;

console.log(data_2018)

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

buildTable(tableData_2018);