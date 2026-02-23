# Task Management REST API

A secure, scalable REST API with JWT authentication, role-based access control, and comprehensive task management features.

## Features

✅ **User Authentication**
- Secure registration and login with password hashing (bcrypt)
- JWT token-based authentication
- Password validation (min 6 chars, uppercase, lowercase, numbers)

✅ **Role-Based Access Control (RBAC)**
- User and Admin roles
- Protected endpoints with role validation
- Resource-level authorization

✅ **Task Management CRUD**
- Create, Read, Update, Delete tasks
- Task status tracking (pending, in-progress, completed)
- Priority levels (low, medium, high)
- Due date management
- User owns their tasks; admins can view all

✅ **API Features**
- API versioning (`/api/v1/`)
- Input validation and sanitization
- Comprehensive error handling
- Swagger/OpenAPI documentation
- CORS enabled

✅ **Database**
- MongoDB with Mongoose ODM
- Schema validation
- Indexed queries for performance

✅ **Security**
- Password hashing with bcrypt
- JWT token generation and validation
- Input validation with express-validator
- CORS protection

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (Mongoose ODM)
- **Authentication**: JWT
- **Password Hashing**: bcrypt
- **Validation**: express-validator
- **Documentation**: Swagger/OpenAPI
- **Development**: Nodemon

## Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup environment variables**
   ```bash
   # Create .env file in root directory
   cp .env.example .env
   
   # Configure your settings:
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/intern_task
   JWT_SECRET=your-super-secret-key-change-in-production
   JWT_EXPIRY=7d
   NODE_ENV=development
   ```

4. **Ensure MongoDB is running**
   ```bash
   # MongoDB should be running on mongodb://localhost:27017
   ```

5. **Start the server**
   ```bash
   # Development (with auto-reload)
   npm run dev
   
   # Production
   npm start
   ```

Server will start on `http://localhost:5000`

## API Endpoints

### Authentication (`/api/v1/auth`)

**Register User**
```bash
POST /api/v1/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "Password123"
}
```

**Login**
```bash
POST /api/v1/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "Password123"
}
```

Response:
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": "...",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "user"
    },
    "token": "eyJhbGc..."
  }
}
```

**Get Profile** (Protected)
```bash
GET /api/v1/auth/profile
Authorization: Bearer <your-jwt-token>
```

### Tasks (`/api/v1/tasks`)

All task endpoints require authentication.

**Create Task**
```bash
POST /api/v1/tasks
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Complete project",
  "description": "Finish the REST API",
  "status": "in-progress",
  "priority": "high",
  "dueDate": "2026-03-01T00:00:00Z"
}
```

**Get All Tasks**
```bash
GET /api/v1/tasks?status=pending&priority=high
Authorization: Bearer <token>
```

**Get Task by ID**
```bash
GET /api/v1/tasks/{id}
Authorization: Bearer <token>
```

**Update Task**
```bash
PUT /api/v1/tasks/{id}
Authorization: Bearer <token>
Content-Type: application/json

{
  "status": "completed"
}
```

**Delete Task**
```bash
DELETE /api/v1/tasks/{id}
Authorization: Bearer <token>
```

### Health Check

```bash
GET /api/v1/health
```

## API Documentation

Interactive Swagger documentation available at: `http://localhost:5000/api-docs`

## Database Schema

### User
```javascript
{
  name: String (required),
  email: String (required, unique),
  password: String (hashed, required),
  role: String enum ['user', 'admin'] (default: 'user'),
  isActive: Boolean (default: true),
  createdAt: Date,
  updatedAt: Date
}
```

### Task
```javascript
{
  title: String (required),
  description: String,
  status: String enum ['pending', 'in-progress', 'completed'],
  priority: String enum ['low', 'medium', 'high'],
  userId: ObjectId (reference to User),
  dueDate: Date,
  createdAt: Date,
  updatedAt: Date
}
```

## Authorization Rules

- **Public Routes**: `/auth/register`, `/auth/login`, `/health`
- **Authenticated Routes**: Require valid JWT token (all `/tasks` endpoints)
- **Owner-Only Access**: Users can only view/edit/delete their own tasks
- **Admin Access**: Admins can view and manage all tasks and users

## Error Handling

All error responses follow this format:
```json
{
  "success": false,
  "message": "Error description",
  "errors": [] // Optional validation errors
}
```

Common Status Codes:
- `200 OK`: Successful request
- `201 Created`: Resource created
- `400 Bad Request`: Validation error
- `401 Unauthorized`: Missing or invalid token
- `403 Forbidden`: Insufficient permissions
- `404 Not Found`: Resource not found
- `500 Internal Server Error`: Server error

## Validation Rules

### User Registration
- **Name**: Required, min 2 characters
- **Email**: Valid email format
- **Password**: Min 6 chars, must contain uppercase, lowercase, and numbers

### Task Creation
- **Title**: Required, 3-200 characters
- **Description**: Optional, max 1000 characters
- **Status**: Must be one of: pending, in-progress, completed
- **Priority**: Must be one of: low, medium, high
- **Due Date**: Optional, valid ISO 8601 format

## Scalability Considerations

### Current Implementation
- Modular project structure with separation of concerns
- Input validation at controller level
- Service layer for business logic
- Middleware for cross-cutting concerns

### Future Enhancements
1. **Caching**: Implement Redis for frequently accessed data
2. **Database Indexing**: Add indexes on userId, status, priority, dueDate
3. **Rate Limiting**: Implement rate limiting middleware
4. **Pagination**: Add pagination for task listings
5. **Logging**: Implement structured logging (Winston, Pino)
6. **Microservices**: Separate auth and task services
7. **Load Balancing**: Use Nginx or cloud load balancers
8. **Docker**: Containerize the application
9. **CI/CD**: Implement automated testing and deployment
10. **Search**: Full-text search with Elasticsearch

### Performance Optimizations
- Database connection pooling (Mongoose handles this)
- Query optimization with projection
- Async/await for non-blocking operations
- Compression middleware for responses
- Static file caching

## Testing

Run tests (when added):
```bash
npm test
```

## Deployment

### Docker Deployment
```bash
docker build -t task-api .
docker run -p 5000:5000 task-api
```

### Environment Variables for Production
```
NODE_ENV=production
PORT=5000
MONGODB_URI=<production-mongodb-url>
JWT_SECRET=<strong-random-secret>
JWT_EXPIRY=7d
```

## Project Structure

```
backend/
├── src/
│   ├── config/
│   │   └── db.js           # Database connection
│   ├── models/
│   │   ├── User.js         # User schema & model
│   │   └── Task.js         # Task schema & model
│   ├── middlewares/
│   │   ├── auth.middleware.js    # JWT verification
│   │   └── role.middleware.js    # Role-based access
│   ├── modules/
│   │   ├── auth/
│   │   │   ├── auth.controller.js
│   │   │   ├── auth.routes.js
│   │   │   ├── auth.service.js
│   │   │   └── auth.validation.js
│   │   └── tasks/
│   │       ├── task.controller.js
│   │       ├── task.routes.js
│   │       ├── task.service.js
│   │       └── task.validation.js
│   ├── app.js              # Express app setup
│   └── server.js           # Server entry point
├── .env                    # Environment variables
├── package.json
└── README.md
```

## Contributing

1. Create a feature branch (`git checkout -b feature/AmazingFeature`)
2. Commit your changes (`git commit -m 'Add AmazingFeature'`)
3. Push to the branch (`git push origin feature/AmazingFeature`)
4. Open a Pull Request

## License

MIT License - feel free to use this project for learning and development.

## Support

For issues or questions, please create an issue in the repository.

---

**Happy Coding!** 🚀
#   s c a l a b l e - a u t h - c r u d - a p i  
 