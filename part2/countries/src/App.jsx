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
        console.log(response.data)
        setCountries(response.data)
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
    
    const countryFiltered = countryNames.filter(country => country.toLowerCase().includes(event.target.value.trim().toLowerCase()))
    setValue(event.target.value)
    setCountriesToShow(countryFiltered)
  }

  return (
    <div>
      find countries
      <input type="text" value={value} onChange={handleChange}/>
      <ShowCountries countriesToShow={countriesToShow} countries={countries}/>
    </div>
  )
}

export default App
