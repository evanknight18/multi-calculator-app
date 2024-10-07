import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CarbonFootprintCalculator() {
  const [milesDriven, setMilesDriven] = useState('');
  const [fuelType, setFuelType] = useState('gasoline'); // New input for fuel type
  const [electricityUsage, setElectricityUsage] = useState('');
  const [flights, setFlights] = useState('');
  const [heatingFuel, setHeatingFuel] = useState('');
  const [diet, setDiet] = useState('meat');  // New input for diet type
  const [waste, setWaste] = useState('');  // New input for waste production
  const [waterUsage, setWaterUsage] = useState('');  // New input for water usage
  const [footprint, setFootprint] = useState(null);  // Store the calculated carbon footprint
  const [history, setHistory] = useState([]);  // Store history of previous calculations
  const navigate = useNavigate();

  // Constants for emission factors
  const EMISSION_FACTORS = {
    gasolinePerMile: 0.411,  // kg CO2 per mile for gasoline cars
    dieselPerMile: 0.45,  // kg CO2 per mile for diesel cars
    electricPerMile: 0.1,  // kg CO2 per mile for electric cars
    electricityPerKWh: 0.92,  // kg CO2 per kWh of electricity
    flightPerHour: 90,  // kg CO2 per hour of flight (approx)
    heatingPerGallon: 10.16,  // kg CO2 per gallon of heating oil
    wastePerKg: 0.7,  // kg CO2 per kg of waste produced
    waterPerGallon: 0.1,  // kg CO2 per gallon of water used
    dietFactors: {
      vegan: 1.5,  // metric tons of CO2 per year
      vegetarian: 1.7,
      meat: 2.5,
    },
  };

  // Function to calculate carbon footprint based on user inputs
  const calculateFootprint = () => {
    let carEmissions;
    switch (fuelType) {
      case 'gasoline':
        carEmissions = milesDriven * EMISSION_FACTORS.gasolinePerMile;
        break;
      case 'diesel':
        carEmissions = milesDriven * EMISSION_FACTORS.dieselPerMile;
        break;
      case 'electric':
        carEmissions = milesDriven * EMISSION_FACTORS.electricPerMile;
        break;
      default:
        carEmissions = 0;
    }

    const electricityEmissions = electricityUsage * EMISSION_FACTORS.electricityPerKWh;
    const flightEmissions = flights * EMISSION_FACTORS.flightPerHour;
    const heatingEmissions = heatingFuel * EMISSION_FACTORS.heatingPerGallon;
    const dietEmissions = EMISSION_FACTORS.dietFactors[diet];  // Diet emissions in metric tons
    const wasteEmissions = waste * EMISSION_FACTORS.wastePerKg;
    const waterEmissions = waterUsage * EMISSION_FACTORS.waterPerGallon;

    // Convert diet emissions from metric tons to kg CO2
    const totalFootprint = carEmissions + electricityEmissions + flightEmissions + heatingEmissions +
      (dietEmissions * 1000) + wasteEmissions + waterEmissions;
    
    setFootprint(totalFootprint.toFixed(2));  // Set the calculated footprint to 2 decimal places

    // Add result to history
    const historyItem = `
      Miles: ${milesDriven}, Electricity: ${electricityUsage} kWh, Flights: ${flights} hrs, 
      Heating: ${heatingFuel} gal, Diet: ${diet}, Waste: ${waste} kg, Water: ${waterUsage} gal 
      → ${totalFootprint.toFixed(2)} kg CO₂
    `;
    setHistory([historyItem, ...history]);
  };

  // Function to clear all input fields
  const clearFields = () => {
    setMilesDriven('');
    setFuelType('gasoline');
    setElectricityUsage('');
    setFlights('');
    setHeatingFuel('');
    setDiet('meat');
    setWaste('');
    setWaterUsage('');
    setFootprint(null);  // Reset the calculated footprint
  };

  // Function to navigate back to home
  const goToHome = () => {
    navigate('/');
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-200 dark:bg-gray-900">
      <div className="bg-gray-800 dark:bg-gray-700 text-white p-6 rounded-lg shadow-lg w-80">
        <h2 className="text-2xl font-bold mb-4">Carbon Footprint Calculator</h2>

        {/* Input fields for user data */}
        <div className="mb-4">
          <label className="block text-gray-300 mb-1">Miles Driven (per week)</label>
          <input
            type="number"
            value={milesDriven}
            onChange={(e) => setMilesDriven(e.target.value)}
            className="w-full p-2 rounded-lg text-black"
            placeholder="Enter miles driven"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-300 mb-1">Fuel Type</label>
          <select
            value={fuelType}
            onChange={(e) => setFuelType(e.target.value)}
            className="w-full p-2 rounded-lg text-black"
          >
            <option value="gasoline">Gasoline</option>
            <option value="diesel">Diesel</option>
            <option value="electric">Electric</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-300 mb-1">Electricity Usage (kWh per month)</label>
          <input
            type="number"
            value={electricityUsage}
            onChange={(e) => setElectricityUsage(e.target.value)}
            className="w-full p-2 rounded-lg text-black"
            placeholder="Enter electricity usage"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-300 mb-1">Flights Taken (hours per year)</label>
          <input
            type="number"
            value={flights}
            onChange={(e) => setFlights(e.target.value)}
            className="w-full p-2 rounded-lg text-black"
            placeholder="Enter flight hours"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-300 mb-1">Heating Fuel (gallons per month)</label>
          <input
            type="number"
            value={heatingFuel}
            onChange={(e) => setHeatingFuel(e.target.value)}
            className="w-full p-2 rounded-lg text-black"
            placeholder="Enter heating fuel usage"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-300 mb-1">Diet</label>
          <select
            value={diet}
            onChange={(e) => setDiet(e.target.value)}
            className="w-full p-2 rounded-lg text-black"
          >
            <option value="meat">Meat-eater</option>
            <option value="vegetarian">Vegetarian</option>
            <option value="vegan">Vegan</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-300 mb-1">Waste Produced (kg per week)</label>
          <input
            type="number"
            value={waste}
            onChange={(e) => setWaste(e.target.value)}
            className="w-full p-2 rounded-lg text-black"
            placeholder="Enter waste produced"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-300 mb-1">Water Usage (gallons per day)</label>
          <input
            type="number"
            value={waterUsage}
            onChange={(e) => setWaterUsage(e.target.value)}
            className="w-full p-2 rounded-lg text-black"
            placeholder="Enter water usage"
          />
        </div>

        {/* Calculate and result */}
        <button
          onClick={calculateFootprint}
          className="w-full bg-green-500 hover:bg-green-600 p-3 rounded-lg mb-4"
        >
          Calculate Footprint
        </button>

        {footprint !== null && (
          <div className="text-xl text-center mb-4">
            Your estimated footprint is <span className="font-bold">{footprint} kg CO₂</span>
          </div>
        )}

        {/* Clear Fields Button */}
        <button
          onClick={clearFields}
          className="w-full bg-red-500 hover:bg-red-600 p-3 rounded-lg mb-4"
        >
          Clear Fields
        </button>

        {/* History Section */}
        <div className="bg-gray-700 p-3 rounded-lg h-32 overflow-y-auto mb-4">
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

        {/* Back to Home Button */}
        <button
          onClick={goToHome}
          className="w-full p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}

export default CarbonFootprintCalculator;
