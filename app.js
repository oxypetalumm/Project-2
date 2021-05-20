
function citycharts(year){ // Changed this from sample to year.  
    d3.json('./all_data.js')
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

    d3.json('./all_data.js')
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



