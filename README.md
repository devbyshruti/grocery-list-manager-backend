# Grocery List Manager - Backend

## Project Overview
This is the backend for the Grocery List Manager app.  
It provides APIs to manage users, grocery lists, pantry items, and recipes.  
It also includes smart recipe suggestions based on the user's pantry items and budget calculation for groceries.

---

## Tech Stack
- **Backend:** Node.js, Express.js
- **Database:** Supabase (PostgreSQL)
- **Authentication:** JWT
- **Password Security:** bcrypt
- **API Testing:** Postman / any REST client
- **Deployment:** Render (or your preferred hosting)

---

---

## API Documentation

### Auth
| Endpoint | Method | Body | Description |
|----------|--------|------|-------------|
| `/api/auth/register` | POST | `{ name, email, password }` | Register new user |
| `/api/auth/login` | POST | `{ email, password }` | Login and get JWT token |

### Grocery Items
| Endpoint | Method | Body | Description |
|----------|--------|------|-------------|
| `/api/grocery` | POST | `{ name, category, quantity, price }` | Add grocery item |
| `/api/grocery` | GET | - | Get all grocery items for the user |
| `/api/grocery/:id` | PUT | `{ is_completed }` | Update item status |
| `/api/grocery/:id` | DELETE | - | Delete item |
| `/api/grocery/total` | GET | - | Get total budget for all items |

### Pantry Items
| Endpoint | Method | Body | Description |
|----------|--------|------|-------------|
| `/api/pantry` | POST | `{ name, quantity, expiry_date }` | Add pantry item |
| `/api/pantry` | GET | - | Get all pantry items for the user |

### Recipes
| Endpoint | Method | Body | Description |
|----------|--------|------|-------------|
| `/api/recipes` | GET | - | Get all recipes |
| `/api/recipes/suggestions` | GET | - | Get suggested recipes based on pantry items |

---

## Database Schema


### Users
```sql
id uuid primary key
name text
email text unique
password text
created_at timestamp

```
### Grocery Items
```
id uuid primary key
user_id uuid references users(id)
name text
category text
quantity integer
price numeric
is_completed boolean
created_at timestamp
```

### Pantry Items
```
id uuid primary key
user_id uuid references users(id)
name text
quantity integer
expiry_date date
created_at timestamp
```
### Recipes
```
id uuid primary key
name text
ingredients jsonb
instructions text
dietary_type text
calories integer
created_at timestamp
```
# Installation Steps

1. Clone the repository:
```
git clone https://github.com/<your-username>/grocery-list-manager-backend.git
```

2. Install dependencies:
```
cd grocery-list-manager-backend
npm install
```

3. Create .env file:
```
SUPABASE_URL=<your-supabase-url>
SUPABASE_ANON_KEY=<your-supabase-anon-key>
SUPABASE_SERVICE_ROLE_KEY=<your-supabase-service-role-key>
JWT_SECRET=<your-jwt-secret>
PORT=5000
```

4. Run the server:
```
npm start
# or if using nodemon
npm run dev
```

# Deployment

Backend deployed on Render (or your preferred host)
Live API Link: https://grocery-list-manager-backend.onrender.com
