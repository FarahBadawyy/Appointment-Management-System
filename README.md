# Appointment Management System

This is a full-stack Appointment Management System built using **Laravel (Backend)** and **React (Frontend)**. It supports three user roles: **Admin**, **Doctor**, and **Patient**. The system enables user registration, secure login, and full appointment management with role-based access.

---

##  Tech Stack

- **Backend**: Laravel 12, Sanctum, MySQL
- **Frontend**: React (Vite), Axios
- **Security**: Google reCAPTCHA v2 on login
- **Tools**: XAMPP, VS Code, Postman (for testing)

---

##  Features

- User registration and login with role-based redirection
- Admin can manage doctors, patients, and appointments
- Patients can book appointments with available doctors
- Doctors can view and update status of their appointments
- Secure API authentication with Laravel Sanctum
- Google reCAPTCHA integration to prevent bot logins
- Form validation on both frontend and backend
- Clean and responsive UI using basic CSS

---

##  Setup Instructions

### Backend (Laravel)

1. Navigate to the backend folder:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   composer install
   ```

3. Copy and configure environment:
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```

4. Set your database credentials in `.env`

5. Run migrations:
   ```bash
   php artisan migrate
   ```

6. Start the server:
   ```bash
   php artisan serve
   ```

---

### Frontend (React)

1. Navigate to the frontend folder:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the React app:
   ```bash
   npm run dev
   ```

---

##  Test Accounts

Create users via the registration form using roles:
- `admin`
- `doctor`
- `patient`

---

##  Notes

- reCAPTCHA is implemented on the login page. You must complete the “I'm not a robot” checkbox to log in.
- Ensure both frontend and backend are running on localhost.
- required features are completed.
-There is a pending feature that the guest user can't register an appointment through mail
----
I approached the project by carefully breaking it down into small, testable components — starting with backend authentication, then moving to role-based access and dashboard functionalities. I enjoyed seeing the system come together as each role interacted with the API in different ways. One of the highlights for me was integrating Laravel Sanctum with React and securing it using Google reCAPTCHA. I appreciated how clean and organized the code became by the end, and I really liked how each part of the system connected logically — it made testing and debugging feel satisfying rather than frustrating.

---

##  Folder Structure

```
AppointmentManagementSystem/
├── backend/     # Laravel app
├── frontend/    # React app
└── README.md
```

---

##  Author

Farah Atef Badawy
