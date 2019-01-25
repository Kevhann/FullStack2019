import React, { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [filter, setFilter] = useState('')
  const [countries, setCountries] = useState([])
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    console.log('country effect')
    axios.get('https://restcountries.eu/rest/v2/all').then(response => {
      console.log('country response fulfilled')
      setCountries(response.data)
    })
  }, [])

  const handleFilterChange = event => {
    console.log(event.target.value)
    setFilter(event.target.value.toLowerCase())
  }

  return (
    <div>
      <h1>Countries</h1>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <ContentPicker
        filter={filter}
        countries={countries}
        setFilter={setFilter}
        weather={weather}
        setWeather={setWeather}
      />
    </div>
  )
}
const Weather = ({ country, weather, setWeather }) => {
  useEffect(() => {
    console.log('weatherEffect')
    axios
      .get(
        `http://api.apixu.com/v1/current.json?key=${
          process.env.REACT_APP_API_KEY
        }&q=${country.capital}`
      )
      .then(response => {
        console.log('weather response fulfilled')
        setWeather(response.data)
      })
  }, [])
  console.log(weather)
  if (!weather) {
    return null
  }
  return (
    <div>
      <h2>Weather in {country.capital}</h2>
      <div>
        <b>temperature:</b>
        <> {weather.current.temp_c} Celsius</>
      </div>
      <div>
        <img src={weather.current.condition.icon} alt={'icon'} />
      </div>
      <div>
        <b>wind:</b>
        <> {weather.current.wind_kph} kph</>
        <> direction {weather.current.wind_dir}</>
      </div>
    </div>
  )
}
const Content = ({ country, weather, setWeather }) => {
  return (
    <div>
      <h2>{country.name}</h2>
      <div>Capital {country.capital}</div>
      <div>Population: {country.population}</div>
      <h3>Launguages</h3>
      <ul>
        <Languages languages={country.languages} />
      </ul>
      <img
        src={country.flag}
        alt={country.name}
        style={{ width: 200, height: 120 }}
      />
      <Weather country={country} weather={weather} setWeather={setWeather} />
    </div>
  )
}
const Languages = ({ languages }) =>
  languages.map(l => <li key={l.name}>{l.name}</li>)

const Filter = ({ filter, handleFilterChange }) => {
  return (
    <form onSubmit={event => event.preventDefault()}>
      Find countries
      <div>
        <input value={filter} onChange={handleFilterChange} />
      </div>
    </form>
  )
}
const ContentPicker = ({
  filter,
  countries,
  setFilter,
  weather,
  setWeather
}) => {
  const filtered = countries.filter(c => c.name.toLowerCase().includes(filter))
  if (filtered.length > 10) {
    return <div>Too many results</div>
  }
  if (filtered.length === 0) {
    return <div>No results</div>
  }
  if (filtered.length === 1) {
    return (
      <Content
        country={filtered[0]}
        weather={weather}
        setWeather={setWeather}
      />
    )
  }
  return (
    <ul>
      {filtered.map(f => (
        <li key={f.name}>
          {f.name}
          <button onClick={() => setFilter(f.name.toLowerCase())}>
            information
          </button>
        </li>
      ))}
    </ul>
  )
}
export default App
