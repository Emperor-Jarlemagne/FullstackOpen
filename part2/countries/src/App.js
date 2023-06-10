import {useState, useEffect} from 'react'
import axios from 'axios'
import ShowCountries from './components/ShowCountries'

const App = () => {
    const [ countries, setCountries ] = useState([])
    const [ searchFilter, setSearchFilter ] = useState('')

    useEffect(() => {
        axios
          .get(`https://restcountries.eu/rest/v2/all`)
            .then(response => {
            setCountries(response.data)
          })  
          .catch(error => {
            console.log("Error, Sorry Jim")
          }) 
          }, [])

          const handleFilter = (event) => {
            console.log(event.target.value)
            setSearchFilter(event.target.value)
        }

    const filteredCountries = countries.filter(country => country.name.toLowerCase().indexOf(searchFilter.toLowerCase()))
        
    return (
        <div>
          <h1>Countries</h1>
            Find Country: <input value={searchFilter} onChange={handleFilter} />
            <ShowCountries filteredCountries={filteredCountries} setSearchFilter={setSearchFilter} />
        </div>
    )
}

export default App 

/*import React, { useState, useEffect } from 'react'
import axios from 'axios'
import showCountries from "./components/ShowCountries"

const App = () => {
    const [countries, setCountries] = useState([])
    const [searchFilter, setSearchFilter] = useState('')

    useEffect(() => {
        axios
          .get('https://restcountries.com/v3.1/all')
            .then(response => {
            setCountries(response.data)
          })  
          .catch(function(error) {
            console.log("Error", error.message)
          })
          }, [])

        const handleFilter = (event) => {
            console.log(event.target.value)
            setSearchFilter(event.target.value)
        }

        const filteredCountries = countries.filter(
          country => country.name.toString().toLowerCase().includes(searchFilter.toLowerCase())
          )
        
        const showCountries = () => {
          if (filteredCountries.length > 10) {
            return <p>Too Many Matches</p>
          } 
          else if (filteredCountries.length > 1 && filteredCountries.length < 10) {
            return countries.map(country => (
              <p key={country.cioc}>{country.name}</p>
            ))
          }
          else if (filteredCountries.length === 1) {
            return (
              <div>
                <h2>{countries[0].name}</h2>
                <p>Capital: {filteredCountries.capital}</p>
                <p>Population: {filteredCountries[0].population}</p>
                <h3>Languages</h3>
                <ul>
                  <Languages country={countries[0]} />
                </ul>
                <img src = {`${countries[0].flag}`}
                    alt = {`flag of ${countries[0].name}`}
                    width = "100px"
                    />
              </div>
            );
          } else {
            return null;
          }
        }
        const Languages = ({ country }) => {
          return country.languages.map(language => (
            <li key={language.name}>{language.name}</li>
          ));
        }; 

        return (
        <div>
          <h1>Countries</h1>
            Search: <input type="text" value={searchFilter} onChange={handleFilter} />
            <div>
              {showCountries()}
            </div>
        </div>
        )
}

export default App

/* import {useState, useEffect} from 'react'
import axios from 'axios'

const App = () => {
    const [countries, setCountries] = useState([])
    const [newFilter, setNewFilter] = useState('')
    
    useEffect(() => {
        axios.get(`https://restcountries.com/v3.1/all`)
            .then(response => {
                setCountries(response.data)
            })
              .catch(function(error) {
                console.log("Error", error.message)
              })
          }, [])      
    
    const countryList = newFilter ? 
      countries.filter(countries => countries.name.toLowerCase().includes(newFilter.toLowerCase())) :
      countries

    const handleFilter = (event) => {
        console.log(event.target.value)
        setNewFilter(event.target.value)
    }

    return (
        <div>
            <h1>Search</h1>
            Search for: <input type='text' value={newFilter} onChange={handleFilter} />
            <div>
            {countryList.map(countries =>
                <countries key={countries.alpha2Code} countries={countries} />
            )}
            </div>
        </div>
    )
}

export default App */