import React, { useState, useEffect } from 'react';
import { evaluate } from 'mathjs';  // Using mathjs for safe expression evaluation
import { useNavigate } from 'react-router-dom';  // Import useNavigate from react-router-dom
import { useHooks } from 'react-hooks';  // Import useHooks from react-hooks-lib

function StandardCalculator() {
  const [input, setInput] = useState('');  // Stores the current input
  const [result, setResult] = useState('');  // Stores the calculated result
  const [history, setHistory] = useState([]);  // Stores history of previous calculations
  const navigate = useNavigate();  // Hook to navigate programmatically

  // Function to handle button clicks and append the value to input
  const handleInput = (value) => {
    setInput(input + value);
  };

  // Function to clear only the current input (Clear Entry - CE)
  const clearEntry = () => {
    setInput('');
  };

  // Function to clear all (Clear All - C): input, result, and history
  const clearAll = () => {
    setInput('');
    setResult('');
    setHistory([]);
  };

  // Function to safely evaluate the expression using mathjs's evaluate method
  const calculateResult = () => {
    try {
      const calculatedResult = evaluate(input);  // Safely evaluate the input using mathjs
      const historyItem = `${input} = ${calculatedResult}`;  // Create history item
      setHistory([historyItem, ...history]);  // Add the result to history
      setResult(calculatedResult);  // Set the result
      setInput('');  // Clear the input for the next calculation
    } catch (error) {
      setResult('Error');  // Show error if invalid input
    }
  };

  // Function to navigate back to the home page
  const goToHome = () => {
    navigate('/');
  };

  // Handle keyboard input for numbers and operations
  const handleKeyDown = (e) => {
    const { key } = e;

    if ((key >= '0' && key <= '9') || ['+', '-', '*', '/'].includes(key)) {
      handleInput(key);  // Append numbers and operators to input
    } else if (key === 'Enter') {
      calculateResult();  // Calculate result on Enter key
    } else if (key === 'Escape') {
      clearAll();  // Clear all on Escape key
    }
  };

  // Add event listener for keyboard input when the component mounts
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [input, history]);  // The event listener should be updated whenever the input or history changes

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-200 dark:bg-gray-900">
      <div className="bg-gray-800 dark:bg-gray-700 text-white p-6 rounded-lg shadow-lg w-80">
        <div className="mb-4">
          {/* Display current input and result */}
          <div className="bg-black dark:bg-gray-900 text-right p-4 rounded-lg text-3xl font-mono mb-2 min-h-[5rem] h-auto break-all">
            {input || '0'}
          </div>
          <div className="bg-black dark:bg-gray-900 text-right p-4 rounded-lg text-xl font-mono text-gray-400 min-h-[3rem] h-auto">
            {result}
          </div>
        </div>

        {/* Calculator buttons */}
        <div className="grid grid-cols-4 gap-3 mb-4">
          <button onClick={() => handleInput('1')} className="calculator-button dark:bg-gray-800">1</button>
          <button onClick={() => handleInput('2')} className="calculator-button dark:bg-gray-800">2</button>
          <button onClick={() => handleInput('3')} className="calculator-button dark:bg-gray-800">3</button>
          <button onClick={() => handleInput('+')} className="calculator-button bg-orange-500 dark:bg-orange-600">+</button>

          <button onClick={() => handleInput('4')} className="calculator-button dark:bg-gray-800">4</button>
          <button onClick={() => handleInput('5')} className="calculator-button dark:bg-gray-800">5</button>
          <button onClick={() => handleInput('6')} className="calculator-button dark:bg-gray-800">6</button>
          <button onClick={() => handleInput('-')} className="calculator-button bg-orange-500 dark:bg-orange-600">-</button>

          <button onClick={() => handleInput('7')} className="calculator-button dark:bg-gray-800">7</button>
          <button onClick={() => handleInput('8')} className="calculator-button dark:bg-gray-800">8</button>
          <button onClick={() => handleInput('9')} className="calculator-button dark:bg-gray-800">9</button>
          <button onClick={() => handleInput('*')} className="calculator-button bg-orange-500 dark:bg-orange-600">×</button>

          <button onClick={clearAll} className="calculator-button bg-red-500 dark:bg-red-600">C</button>
          <button onClick={clearEntry} className="calculator-button dark:bg-gray-800">CE</button>
          <button onClick={calculateResult} className="calculator-button bg-green-500 dark:bg-green-600">=</button>
          <button onClick={() => handleInput('/')} className="calculator-button bg-orange-500 dark:bg-orange-600">÷</button>
        </div>

        {/* Back to Home Button */}
        <button 
          onClick={goToHome} 
          className="w-full p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300 mb-4"
        >
          Back to Home
        </button>

        {/* History Section */}
        <div className="bg-gray-700 p-3 rounded-lg h-32 overflow-y-auto">
          <h3 className="text-xl font-mono mb-2">History</h3>
          {history.length === 0 ? (
            <p className="text-gray-400">No history yet.</p>
          ) : (
            <ul className="space-y-1">
              {history.map((item, index) => (
                <li key={index} className="text-gray-300 font-mono">{item}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default StandardCalculator;
