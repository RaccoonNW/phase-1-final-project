submitButton.addEventListener('click', function(e){
    e.preventDefault()
    fetch(`https://api.weather.gov/points/{latitude},{longitude}`, {
        method: 'GET'
        })

    })
        .then(response => response.json())
        .then(data => {
            console.log(data)
        })