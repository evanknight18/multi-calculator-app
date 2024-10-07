import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function FitnessCalculator() {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('male');
  const [activityLevel, setActivityLevel] = useState('sedentary');
  const [bmi, setBmi] = useState(null);
  const [bmr, setBmr] = useState(null);
  const [tdee, setTdee] = useState(null);
  const navigate = useNavigate();

  const calculateBMI = () => {
    const heightInMeters = height / 100;
    const bmiValue = (weight / (heightInMeters * heightInMeters)).toFixed(2);
    setBmi(bmiValue);
  };

  const calculateBMR = () => {
    let bmrValue;
    if (gender === 'male') {
      bmrValue = 88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age);
    } else {
      bmrValue = 447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age);
    }
    setBmr(bmrValue.toFixed(2));
  };

  const calculateTDEE = () => {
    const activityMultiplier = {
      sedentary: 1.2,
      lightly_active: 1.375,
      moderately_active: 1.55,
      very_active: 1.725,
      super_active: 1.9
    };
    const tdeeValue = (bmr * activityMultiplier[activityLevel]).toFixed(2);
    setTdee(tdeeValue);
  };

  const calculateAll = () => {
    calculateBMI();
    calculateBMR();
    calculateTDEE();
  };

  const clearFields = () => {
    setWeight('');
    setHeight('');
    setAge('');
    setGender('male');
    setActivityLevel('sedentary');
    setBmi(null);
    setBmr(null);
    setTdee(null);
  };

  const goToHome = () => {
    navigate('/');
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-green-500 to-blue-700 dark:from-gray-900 dark:to-gray-800">
      <div className="bg-white dark:bg-gray-800 text-black dark:text-gray-100 p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-3xl font-extrabold mb-4 text-center text-green-700 dark:text-green-500 tracking-widest">
          Fitness Calculator
        </h2>

        <div className="mb-4">
          <label className="block text-gray-800 dark:text-gray-300 font-semibold mb-1">Weight (kg)</label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="w-full p-3 rounded-lg border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-300 text-gray-700 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 dark:focus:border-green-400 dark:focus:ring-green-500"
            placeholder="Enter your weight"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-800 dark:text-gray-300 font-semibold mb-1">Height (cm)</label>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            className="w-full p-3 rounded-lg border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-300 text-gray-700 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 dark:focus:border-green-400 dark:focus:ring-green-500"
            placeholder="Enter your height"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-800 dark:text-gray-300 font-semibold mb-1">Age</label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="w-full p-3 rounded-lg border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-300 text-gray-700 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 dark:focus:border-green-400 dark:focus:ring-green-500"
            placeholder="Enter your age"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-800 dark:text-gray-300 font-semibold mb-1">Gender</label>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="w-full p-3 rounded-lg border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-300 text-gray-700 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 dark:focus:border-green-400 dark:focus:ring-green-500"
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-800 dark:text-gray-300 font-semibold mb-1">Activity Level</label>
          <select
            value={activityLevel}
            onChange={(e) => setActivityLevel(e.target.value)}
            className="w-full p-3 rounded-lg border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-300 text-gray-700 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 dark:focus:border-green-400 dark:focus:ring-green-500"
          >
            <option value="sedentary">Sedentary (little or no exercise)</option>
            <option value="lightly_active">Lightly Active (exercise 1-3 days/week)</option>
            <option value="moderately_active">Moderately Active (exercise 3-5 days/week)</option>
            <option value="very_active">Very Active (exercise 6-7 days/week)</option>
            <option value="super_active">Super Active (physical job or intense exercise)</option>
          </select>
        </div>

        <button
          onClick={calculateAll}
          className="w-full bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800 text-white p-3 rounded-lg mb-4 font-bold tracking-wider"
        >
          Calculate
        </button>

        {bmi !== null && (
          <div className="text-xl text-center mb-4">
            <p>BMI: <span className="font-extrabold">{bmi}</span></p>
          </div>
        )}

        {bmr !== null && (
          <div className="text-xl text-center mb-4">
            <p>BMR: <span className="font-extrabold">{bmr} kcal/day</span></p>
          </div>
        )}

        {tdee !== null && (
          <div className="text-xl text-center mb-4">
            <p>TDEE: <span className="font-extrabold">{tdee} kcal/day</span></p>
          </div>
        )}

        <button
          onClick={clearFields}
          className="w-full bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 text-white p-3 rounded-lg mb-4 font-bold tracking-wider"
        >
          Clear Fields
        </button>

        <button
          onClick={goToHome}
          className="w-full p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 font-bold tracking-wider"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}

export default FitnessCalculator;
