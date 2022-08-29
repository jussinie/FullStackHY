import React, { useState, useEffect } from 'react';
import axios from 'axios'

const DisplayCountries = (props) => {

  const viewSingleCountry = (country) => {
    console.log('pressed', country)
    props.setSingleCountry(country)
  }

  if (props.singleCountry) {
    return (
      <div>
        <h1>{props.singleCountry.name}</h1>
        <p>capital {props.singleCountry.capital} <br/>
        population {props.singleCountry.population} </p>
        <h3>languages</h3>
        <ul>
          {props.singleCountry.languages.map(lang => 
            <li>{lang.name}</li>
            )}
        </ul>
        <img src={props.singleCountry.flag} alt="flag" width="128" />
      </div>
    )
  }

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
      <DisplayCountries countriesToShow={countriesToShow} singleCountry={singleCountry} setSingleCountry={setSingleCountry} />
    </div>
  )
}


export default App;
