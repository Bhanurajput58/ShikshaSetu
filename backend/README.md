# ShikshaSetu Backend

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Create a `.env` file with:
   ```env
   MONGO_URI=mongodb://localhost:27017/shikshasetu
   JWT_SECRET=your_jwt_secret_here
   PORT=5000
   ```
3. Start the server:
   ```bash
   npm run dev
   ```

## Project Structure

- `config/` - Database connection
- `controllers/` - Route logic
- `middleware/` - Auth, error handling
- `models/` - Mongoose models
- `routes/` - API endpoints
- `utils/` - Utility functions

## API Endpoints
- `/api/auth` - Register, login
- `/api/users` - User profile
- `/api/courses` - Courses
- `/api/mentorship` - Mentorship
- `/api/forum` - Forum posts 