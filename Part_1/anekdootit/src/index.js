import React, {useState} from 'react';
import ReactDOM from 'react-dom';

const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>
        {text}
    </button>
)


const App = () => {
    const [anecdote, setAnecdote] = useState(Math.floor(Math.random() * anecdotes.length))
    const [votes, setVotes] = useState(Array.apply(null, new Array(anecdotes.length)).map(Number.prototype.valueOf, 0))
    const [mostVoted, setMostVoted] = useState(0)

    const nextAnecdote = () => setAnecdote(Math.floor(Math.random() * anecdotes.length))
    const vote = (num) => {
        const copy = [...votes]
        copy[num] += 1
        setVotes(copy)
        if (copy[num] > copy[mostVoted]) {
            setMostVoted(num)
        }
    }

    return (
        <div>
            <h1>Anecdote #{anecdote + 1}</h1>
            <Button handleClick={() => nextAnecdote()} text="next anecdote" />
            <p>{anecdotes[anecdote]}</p>
            <Button handleClick={() => vote(anecdote)} text="vote"/>
            <div>Has {votes[anecdote]} votes</div>
            <h2>Most voted anecdote:</h2>
            <div>{anecdotes[mostVoted]}</div>

        </div>
    )
}

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
    <App anecdotes={anecdotes} />,
    document.getElementById('root')
)