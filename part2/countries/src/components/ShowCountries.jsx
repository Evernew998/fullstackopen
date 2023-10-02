const ShowCountries = ({ countriesToShow, countries }) => {

    if (countriesToShow === null || countriesToShow.length == 0) {
        return null
    }

    if (countriesToShow.length > 10) {
        return <div>Too many matches, specify another filter</div>
    } else if (countriesToShow.length > 1) {
        return countriesToShow.map(country => <div key={country}>{country}</div>)
    }

    const countryData = countries.filter(country => 
        country.name.common.toLowerCase() === countriesToShow[0].toLowerCase()
    )

    console.log(countryData)

    const countryLanguagesArray = Object.values(countryData[0].languages)

    console.log(countryLanguagesArray)

    return (
        <div>
            <h1>{countryData[0].name.common}</h1>
            <p>capital {countryData[0].capital[0]}</p>
            <p>area {countryData[0].area}</p>
            <strong>languages:</strong>
            <ul>
                {countryLanguagesArray.map(language => <li key={language}>{language}</li>)}
            </ul>
            <img src={countryData[0].flags.png} alt={countryData[0].name.common} />
        </div>
    )
}

export default ShowCountries