import React from 'react'

const Languages = ({ country }) => {
    return country.languages.map(language => (
      <li key={language.name}>{language.name}</li>
    ));
  };

  export default Languages;