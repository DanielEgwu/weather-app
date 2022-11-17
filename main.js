

const city_name = document.getElementById('city')
const result_name = document.getElementById('cityname')
const search_btn = document.getElementById('search')
var main_temp = document.getElementById('main_temp')
var felt_temp = document.getElementById('felt')
var humidity = document.getElementById('hum')
var wind = document.getElementById('wind')
var visibility = document.getElementById('vis')
var temp_min = document.getElementById('min')
var temp_max = document.getElementById('max')


const refresh_btn = document.getElementById('refresh')

const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '4754042e17msh190442361249dccp1a7cf9jsn983cbfdcaf4b',
        'X-RapidAPI-Host': 'geocoding-by-api-ninjas.p.rapidapi.com'
    }
};

const option2 = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '4754042e17msh190442361249dccp1a7cf9jsn983cbfdcaf4b',
        'X-RapidAPI-Host': 'open-weather13.p.rapidapi.com'
    }
};

search_btn.onclick = () => {
    if (city_name.value != '') {
        fetch(`https://geocoding-by-api-ninjas.p.rapidapi.com/v1/geocoding?city=${city_name.value}`, options)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
            })
            .then(data => {
                display_result(data)
            })
            .catch(err => console.error(err));

        function display_result(data) {
            var lat = data[0].latitude;
            var long = data[0].longitude
            result_name.innerHTML = data[0].name

            fetch(`https://open-weather13.p.rapidapi.com/city/latlon/${lat}/${long}`, option2)
                .then((response) => {
                    if (response.ok) {
                        return response.json();
                    }
                })
                .then(data => {
                    display_data(data)

                })
                .catch(err => console.error(err));
        }


        function display_data(data) {

            console.log(data)

            //main temp
            var temp_celcius = parseInt(data.main.temp) - 273.1
            main_temp.innerHTML = Math.round(temp_celcius) + '<sup>o</sup>C'

            //felt temp 
            var temp_felt = parseInt(data.main.feels_like) - 273.1
            felt_temp.innerHTML =temp_felt.toFixed(1) + '<sup>o</sup>C'

            //humidity
            humidity.innerHTML = data.main.humidity + '%'

            //wind
            wind.innerHTML = data.wind.speed + 'km/h'

            //visibility
            visibility.innerHTML = data.visibility / 1000

            //min and max temp
            var max_temp = parseInt(data.main.temp_max) - 273.1
            var min_temp = parseInt(data.main.temp_min) - 273.1
            temp_max.innerHTML = max_temp.toFixed(1) + '<sup>o</sup>C'
            temp_min.innerHTML = min_temp.toFixed(1) + '<sup>o</sup>C'
        }
    }

}

refresh_btn.onclick = () => {
    if (city_name.value != '') {
        fetch(`https://geocoding-by-api-ninjas.p.rapidapi.com/v1/geocoding?city=${city_name.value}`, options)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
            })
            .then(data => {
                display_result(data)
            })
            .catch(err => console.error(err));

        function display_result(data) {
            var lat = data[0].latitude;
            var long = data[0].longitude
            result_name.innerHTML = data[0].name

            fetch(`https://open-weather13.p.rapidapi.com/city/latlon/${lat}/${long}`, option2)
                .then((response) => {
                    if (response.ok) {
                        return response.json();
                    }
                })
                .then(data => {
                    display_data(data)

                })
                .catch(err => console.error(err));

        }

        function display_data(data) {

            console.log(data)
            //convert to celcius
            var temp_celcius = parseInt(data.main.temp) - 273.1
            main_temp.innerHTML = Math.round(temp_celcius) + '<sup>o</sup>C'
        }
    }
}
