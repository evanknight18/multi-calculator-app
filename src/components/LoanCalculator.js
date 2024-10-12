import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoanCalculator() {
  const [loanAmount, setLoanAmount] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [loanTerm, setLoanTerm] = useState('');
  const [monthlyPayment, setMonthlyPayment] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const calculateLoanPayment = () => {
    const principal = parseFloat(loanAmount);
    const annualRate = parseFloat(interestRate) / 100;
    const years = parseInt(loanTerm);
    
    if (isNaN(principal) || isNaN(annualRate) || isNaN(years) || principal <= 0 || annualRate <= 0 || years <= 0) {
      setError('Please enter valid inputs.');
      return;
    }

    setError(null);

    const monthlyRate = annualRate / 12;  // Monthly interest rate
    const totalPayments = years * 12;  // Total number of monthly payments

    // Monthly Payment Formula
    const payment = (principal * monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) /
                    (Math.pow(1 + monthlyRate, totalPayments) - 1);
    setMonthlyPayment(payment.toFixed(2));
  };

  const clearFields = () => {
    setLoanAmount('');
    setInterestRate('');
    setLoanTerm('');
    setMonthlyPayment(null);
    setError(null);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-[90%] max-w-lg">
        <h2 className="text-3xl font-bold text-center text-blue-600 dark:text-blue-400 mb-6">Loan Calculator</h2>

        <div className="grid grid-cols-1 gap-6">
          {/* Loan Amount Section */}
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg shadow">
            <label className="block text-gray-700 dark:text-gray-300 mb-2 font-semibold">Loan Amount</label>
            <input
              type="number"
              value={loanAmount}
              onChange={(e) => setLoanAmount(e.target.value)}
              className="w-full p-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-400 text-gray-700 dark:bg-gray-600 dark:border-gray-500 dark:text-gray-100 dark:focus:border-blue-400 dark:focus:ring-blue-300"
              placeholder="Enter loan amount"
            />
          </div>

          {/* Interest Rate Section */}
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg shadow">
            <label className="block text-gray-700 dark:text-gray-300 mb-2 font-semibold">Annual Interest Rate (%)</label>
            <input
              type="number"
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
              className="w-full p-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-400 text-gray-700 dark:bg-gray-600 dark:border-gray-500 dark:text-gray-100 dark:focus:border-blue-400 dark:focus:ring-blue-300"
              placeholder="Enter interest rate"
            />
          </div>

          {/* Loan Term Section */}
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg shadow">
            <label className="block text-gray-700 dark:text-gray-300 mb-2 font-semibold">Loan Term (Years)</label>
            <input
              type="number"
              value={loanTerm}
              onChange={(e) => setLoanTerm(e.target.value)}
              className="w-full p-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-400 text-gray-700 dark:bg-gray-600 dark:border-gray-500 dark:text-gray-100 dark:focus:border-blue-400 dark:focus:ring-blue-300"
              placeholder="Enter loan term (years)"
            />
          </div>
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={calculateLoanPayment}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-lg font-bold mb-4"
          >
            Calculate Monthly Payment
          </button>

          {monthlyPayment && (
            <div className="text-xl text-center mb-4">
              <p>Your Monthly Payment: <span className="font-bold">${monthlyPayment}</span></p>
            </div>
          )}

          {error && (
            <div className="text-red-500 text-center mb-4">
              <p>{error}</p>
            </div>
          )}

          <button
            onClick={clearFields}
            className="w-full bg-red-500 hover:bg-red-600 text-white p-3 rounded-lg font-bold"
          >
            Clear
          </button>

          <button
            onClick={() => navigate('/')}  
            className="w-full bg-gray-800 hover:bg-gray-900 text-white p-3 rounded-lg font-bold mt-4"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoanCalculator;
