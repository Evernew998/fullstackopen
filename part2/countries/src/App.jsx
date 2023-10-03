import { useState, useEffect } from 'react'
import axios from 'axios'
import ShowCountries from './components/ShowCountries'

function App() {
  const [countries, setCountries] = useState(null)
  const [countryNames, setCountryNames] = useState(null)
  const [value, setValue] = useState('')
  const [countriesToShow, setCountriesToShow] = useState(null)

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        const countriesModified = response.data.map(country => {
          return {...country, showData: false}
        })
        console.log(countriesModified)
        setCountries(countriesModified)
        setCountryNames(response.data.map(country => country.name.common))
      })
  }, [])

  //console.log(countries)
  //console.log(countryNames)

  const handleChange = (event) => {
    if (event.target.value === '') {
      setValue(event.target.value)
      setCountriesToShow('')
      return
    }

    if (countryNames === null) {
      return
    }

    const countryObjects = countries.filter(country => country.name.common.toLowerCase().includes(event.target.value.trim().toLowerCase()))
    setValue(event.target.value)
    setCountriesToShow(countryObjects)
  }

  const handleShowData = (country) => {
    console.log(country)
    setCountries(
      countries.map(nation => nation.name.common === country.name.common ? {...nation, showData: !nation.showData} : nation) 
    )
    setCountriesToShow(
      countriesToShow.map(nation => nation.name.common === country.name.common ? {...nation, showData: !nation.showData} : nation) 
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
