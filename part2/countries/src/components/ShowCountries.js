import React from 'react'
import Weather from './Weather'

 /*   const filteredCountries = countries.filter(
        country => country.name.toString().toLowerCase().includes(searchFilter.toLowerCase())
    )
    
    const ShowCountries = () => {
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
                  height = "200px"
                  width = "300px"
                  />
            </div>
          );
        } else {
          return null;
        }
    } */

    
const ShowCountries =  ({filteredCountries, setSearchFilter}) => {
    if (filteredCountries.length === 1) {
      const country = filteredCountries[0]
      return (
        <div>
          <h1>{country.name}</h1>
          <div>Capital: {country.capital}</div>
          <div>Population: {country.population}</div>
          <h1>Languages</h1>
          <ul>
            {country.languages.map(language => <li key={language.name}>{language.name}</li>)}
          </ul>
          <img src={country.flag} alt={country.name} width="20px" />
          <Weather country={country} />
        </div>
      )
    }
    if (filteredCountries.length > 10) 
      return <div>Too Many Matches</div>
    return filteredCountries.map(country => {
        return (
        <div key={country.name}>
            {country.name} <button value={country.name} onClick={(e) => setSearchFilter(e.target.value)}>Show</button>
            </div>)
    })
  }
export default ShowCountries