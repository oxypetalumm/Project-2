// // from data.js
// var tableData_2019 = data_2019;

// // console.log(data)

// // define and connect table body
// var tableBody = d3.select('tbody');

// //create function for the table body
// function buildTable(crime){
//   tableBody.html("");
//   crime.forEach((row) => {
//     var tRow = tableBody.append('tr');
//     Object.values(row).forEach((value) => {
//       let cell = tRow.append("td");
//         cell.text(value);
//     })
//   });
// }

// buildTable(tableData_2019);

// // ---------------------------------------------

// var tableData_2018 = data_2018;

// console.log(data_2018)

// // define and connect table body
// var tableBody = d3.select('tbody');

// //create function for the table body
// function buildTable(crime){
//   tableBody.html("");
//   crime.forEach((row) => {
//     var tRow = tableBody.append('tr');
//     Object.values(row).forEach((value) => {
//       let cell = tRow.append("td");
//         cell.text(value);
//     })
//   });
// }

// buildTable(tableData_2018);

// // ----------------------------------------------

// var tableData_2017 = data_2017;

// // console.log(data)

// // define and connect table body
// var tableBody = d3.select('tbody');

// //create function for the table body
// function buildTable(crime){
//   tableBody.html("");
//   crime.forEach((row) => {
//     var tRow = tableBody.append('tr');
//     Object.values(row).forEach((value) => {
//       let cell = tRow.append("td");
//         cell.text(value);
//     })
//   });
// }

// buildTable(tableData_2017);

// -----------------------------------------------------plotly begins

function cityCharts(chart){

    d3.json('data/alldata.json')
    .then((data) => {
        //console.log(data)
    var charts = data.metadata;
    var filteredArray = charts.filter(chartData => chartData.id == chart);
    var filteredData = filteredArray[0];

//Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.
    //var total = data.total//data.map(row => row.total)
    //var city = data.city//data.map(row => row.city)

    //var total1 = filteredData.total.sort(function(a, b){return a-b});
    //var total1 = filteredData.total.sort(a, b);
    //var total10D = total1.slice(0,10).reverse()
    //var city1 = filteredData.city
    //var totalcity1 = city1.slice(0,10).map(id => `${id}`).reverse()

    //var total1list = filteredData.total.slice(0,10).reverse()
    var indexList = []
    var copylist = filteredData.total
    var total1list = filteredData.total.sort(function(a,b){return b-a}).slice(0,10).reverse()
    // foreach
    indexList.push( copylist.findIndex(x => x=== total1list[0]))

    console.log(indexList)
    var city1list = filteredData.city.slice(0,10).map(id => `${id}`).reverse()

    var hbar = {
        type: 'bar',
        x: total1list,
        //x:total10D
        y: city1list,
        //y:totalcity1
        orientation: 'h',
        //text: filteredData.city//.slice(0,10).reverse()
       
    };
    
    var bardata = [hbar];
    
    var barlayout = {
        title: `Top 10 Most Dangerous Cities`                 
    };
    
    Plotly.newPlot('bar', bardata, barlayout);

    //var total2 = filteredData.total.sort(function(a, b){return b-a});
    //var total10S = total2.slice(0,10).reverse()
    //var city2 = filteredData.city
    //var totalcity2 = city2.slice(0,10).map(id => `${id}`).reverse()

    var total2list = filteredData.total.sort(function(a,b){return a-b}).slice(0,10).reverse()
    var city2list = filteredData.city.slice(0,10).map(id => `${id}`).reverse()

    var hbar = {
        type: 'bar',
        x: total2list,
        y: city2list,
        orientation: 'h',
        //text: filteredData.city//.slice(0,10).reverse()
        transform:[
            { type: "sort",
              target:"x",
              order: "descending"
           }
        ]
       
      };
    
    var bardata = [hbar];
    
    var barlayout = {
        title: `Top 10 Safest Cities`,
        xaxis:{title: "City Data",
               type:"linear"
              },
        yaxis: {title: "Cities",
                type:"category"
               }                     
        };
    
    Plotly.newPlot('bar2', bardata, barlayout);

    });
}

 
function init(){

    var dropdownMenu = d3.select("#selDataset");

    d3.json('data/alldata.json')
    .then((data) => {
        var dropdownNames = data.year;
        dropdownNames.forEach((chart) => {
          dropdownMenu.append('option')
            .text(chart)
            .property("value", chart);
        });
    
    var showID = dropdownNames[0];
    // infodemochart(showID);
    cityCharts(showID);
});
}
   
   
function optionChanged(otherchart) {
    // infodemochart(otherchart);
    cityCharts(otherchart);
}

init();
console.error();

// ----------------------------------- Plotly Ends