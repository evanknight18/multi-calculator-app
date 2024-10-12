# Multi-Calculator

A React-based application that includes various calculators for different needs such as standard arithmetic, scientific calculations, carbon footprint estimation, tip calculation, fitness metrics, currency conversion, and loan calculation. Each calculator is uniquely designed to match its purpose, providing an intuitive and user-friendly experience.

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Technologies](#technologies)
- [API Integration](#api-integration)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Overview
The **Multi-Calculator** is a full-stack application providing multiple calculators:
- Standard Calculator
- Scientific Calculator
- Carbon Footprint Calculator
- Tip Calculator
- Fitness Calculator (BMI, BMR, TDEE)
- Currency Converter (with live API integration)
- Loan Calculator

Each calculator is built with distinct designs and layouts, and supports both dark and light mode.

## Features
- **Standard Calculator**: For basic arithmetic operations.
- **Scientific Calculator**: Offers additional scientific functions.
- **Carbon Footprint Calculator**: Estimates the user’s carbon footprint based on various inputs like transportation, household energy, and diet.
- **Tip Calculator**: Quickly calculates tips and splits the bill between multiple people.
- **Fitness Calculator**: Calculates BMI, BMR, and TDEE based on user inputs.
- **Currency Converter**: Converts between different currencies using real-time exchange rates fetched via API.
- **Loan Calculator**: Calculates monthly loan payments based on the loan amount, interest rate, and loan term.
- **Dark/Light Mode**: Supports theme toggling for better user experience.
- **Error Handling**: Provides validations and error messages for invalid inputs and API failures.

## Installation
To run the **Multi-Tool Calculator Suite** locally, follow these steps:

1. **Clone the repository**:
   git clone https://github.com/your-username/multi-calculator-app.git

2. **Navigate to the project directory**:
   cd multi-calculator-app

3. **Install dependencies**:
   npm install

4. **Set up the currency API**:
   - Sign up for an API key at ExchangeRate-API.
   - Create a `.env` file in the root directory and add your API key:
     REACT_APP_CURRENCY_API_KEY=your-api-key-here

## Usage
1. **Run the application**:
   npm start

2. Open your browser and navigate to http://localhost:3000 to view the app.

3. Explore the different calculators by navigating through the app's interface.

4. Each calculator allows input, performs the respective calculation, and displays the result. For example, the currency converter fetches live exchange rates and performs conversions in real-time.

## Technologies
- **React**: For building the user interface.
- **Tailwind CSS**: For responsive and modern styling.
- **JavaScript**: For handling logic and calculations.
- **React Router**: For navigation between different calculators.
- **ExchangeRate-API**: For currency conversion data.

## API Integration
The **Currency Converter** uses live exchange rates from the ExchangeRate-API. You will need to sign up for an API key and configure it in your `.env` file as shown in the installation instructions.

## Contributing
Contributions are welcome! If you have suggestions or improvements, feel free to submit a pull request or open an issue.

1. Fork the project.
2. Create a new branch for your feature:
   git checkout -b feature-branch

3. Commit your changes:
   git commit -m "Add new feature"

4. Push to the branch:
   git push origin feature-branch

5. Open a pull request.

## License
This project is licensed under the MIT License. See the LICENSE file for details.

## Contact
For any questions or feedback, feel free to contact me:

- **Email**: evanknight18@gmail.com

