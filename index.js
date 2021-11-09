// submitButton.addEventListener('click', function(e){
//     e.preventDefault()
// const latitude = '37.5717'
// const longitude = '-83.7068'

//     fetch(`https://api.weather.gov/points/${latitude},${longitude}`, {
//         method: 'GET'
//         })
//         .then(response => response.json())
//         .then(data => {
//             console.log(data.properties.forecastHourly)
//         })


const searchForm = document.querySelector('#city-search')
const submitButton = document.querySelector('[name="submit"]')
const searchBar = document.querySelector('#search')
const locationDataDiv = document.querySelector('#location-data')
const firstRow = document.querySelector("#first-row")



submitButton.addEventListener('click', function(e){
    e.preventDefault()
    fetch(`https://nominatim.openstreetmap.org/search.php?q=${searchBar.value}&format=jsonv2`)
        .then(response => response.json())
        .then(data => {
            addCityName(data)
            // setLatitude(data)
            // setLongitude(data)
            // let locationUl = document.createElement('ul')
            // locationDataDiv.append(locationUl)
            // let cityLi = document.createElement('li')
            // cityLi.dataset.city = data[0].display_name
            // cityLi.dataset.latitude = data[0].lat
            // cityLi.dataset.longitude = data[0].lon
            // cityLi.textContent = data[0].display_name
            // cityLi.setAttribute('class', 'city-name')
            // const firstRow = document.querySelector("#first-row")
            // let tableDataOne = document.createElement('td')
            // const displayName = data[0].display_name
            // const splitName = displayName.split(",")
            // const cityArray = splitName[0]
            // const stateArray = splitName[2]
            // const cityStateArray = cityArray.concat(stateArray)
            // tableDataOne.dataset.city = data[0].display_name
            // tableDataOne.textContent = cityStateArray
            // console.log(data[0].display_name)
            // console.log(cityStateArray)
            // tableDataOne.setAttribute('class', 'city-name')
            // firstRow.append(tableDataOne)
            // addCityEventListener(tableDataOne)
            // locationUl.append(cityLi)
//Set Lat
            // const secondRow = document.querySelector('#second-row')
            // let tableDataTwo = document.createElement('td')
            // tableDataTwo.textContent = data[0].lat
            // firstRow.append(tableDataTwo)


            // let cityLatitudeLi = document.createElement('li')
            // cityLatitudeLi.textContent = data[0].lat
            // locationUl.append(cityLatitudeLi)
//Set Long
            // let dataTableThree = document.createElement('td')
            // dataTableThree.textContent = data[0].lon
            // firstRow.append(dataTableThree)

            // let cityLongitudeLi = document.createElement('li')
            // cityLongitudeLi.textContent = data[0].lon
            // locationUl.append(cityLongitudeLi)



    })
})

//Add city name function

function addCityName(data){
    let locationUl = document.createElement('ul')
    locationDataDiv.append(locationUl)
    let cityLi = document.createElement('li')
    const displayName = data[0].display_name
    const splitName = displayName.split(",")
    const cityArray = splitName[0]
    const stateArray = splitName[2]
    const cityStateArray = cityArray.concat(stateArray)
    cityLi.dataset.city = data[0].display_name
    cityLi.dataset.latitude = data[0].lat
    cityLi.dataset.longitude = data[0].lon
    cityLi.textContent = cityStateArray
    // console.log(data[0].display_name)
    // console.log(cityStateArray)
    cityLi.setAttribute('class', 'city-name')
    locationUl.append(cityLi)
    addCityEventListener(cityLi)

}

// function setLatitude(data){
//     let latLi = document.createElement('li')
//     latLi.textContent = data[0].lat
//     locationUl.append(latLi)
// }

// function setLongitude(data){
//     let tableDataThree = document.createElement('td')
//     tableDataThree.textContent = data[0].lon
//     firstRow.append(tableDataThree)
//     addCityEventListener(tableDataThree)
// }

function addCityEventListener(cityName){
    cityName.addEventListener('click', function(e){
        fetch(`https://api.weather.gov/points/${e.target.dataset.latitude},${e.target.dataset.longitude}`)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                // let hourly = document.createElement('li')
                // let ulForecast = document.createElement('ul')
                // ulForecast.append(hourly)
                // locationDataDiv.append(ulForecast)
                // hourly.dataset.forecastHourly = data.properties.forecastHourly
                // console.log(data.properties.forecast)
                // console.log(data.properties.forecastHourly)
                // console.log(data.properties)
                fetch(`${data.properties.forecast}`)
                    .then(response => response.json())
                    .then(data => {
                        alert(`The Weather Today is ${data.properties.periods[0].detailedForecast}`)
                    })
                // fetch(`${hourly.dataset.forecastHourly}`)
                //     .then(response => response.json())
                //     .then(data => {
                //         console.log(data.properties.periods)
                //         for (const period of data.properties.periods.slice(0, 24)){
                //             let hourlyLi = document.createElement('li')
                //             hourlyLi.innerText = period.startTime
                //             hourly.append(hourlyLi)
                //         }
                //     })
            })

                
    })
}




window.addEventListener('DOMContentLoaded', function(){
    searchBar.value = 'Beattyville'
    const newEvent = new Event('click')
    submitButton.dispatchEvent(newEvent)
})







