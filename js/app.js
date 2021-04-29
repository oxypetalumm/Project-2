
// -----------------------------------------------------plotly begins
function citycharts(year){ // Changed this from sample to year.  
    d3.json('../Data/alldata.json')
    .then((data) => {
    const metadata = data.metadata;
    const filteredArray = metadata.filter(sampleData => sampleData.id == year);
    const filteredData = filteredArray[0];

    let allCities = [];

    const size = filteredData.city.length;
    for (let i = 0; i < filteredData.city.length; i++) {
        allCities.push({
            'city': filteredData.city[i],
            'totalCrimes': filteredData.total[i],
        });
    }

    const sortByTotalCrime = allCities.sort(function(a,b){
        return b.totalCrimes - a.totalCrimes;
    });

    const mostDangerousCities = sortByTotalCrime.slice(0,10).reverse();

    let mostDangerousTotalCrimes = [];
    let mostDangerousCityByName = [];
    for (let i = 0; i < mostDangerousCities.length; i++) {
        mostDangerousTotalCrimes.push(mostDangerousCities[i].totalCrimes);
        mostDangerousCityByName.push(mostDangerousCities[i].city);
    }


    const hbar1 = {
        type: 'bar',
        x: mostDangerousTotalCrimes,
        y: mostDangerousCityByName,
        orientation: 'h',
       
    };
    
    var bardata1 = [hbar1];
    
    var barlayout1 = {
        title: `Top 10 Most Dangerous Cities`,  
        xaxis:{title: "Total Crime",
        type:"linear"
        },
        yaxis: {title: "Cities",
        type:"category"
        }                     
    };
    
    const leastDangerousCities = sortByTotalCrime.reverse().slice(0,10).reverse();
    Plotly.newPlot('bar', bardata1, barlayout1);

    let leastDangerousTotalCrimes = [];
    let leastDangerousCityByName = [];
    for (let i = 0; i < leastDangerousCities.length; i++) {
        leastDangerousTotalCrimes.push(leastDangerousCities[i].totalCrimes);
        leastDangerousCityByName.push(leastDangerousCities[i].city);
    }

    const hbar2 = {
        type: 'bar',
        x: leastDangerousTotalCrimes,
        y: leastDangerousCityByName,
        orientation: 'h',       
      };
    
    const bardata2 = [hbar2];
    
    const barlayout2 = {
        title: `Top 10 Safest Cities`,  
        xaxis:{title: "Total Crime",
        type:"linear"
        },
        yaxis: {title: "Cities",
        type:"category"
        }                          
    };
    
    Plotly.newPlot('bar2', bardata2, barlayout2);

    });
}

 
function init(){

    const dropdownMenu = d3.select("#selDataset");

    d3.json('data/alldata.json')
    .then((data) => {
        const dropdownNames = data.year;
        dropdownNames.forEach((year) => {
          dropdownMenu.append('option')
            .text(year)
            .property("value", year);
        });
    
        const showID = dropdownNames[0];
    citycharts(showID);
});
}
   
   
function optionChanged(othersample) {
    citycharts(othersample);
}

init();
// ----------------------------------- Plotly Ends




// document.getElementById("Year").addEventListener("change", onChangeYear);

//         function onChangeYear() {

//             var x = document.getElementById("Year");

//             if (x.value == '') {
//                 charForAllYear();
//             } else {
//                 chartForSpecificYear(x.value);
//             }
//         }

//         charForAllYear();

//         function chartForSpecificYear(year) {

//             d3.json("data/cacsvdata.json", function (error, topology) {

//                 var data = topology;
//                 data.forEach(function (item) {
//                     item.Population = item.Population.replace(/,/g, '');
//                 });

//                 // console.log(data)

//                 var sortedjson = data.slice().sort((a, b) => a.Population - b.Population);

//                 var least10uniqueCity = sortedjson.filter((arr, index, self) => index === self.findIndex((t) => (t.City === arr.City)));

//                 var least10dataArray = [];
//                 var least10dataHeader = ['City'];
//                 least10dataHeader.push(year + '');

//                 least10dataArray.push(least10dataHeader);

//                 for (var i = 0; i < 10; i++) {

//                     var least10data = [least10uniqueCity[i].City];

//                     var itemData = data.filter(function (item) {
//                         return item.City == least10uniqueCity[i].City && item.Year == year;
//                     });

//                     if (itemData.length > 0) {
//                         least10data.push(parseInt(itemData[0].Population));
//                     } else {
//                         least10data.push(0);
//                     }

//                     least10dataArray.push(least10data);

//                 }

//                 drawLeast10BarChart(least10dataArray);

//                 ///--------------------------------------------------------------------------------

//                 var top10Data = data.slice().sort((a, b) => b.Population - a.Population);
//                 var top10uniqueCity = top10Data.filter((arr, index, self) => index === self.findIndex((t) => (t.City === arr.City)));

//                 var top10dataArray = [];
//                 var top10dataHeader = ['City'];
//                 top10dataHeader.push(year + '');

//                 top10dataArray.push(top10dataHeader);

//                 for (var k = 0; k < 10; k++) {

//                     var top10dataItem = [top10uniqueCity[k].City];

//                     var itemTop10Data = data.filter(function (itm) {
//                         return itm.City == top10uniqueCity[k].City && itm.Year == year;
//                     });

//                     if (itemTop10Data.length > 0) {
//                         top10dataItem.push(parseInt(itemTop10Data[0].Population));
//                     } else {
//                         top10dataItem.push(0);
//                     }

//                     top10dataArray.push(top10dataItem);

//                 }

//                 drawTop10BarChart(top10dataArray);

//             });
//         }

//         function charForAllYear() {

//             d3.json("data/cacsvdata.json", function (error, topology) {

//                 var data = topology;
//                 data.forEach(function (item) {
//                     item.Population = item.Population.replace(/,/g, '');
//                 });

//                 var uniqueYear = data.filter((arr, index, self) => index === self.findIndex((t) => (t.Year === arr.Year)));

//                 if (uniqueYear.length == 0) document.getElementById("Year").innerHTML = "<option value=''>All</option>";
//                 else {
//                     var catOptions = "<option value=''>All</option>";
//                     for (key in uniqueYear) {
//                         catOptions += "<option value=" + uniqueYear[key].Year + ">" + uniqueYear[key].Year + "</option>";
//                     }
//                     document.getElementById("Year").innerHTML = catOptions;
//                 }

//                 var sortedjson = data.slice().sort((a, b) => a.Population - b.Population);

//                 var least10uniqueCity = sortedjson.filter((arr, index, self) => index === self.findIndex((t) => (t.City === arr.City)));

//                 var least10dataArray = [];
//                 var least10dataHeader = ['City'];

//                 for (var j = 0; j < uniqueYear.length; j++) {
//                     least10dataHeader.push(uniqueYear[j].Year + '');
//                 }

//                 least10dataArray.push(least10dataHeader);

//                 for (var i = 0; i < 10; i++) {

//                     var least10data = [least10uniqueCity[i].City];

//                     for (var j = 0; j < uniqueYear.length; j++) {

//                         var itemData = data.filter(function (item) {
//                             return item.City == least10uniqueCity[i].City && item.Year == uniqueYear[j].Year;
//                         });

//                         if (itemData.length > 0) {
//                             least10data.push(parseInt(itemData[0].Population));
//                         } else {
//                             least10data.push(0);
//                         }

//                     }

//                     least10dataArray.push(least10data);

//                 }

//                 drawLeast10BarChart(least10dataArray);

//                 ///--------------------------------------------------------------------------------

//                 var top10Data = data.slice().sort((a, b) => b.Population - a.Population);
//                 var uniqueYearForTop10 = data.filter((arr, index, self) => index === self.findIndex((t) => (t.Year === arr.Year)));
//                 var top10uniqueCity = top10Data.filter((arr, index, self) => index === self.findIndex((t) => (t.City === arr.City)));

//                 var top10dataArray = [];
//                 var top10dataHeader = ['City'];

//                 for (var m = 0; m < uniqueYearForTop10.length; m++) {
//                     top10dataHeader.push(uniqueYearForTop10[m].Year + '');
//                 }

//                 top10dataArray.push(top10dataHeader);

//                 for (var k = 0; k < 10; k++) {

//                     var top10dataItem = [top10uniqueCity[k].City];

//                     for (var l = 0; l < uniqueYearForTop10.length; l++) {

//                         var itemTop10Data = data.filter(function (itm) {
//                             return itm.City == top10uniqueCity[k].City && itm.Year == uniqueYearForTop10[l].Year;
//                         });

//                         if (itemTop10Data.length > 0) {
//                             top10dataItem.push(parseInt(itemTop10Data[0].Population));
//                         } else {
//                             top10dataItem.push(0);
//                         }
//                     }

//                     top10dataArray.push(top10dataItem);

//                 }

//                 drawTop10BarChart(top10dataArray);

//             });
//         }



//         function drawLeast10BarChart(jsonData) {
//             google.charts.load('current', { packages: ['corechart', 'bar'] });
//             google.charts.setOnLoadCallback(drawAxisTickColors);

//             function drawAxisTickColors() {

//                 var dataArray = [];
//                 for (var i = 0; i < jsonData.length; i++) {
//                     dataArray.push(jsonData[i]);
//                 }

//                 var data = google.visualization.arrayToDataTable(dataArray);

//                 var options = {
//                     title: 'Population least 10 Cities for three years ',
//                     height: 600,
//                     legend: { position: "top" },
//                     chartArea: { width: '50%' },
//                     hAxis: {
//                         title: 'Total Population',
//                         minValue: 0,
//                         textStyle: {
//                             bold: true,
//                             fontSize: 12,
//                             color: '#4d4d4d'
//                         },
//                         titleTextStyle: {
//                             bold: true,
//                             fontSize: 18,
//                             color: '#4d4d4d'
//                         }
//                     },
//                     vAxis: {
//                         title: 'City',
//                         textStyle: {
//                             fontSize: 14,
//                             bold: true,
//                             color: '#848484'
//                         },
//                         titleTextStyle: {
//                             fontSize: 14,
//                             bold: true,
//                             color: '#848484'
//                         }
//                     }
//                 };
//                 var chart = new google.visualization.BarChart(document.getElementById('least_10cities_chart'));
//                 chart.draw(data, options);
//             }

//         }



//         function drawTop10BarChart(jsonData) {
//             google.charts.load('current', { packages: ['corechart', 'bar'] });
//             google.charts.setOnLoadCallback(drawAxisTickColors);

//             function drawAxisTickColors() {

//                 var dataArray = [];
//                 for (var i = 0; i < jsonData.length; i++) {
//                     dataArray.push(jsonData[i]);
//                 }

//                 var data = google.visualization.arrayToDataTable(dataArray);

//                 // console.log(data)

//                 var options = {
//                     title: 'Population top 10 Cities for three years ',
//                     height: 600,
//                     legend: { position: "top" },
//                     chartArea: { width: '50%' },
//                     hAxis: {
//                         title: 'Total Population',
//                         minValue: 0,
//                         textStyle: {
//                             bold: true,
//                             fontSize: 12,
//                             color: '#4d4d4d'
//                         },
//                         titleTextStyle: {
//                             bold: true,
//                             fontSize: 18,
//                             color: '#4d4d4d'
//                         }
//                     },
//                     vAxis: {
//                         title: 'City',
//                         textStyle: {
//                             fontSize: 14,
//                             bold: true,
//                             color: '#848484'
//                         },
//                         titleTextStyle: {
//                             fontSize: 14,
//                             bold: true,
//                             color: '#848484'
//                         }
//                     }
//                 };
//                 var chart = new google.visualization.BarChart(document.getElementById('top_10cities_chart'));
//                 chart.draw(data, options);
//             }

//         }

