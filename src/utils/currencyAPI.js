const API_KEY = '297ce47b03d3732634e704e9';  // Replace this with your actual API key
const BASE_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}`;

// Function to get available currencies
export const getAvailableCurrencies = async () => {
  try {
    const response = await fetch(`${BASE_URL}/codes`);
    const data = await response.json();
    if (data.result === "success") {
      return data.supported_codes;  // Returns an array of currency codes and names
    } else {
      throw new Error('Failed to fetch available currencies.');
    }
  } catch (error) {
    console.error(error);
    return [];
  }
};

// Function to get exchange rate between two currencies
export const getExchangeRate = async (fromCurrency, toCurrency) => {
  try {
    const response = await fetch(`${BASE_URL}/pair/${fromCurrency}/${toCurrency}`);
    const data = await response.json();
    if (data.result === "success") {
      return data.conversion_rate;  // Returns the conversion rate
    } else {
      throw new Error('Failed to fetch exchange rate.');
    }
  } catch (error) {
    console.error(error);
    return null;
  }
};
