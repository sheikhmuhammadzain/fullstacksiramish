# Full Stack Project

A full-stack web application built with React (frontend) and Django REST Framework (backend) with JWT authentication.

## Prerequisites

Before you begin, ensure you have the following installed:
- Python 3.8 or higher
- Node.js 16.x or higher
- npm or yarn package manager

## Project Structure

```
fullstacksiramish/
├── backend/         # Django REST Framework backend
│   ├── backend2/    # Django project settings
│   ├── myapp/       # Django application
│   └── manage.py    # Django management script
└── frontend/        # React frontend
```

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Create a virtual environment:
```bash
python -m venv venv
```

3. Activate the virtual environment:
- Windows:
```bash
.\venv\Scripts\activate
```
- Unix or MacOS:
```bash
source venv/bin/activate
```

4. Install the required dependencies:
```bash
pip install django djangorestframework djangorestframework-simplejwt django-cors-headers
```

5. Run database migrations:
```bash
python manage.py makemigrations
python manage.py migrate
```

6. Create a superuser (admin):
```bash
python manage.py createsuperuser
```

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

## Running the Application

### Start the Backend Server

1. Make sure your virtual environment is activated
2. From the backend directory, run:
```bash
python manage.py runserver
```
The backend server will start at `http://localhost:8000`

### Start the Frontend Development Server

1. From the frontend directory, run:
```bash
npm run dev
```
The frontend development server will start at `http://localhost:5173`

## Available Scripts

### Frontend
- `npm run dev` - Start the development server
- `npm run build` - Build the production version
- `npm run lint` - Run ESLint for code linting
- `npm run preview` - Preview the production build locally

### Backend
- `python manage.py runserver` - Start the development server
- `python manage.py makemigrations` - Create database migrations
- `python manage.py migrate` - Apply database migrations
- `python manage.py createsuperuser` - Create admin user
- `python manage.py shell` - Open Django shell

## Technologies Used

### Frontend
- React
- Vite
- React Router DOM
- Axios for API calls
- JWT Decode for authentication

### Backend
- Django
- Django REST Framework
- Simple JWT for authentication
- Django CORS Headers
- SQLite database (default)

## API Endpoints

- Admin Interface: `http://localhost:8000/admin/`
- API Root: `http://localhost:8000/api/`
- Token Endpoints:
  - Obtain Token: `http://localhost:8000/api/token/`
  - Refresh Token: `http://localhost:8000/api/token/refresh/`

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details
