const searchForm = document.querySelector('#city-search')
const submitButton = document.querySelector('[name="submit"]')
const searchBar = document.querySelector('#search')
const locationDataDiv = document.querySelector('#location-data')
const firstRow = document.querySelector("#first-row")
const citiesDiv = document.querySelector("#city-weather-cards")

submitButton.addEventListener('click', function(e){
    e.preventDefault()
    // citiesDiv.innerHTML = ' '
    
    
    fetch(`https://nominatim.openstreetmap.org/search.php?q=${searchBar.value}&format=jsonv2`)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            searchBar.value = ' '
            let p = document.createElement('p')
            p.setAttribute('class', 'name')
            const displayName = data[0].display_name
            const splitName = displayName.split(",")
            const cityArray = splitName[0]
            const stateArray = splitName[2]
            const cityStateArray = cityArray.concat(stateArray)
            p.innerText = cityStateArray

            let btn = document.createElement('button')
            btn.setAttribute('type', 'button')
            btn.setAttribute('class', 'button')
            btn.innerText = 'x'
            btn.addEventListener('click', function(e) {
                cityCardDiv.remove()
            })

            let cityCardDiv = document.createElement('div')
            cityCardDiv.setAttribute('class', 'card')
            cityCardDiv.append(btn)
            cityCardDiv.append(p)
            citiesDiv.append(cityCardDiv)

            fetch(`https://api.weather.gov/points/${data[0].lat},${data[0].lon}`)
            .then(response => response.json())
            .then(data => {
                console.log(data)

                fetch(`${data.properties.forecast}`)
                    .then(response => response.json())
                    .then(daily => {
                        console.log(daily)
                        let h2 = document.createElement('h2')
                        h2.innerText = `${daily.properties.periods[0].temperature} F`
                        h2.setAttribute('class', 'temp')

                        let img = document.createElement('img')
                        img.src = daily.properties.periods[0].icon
                        img.setAttribute('class', 'weather-avatar')


                        cityCardDiv.append(h2, img)
                        citiesDiv.append(cityCardDiv)
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
})


//Add city name function

// function addCityName(data){
//     let locationUl = document.createElement('ul')
//     locationDataDiv.append(locationUl)
//     let cityLi = document.createElement('li')
//     const displayName = data[0].display_name
//     const splitName = displayName.split(",")
//     const cityArray = splitName[0]
//     const stateArray = splitName[2]
//     const cityStateArray = cityArray.concat(stateArray)
//     cityLi.dataset.city = data[0].display_name
//     cityLi.dataset.latitude = data[0].lat
//     cityLi.dataset.longitude = data[0].lon
//     cityLi.textContent = cityStateArray
//     // console.log(data[0].display_name)
//     // console.log(cityStateArray)
//     cityLi.setAttribute('class', 'city-name')
//     locationUl.append(cityLi)
//     addCityEventListener(cityLi)

// }


// function addCityEventListener(cityName){
//     cityName.addEventListener('click', function(e){
//         fetch(`https://api.weather.gov/points/${e.target.dataset.latitude},${e.target.dataset.longitude}`)
//             .then(response => response.json())
//             .then(data => {
//                 console.log(data)
                // let hourly = document.createElement('li')
                // let ulForecast = document.createElement('ul')
                // ulForecast.append(hourly)
                // locationDataDiv.append(ulForecast)
                // hourly.dataset.forecastHourly = data.properties.forecastHourly
                // console.log(data.properties.forecast)
                // console.log(data.properties.forecastHourly)
                // console.log(data.properties)
                // fetch(`${data.properties.forecast}`)
                //     .then(response => response.json())
                //     .then(daily => {
                //         alert(`The Weather Today is ${daily.properties.periods[0].detailedForecast}`)
                //     })
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
//             })

                
//     })
// }




// window.addEventListener('DOMContentLoaded', function(){
//     searchBar.value = ' '
//     const newEvent = new Event('click')
//     submitButton.dispatchEvent(newEvent)
// })







