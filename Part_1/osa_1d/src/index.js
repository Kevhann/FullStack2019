import React, {useState} from 'react';
import ReactDOM from 'react-dom';

const App = (props) => {
    const [left, setLeft] = useState(0)
    const [right, setRight] = useState(0)

    return (
        <div>
            <div>
                {left}
                <button onClick={() => setLeft(left + 1)}>
                    vasen
        </button>
                <button onClick={() => setRight(right + 1)}>
                    oikea
        </button>
                {right}
            </div>
        </div>
    )
}


ReactDOM.render(<App />, document.getElementById('root'));

