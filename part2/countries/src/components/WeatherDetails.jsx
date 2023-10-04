const WeatherDetails = ({ country }) => {

    //for countries that do not have a capital city, and for the case where promise is rejected    
    if (country.currentWeatherData === undefined) {
        return null
    }

    return (
        <div>
            <h2>Weather in {country.capital[0]}</h2>
            <p>temperature {country.currentWeatherData.temp_c} Celcius</p>
            <img 
                src={country.currentWeatherData.condition.icon} 
                alt={country.currentWeatherData.condition.text}
            />
            <p>wind {country.currentWeatherData.wind_kph} km/s</p>
        </div>
    )
}

export default WeatherDetails