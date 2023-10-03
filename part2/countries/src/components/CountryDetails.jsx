const CountryDetails = ({ country, handleShowData }) => {

    if (country.showData === false) {
        return (
            <div>
                {country.name.common} <button onClick={handleShowData}>show</button>
            </div>
        )
    }

    const countryLanguagesArray = Object.values(country.languages)
    return (
        <div>
            <h1>
                {country.name.common} 
                <span> <button onClick={handleShowData}>hide</button></span>
            </h1> 
            <p>capital {country.capital[0]}</p>
            <p>area {country.area}</p>
            <strong>languages:</strong>
            <ul>
                {countryLanguagesArray.map((language) => <li key={language}>{language}</li>)}
            </ul>
            <img src={country.flags.png} alt={country.flags.alt} />
        </div>
    )
}

export default CountryDetails