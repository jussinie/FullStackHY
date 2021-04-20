import React, { useState, useEffect } from 'react';
import axios from 'axios'

const DisplayCountries = (props) => {
  if (props.countriesToShow.length === 1) {
    return (
      <div>
        <h1>{props.countriesToShow[0].name}</h1>
        <p>capital {props.countriesToShow[0].capital} <br/>
        population {props.countriesToShow[0].population} </p>
        <h3>languages</h3>
        <ul>
          {props.countriesToShow[0].languages.map(lang => 
            <li>{lang.name}</li>
            )}
        </ul>
        <img src={props.countriesToShow[0].flag} alt="flag" width="128" />
      </div>
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
      {props.countriesToShow.map(country =>
      <p>{country.name}</p>
      )}
    </div>
    )
}


const App = () => {

  const [ countries, setCountries ] = useState([])
  const [ newFilter, setNewFilter ] = useState('')
  const [ showCountries, setShowAll ] = useState(true)

  useEffect(() => { 
    console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
      console.log('promise fulfilled')
      setCountries(response.data)
      })
  }, [])
  console.log('render', countries.length, 'countries')

  const handleFilter = (event) => {
    setNewFilter(event.target.value)
    console.log('new filter', newFilter)
    if (setNewFilter === '') {
      setShowAll(true)
    } else {
      setShowAll(false)
    }
  }

  const countriesToShow = showCountries
    ? countries
    : countries.filter(country => country.name.toLowerCase().includes(newFilter.toLowerCase()))

  return (
    <div>
      find countries 
      <input value={newFilter}
      onChange={handleFilter}
      />
      <DisplayCountries countriesToShow={countriesToShow} />
    </div>
  )
}


export default App;
