import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAvailableCurrencies, getExchangeRate } from '../utils/currencyAPI';  // Path updated as per your setup

function CurrencyConverter() {
  const [currencies, setCurrencies] = useState([]);
  const [baseCurrency, setBaseCurrency] = useState('USD');  // Current base currency in dropdown
  const [targetCurrency, setTargetCurrency] = useState('EUR');  // Current target currency in dropdown
  const [amount, setAmount] = useState(1);
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [convertedBaseCurrency, setConvertedBaseCurrency] = useState('USD');  // To store the base currency for the result
  const [convertedTargetCurrency, setConvertedTargetCurrency] = useState('EUR');  // To store the target currency for the result
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCurrencies = async () => {
      const availableCurrencies = await getAvailableCurrencies();
      setCurrencies(availableCurrencies);
    };
    fetchCurrencies();
  }, []);

  const handleConvert = async () => {
    try {
      const exchangeRate = await getExchangeRate(baseCurrency, targetCurrency);
      if (exchangeRate) {
        const result = (amount * exchangeRate).toFixed(2);
        setConvertedAmount(result);
        setConvertedBaseCurrency(baseCurrency);  // Store the selected base currency when converting
        setConvertedTargetCurrency(targetCurrency);  // Store the selected target currency when converting
        setError(null);
      } else {
        setError('Failed to retrieve exchange rate.');
      }
    } catch (err) {
      setError('Error while converting currency.');
    }
  };

  const clearFields = () => {
    setAmount(1);
    setConvertedAmount(null);
    setError(null);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-[90%] max-w-lg">
        <h2 className="text-3xl font-bold text-center text-blue-600 dark:text-blue-400 mb-6">Currency Converter</h2>
        
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 mb-1 font-semibold">Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full p-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-400 text-gray-700 dark:bg-gray-600 dark:border-gray-500 dark:text-gray-100 dark:focus:border-blue-400 dark:focus:ring-blue-300"
            placeholder="Enter amount"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-1 font-semibold">From</label>
            <select
              value={baseCurrency}
              onChange={(e) => setBaseCurrency(e.target.value)}
              className="w-full p-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-400 text-gray-700 dark:bg-gray-600 dark:border-gray-500 dark:text-gray-100 dark:focus:border-blue-400 dark:focus:ring-blue-300"
            >
              {currencies.map((currency) => (
                <option key={currency[0]} value={currency[0]}>
                  {currency[1]} ({currency[0]})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-1 font-semibold">To</label>
            <select
              value={targetCurrency}
              onChange={(e) => setTargetCurrency(e.target.value)}
              className="w-full p-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-400 text-gray-700 dark:bg-gray-600 dark:border-gray-500 dark:text-gray-100 dark:focus:border-blue-400 dark:focus:ring-blue-300"
            >
              {currencies.map((currency) => (
                <option key={currency[0]} value={currency[0]}>
                  {currency[1]} ({currency[0]})
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={handleConvert}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-lg font-bold mb-4"
          >
            Convert
          </button>

          {convertedAmount && (
            <div className="text-xl text-center mb-4">
              <p>
                {amount} {convertedBaseCurrency} = <span className="font-bold">{convertedAmount} {convertedTargetCurrency}</span>
              </p>
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

export default CurrencyConverter;
