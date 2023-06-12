import { useState, useEffect } from 'react'
import axios from 'axios'

const useCountry = (name) => {
    const [country, setCountry] = useState(null)
  
    useEffect(() => {
      if (!name) {
        return
      }
  
      axios
        .get(`https://restcountries.com/v3.1/name/${name}?fullText=true`)
        .then(response => {
          const data = response.data[0]
          const found = !!data
  
          setCountry({ data, found })
        })
        .catch(() => {
          setCountry({ data: null, found: false })
        })
    }, [name])
    return country
  }

  export default useCountry