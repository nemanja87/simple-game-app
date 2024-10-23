import React, { useState } from 'react';
import axios from 'axios';

const Game = () => {
    const [playerChoice, setPlayerChoice] = useState('');
    const [computerChoice, setComputerChoice] = useState('');
    const [result, setResult] = useState('');

    // Map string choices to their corresponding numeric values
    const choices = {
        rock: 0,
        paper: 1,
        scissors: 2,
        lizard: 3,
        spock: 4
    };

    const playGame = async (choice) => {
        setPlayerChoice(choice);
        try {
            const response = await axios.post('https://localhost:44356/api/Game/play', 
                choices[choice],  // Send the numeric value directly
                {
                    headers: {
                        'Content-Type': 'application/json', // Ensure Content-Type is set to application/json
                    },
                }
            );
            setComputerChoice(response.data.computerChoice);
            setResult(response.data.result);
        } catch (error) {
            console.error('Error playing the game:', error.response.data); // Log the error response for more details
        }
    };
    
    return (
        <div>
            <h2>Make your choice:</h2>
            {Object.keys(choices).map((choice) => (
                <button key={choice} onClick={() => playGame(choice)}>
                    {choice}
                </button>
            ))}
            {playerChoice && (
                <div className="result">
                    <h3 className="player-choice">You played: {playerChoice}</h3>
                    <h3 className="computer-choice">Computer played: {computerChoice}</h3>
                    <h3>Result: {result}</h3>
                </div>
            )}
        </div>
    );
};

export default Game;