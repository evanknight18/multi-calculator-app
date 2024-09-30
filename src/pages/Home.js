import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="text-center mt-10">
      <h1 className="text-4xl font-bold mb-4 dark:text-gray-100">Welcome to the Multi-Calculator App</h1>
      <p className="text-lg mb-8 dark:text-gray-300">Select a calculator:</p>
      
      <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
        <Link to="/standard" className="p-4 bg-green-500 text-white rounded hover:bg-green-600 transition duration-300">
          Standard Calculator
        </Link>
        <Link to="/scientific" className="p-4 bg-green-500 text-white rounded hover:bg-green-600 transition duration-300">
          Scientific Calculator
        </Link>
        <Link to="/currency" className="p-4 bg-green-500 text-white rounded hover:bg-green-600 transition duration-300">
          Currency Converter
        </Link>
        <Link to="/loan" className="p-4 bg-green-500 text-white rounded hover:bg-green-600 transition duration-300">
          Loan Calculator
        </Link>
        <Link to="/date" className="p-4 bg-green-500 text-white rounded hover:bg-green-600 transition duration-300">
          Date Calculator
        </Link>
        <Link to="/tip" className="p-4 bg-green-500 text-white rounded hover:bg-green-600 transition duration-300">
          Tip Calculator
        </Link>
        <Link to="/fitness" className="p-4 bg-green-500 text-white rounded hover:bg-green-600 transition duration-300">
          Fitness Calculator
        </Link>
        <Link to="/carbon" className="p-4 bg-green-500 text-white rounded hover:bg-green-600 transition duration-300">
          Carbon Footprint Calculator
        </Link>
        <Link to="/compound" className="p-4 bg-green-500 text-white rounded hover:bg-green-600 transition duration-300">
          Compound Interest Calculator
        </Link>
      </div>
    </div>
  );
}

export default Home;
