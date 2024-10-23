import React from 'react';
import Game from './components/Game';
import './App.css'; // Import the CSS file here

function App() {
    return (
        <div className="App">
            <h1>Rock Paper Scissors Lizard Spock</h1>
            <Game />
        </div>
    );
}

export default App;