# Task Management Frontend

A React-based frontend for the Task Management REST API with user authentication and task management features.

## Features

✅ **User Authentication**
- User registration and login
- JWT token management
- Session persistence with localStorage
- Protected routes

✅ **Task Management**
- Create tasks with title, description, status, priority, and due date
- View all tasks with filtering by status and priority
- Edit and update task status
- Delete tasks
- Real-time response feedback

✅ **User Interface**
- Responsive design for desktop and mobile
- Clean and intuitive dashboard
- Form validation with error messages
- Success/error notifications
- Task cards with status and priority badges

## Tech Stack

- **Framework**: React 18
- **Routing**: React Router v6
- **HTTP Client**: Axios
- **Styling**: CSS3

## Installation

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure API endpoint**
   - The app expects the backend API on `http://localhost:5000`
   - Update `src/api/apiClient.js` if your API is on a different URL

4. **Start the development server**
   ```bash
   npm start
   ```

   App will open at `http://localhost:3000`

## Project Structure

```
frontend/
├── public/
│   └── index.html
├── src/
│   ├── api/
│   │   └── apiClient.js         # Axios instance & API calls
│   ├── components/
│   │   └── PrivateRoute.js      # Protected route component
│   ├── context/
│   │   └── AuthContext.js       # Authentication context
│   ├── pages/
│   │   ├── AuthPage.js          # Login/Register page
│   │   └── Dashboard.js         # Main task dashboard
│   ├── styles/
│   │   ├── Auth.css
│   │   └── Dashboard.css
│   ├── App.js                   # Main app component
│   ├── App.css
│   ├── index.js                 # React entry point
│   └── index.css
└── package.json
```

## How to Use

### 1. Registration
- Click "Register" on the Auth page
- Enter name, email (valid format), and password (min 6 chars with uppercase, lowercase, numbers)
- Submit to create account

### 2. Login
- Enter email and password
- JWT token will be stored in localStorage
- Automatically redirected to dashboard

### 3. Create Tasks
- Fill the task form with title (required), description, status, priority, and due date
- Click "Create Task"
- Task appears in the tasks list

### 4. Manage Tasks
- **View**: All your tasks displayed in cards
- **Filter**: Use dropdown filters for status and priority
- **Edit**: Click "Edit" button to modify task details
- **Delete**: Click "Delete" button to remove task
- **Track**: See task status (pending, in-progress, completed) and priority (low, medium, high)

### 5. Logout
- Click "Logout" button in the top right
- Token removed, redirected to Auth page

## API Integration

The app communicates with the backend API:

```
http://localhost:5000/api/v1
```

### Available Endpoints Used:

- `POST /auth/register` - Register new user
- `POST /auth/login` - Login user
- `GET /auth/profile` - Get user profile (protected)
- `POST /tasks` - Create task (protected)
- `GET /tasks` - List tasks with filters (protected)
- `GET /tasks/{id}` - Get specific task (protected)
- `PUT /tasks/{id}` - Update task (protected)
- `DELETE /tasks/{id}` - Delete task (protected)
- `GET /health` - Health check

## Authentication

### Token Management
- JWT tokens stored in localStorage under key `token`
- Token automatically added to all API requests via Axios interceptor
- Token included in `Authorization: Bearer <token>` header

### Protected Routes
- All `/tasks` routes require authentication
- Unauthenticated users redirected to login page
- Token persistence across page refreshes

## Error Handling

- API errors displayed in red alert boxes
- Network errors caught and displayed
- Validation errors shown for form inputs
- Success messages for actions (create, update, delete)

## Styling & Responsive Design

- Mobile-first responsive design
- CSS Grid for task cards
- Flexbox for layouts
- Gradient backgrounds with smooth transitions
- Color-coded status and priority badges
- Hover effects and transitions for better UX

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Troubleshooting

**Issue**: "Could not connect to API server"
- Ensure backend is running on `http://localhost:5000`
- Check CORS is enabled in backend

**Issue**: Login fails
- Verify email format
- Check password meets requirements (6+ chars, uppercase, lowercase, numbers)
- Ensure backend MongoDB is connected

**Issue**: Tasks not loading
- Verify JWT token is valid
- Check browser localStorage for token
- Ensure backend API is accessible

## Future Enhancements

1. Task search functionality
2. Task sharing between users
3. Task comments and notes
4. Dark mode toggle
5. Task reminders/notifications
6. Advanced filtering and sorting
7. Export tasks to CSV/PDF
8. Offline support with service workers

## Building for Production

```bash
npm run build
```

Creates optimized production build in `build/` directory.

## Contributing

Feel free to submit pull requests or open issues for bugs and feature requests.

## License

MIT License

---

**Ready to manage tasks efficiently!** 🚀
