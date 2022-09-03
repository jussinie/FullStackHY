import React, { useState, useEffect } from 'react';
import axios from 'axios'

const SingleCountry = ({ singleCountry }) => {

  const [ weatherData, setWeatherData ] = useState(null)

  const lat = singleCountry.latlng[0]
  const lng = singleCountry.latlng[1]
  const api_key = process.env.REACT_APP_API_KEY

  useEffect(() => { 
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&exclude=hourly,daily&appid=${api_key}&units=metric`)
      .then(response => {
      console.log('weather promise fulfilled')
      setWeatherData(response.data)
      })
  }, [lat, lng, api_key])

  const url = `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`

  return (
      <div>
        <h1>{singleCountry.name}</h1>
        <p>capital {singleCountry.capital} <br/>
        population {singleCountry.population} </p>
        <h3>languages</h3>
        <ul>
          {singleCountry.languages.map(lang => 
            <li>{lang.name}</li>
            )}
        </ul>
        <img src={singleCountry.flag} alt="flag" width="128" />
        <h3>Weather in {singleCountry.capital}</h3>
        <p>temperature {weatherData.main.temp}</p>
        <img src={url} alt="icon"></img>
        <p>wind {weatherData.wind.speed}</p>
      </div>
    )
} 


const DisplayCountries = (props) => {

  const viewSingleCountry = (country) => {
    console.log('pressed', country)
    props.setSingleCountry(country)
  }

  if (props.singleCountry) {
    return (
      <>
        <SingleCountry singleCountry={props.singleCountry} />
      </>
    )
  }

  if (props.countriesToShow.length === 1) {
    return (
      <>
        <SingleCountry singleCountry={props.countriesToShow[0]}/>
      </>
    )
  }

  if (props.countriesToShow.length > 10) {
    return (
      <div>
        too many countries, define again
      </div>
    )
  }

  return (
    <div>
      {props.countriesToShow.map(country => {
        return (
          <div>
            {country.name}<button onClick={() => viewSingleCountry(country)}>view</button>
          </div>
        )
      }
      )}
    </div>
    )
}

const App = () => {

  const [ countries, setCountries ] = useState([])
  const [ newFilter, setNewFilter ] = useState('')
  const [ showCountries, setShowAll ] = useState(true)
  const [ singleCountry, setSingleCountry ] = useState(null)
  //const [ countriesToShow, setCountriesToShow ] = useState()

  useEffect(() => { 
    console.log('effect')
    axios
      .get('https://restcountries.com/v2/all')
      .then(response => {
      console.log('promise fulfilled')
      setCountries(response.data)
      })
  }, [])
  console.log('render', countries.length, 'countries')

  const handleFilter = (event) => {
    setNewFilter(event.target.value)
    setSingleCountry(null)
    console.log('new filter', newFilter)
    if (setNewFilter === '') {
      setShowAll(true)
    } else {
      setShowAll(false)
    }
  }

  console.log('single country', singleCountry)

  const countriesToShow = showCountries
    ? countries
    : countries.filter(country => country.name.toLowerCase().includes(newFilter.toLowerCase()))

  return (
    <div>
      find countries 
      <input value={newFilter}
      onChange={handleFilter}
      />
      <DisplayCountries 
        countriesToShow={countriesToShow} 
        singleCountry={singleCountry} 
        setSingleCountry={setSingleCountry} 
      />
    </div>
  )
}


export default App;
