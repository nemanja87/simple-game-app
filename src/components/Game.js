import React, { useState } from 'react';
import axios from 'axios';
import API_ENDPOINTS from '../config';


const Game = () => {
    const [playerChoice, setPlayerChoice] = useState('');
    const [computerChoice, setComputerChoice] = useState('');
    const [result, setResult] = useState('');

    // Map string choices to their corresponding numeric values
    const choices = {
        rock: 1,
        paper: 2,
        scissors: 3,
        lizard: 4,
        spock: 5
    };

    const playGame = async (choice) => {
        setPlayerChoice(choice);
        try {
            const response = await axios.post(API_ENDPOINTS.play, 
                choices[choice],
                {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                }
            );
            setComputerChoice(response.data.computerChoice);
            setResult(response.data.result);
        } catch (error) {
            console.error('Error playing the game:', error.response.data);
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