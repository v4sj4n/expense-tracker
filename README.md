# Expense Tracker

A full-stack expense tracking application built with React, TypeScript, Express, and MongoDB.

## Tech Stack

**Frontend:**

- React 19 with TypeScript
- TanStack Router for routing
- Tailwind CSS for styling
- Vite for build tooling
- Axios for API requests

**Backend:**

- Node.js with Express
- TypeScript
- MongoDB with Mongoose
- Zod for validation
- Resend for email functionality

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v18 or higher)
- npm or yarn
- MongoDB Atlas account (or local MongoDB instance)

## Project Structure

```
expense-tracker/
├── backend/          # Express API server
│   ├── src/
│   │   ├── config/   # Database configuration
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── utils/
│   │   └── validators/
│   └── package.json
└── frontend/         # React application
    ├── src/
    │   ├── components/
    │   ├── hooks/
    │   ├── routes/
    │   └── lib/
    └── package.json
```

## Getting Started

### Backend Setup

1. Navigate to the backend directory:

```bash
cd backend
```

2. Install dependencies:

```bash
npm install
```

3. Create environment file:

```bash
cp .env.example .env
```

4. Configure your environment variables in `.env`:

```env
MONGODB_URI="mongodb+srv://<user>:<password>@cluster0.vshddaf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
PORT=4444
RESEND_API_KEY="re_your_api_key_here"
```

Replace `<user>` and `<password>` with your MongoDB credentials, and add your Resend API key for email functionality.

5. Start the development server:

```bash
npm run dev
```

The backend API will be running at `http://localhost:4444`

#### Backend Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm start` - Run production build

### Frontend Setup

1. Navigate to the frontend directory:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Create environment file (if needed):

```bash
# Create .env file with your API endpoint
echo "VITE_API_URL=http://localhost:4444" > .env
```

4. Start the development server:

```bash
npm run dev
```

The frontend will be running at `http://localhost:5173`

#### Frontend Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Running the Full Application

To run both frontend and backend simultaneously:

1. Open two terminal windows

2. In the first terminal, start the backend:

```bash
cd backend
npm run dev
```

3. In the second terminal, start the frontend:

```bash
cd frontend
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## MongoDB Setup

### Using MongoDB Atlas (Recommended)

1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Set up database access (create a user with password)
4. Set up network access (add your IP address or allow access from anywhere for development)
5. Get your connection string and update the `MONGODB_URI` in `backend/.env`

### Using Local MongoDB

If you prefer to use a local MongoDB instance:

1. Install MongoDB locally
2. Start MongoDB service
3. Update `MONGODB_URI` in `backend/.env`:

```env
MONGODB_URI="mongodb://localhost:27017/expense-tracker"
```

## Resend Setup (Email Functionality)

The application uses Resend for sending emails:

1. Create a free account at [Resend](https://resend.com)
2. Generate an API key from your dashboard
3. Add the API key to `backend/.env`:

```env
RESEND_API_KEY="re_your_api_key_here"
```

## Development Tips

- The backend uses `ts-node-dev` for hot reloading during development
- The frontend uses Vite's fast HMR (Hot Module Replacement)
- Make sure both servers are running for full functionality
- Check the browser console and terminal for any errors

## Troubleshooting

**Port already in use:**

- Backend: Change the `PORT` in `backend/.env`
- Frontend: Vite will automatically try the next available port

**MongoDB connection issues:**

- Verify your connection string is correct
- Check that your IP is whitelisted in MongoDB Atlas
- Ensure your database user has proper permissions

**Module not found errors:**

- Delete `node_modules` and `package-lock.json`
- Run `npm install` again

## License

ISC
