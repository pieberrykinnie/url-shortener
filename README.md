# URL Shortener

A URL shortener service built with TypeScript, using Express.js for the backend and React for the frontend, with SQLite as the database and Prisma ORM.

## Features
- Shorten long URLs to compact codes
- Redirect shortened URLs to original destinations
- Input validation and error handling
- REST API with TypeScript
- React frontend with Vite
- SQLite database with Prisma ORM

## Quick Start

### Prerequisites

- Node.js 18+
- npm/yarn
- Git

### Installation & Setup

1. Clone the repository
   ```bash
   git clone https://github.com/pieberrykinnie/url-shortener.git
   cd url-shortener
   ```

2. Install dependencies
   ```bash
   # Install backend dependencies
   cd backend
   npm install

   # Install frontend dependencies
   cd ../frontend
   npm install
   ```

3. Set up environment variables
   ```bash
   # In backend directory
   cp .env.example .env

   # In frontend directory
   cp .env.example .env
   ```

4. Initialize database
   ```bash
   # In backend directory
   npx prisma migrate dev
   ```

5. Start the development servers
   ```bash
   # Start backend (from backend directory)
   npm run dev

   # Start frontend (from frontend directory)
   npm run dev
   ```

The backend API will be available at `http://localhost:3000`
The frontend will be available at `http://localhost:5173`