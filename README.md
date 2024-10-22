# Suriname Offline Education Web

## Overview

**Suriname Offline Education Web** is a Progressive Web App (PWA) designed to provide educational content for schools with limited internet access. This application allows users to access learning materials offline, making education more accessible in regions with connectivity challenges.

## Features

- **Offline Access**: Users can view educational content without an internet connection.
- **Search Functionality**: Quickly find information within the app.
- **User-Friendly Interface**: Designed with a focus on ease of use for students and educators.
- **Responsive Design**: Works seamlessly on various devices, including desktops, tablets, and smartphones.

## Technologies Used

- **Frontend**: React, Vite, Material Tailwind
- **Backend**: Node.js, ExpressJS, PostgreSQL
- **AI Features**: TensorFlow.js for offline Question and Answering model
- **Hosting**: Netlify, Railway
- **PWA Technologies**: Service Workers, Cache API, VitePWA Plugin

## Getting Started

### Prerequisites

- Node.js and npm installed on your machine.
- Access to a PostgreSQL database (configured on Railway).

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/suriname-offline-education-web.git
   cd suriname-offline-education-web
2. Install the dependencies:
  ```bash
  npm install
3. Set up your environment variables (create a .env file based on the .env.example):
  ```bash
  DATABASE_URL=your_database_url
4. Start the development server:
  ```bash
  npm run dev

### Usage

Once the application is running, you can access it at http://localhost:3000. The app will automatically cache the necessary resources for offline access.

### Contributing

We welcome contributions! Please follow these steps to contribute:

Fork the repository.
Create a new branch (git checkout -b feature/YourFeature).
Make your changes and commit them (git commit -m 'Add some feature').
Push to the branch (git push origin feature/YourFeature).
Create a pull request.

### License

This project is licensed under the MIT License. See the LICENSE file for details.
