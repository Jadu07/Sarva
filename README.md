# Sarva (Shopsmart)

A e-commerce platform for exploring and downloading operating systems.

## Project Links

- **Frontend:** [https://sarva-2ipp.vercel.app/](https://sarva-2ipp.vercel.app/)
- **Backend:** [https://sarva-mu.vercel.app/](https://sarva-mu.vercel.app/)

### NST Server (Instance)

- **Frontend:** [https://sarva-frontend.nstsdc.org/](https://sarva-frontend.nstsdc.org/)
- **Backend:** [https://sarva-backend.nstsdc.org/](https://sarva-backend.nstsdc.org/)

## Tech Stack

- **Frontend:** React (Vite)
- **Backend:** Node.js, Express, Prisma
- **Database:** MongoDB

## Installation

### Prerequisites

- **Node.js** (v18 or higher)
- **NPM** or **Yarn**
- **MongoDB** (Local or Cloud instance)

### Local Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Jadu07/Sarva.git
   cd Sarva
   ```

2. **Backend Configuration:**
   - Navigate to the server directory:
     ```bash
     cd server
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Create a `.env` file in the `server` root and add your MongoDB connection string:
     ```env
     DATABASE_URL="your_mongodb_connection_string"
     ```
   - Start the backend server:
     ```bash
     npm run dev
     ```

3. **Frontend Configuration:**
   - Open a new terminal and navigate to the client directory:
     ```bash
     cd client
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Start the frontend application:
     ```bash
     npm run dev
     ```

### Quick Start (Bash)

You can use the provided setup script to automate the installation and startup process:

```bash
chmod +x setup.sh
./setup.sh
```
