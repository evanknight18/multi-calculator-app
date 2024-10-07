import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CarbonFootprintCalculator() {
  const [milesDriven, setMilesDriven] = useState('');
  const [fuelType, setFuelType] = useState('gasoline');
  const [electricityUsage, setElectricityUsage] = useState('');
  const [flights, setFlights] = useState('');
  const [heatingFuel, setHeatingFuel] = useState('');
  const [diet, setDiet] = useState('meat');
  const [waste, setWaste] = useState('');
  const [waterUsage, setWaterUsage] = useState('');
  const [footprint, setFootprint] = useState(null);
  const [history, setHistory] = useState([]);
  const navigate = useNavigate();

  const calculateFootprint = () => {
    const carEmissions = milesDriven * (fuelType === 'gasoline' ? 0.411 : fuelType === 'diesel' ? 0.45 : 0.1);
    const electricityEmissions = electricityUsage * 0.92;
    const flightEmissions = flights * 90;
    const heatingEmissions = heatingFuel * 10.16;
    const dietEmissions = diet === 'meat' ? 2.5 : diet === 'vegetarian' ? 1.7 : 1.5;
    const wasteEmissions = waste * 0.7;
    const waterEmissions = waterUsage * 0.1;
    const totalFootprint = carEmissions + electricityEmissions + flightEmissions + heatingEmissions +
      dietEmissions * 1000 + wasteEmissions + waterEmissions;
    setFootprint(totalFootprint.toFixed(2));

    const historyItem = `Footprint: ${totalFootprint.toFixed(2)} kg CO₂`;
    setHistory([historyItem, ...history]);
  };

  const clearFields = () => {
    setMilesDriven('');
    setFuelType('gasoline');
    setElectricityUsage('');
    setFlights('');
    setHeatingFuel('');
    setDiet('meat');
    setWaste('');
    setWaterUsage('');
    setFootprint(null);
  };

  const goToHome = () => {
    navigate('/');
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-[90%] max-w-4xl">
        <h2 className="text-3xl font-bold text-center text-green-600 dark:text-green-400 mb-6">Carbon Footprint Calculator</h2>
        
        <div className="grid grid-cols-2 gap-8">
          {/* Transportation Section */}
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg shadow">
            <h3 className="text-xl font-bold mb-4 text-green-600 dark:text-green-400">Transportation</h3>
            <div className="mb-4">
              <label className="block text-gray-800 dark:text-gray-300 font-semibold mb-1">Miles Driven (per week)</label>
              <input
                type="number"
                value={milesDriven}
                onChange={(e) => setMilesDriven(e.target.value)}
                className="w-full p-3 rounded-lg border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-300 text-gray-700 dark:bg-gray-600 dark:border-gray-500 dark:text-gray-100 dark:focus:border-green-400 dark:focus:ring-green-400"
                placeholder="Enter miles driven"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-800 dark:text-gray-300 font-semibold mb-1">Fuel Type</label>
              <select
                value={fuelType}
                onChange={(e) => setFuelType(e.target.value)}
                className="w-full p-3 rounded-lg border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-300 text-gray-700 dark:bg-gray-600 dark:border-gray-500 dark:text-gray-100 dark:focus:border-green-400 dark:focus:ring-green-400"
              >
                <option value="gasoline">Gasoline</option>
                <option value="diesel">Diesel</option>
                <option value="electric">Electric</option>
              </select>
            </div>
          </div>

          {/* Household Energy Section */}
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg shadow">
            <h3 className="text-xl font-bold mb-4 text-green-600 dark:text-green-400">Household Energy</h3>
            <div className="mb-4">
              <label className="block text-gray-800 dark:text-gray-300 font-semibold mb-1">Electricity Usage (kWh per month)</label>
              <input
                type="number"
                value={electricityUsage}
                onChange={(e) => setElectricityUsage(e.target.value)}
                className="w-full p-3 rounded-lg border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-300 text-gray-700 dark:bg-gray-600 dark:border-gray-500 dark:text-gray-100 dark:focus:border-green-400 dark:focus:ring-green-400"
                placeholder="Enter electricity usage"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-800 dark:text-gray-300 font-semibold mb-1">Heating Fuel (gallons per month)</label>
              <input
                type="number"
                value={heatingFuel}
                onChange={(e) => setHeatingFuel(e.target.value)}
                className="w-full p-3 rounded-lg border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-300 text-gray-700 dark:bg-gray-600 dark:border-gray-500 dark:text-gray-100 dark:focus:border-green-400 dark:focus:ring-green-400"
                placeholder="Enter heating fuel usage"
              />
            </div>
          </div>

          {/* Flights Section */}
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg shadow">
            <h3 className="text-xl font-bold mb-4 text-green-600 dark:text-green-400">Flights</h3>
            <div className="mb-4">
              <label className="block text-gray-800 dark:text-gray-300 font-semibold mb-1">Flights Taken (hours per year)</label>
              <input
                type="number"
                value={flights}
                onChange={(e) => setFlights(e.target.value)}
                className="w-full p-3 rounded-lg border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-300 text-gray-700 dark:bg-gray-600 dark:border-gray-500 dark:text-gray-100 dark:focus:border-green-400 dark:focus:ring-green-400"
                placeholder="Enter flight hours"
              />
            </div>
          </div>

          {/* Diet and Waste Section */}
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg shadow">
            <h3 className="text-xl font-bold mb-4 text-green-600 dark:text-green-400">Diet & Waste</h3>
            <div className="mb-4">
              <label className="block text-gray-800 dark:text-gray-300 font-semibold mb-1">Diet</label>
              <select
                value={diet}
                onChange={(e) => setDiet(e.target.value)}
                className="w-full p-3 rounded-lg border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-300 text-gray-700 dark:bg-gray-600 dark:border-gray-500 dark:text-gray-100 dark:focus:border-green-400 dark:focus:ring-green-400"
              >
                <option value="meat">Meat-eater</option>
                <option value="vegetarian">Vegetarian</option>
                <option value="vegan">Vegan</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-gray-800 dark:text-gray-300 font-semibold mb-1">Waste Produced (kg per week)</label>
              <input
                type="number"
                value={waste}
                onChange={(e) => setWaste(e.target.value)}
                className="w-full p-3 rounded-lg border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-300 text-gray-700 dark:bg-gray-600 dark:border-gray-500 dark:text-gray-100 dark:focus:border-green-400 dark:focus:ring-green-400"
                placeholder="Enter waste produced"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-800 dark:text-gray-300 font-semibold mb-1">Water Usage (gallons per day)</label>
              <input
                type="number"
                value={waterUsage}
                onChange={(e) => setWaterUsage(e.target.value)}
                className="w-full p-3 rounded-lg border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-300 text-gray-700 dark:bg-gray-600 dark:border-gray-500 dark:text-gray-100 dark:focus:border-green-400 dark:focus:ring-green-400"
                placeholder="Enter water usage"
              />
            </div>
          </div>
        </div>

        <div className="text-center mt-8">
          <button
            onClick={calculateFootprint}
            className="w-full bg-green-600 hover:bg-green-700 text-white p-3 rounded-lg font-bold mb-4"
          >
            Calculate Footprint
          </button>

          {footprint !== null && (
            <div className="text-xl text-center mb-4">
              <p>Your Estimated Carbon Footprint is <span className="font-bold">{footprint} kg CO₂</span></p>
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
            className="w-full bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-lg font-bold"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}

export default CarbonFootprintCalculator;
