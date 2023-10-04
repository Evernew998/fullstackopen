import WeatherDetails from "./WeatherDetails"

const CountryDetails = ({ country, handleShowData }) => {

    if (country.showData === false) {
        return (
            <div>
                {country.name.common} <button onClick={handleShowData}>show</button>
            </div>
        )
    }

    //make the languages object into an array for convenience
    const countryLanguagesArray = Object.values(country.languages)
    
    //for countries that do not have a capital city
    let capitalCity = '(country does not have a capital city)'

    if (country.capital) {
        capitalCity = country.capital[0]
    }

    return (
        <div>
            <h1>
                {country.name.common} 
                <span> <button onClick={handleShowData}>hide</button></span>
            </h1> 
            <p>capital {capitalCity}</p>
            <p>area {country.area}</p>
            <strong>languages:</strong>
            <ul>
                {countryLanguagesArray.map((language) => <li key={language}>{language}</li>)}
            </ul>
            <img src={country.flags.png} alt={country.flags.alt} />
            <WeatherDetails country={country} />
        </div>
    )
}

export default CountryDetails