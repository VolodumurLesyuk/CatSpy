## Back-End 
# 🕵️‍♂️ SpyCat API

A simple Django + DRF project that manages spy cats and their missions.

---

## 🚀 Quick Start

### 1. Clone the repo

```bash
git clone https://github.com/VolodumurLesyuk/CatSpy.git
cd spycat/backend
```

### 2. Create a virtual environment

```bash
python3 -m venv venv # On Windows: python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

### 3. Install dependencies

```bash
pip install -r requirements.txt
```

### 4. Apply migrations

```bash
python manage.py migrate
```

### 5. Run the server

```bash
python manage.py runserver
```

---

## 🌐 API Documentation

Visit:

- **Swagger UI**: [http://127.0.0.1:8000/schema/swagger/](http://127.0.0.1:8000/schema/swagger/)
- **ReDoc**: [http://127.0.0.1:8000/schema/redoc/](http://127.0.0.1:8000/schema/redoc/)
- **OpenAPI JSON**: [http://127.0.0.1:8000/schema/](http://127.0.0.1:8000/schema/)

---

## 📦 Endpoints Overview

### 🐱 SpyCats

| Method | URL                     | Description               |
|--------|-------------------------|---------------------------|
| GET    | `/api/spycats/`         | List all spy cats         |
| POST   | `/api/spycats/`         | Create a new spy cat      |
| GET    | `/api/spycats/{id}/`    | Retrieve a specific cat   |
| PATCH  | `/api/spycats/{id}/`    | Update a cat (e.g., salary) |
| DELETE | `/api/spycats/{id}/`    | Delete a cat              |


---

### 🎯 Missions + Targets

| Method | URL                             | Description                     |
|--------|----------------------------------|---------------------------------|
| GET    | `/api/missions/`                | List all missions               |
| POST   | `/api/missions/`                | Create mission + targets        |
| GET    | `/api/missions/{id}/`           | Retrieve mission details        |
| DELETE | `/api/missions/{id}/`           | Delete mission (only if no cat) |
| PATCH  | `/api/missions/{id}/`           | Update mission & targets        |

---

### 🧩 Additional Actions

#### ✅ Assign Cat to Mission

```http
POST /api/missions/{id}/assign_cat/
```

**Body:**
```json
{
  "cat_id": 2
}
```

#### 📝 Notes Logic

- `notes` in targets **cannot be updated** if:
  - the target is completed
  - or the mission is completed

---

## 🔐 Validations
- `notes` update is restricted for completed targets/missions
- A mission cannot be deleted if it has an assigned cat

---
