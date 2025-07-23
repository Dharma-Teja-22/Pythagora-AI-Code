```markdown
# TaskMaster

TaskMaster is a personal task management application that allows users to create accounts, securely log in, and organize their daily tasks with full CRUD functionality and filtering capabilities. It provides a seamless experience for managing tasks, from creation to completion, with an intuitive interface for users to interact with their tasks.

## Overview

TaskMaster is built with a modern web stack featuring a React-based frontend and an Express-based backend. The frontend is implemented using Vite for the development server and integrates the Shadcn-UI component library styled with Tailwind CSS. Client-side routing is handled by `react-router-dom`. The backend uses MongoDB for data storage, with Mongoose to manage database interactions and JSON Web Tokens (JWT) for secure authentication. The app is designed to offer a user-friendly experience whether accessed on a desktop or mobile device.

### Architecture

The project is divided into two main parts:

1. **Frontend (client)**
    - Framework: ReactJS
    - Folder: `client/`
    - Components: Located in `client/src/components/`
    - Pages: Located in `client/src/pages/`
    - API: Located in `client/src/api`
    - Port: 5173

2. **Backend (server)**
    - Framework: Express.js
    - Folder: `server/`
    - API Endpoints: Defined in `server/routes/`
    - Database: MongoDB with Mongoose
    - User Authentication: JWT for session management
    - Port: 3000

The project leverages the Concurrently tool to run both frontend and backend simultaneously.

## Features

- **User Authentication:** Secure sign-up, login, and password recovery.
- **Task Management:** Create, read, update, and delete tasks.
- **Filtering:** Filter tasks by all, pending, and completed tasks.
- **Sorting and Organization:** Sort tasks by due date with visual indicators for overdue tasks.
- **Task Interaction:** Mark tasks as complete or incomplete instantly.
- **Responsive Design:** Mobile-friendly and touch-compatible interface.

## Getting Started

### Requirements

To run this project locally, ensure you have the following installed:

- Node.js (version 14 or higher)
- npm (version 6 or higher)
- MongoDB (local instance or cloud service)

### Quickstart

1. **Clone the repository**
    ```sh
    git clone <repository-url>
    cd taskmaster
    ```

2. **Install dependencies**
    ```sh
    npm install
    ```

3. **Set up environment variables**

    Create a `.env` file in the `server` folder and populate it with the necessary configuration based on `.env.example` (make sure to include your MongoDB connection string and JWT secret keys).

4. **Start the application**
    ```sh
    npm run start
    ```

    This command will start both the frontend (on port 5173) and the backend (on port 3000).

5. **Access the application**

    Open your browser and navigate to `http://localhost:5173` to see the TaskMaster application in action.

## License

The project is proprietary (not open source). 

```
