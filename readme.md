# Checkout System Assessment

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the System](#running-the-system)
- [Testing the System](#testing-the-system)
- [Technologies Used](#technologies-Used)
- [Key decisions I made](#key-decisions-i-made)
- [What I did do if I had more time](#what-i-did-do-if-i-had-more-time)

## Prerequisites
To run and test the checkout system, make sure you have the following prerequisites installed on your machine:

Node.js: Ensure that you have Node.js installed. You can download and install it from the official website: [Node.js](https://nodejs.org).

## Installation
Follow these steps to install and set up the checkout system:

1. Download the code: Obtain the code for the checkout system either by cloning the repository or downloading the ZIP file from the project repository.

2. Navigate to the project directory: Open a terminal or command prompt and navigate to the root directory of the downloaded code.

3. Install dependencies: Run the following command to install the required dependencies:

```bash
npm install
```

## Launch the System
To run the checkout system and interact with it via the simple user interface, follow these steps:

1. Open `index.html` in your preferred web browser.

2. Interact with the shopping cart interface:
   - Click the "Add to Cart" button on the Item Table to add a Item to the cart.
   - View the updated cart contents on the Cart Table.
   - The total amount will be automatically calculated and displayed.


## Testing the System
The checkout system includes a set of automated tests to ensure its functionality. The tests use the Jest testing framework. To run the tests, follow these steps:

1. Ensure you are in the project directory in your terminal or command prompt.

2. Run the test command: Execute the following command to run the tests:

```bash
npm test
```

3. Jest will execute the tests and display the results in the terminal or command prompt.

- If all tests pass, you will see a summary of the test results.
- If any tests fail, Jest will display detailed information about the failed tests.


## Technologies Used

- JavaScript
- HTML
- CSS
- Jest (for testing)


## Key decisions I made

1. I structured the code using a class-based approach to encapsulate the functionality of the checkout system.
2. I chose to represent the pricing rules using an object where each item (A, B, C, D) is a key, and the corresponding value is an object containing the price and special price information if applicable. This allows for easy access and retrieval of pricing information based on the item.
3. I chose to update the UI by manipulating the DOM directly using `document.getElementById` and creating elements dynamically using `document.createElement`. This approach allows for flexibility in rendering and updating the item table and cart table.
4. I chose to make the methods independent, to improve Code Reusability, Simplification and Readability, Flexibility and Extensibility and Testability 
5. I chose to enhanced the system by adding tests using the Jest testing framework. Testing ensures that the code methods as expected and helps catch potential bugs or regressions. 
6. I chose to using Jest because t provides a simple and powerful testing framework for JavaScript applications, allowing you to write unit tests for individual components and methods.

## What I did do if I had more time

1. Implementing unit tests to test the item table and cart table which is dynamically render to ensure the correctness of the checkout system.
2. Implementing additional features like removing items from the cart or updating the quantity of items directly from the cart table.
3. Enhancing the error handling and validation for input items and pricing rules.
4. More refactoring the code to improve readability and maintainability, considering best practices and design patterns.