import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({handleClick, text}) =>  (
    <button onClick={handleClick}>
        {text}
    </button>
)

const Statistic = ({text, value}) => (
    <tr>
        <td>{text}</td>
        <td>{value}</td>
    </tr>
)

const Display = ({good, neutral, bad}) => {
    let total = good + bad + neutral
    if (total === 0) {
        return (
            <div>Anna palautetta nappeja painamalla</div>
        )
    } 
    return (
        <table>
            <tbody>
                <Statistic text={'hyviä'} value={good}/>
                <Statistic text={'neutraaleja'} value={neutral} />
                <Statistic text={'huonoja'} value={bad} />
                <Statistic text={'yhteensä'} value={total} />
                <Statistic text={'keskiarvo'} value={(good - bad) / total} />
                <Statistic text={'positiivisia'} value={good / total * 100 + ' %'} />
            </tbody>
        </table>
    )
    
}

const App = () => {
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    return (
        <div>
            <p>Anna palautetta</p>
            <p>
                <Button handleClick={() => setGood(good + 1)} text="hyvä" />
                <Button handleClick={() => setNeutral(neutral + 1) }text="neutraali" />
                <Button handleClick={() => setBad(bad + 1)} text="huono" />
            </p>
            <p>Statistiikka</p>
            <div>
                <Display  good={good} neutral={neutral} bad={bad}/>
            </div>
        </div>
    )
}

ReactDOM.render(<App />,
    document.getElementById('root')
)