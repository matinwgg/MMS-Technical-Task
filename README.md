# Merchant Management System (MMS)

## 📌 Overview
The **Merchant Management System** is a full-stack application for managing merchant records.  
It provides a RESTful backend API built with **Django REST Framework** and a modern frontend built with **React + Tailwind CSS**.

The system supports creating, viewing, updating, and deleting merchants, with clean UI feedback, proper validation, and a PostgreSQL database backend.

---

## 🛠 Tech Stack

### Backend
- Python
- Django
- Django REST Framework
- PostgreSQL
- psycopg2
- Environment variables (`python-dotenv`)

### Frontend
- React (Vite)
- Tailwind CSS
- Axios
- Lucide Icons
- shadcn/ui

### DevOps / Tooling
- Docker
- Docker Compose

---

## ✨ Features

### Backend
- Full CRUD API for merchants
- Merchant fields:
  - Name
  - Business Registration Number (unique)
  - Email
  - Phone
  - Status (`ACTIVE`, `PENDING`, `SUSPENDED`)
- PostgreSQL database with migrations
- Input validation & structured error handling
- Environment-based configuration (no hardcoded secrets)
- Basic test setup

### Frontend
- Fetch and display merchants from API
- Create merchant form (modal)
- Edit merchant details (modal)
- Delete merchant with confirmation dialog
- Status badges with dynamic styling
- Loading and error states
- Responsive, clean UI using Tailwind CSS

---

## 📂 Project Structure

merchant-management-system/
├── backend/
│   ├── merchants/
│   ├── backend/
│   ├── manage.py
│   ├── requirements.txt
│   ├── Dockerfile
│   └── .env.example
│
├── frontend/
│   ├── src/
│   ├── index.html
│   ├── Dockerfile
│   └── vite.config.js
│
├── docker-compose.yml
└── README.md


---

## ⚙️ Environment Variables

### Backend `.env`

```env
DEBUG=True
SECRET_KEY=your-secret-key

DB_NAME=merchant_db
DB_USER=merchant_user
DB_PASSWORD=merchant_password
DB_HOST=db
DB_PORT=5432
```

> **Important:** Never commit `.env` files to version control. Use `.env.example` instead.

---

## 🐘 PostgreSQL Setup (Without Docker)

1. Open **pgAdmin**
2. Create a database named:

   ```
   merchant_db
   ```
3. Create a user:

   ```
   merchant_user
   ```
4. Assign a password and grant full privileges on `merchant_db`

---

## 🚀 Running with Docker

### Build Images

```bash
docker compose build
```

### Start Services

```bash
docker compose up
```

### Services

* Backend API: [http://localhost:8000](http://localhost:8000)
* Frontend App: [http://localhost:5173](http://localhost:5173)
* PostgreSQL runs inside Docker

---

## 🔗 API Endpoints

| Method | Endpoint               | Description     |
| ------ | ---------------------- | --------------- |
| POST   | `/api/merchants/`      | Create merchant |
| GET    | `/api/merchants/`      | List merchants  |
| PATCH  | `/api/merchants/{id}/` | Update merchant |
| DELETE | `/api/merchants/{id}/` | Delete merchant |

---

## 🧪 Sample cURL Requests

### Create Merchant

```bash
curl -X POST http://localhost:8000/api/merchants/ \
  -H "Content-Type: application/json" \
  -d '{
    "name": "CoreTech Systems",
    "business_registration_number": "CT-123456",
    "email": "info@coretech.com",
    "phone": "+233501234567",
    "status": "ACTIVE"
  }'
```

### Get Merchants

```bash
curl http://localhost:8000/api/merchants/
```

### Update Merchant

```bash
curl -X PATCH http://localhost:8000/api/merchants/1/ \
  -H "Content-Type: application/json" \
  -d '{
    "status": "SUSPENDED"
  }'
```

### Delete Merchant

```bash
curl -X DELETE http://localhost:8000/api/merchants/1/
```

---

## 📸 Screenshots

```text
assets/screenshots/
├── Dashboard-1.png
├── Dashboard-2.png
├── Create-merchant.png
├── Create-merchant-success.png
├── Update-merchant-primary-info.png
├── Delete-merchant.png
└── Django-rest-api-page.png
```

---

## 🧠 Design Decisions

* Authentication intentionally excluded to strictly match task requirements
* Modals used for create/edit/delete actions for consistent UX
* Centralized API handling for maintainability
* Docker used for consistent local and deployment environments

---

## 🔮 Future Improvements

* Authentication and authorization (JWT)
* Backend pagination and filtering
* Role-based access control
* Audit logs
* CI/CD pipeline
* Production-ready Docker optimizations

---

## 👨‍💻 Author

**Matin Odoom**

---

## ✅ Task Compliance Checklist

| Requirement                 | Status |
| --------------------------- | ------ |
| CRUD API                    | ✅      |
| PostgreSQL Database         | ✅      |
| Validation & Error Handling | ✅      |
| React Frontend              | ✅      |
| Tailwind CSS UI             | ✅      |
| Docker / Docker Compose     | ✅      |
| README & Documentation      | ✅      |

```
```

