# Project TreTrack

A full-stack application built with React, TypeScript, and Node.js.

## Project Structure

- `client/` - Frontend React application built with Vite
- `server/` - Backend Node.js/Express application

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- PostgreSQL

## Getting Started

### Backend Setup

```bash
cd server
npm install
npm run dev
```

### Frontend Setup

```bash
cd client
npm install
npm run dev
```

## Features

- TypeScript support for both frontend and backend
- React with Vite for fast development
- Tailwind CSS for styling
- Express.js backend with PostgreSQL database
- RESTful API endpoints
- Project management functionality

## Available Scripts

### Client

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

### Server

- `npm run dev` - Start development server
- `npm run build` - Build TypeScript
- `npm start` - Start production server

## Environment Variables

Create `.env` files in both client and server directories.

### Server .env

```
PORT=3000
DATABASE_URL=postgresql://username:password@localhost:5432/database_name
```

### Client .env

```
VITE_API_URL=http://localhost:3000
```

## Database

The project uses PostgreSQL. Initial schema can be found in `server/src/config/schema.sql`.
