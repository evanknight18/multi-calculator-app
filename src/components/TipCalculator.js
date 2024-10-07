import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function TipCalculator() {
  const [billAmount, setBillAmount] = useState('');
  const [tipPercentage, setTipPercentage] = useState('');
  const [numPeople, setNumPeople] = useState('1');
  const [totalTip, setTotalTip] = useState(null);
  const [totalBill, setTotalBill] = useState(null);
  const [perPersonAmount, setPerPersonAmount] = useState(null);
  const navigate = useNavigate();

  const calculateTip = () => {
    const bill = parseFloat(billAmount);
    const tipPercent = parseFloat(tipPercentage);
    const people = parseInt(numPeople);

    if (!isNaN(bill) && !isNaN(tipPercent) && !isNaN(people) && people > 0) {
      const tipAmount = (bill * (tipPercent / 100)).toFixed(2);
      const totalBillAmount = (bill + parseFloat(tipAmount)).toFixed(2);
      const perPerson = (totalBillAmount / people).toFixed(2);

      setTotalTip(tipAmount);
      setTotalBill(totalBillAmount);
      setPerPersonAmount(perPerson);
    }
  };

  const clearFields = () => {
    setBillAmount('');
    setTipPercentage('');
    setNumPeople('1');
    setTotalTip(null);
    setTotalBill(null);
    setPerPersonAmount(null);
  };

  const goToHome = () => {
    navigate('/');
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-pink-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 text-black dark:text-gray-100 p-6 rounded-lg shadow-lg w-80">
        <h2 className="text-3xl font-extrabold mb-4 text-center text-pink-600 dark:text-pink-400">Tip Calculator</h2>

        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 mb-1 font-semibold">Bill Amount ($)</label>
          <input
            type="number"
            value={billAmount}
            onChange={(e) => setBillAmount(e.target.value)}
            className="w-full p-2 rounded-lg border border-gray-300 focus:border-pink-400 focus:ring-2 focus:ring-pink-300 text-pink-700 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 dark:focus:border-pink-500 dark:focus:ring-pink-500"
            placeholder="Enter bill amount"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 mb-1 font-semibold">Tip Percentage (%)</label>
          <input
            type="number"
            value={tipPercentage}
            onChange={(e) => setTipPercentage(e.target.value)}
            className="w-full p-2 rounded-lg border border-gray-300 focus:border-pink-400 focus:ring-2 focus:ring-pink-300 text-pink-700 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 dark:focus:border-pink-500 dark:focus:ring-pink-500"
            placeholder="Enter tip percentage"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 mb-1 font-semibold">Number of People</label>
          <input
            type="number"
            value={numPeople}
            onChange={(e) => setNumPeople(e.target.value)}
            className="w-full p-2 rounded-lg border border-gray-300 focus:border-pink-400 focus:ring-2 focus:ring-pink-300 text-pink-700 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 dark:focus:border-pink-500 dark:focus:ring-pink-500"
            placeholder="Enter number of people"
          />
        </div>

        <button
          onClick={calculateTip}
          className="w-full bg-pink-500 hover:bg-pink-600 text-white p-3 rounded-lg mb-4 font-bold tracking-wide dark:bg-pink-600 dark:hover:bg-pink-700"
        >
          Calculate Tip
        </button>

        {totalTip !== null && (
          <div className="text-xl text-center mb-4">
            <p>Total Tip: <span className="font-extrabold">${totalTip}</span></p>
            <p>Total Bill: <span className="font-extrabold">${totalBill}</span></p>
            <p>Per Person: <span className="font-extrabold">${perPersonAmount}</span></p>
          </div>
        )}

        <button
          onClick={clearFields}
          className="w-full bg-red-400 hover:bg-red-500 text-white p-3 rounded-lg mb-4 font-bold tracking-wide dark:bg-red-500 dark:hover:bg-red-600"
        >
          Clear Fields
        </button>

        <button
          onClick={goToHome}
          className="w-full p-3 bg-gray-800 text-white rounded-lg hover:bg-gray-900 font-bold tracking-wide dark:bg-gray-700 dark:hover:bg-gray-800"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}

export default TipCalculator;
