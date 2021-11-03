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


submitButton.addEventListener('click', function(e){
    console.log(searchBar.value)
    e.preventDefault()
    fetch(`https://nominatim.openstreetmap.org/search.php?q=${searchBar.value}&format=jsonv2`)
        .then(response => response.json())
        .then(data => {
            let locationUl = document.createElement('ul')
            locationDataDiv.append(locationUl)
            let cityLi = document.createElement('li')
            cityLi.dataset.city = data[0].display_name
            cityLi.dataset.latitude = data[0].lat
            cityLi.dataset.longitude = data[0].lon
            cityLi.textContent = data[0].display_name
            cityLi.setAttribute('class', 'city-name')
            addCityEventListener(cityLi)
            locationUl.append(cityLi)
//Set Lat
            let cityLatitudeLi = document.createElement('li')
            cityLatitudeLi.textContent = data[0].lat
            locationUl.append(cityLatitudeLi)
//Set Long
            let cityLongitudeLi = document.createElement('li')
            cityLongitudeLi.textContent = data[0].lon
            locationUl.append(cityLongitudeLi)



    })
})

function addCityEventListener(cityName){
    cityName.addEventListener('click', function(e){
        fetch(`https://api.weather.gov/points/${e.target.dataset.latitude},${e.target.dataset.longitude}`)
            .then(response => response.json())
            .then(data => {
                let hourly = document.createElement('li')
                let ulForecast = document.createElement('ul')
                ulForecast.append(hourly)
                locationDataDiv.append(ulForecast)
                hourly.dataset.forecastHourly = data.properties.forecastHourly
                console.log(data.properties.forecast)
                console.log(data.properties.forecastHourly)
                console.log(data.properties)
                console.log(hourly.dataset.forecastHourly)
                fetch(`${hourly.dataset.forecastHourly}`)
                    .then(response => response.json())
                    .then(data => {
                        console.log(data.properties.periods)
                        for (const period of data.properties.periods.slice(0, 24)){
                            let hourlyLi = document.createElement('li')
                            hourlyLi.innerText = period.startTime
                            hourly.append(hourlyLi)
                        }
                    })
            })

                
    })
}




window.addEventListener('DOMContentLoaded', function(){
    searchBar.value = 'Beattyville'
    const newEvent = new Event('click')
    submitButton.dispatchEvent(newEvent)
})





// console.log(data)
// console.log(data[0].display_name)
// console.log(data[0].lat)
// console.log(data[0].lon)




