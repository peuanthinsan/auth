# Auth Service with React Frontend

This project contains a simple Node.js authentication service and a minimal React frontend.

## Backend

Install dependencies and run the API server. The backend stores all
authentication data in MongoDB, so ensure a Mongo instance is running
and provide the connection string using the `MONGO_URI` environment variable:

```bash
npm install
node index.js
```

Endpoints include registration, login, profile management, organization management,
a listing of your organizations and a simple currency transfer system.
Routes that modify organization membership or invites require an admin user. Admins
can list all users with `GET /users`, change a user's role with `POST /users/:id/role`,
list all organizations via `GET /organizations/all` and update an organization's name
using `PATCH /organizations/:id`. Roles themselves are stored in a separate collection
and can be managed with CRUD endpoints under `/roles`. Admins may also list or delete invites through `/invites`.

## Frontend

Build and start the frontend:

```bash
cd frontend
npm install
node build.js
node server.js
```

Environment variables are loaded from a `.env` file in the project root. A sample is provided as `.env.example`:

```ini
PORT=3000
MONGO_URI=mongodb://localhost:27017/authdb
JWT_SECRET=supersecretkey
API_URL=http://localhost:3000
FRONTEND_PORT=4000
```

Copy this file to `.env` and modify values as needed.

The frontend will be available on `FRONTEND_PORT`. It includes simple pages for each API endpoint under `src/index.js`, allowing you to register, log in, manage organizations and members, handle invites, transfer currency and update user roles.
All API requests use an Axios instance defined in `src/api.js`. The authentication token is stored using React Context in `src/AuthContext.js`, which automatically adds the `Authorization` header for requests.
The UI uses Material UI components with an AppBar and side navigation drawer for a simple dashboard layout. When logged in, a dropdown in the header lists your organizations and the selection is stored only in the browser. Admin features live under an **Administration** page where tables built with `react-table` let you manage users, roles, organizations and invites inline.

## Docker

The repository includes a `Dockerfile` ready for deployment to Google Cloud Run. Build the image and run it locally:

```bash
docker build -t auth-service .
docker run -p 8080:8080 --env-file .env auth-service
```

Cloud Run will automatically provide environment variables defined in `.env.example`. Ensure MongoDB is reachable from the container via `MONGO_URI`.
