import React from 'react';
import ReactDOM from 'react-dom';

const Hello = ({name, age}) => {
    const bornYear = () => new Date().getFullYear() - age
    return (
        <div>
            <p>
                Hello {name}, you are {age} years old
            </p>
            <p>
                You were probably born in {bornYear()}
            </p>
        </div>
    )
}

const App = () => { 
    const nimi = 'Pekka'
    const ika = 10

    return (
        <div>
            <h1>Greetings</h1>
            <Hello name="Arto" age={26 + 10}/>
            <Hello name={nimi} age={ika}/>

        </div>
    )
}
ReactDOM.render(<App />, document.getElementById('root'));
