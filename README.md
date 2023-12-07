# Elemental Heroes Project

The Elemental Heroes Project is a React-based application that allows users to manage and explore heroes with control over four elemental powers: fire, water, earth, and air. Users can input hero data through a form (name, power description, and selection of one of the four elements) and add them to a shared heroes list. Additionally, hero data is stored in a JSON-server database, enabling data persistence.

## Features

- Add and Remove Heroes: Users can dynamically add new heroes to the list, providing details such as name, power description, and elemental power. Heroes can also be removed from both the list and the JSON-server database.

- Filtering Options: The project supports filtering heroes based on their elemental power. Users can filter heroes by all elements, fire, water, earth, or air.

## Technologies Used

- **React:** The project is built using the React library for building user interfaces.

- **Redux and Redux Toolkit:** State management is handled efficiently using Redux and the Redux Toolkit.

- **Formik and Yup:** Formik is employed for form management, while Yup ensures data validation.

- **Uuid:** Uuid is utilized for generating unique identifiers for heroes.

- **Classnames and Bootstrap:** Classnames assist in conditional styling, and Bootstrap provides a responsive and visually appealing UI.

## Getting Started

To use the Elemental Heroes Project, follow the steps below:

1. Clone the repository to your local machine using the following command:

    ```bash
    git clone https://github.com/eduard7mar/hero-admin.git
    ```

2. Navigate to the project directory:

    ```bash
    cd hero-admin
    ```

3. Install the project dependencies:

    ```bash
    npm install
    ```

## Usage

4. In a new terminal window, start the React application:

    ```bash
    npm start
    ```

   This will launch the React app and open it in your default web browser at `http://localhost:3001`.
