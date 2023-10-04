import { useState, useEffect } from 'react'
import axios from 'axios'
import ShowCountries from './components/ShowCountries'

function App() {
  const [countries, setCountries] = useState(null)
  const [countryNames, setCountryNames] = useState(null)
  const [value, setValue] = useState('')
  const [countriesToShow, setCountriesToShow] = useState(null)

  const apiKey = import.meta.env.VITE_SOME_KEY

  //get all countries via api once
  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {

        //add showData property to all country objects and set it to false
        const countriesModified = response.data.map(country => {
          return {...country, showData: false}
        })
        console.log(countriesModified)
        setCountries(countriesModified)
        setCountryNames(response.data.map(country => country.name.common))
      })
  }, [])

  const handleChange = (event) => {
    if (event.target.value === '') {
      setValue(event.target.value)
      setCountriesToShow('')
      return
    }

    //show nothing when the promise to get all countries is not yet fulfilled/rejected
    if (countryNames === null) {
      return
    }

    //remove any white space on both ends
    const countryObjects = countries.filter(country => country.name.common.toLowerCase().includes(event.target.value.trim().toLowerCase()))
    setValue(event.target.value)
    setCountriesToShow(countryObjects)
  }

  const handleShowData = (country) => {
    console.log(country)

    if (country.showData === false) {

      //filter countries that do not have a capital city
      if (country.capital !== undefined) {
        axios
        .get(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${country.capital[0]}&aqi=no`)
        .then(response => {
          setCountries(

            //add current weather details to selected countries
            countries.map(nation => 
              nation.name.common === country.name.common ? 
              {...nation, showData: true, currentWeatherData: response.data.current} : 
              nation
            ) 
          )
          setCountriesToShow(
            countriesToShow.map(nation => 
              nation.name.common === country.name.common ? 
              {...nation, showData: true, currentWeatherData: response.data.current} : 
              nation
            ) 
          )
        })
        .catch(error => {

          //if there is an error, ommit showing current weather details
          setCountries(
            countries.map(nation => 
              nation.name.common === country.name.common ?
              {...nation, showData: true} :
              nation
            ) 
          )
          setCountriesToShow(
            countriesToShow.map(nation => 
              nation.name.common === country.name.common ? 
              {...nation, showData: true} : 
              nation
            ) 
          )
        })
      }
    }
    setCountries(
      countries.map(nation => nation.name.common === country.name.common ? {...nation, showData: !country.showData} : nation) 
    )
    setCountriesToShow(
      countriesToShow.map(nation => nation.name.common === country.name.common ? {...nation, showData: !country.showData} : nation) 
    )
  }

  return (
    <div>
      find countries
      <input type="text" value={value} onChange={handleChange}/>
      <ShowCountries countriesToShow={countriesToShow} handleShowData={handleShowData}/>
    </div>
  )
}

export default App
