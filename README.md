# TFG_HALO - HaloFiles Web Application

## Summary

This repository contains my TFG code about HaloFiles, a web application built with Django that works as a GUI to share & commit information about biological microorganism data.

## ⚠️ Important Update (February 2026)

**This project has been recently updated with critical security fixes and improvements.**

### Key Changes:
- ✅ Django updated to **5.2.9** (fixes 10 CVEs)
- ✅ All dependencies updated with fixed versions
- ✅ SECRET_KEY moved to environment variables
- ✅ Enhanced security configurations
- ✅ Improved error handling and logging
- ✅ Docker configuration improved

**📖 See [MIGRATION_GUIDE.md](Halo_Web/MIGRATION_GUIDE.md) for detailed migration instructions.**

---

## Prerequisites

- **Python 3.12 or higher**
- **pip** (Python package manager)
- **virtualenv** (recommended)
- **Docker & Docker Compose** (optional, for containerized deployment)

---

## Installation Guide

### 1. Clone the repository
```bash
git clone https://github.com/MiquelMontero02/TFG.git
cd TFG
```

### 2. Navigate to the project directory
```bash
cd Halo_Web
```

### 3. Create a virtual environment
Create a virtual environment to isolate dependencies. You can name it anything, but we'll use "halo_env" in this example.

```bash
python -m venv halo_env
```

For more information on virtual environments, check the [Python venv documentation](https://docs.python.org/3/library/venv.html).

### 4. Activate the virtual environment

**Windows:**
```bash
halo_env\Scripts\activate
```

**Linux / macOS:**
```bash
source halo_env/bin/activate
```

### 5. Install dependencies
```bash
pip install -r requirements.txt
```

### 6. Configure environment variables

Copy the example environment file and configure it:

```bash
copy .env.example .env  # Windows
# or
cp .env.example .env    # Linux/macOS
```

Edit the `.env` file with your configuration:

```env
# Environment (DEV or PROD)
ENV=DEV

# Django Secret Key (IMPORTANT: Generate a new one!)
SECRET_KEY=your-secret-key-here

# Database API URL
DB_PATH=https://your-backend-api-url.com/api/

# Email Configuration
EMAIL_HOST=smtp.outlook.com
EMAIL_PORT=587
EMAIL_HOST_USER=your-email@example.com
EMAIL_HOST_PASSWORD=your-email-password
EMAIL_USE_TLS=True
DEFAULT_FROM_EMAIL=no-reply@example.com
```

### 7. Generate a SECRET_KEY

Run the provided script to generate a secure SECRET_KEY:

```bash
python generate_secret_key.py
```

Copy the generated key to your `.env` file.

### 8. Run database migrations

```bash
python manage.py makemigrations
python manage.py migrate
```

### 9. Create a superuser (for admin access)

```bash
python manage.py createsuperuser
```

### 10. Collect static files

```bash
python manage.py collectstatic --noinput
```

### 11. Run the development server

```bash
python manage.py runserver
```

The application should now be running at `http://127.0.0.1:8000/`

---

## Docker Deployment

### Using Docker Compose (Recommended)

1. **Configure your `.env` file** (as described above)

2. **Build and run the containers:**
```bash
docker-compose build
docker-compose up -d
```

3. **Run migrations inside the container:**
```bash
docker-compose exec web python manage.py migrate
docker-compose exec web python manage.py createsuperuser
```

4. **Access the application:**
- Web: `http://localhost:8000/`
- Admin: `http://localhost:8000/admin/`

### Stop the containers:
```bash
docker-compose down
```

---

## Project Structure

```
Halo_Web/
├── Forms/                      # Main Django app
│   ├── middleware.py          # Authentication middleware
│   ├── models.py              # Database models
│   ├── utils.py               # Utility functions
│   ├── views/                 # View controllers
│   │   ├── views_auth.py     # Authentication views
│   │   ├── views_api.py      # API views
│   │   └── ...
│   ├── static/               # Static files (CSS, JS)
│   └── templates/            # HTML templates
├── Halo_Web/                 # Django project settings
│   ├── settings.py           # Configuration
│   ├── urls.py               # URL routing
│   └── wsgi.py               # WSGI config
├── logs/                     # Application logs
├── requirements.txt          # Python dependencies
├── .env.example              # Environment template
├── docker-compose.yaml       # Docker Compose config
├── Dockerfile               # Docker image definition
├── manage.py                # Django management script
└── MIGRATION_GUIDE.md       # Migration instructions
```

---

## Features

- 🔐 **User Authentication** - Login, registration, and email verification
- 👤 **User Profiles** - Manage user information
- 📊 **Data Management** - Handle biological microorganism data
- 🔗 **REST API** - External API integration
- 📧 **Email Notifications** - Automated email system
- 🎨 **Bootstrap UI** - Modern, responsive interface
- 🐳 **Docker Support** - Easy deployment
- 🔒 **Security** - HTTPS, CSRF protection, secure sessions

---

## API Endpoints

- `/api/get/public/<query_params>/` - Public API access (no auth required)
- `/api/get/<query_params>/` - Protected API access (auth required)
- `/api/put/<src>/` - Update resources
- `/api/put_file/<src>/` - Upload files
- `/api/get_file/<src>/` - Download files

---

## Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `ENV` | Environment (DEV/PROD) | `DEV` |
| `SECRET_KEY` | Django secret key | (required) |
| `DB_PATH` | Backend API URL | (required) |
| `EMAIL_HOST` | SMTP server | `smtp.outlook.com` |
| `EMAIL_PORT` | SMTP port | `587` |
| `EMAIL_HOST_USER` | Email username | (required) |
| `EMAIL_HOST_PASSWORD` | Email password | (required) |
| `EMAIL_USE_TLS` | Use TLS | `True` |

---

## Security

This application implements several security measures:

- ✅ HTTPS enforcement in production
- ✅ HSTS headers
- ✅ Secure cookies
- ✅ CSRF protection
- ✅ XSS protection
- ✅ Content-Type sniffing prevention
- ✅ Session security
- ✅ File upload limits

---

## Troubleshooting

### Common Issues

1. **ModuleNotFoundError for django_redis**
   ```bash
   pip install django-redis
   ```

2. **SECRET_KEY not found**
   - Make sure you have a `.env` file with `SECRET_KEY` configured

3. **Database errors**
   ```bash
   python manage.py migrate
   ```

4. **Static files not loading**
   ```bash
   python manage.py collectstatic --noinput
   ```

For more help, check the logs in `logs/django.log`

---

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## License

This project is part of a Final Degree Project (TFG).

---

## Contact

For questions or support, please open an issue in the repository.

---

**Last Updated:** February 14, 2026  
**Django Version:** 5.2.9  
**Python Version:** 3.12+
 
