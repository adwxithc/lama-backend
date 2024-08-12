
# Lama Podcaster Back-End

## Overview

This repository contains the back-end code for a website designed for podcasters, developed as part of a machine task for Skailama. The back-end is built using Node.js, Express, and MongoDB with TypeScript. It handles the server-side logic, data storage, and authentication for the application.

Key Features:
- RESTful API for managing podcast projects and episodes
- User authentication and authorization with JWT
- Integration with AWS S3 for media storage
- Connection to MongoDB for database operations

## Table of Contents

1. [Installation](#installation)
2. [Sample .env File](#sample-env-file)
3. [Contributing](#contributing)
4. [Contact](#contact)

## Installation

To set up this project locally, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/adwxithc/lama-backend.git
   ```

2. **Navigate to the project directory:**

   ```bash
   cd lama-backend
   ```

3. **Install dependencies:**

   ```bash
   npm install
   ```

4. **Create a `.env` file:**

   Copy the contents of the sample `.env` file below to a new `.env` file in the root of the project:

   ```env
   MONGO_URI=mongodb+srv://your-dummy-username:your-dummy-password@your-dummy-cluster.mongodb.net/your-dummy-database?retryWrites=true&w=majority&appName=your-dummy-app-name
   PORT=5000
   JWT_KEY=your-dummy-jwt-key
   JWT_EXPIRE=48

   # AWS S3 Configuration
   BUCKET_NAME=your-dummy-bucket-name
   BUCKET_REGION=your-dummy-region
   S3_ACCESS_KEY=your-dummy-access-key
   S3_SECRET_ACCESS_KEY=your-dummy-secret-access-key
   FRONT_END_URL=http://localhost:3000
   ```

5. **Start the server:**

   ```bash
   npm run dev
   ```

   The server will be running at `http://localhost:5000`.


## Sample .env File

To configure the application, create a `.env` file in the root directory with the following content:

```env
MONGO_URI=mongodb+srv://your-dummy-username:your-dummy-password@your-dummy-cluster.mongodb.net/your-dummy-database?retryWrites=true&w=majority&appName=your-dummy-app-name
PORT=5000
JWT_KEY=your-dummy-jwt-key
JWT_EXPIRE=48

# AWS S3 Configuration
BUCKET_NAME=your-dummy-bucket-name
BUCKET_REGION=your-dummy-region
S3_ACCESS_KEY=your-dummy-access-key
S3_SECRET_ACCESS_KEY=your-dummy-secret-access-key
FRONT_END_URL=http://localhost:3000
```

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a Pull Request with a description of your changes.

## Contact

For questions or feedback, please contact:

**Your Name**  
Email: [adwaithjanardhanan0@gmail.com](mailto:adwaithjanardhanan0@gmail.com)  
LinkedIn: [https://www.linkedin.com/in/adwaith-c-25b5a0218/](https://www.linkedin.com/in/adwaith-c-25b5a0218/)  
GitHub: [https://github.com/adwxithc](https://github.com/adwxithc)
