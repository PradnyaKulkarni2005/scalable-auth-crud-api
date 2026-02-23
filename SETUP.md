# Project Setup and Running Guide

## Prerequisites
- **Node.js v14+** - [Download](https://nodejs.org/)
- **MongoDB** - [Download](https://www.mongodb.com/try/download/community) or use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- **Git** - [Download](https://git-scm.com/)
- **Postman** (optional) - [Download](https://www.postman.com/)

## Windows Setup

### Step 1: Install MongoDB

#### Option A: Local Installation
1. Download MongoDB Community Edition
2. Run installer and follow prompts
3. Start MongoDB service:
   ```powershell
   # MongoDB runs as service on port 27017
   ```

#### Option B: MongoDB Atlas (Cloud)
1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a cluster
3. Copy connection string
4. Use in MONGODB_URI in .env

### Step 2: Clone/Setup Project
```powershell
# Navigate to project directory
cd e:\Internshiptask
```

### Step 3: Setup Backend

```powershell
# Navigate to backend
cd backend

# Install dependencies
npm install

# Create .env file with configuration
# Port=5000
# MONGODB_URI=mongodb://localhost:27017/intern_task
# JWT_SECRET=your-secret-key-change-in-production
# JWT_EXPIRY=7d
# NODE_ENV=development

# Start backend (development with auto-reload)
npm run dev

# Backend running on http://localhost:5000
# Swagger docs on http://localhost:5000/api-docs
```

### Step 4: Setup Frontend (New Terminal)

```powershell
# Open new terminal/PowerShell
cd e:\Internshiptask\frontend

# Install dependencies
npm install

# Start frontend development server
npm start

# App opens automatically at http://localhost:3000
```

## macOS/Linux Setup

### Step 1: Install MongoDB

#### Using Homebrew (macOS)
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

#### Using apt (Ubuntu)
```bash
sudo apt-get install -y mongodb
sudo systemctl start mongodb
```

#### Or use MongoDB Atlas
Create account and get connection string

### Step 2: Clone Project
```bash
cd ~/Projects  # or your preferred directory
# File should be at: ~/Projects/Internshiptask
```

### Step 3: Setup Backend
```bash
cd backend
npm install

# Create .env file
echo "PORT=5000
MONGODB_URI=mongodb://localhost:27017/intern_task
JWT_SECRET=your-secret-key
JWT_EXPIRY=7d
NODE_ENV=development" > .env

npm run dev
```

### Step 4: Setup Frontend
```bash
# In new terminal
cd frontend
npm install
npm start
```

## 🧪 Testing the Application

### Test with Postman

1. **Import Collection**
   - Open Postman
   - Click "Import"
   - Select `backend/Postman_Collection.json`

2. **Test Flow**
   ```
   1. Register (POST /auth/register)
      - Creates new user
      - Returns JWT token
   
   2. Login (POST /auth/login)
      - Sign in existing user
      - Get JWT token
   
   3. Get Profile (GET /auth/profile)
      - Requires token in Authorization header
      - Returns user info
   
   4. Create Task (POST /tasks)
      - Requires token
      - Creates new task
   
   5. Get Tasks (GET /tasks)
      - Requires token
      - Filters available
   
   6. Update Task (PUT /tasks/{id})
      - Requires token
      - Updates task details
   
   7. Delete Task (DELETE /tasks/{id})
      - Requires token
      - Removes task
   ```

### Test with Frontend UI

1. **Open http://localhost:3000**
2. **Register**
   - Name: John Doe
   - Email: john@example.com
   - Password: Password123
   - Click Register

3. **Create Task**
   - Title: My First Task
   - Description: Testing the app
   - Priority: High
   - Click Create Task

4. **Manage Tasks**
   - Edit task status
   - Delete tasks
   - Filter by status/priority

5. **Logout**
   - Click Logout button
   - Redirected to login

## 📊 Project Structure

```
Internshiptask/
├── README.md                    # This file
├── .gitignore                   # Git ignore rules
│
├── backend/                     # Node.js/Express API
│   ├── src/
│   │   ├── config/db.js
│   │   ├── models/
│   │   ├── middlewares/
│   │   ├── modules/
│   │   ├── app.js
│   │   └── server.js
│   ├── .env                     # Configuration (create this)
│   ├── package.json
│   ├── README.md
│   └── Postman_Collection.json
│
└── frontend/                    # React App
    ├── public/
    ├── src/
    │   ├── api/
    │   ├── components/
    │   ├── context/
    │   ├── pages/
    │   ├── styles/
    │   └── App.js
    ├── package.json
    └── README.md
```

## 🔧 Configuration Details

### Backend .env
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/intern_task
JWT_SECRET=super-secret-key-change-in-production
JWT_EXPIRY=7d
NODE_ENV=development
```

### MongoDB Connection Strings

**Local:**
```
mongodb://localhost:27017/intern_task
```

**MongoDB Atlas (Cloud):**
```
mongodb+srv://username:password@cluster.mongodb.net/intern_task?retryWrites=true&w=majority
```

## 📝 API Endpoints Summary

### Public
- `GET /api/v1/health` - Health check
- `POST /api/v1/auth/register` - Register user
- `POST /api/v1/auth/login` - Login user

### Protected (Require JWT Token)
- `GET /api/v1/auth/profile` - Get user profile
- `POST /api/v1/tasks` - Create task
- `GET /api/v1/tasks` - List tasks
- `GET /api/v1/tasks/:id` - Get task
- `PUT /api/v1/tasks/:id` - Update task
- `DELETE /api/v1/tasks/:id` - Delete task

## 🐛 Troubleshooting

### Issue: "Connection to MongoDB failed"
**Solution:**
- Verify MongoDB is running
- Check MONGODB_URI in .env
- Ensure MongoDB is accessible on specified port

### Issue: "Port 5000 already in use"
**Solution (Windows):**
```powershell
# Find and kill process
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

**Solution (macOS/Linux):**
```bash
lsof -i :5000
kill -9 <PID>
```

### Issue: "Cannot find module"
**Solution:**
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### Issue: Frontend API connection failing
**Solution:**
- Ensure backend is running on localhost:5000
- Check browser console for CORS errors
- Verify proxy settings in frontend if needed

### Issue: Login fails with valid credentials
**Solution:**
- Verify password meets requirements: 6+ chars, uppercase, lowercase, numbers
- Check user exists in database
- Clear localStorage and try again

## 🚀 Production Deployment

### Deploy to Heroku

**Backend:**
```bash
cd backend
heroku create your-app-name-api
heroku config:set MONGODB_URI=your-atlas-url
heroku config:set JWT_SECRET=your-secret-key
git push heroku main
```

**Frontend:**
```bash
cd frontend
npm run build
# Deploy build folder to Netlify or Vercel
```

### Deploy to AWS/Azure
- See respective cloud documentation
- Use managed databases (RDS, Cosmos DB)
- Use container services (EC2, App Service)

## 📈 Performance Tips

1. **Database Optimization**
   - Add indexes on frequently queried fields
   - Use pagination for large datasets

2. **API Performance**
   - Implement response compression
   - Add caching headers
   - Use pagination

3. **Frontend Performance**
   - Code splitting
   - Lazy loading components
   - Optimize images

## 🔐 Security Checklist

- [ ] Change JWT_SECRET in production
- [ ] Use HTTPS in production
- [ ] Enable CORS only for frontend domain
- [ ] Validate all inputs
- [ ] Use environment variables for secrets
- [ ] Enable database authentication
- [ ] Regular security audits

## 📞 Support

For detailed information:
- See `backend/README.md` for backend details
- See `frontend/README.md` for frontend details
- Check API documentation at `http://localhost:5000/api-docs`

## ✅ Checklist Before Submission

- [ ] Backend running on port 5000
- [ ] Frontend running on port 3000
- [ ] MongoDB connected and working
- [ ] Can register new users
- [ ] Can login with credentials
- [ ] Can create tasks
- [ ] Can view, edit, delete tasks
- [ ] Swagger docs working
- [ ] Postman collection imported and tested
- [ ] README files complete
- [ ] Code pushed to GitHub
- [ ] .env not included in git
- [ ] All dependencies installed

---

**You're all set! Happy coding!** 🎉
