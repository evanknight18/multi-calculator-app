import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import StandardCalculator from './components/StandardCalculator';
import ScientificCalculator from './components/ScientificCalculator';
import CurrencyConverter from './components/CurrencyConverter';
import LoanCalculator from './components/LoanCalculator';
import DateCalculator from './components/DateCalculator';
import TipCalculator from './components/TipCalculator';
import FitnessCalculator from './components/FitnessCalculator';
import CarbonFootprintCalculator from './components/CarbonFootprintCalculator';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Apply dark mode class to <html> element when toggle is on
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <div className={`${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'} min-h-screen`}>
      <Router>
        <header className="p-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Multi-Calculator App</h1>
          <button
            className="p-2 bg-gray-200 dark:bg-gray-700 rounded"
            onClick={() => setIsDarkMode(!isDarkMode)}
          >
            {isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          </button>
        </header>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/standard' element={<StandardCalculator />} />
          <Route path='/scientific' element={<ScientificCalculator />} />
          <Route path='/currency' element={<CurrencyConverter />} />
          <Route path='/loan' element={<LoanCalculator />} />
          <Route path='/date' element={<DateCalculator />} />
          <Route path='/tip' element={<TipCalculator />} />
          <Route path='/fitness' element={<FitnessCalculator />} />
          <Route path='/carbon' element={<CarbonFootprintCalculator />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
