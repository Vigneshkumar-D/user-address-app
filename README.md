Sample README.md
markdown
Copy code
# User Address Application

A simple application to allow users to register and store their addresses. The application consists of a backend built with Node.js and PostgreSQL, and a frontend built with React and Ant Design.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Backend Setup](#backend-setup)
- [Frontend Setup](#frontend-setup)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Features

- User registration with address storage
- List of users with addresses displayed in a table format
- Responsive UI using Ant Design
- Simple API endpoints for retrieving and storing user data

## Technologies Used

### Backend

- Node.js
- Express.js
- Sequelize (ORM for PostgreSQL)
- PostgreSQL
- CORS

### Frontend

- React
- Ant Design
- Axios (for API calls)

## Backend Setup

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd user-address-app/backend
Install dependencies:

bash
Copy code
npm install
Create a PostgreSQL database: Make sure to create a PostgreSQL database and update your database configuration in the config/config.json file.

Run migrations (if applicable):

bash
Copy code
npx sequelize-cli db:migrate
Start the server:

bash
Copy code
npm start
The server will run on http://localhost:3001.
