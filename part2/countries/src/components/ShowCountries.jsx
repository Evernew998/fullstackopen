import CountryDetails from "./CountryDetails"

const ShowCountries = ({ countriesToShow, handleShowData }) => {

    if (countriesToShow === null || countriesToShow.length == 0) {
        return null
    }

    if (countriesToShow.length > 10) {
        return <div>Too many matches, specify another filter</div>
    } else if (countriesToShow.length > 0){

        return (
            countriesToShow.map(country => 
                <CountryDetails 
                    key={country.name.common}
                    country={country}
                    handleShowData={() => handleShowData(country)}
                />
            )
        )
    }
}

export default ShowCountries