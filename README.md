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
a listing of your organizations and a simple currency transfer system. All API
routes are now served under the `/api` prefix (for example `/api/login`).
Routes that modify organization membership or invites require an admin user. Admins
can list organization members with `GET /users?orgId=<org>` or fetch users not
assigned to any organization with `GET /users`. They may change a user's role with
`POST /users/:id/role`, list all organizations via `GET /organizations/all` and update
an organization's name using `PATCH /organizations/:id`. Roles themselves are stored
in a separate collection and can be managed with CRUD endpoints under `/roles`.
Admins may also list or delete invites through `/invites`.
Users can send friend requests by email and accept them to build a list of friends
for quick transfers. Retrieve pending requests with `GET /friends/requests`, send
a request using `POST /friends/request` and accept with
`POST /friends/requests/{id}/accept`. A user's friends are listed via `GET /friends`
and can be removed with `DELETE /friends/{id}`.
Users may also share updates by creating posts with optional images using
`POST /posts`. Posts are fetched via `GET /posts`, which returns posts from you
and your friends. The list can be ordered by latest, relevance or by number of
upvotes using the `order` query parameter. Posts support reactions with
`POST /posts/{id}/like`.
Comments can be added or viewed through `POST /posts/{id}/comments` and
`GET /posts/{id}/comments`.

When the server is running you can explore all endpoints using Swagger UI at [`/api-docs`](http://localhost:3000/api-docs).

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
API_URL=http://localhost:3000/api
CORS_ORIGIN=http://localhost:3000
FRONTEND_PORT=4000
MAX_FILE_SIZE=26214400
```

`CORS_ORIGIN` defines which origin is allowed to access the API. When unset, it defaults to the origin of `API_URL`.

Copy this file to `.env` and modify values as needed.
Passwords must be at least 8 characters long and include both letters and
numbers. Attempts to register or change a password that does not meet this
policy will result in a `400` response describing the issue.

## Password Requirements

Passwords must be at least 8 characters long and include both letters and
numbers. Attempts to register or change a password that does not meet this
policy will result in a `400` response describing the issue.

The frontend runs on port 4000 by default. It includes simple pages for each API endpoint under `src/index.js`, allowing you to register, log in, manage organizations and members, handle invites, transfer currency and update user roles.
There is also a **Feed** page where users can share posts, like them and leave comments.
Selecting an organization from the dropdown adds an **Organization Feed** page that displays posts created within that group.

All API requests use an Axios instance defined in `src/api.js`. The authentication token is stored using React Context in `src/AuthContext.js`, which automatically adds the `Authorization` header for requests. Login now also returns a long-lived refresh token which the Axios wrapper uses to obtain a new access token when a request returns `401`. Profile updates now support uploading a picture and accepting an invite requires providing the invite's token.
Profile pictures must be JPEG or PNG images and may not exceed 25MB in size.
The limit can be adjusted with the `MAX_FILE_SIZE` environment variable.
The UI uses Material UI components with an AppBar and side navigation drawer for a simple dashboard layout. When logged in, a dropdown in the header lists your organizations and the selection is stored only in the browser. Admin features live under an **Administration** page where tables built with `react-table` let you manage users, roles, organizations and invites inline. Super admins may access this page even without belonging to an organization or having roles assigned. Deleting an organization now also removes its roles, invites and any references from user documents.

## Docker

The repository includes a `Dockerfile` ready for deployment to Google Cloud Run. Build the image and run it locally:

```bash
docker build -t auth-service .
docker run -p 8080:8080 --env-file .env auth-service
```

Cloud Run will automatically provide environment variables defined in `.env.example`. Ensure MongoDB is reachable from the container via `MONGO_URI`.
