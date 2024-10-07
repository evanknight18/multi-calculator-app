import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function DateCalculator() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [daysDifference, setDaysDifference] = useState(null);
  const [history, setHistory] = useState([]);
  const navigate = useNavigate();

  const calculateDifference = () => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    if (!isNaN(start) && !isNaN(end) && start <= end) {
      const differenceInTime = end.getTime() - start.getTime();
      const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));
      setDaysDifference(differenceInDays);

      const historyItem = `From ${startDate} to ${endDate} → ${differenceInDays} days`;
      setHistory([historyItem, ...history]);
    }
  };

  const clearFields = () => {
    setStartDate('');
    setEndDate('');
    setDaysDifference(null);
  };

  const goToHome = () => {
    navigate('/');
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-[90%] max-w-3xl">
        <h2 className="text-3xl font-bold text-center text-blue-600 dark:text-blue-400 mb-6">Date Calculator</h2>
        
        <div className="grid grid-cols-2 gap-8">
          {/* Start Date Section */}
          <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold mb-4 text-blue-700 dark:text-blue-300">Start Date</h3>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full p-3 rounded-lg border border-blue-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-400 text-blue-700 dark:bg-blue-700 dark:border-blue-500 dark:text-gray-100 dark:focus:border-blue-400 dark:focus:ring-blue-300"
            />
          </div>

          {/* End Date Section */}
          <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold mb-4 text-blue-700 dark:text-blue-300">End Date</h3>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full p-3 rounded-lg border border-blue-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-400 text-blue-700 dark:bg-blue-700 dark:border-blue-500 dark:text-gray-100 dark:focus:border-blue-400 dark:focus:ring-blue-300"
            />
          </div>
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={calculateDifference}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-lg font-bold mb-4"
          >
            Calculate Difference
          </button>

          {daysDifference !== null && (
            <div className="text-xl text-center mb-4">
              <p>The difference is <span className="font-bold">{daysDifference} days</span></p>
            </div>
          )}

          <button
            onClick={clearFields}
            className="w-full bg-red-500 hover:bg-red-600 text-white p-3 rounded-lg font-bold mb-4"
          >
            Clear Fields
          </button>

          <button
            onClick={goToHome}
            className="w-full bg-gray-800 hover:bg-gray-900 text-white p-3 rounded-lg font-bold"
          >
            Back to Home
          </button>
        </div>

        {/* History Section */}
        {history.length > 0 && (
          <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded-lg mt-6 shadow-lg">
            <h3 className="text-xl font-bold mb-4 text-blue-700 dark:text-blue-300">Calculation History</h3>
            <ul className="list-disc pl-6 space-y-1">
              {history.map((item, index) => (
                <li key={index} className="text-blue-600 dark:text-blue-300">{item}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default DateCalculator;
