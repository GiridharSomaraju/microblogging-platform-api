# 🐦 Microblogging Platform API

A RESTful backend API for a Twitter/X-style microblogging platform, built with Node.js, Express, and PostgreSQL. It handles the core mechanics you'd expect from a social feed — auth, tweets, replies, likes, follows — with a clean modular structure and full API documentation.

**Live API:** [microblogging-platform-api.onrender.com](https://microblogging-platform-api.onrender.com)
**Swagger Docs:** [microblogging-platform-api.onrender.com/api-docs](https://microblogging-platform-api.onrender.com/api-docs)

---

## 📌 Overview

This is a backend API for a microblogging app, basically a simplified Twitter/X clone. Users can register, log in, post tweets, reply to tweets, like/unlike them, and follow other users to get a feed of what the people they follow are posting.

I built this to properly learn how a backend actually fits together — not just writing routes that return data, but structuring the project the way real APIs are structured: auth with JWT, validating input before it hits the database, keeping the code organized into routes/controllers/models, and documenting the API so someone else could actually use it without reading my source code.

## 🎯 Why I Built This

I'd already built a smaller Twitter clone using SQLite as one of my first projects, and while it worked, it taught me that just getting CRUD routes to respond isn't the same as building something structured. So I rebuilt it from scratch with PostgreSQL, added proper authentication, and pushed myself to handle the parts I'd skipped the first time — things like a feed that's actually built from who you follow, deleting multiple tweets at once, and validating every request instead of trusting whatever the client sends.

This project also became my way of learning PostgreSQL properly — writing real queries with joins, thinking about foreign keys and relationships between users, tweets, replies, likes, and follows, instead of storing everything in one flat table. It's the project that took me from "I can make an API respond" to actually understanding why it's structured the way it is.

## ✨ Features

- User registration and login with hashed passwords
- JWT-based authentication on all protected routes
- Create, view, and delete tweets (single or bulk delete)
- Reply to tweets and delete individual replies
- Like / unlike tweets, with a list of who liked a tweet
- Follow / unfollow other users
- Followers and following lists
- Search users by name
- Personal feed generated from followed users' tweets
- Request validation on all input routes using `express-validator`
- Centralized error handling middleware
- Interactive Swagger UI documentation
- Deployed and publicly accessible on Render

## 🛠 Tech Stack

| Category | Technology |
|---|---|
| Runtime | Node.js |
| Framework | Express.js |
| Database | PostgreSQL |
| DB Hosting | Supabase |
| Authentication | JWT (jsonwebtoken) |
| Password Hashing | bcrypt |
| Validation | express-validator |
| API Docs | Swagger UI + swagger-jsdoc |
| DB Driver | pg |
| Config | dotenv |
| Deployment | Render |

## 🏗 Project Architecture

I followed an MVC-style layered architecture to keep things organized as the number of routes grew:

```
Client Request
      │
      ▼
   Routes           →  defines endpoints, applies middleware
      │
      ▼
 Middleware         →  JWT auth check, request validation
      │
      ▼
 Controllers        →  handles request/response, calls models
      │
      ▼
   Models           →  raw SQL queries via pg, talks to PostgreSQL
      │
      ▼
PostgreSQL (Supabase)
```

Routes just handle wiring (which controller runs, which middleware applies) — no logic there. Controllers handle the actual request/response and call the models when they need data. Models are the only place that talks to the database, using parameterized queries through `pg` so I don't have to worry about SQL injection.

## 📁 Folder Structure

```
microblogging-platform-api/
├── src/
│   ├── config/
│   │   └── db.js                # PostgreSQL connection pool
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── userController.js
│   │   ├── tweetController.js
│   │   ├── replyController.js
│   │   ├── likeController.js
│   │   └── followController.js
│   ├── middlewares/
│   │   ├── authMiddleware.js     # JWT verification
│   │   ├── validateRequest.js    # express-validator error handler
│   │   └── errorHandler.js       # centralized error handling
│   ├── models/
│   │   ├── userModel.js
│   │   ├── tweetModel.js
│   │   ├── replyModel.js
│   │   ├── likeModel.js
│   │   └── followModel.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── userRoutes.js
│   │   ├── tweetRoutes.js
│   │   ├── feedRoutes.js
│   │   ├── replyRoutes.js
│   │   └── likeRoutes.js
│   ├── validators/
│   │   ├── authValidator.js
│   │   └── tweetValidator.js
│   ├── docs/
│   │   └── swagger.js            # swagger-jsdoc config
│   └── app.js                    # Express app setup
├── .env.example
├── .gitignore
├── package.json
├── server.js                     # entry point
└── README.md
```

## ⚙️ Installation Guide

Clone the repo and install dependencies:

```bash
git clone https://github.com/<your-username>/microblogging-platform-api.git
cd microblogging-platform-api
npm install
```

Create your `.env` file (see below), then run:

```bash
# development
npm run dev

# production
npm start
```

The server will start on `http://localhost:3000` by default (or whatever port you set in `.env`).

## 🔐 Environment Variables

Create a `.env` file in the project root. An `.env.example` is included in the repo as a reference.

```env
PORT=5000

# PostgreSQL (Supabase connection string)
DATABASE_URL=postgresql://<user>:<password>@<host>:<port>/<database>

# JWT
JWT_SECRET=your_jwt_secret_here
JWT_EXPIRES_IN=7d

# Node environment
NODE_ENV=development
```

> Never commit your actual `.env` file. `.env` is already listed in `.gitignore`.

## 🗄 Database Setup

The database is PostgreSQL, hosted on Supabase for this project.

1. Create a new project on [Supabase](https://supabase.com).
2. Copy the connection string from **Project Settings → Database** and set it as `DATABASE_URL` in your `.env`.
3. Run the SQL schema (tables for `users`, `tweets`, `replies`, `likes`, and `follows`) against your Supabase database using the SQL editor or a migration script.
4. The `pg` connection pool in `src/config/db.js` will handle connections using SSL, which Supabase requires.

Core tables:

| Table | Purpose |
|---|---|
| `users` | User accounts, hashed passwords |
| `tweets` | Tweets, linked to `users.id` |
| `replies` | Replies, linked to `tweets.id` and `users.id` |
| `likes` | Join table between `users` and `tweets` |
| `follows` | Join table tracking follower/following relationships |

## 📖 API Documentation (Swagger)

Full interactive API documentation is available via Swagger UI once the server is running:

```
http://localhost:5000/api-docs
```

On the deployed instance:

```
https://microblogging-platform-api.onrender.com/api-docs
```

Every route includes request/response schemas, required fields, and auth requirements, so you can test endpoints directly from the browser without needing Postman.

## 🔑 Authentication

Auth is handled using JWT.

1. A user registers or logs in via `/auth/register` or `/auth/login`.
2. On success, the server returns a signed JWT.
3. For any protected route, the client sends the token in the `Authorization` header:

```
Authorization: Bearer <your_token>
```

4. The `authMiddleware` verifies the token before the request reaches the controller. If it's missing, expired, or invalid, the request is rejected with a `401`.

Passwords are never stored in plain text — they're hashed with `bcrypt` before being written to the database.

## 🧩 API Modules

- **Auth** — registration, login, token issuance
- **Users** — profile lookup, search, current user data
- **Tweets** — create, list, delete (single and bulk)
- **Feed** — aggregated tweets from followed users
- **Follow** — follow/unfollow, followers/following lists
- **Likes** — like/unlike a tweet, list likers
- **Replies** — reply to a tweet, list replies, delete a reply

## 📋 Complete API Endpoint Table

### Authentication

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| POST | `/auth/register` | Register a new user | ❌ |
| POST | `/auth/login` | Log in and receive a JWT | ❌ |

### Users

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| GET | `/users/me` | Get current logged-in user's profile | ✅ |
| GET | `/users/:userId` | Get a specific user's public profile | ✅ |
| GET | `/users/search?name=john` | Search users by name | ✅ |

### Tweets

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| POST | `/users/me/tweets` | Create a new tweet | ✅ |
| GET | `/users/me/tweets` | Get current user's tweets | ✅ |
| DELETE | `/users/me/tweets/:tweetId` | Delete a single tweet | ✅ |
| DELETE | `/users/me/tweets` | Delete multiple tweets (bulk) | ✅ |

### Feed

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| GET | `/feed` | Get personalized feed from followed users | ✅ |

### Followers

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| POST | `/users/:userId/follow` | Follow a user | ✅ |
| DELETE | `/users/:userId/follow` | Unfollow a user | ✅ |
| GET | `/users/me/followers` | List current user's followers | ✅ |
| GET | `/users/me/following` | List users the current user follows | ✅ |

### Likes

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| POST | `/tweets/:tweetId/like` | Like a tweet | ✅ |
| DELETE | `/tweets/:tweetId/like` | Unlike a tweet | ✅ |
| GET | `/tweets/:tweetId/likes` | List users who liked a tweet | ✅ |

### Replies

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| POST | `/tweets/:tweetId/replies` | Reply to a tweet | ✅ |
| GET | `/tweets/:tweetId/replies` | Get all replies to a tweet | ✅ |
| DELETE | `/replies/:replyId` | Delete a reply | ✅ |

## 🚀 Deployment

- **API** is deployed on [Render](https://render.com).
- **Database** is hosted on [Supabase](https://supabase.com) (PostgreSQL).
- **Live API:** https://microblogging-platform-api.onrender.com
- **Swagger Docs:** https://microblogging-platform-api.onrender.com/api-docs

Render is configured to build and start the app automatically from the main branch, with environment variables set in the Render dashboard (matching `.env.example`).

> Note: the free Render tier spins down after inactivity, so the first request after idle time may take a few seconds to respond while the instance wakes up.

## ⚠️ Error Handling

Instead of writing a `try/catch` in every controller with a different response format each time, I set up one centralized error-handling middleware. Controllers just pass errors to `next(err)`, and the error handler formats a consistent JSON response:

```json
{
  "success": false,
  "message": "Tweet not found"
}
```

This was one of the things I got wrong in my first project (every route returned errors differently), so fixing that here felt like a real improvement.

## ✅ Validation

All write routes (register, login, create tweet, reply, etc.) run through `express-validator` before they reach the controller. If something's missing or wrong, the request gets rejected early with a `400` and a clear message, instead of bad data reaching the database.

Example validation response:

```json
{
  "success": false,
  "errors": [
    { "field": "email", "message": "Must be a valid email address" }
  ]
}
```

## 🔒 Security Features

- Passwords hashed with `bcrypt` (never stored in plain text)
- JWT-based stateless authentication
- Protected routes guarded by auth middleware
- Parameterized SQL queries (via `pg`) to prevent SQL injection
- Environment variables for all secrets and connection strings
- Input validation on every write endpoint

## 🌟 Project Highlights

- Feed is built from actual follower relationships, not just a dump of all tweets
- Bulk delete for tweets, not just deleting one at a time
- Every write route is validated before it touches the database
- Full Swagger documentation generated from comments in the route files, so the API is testable straight from the browser
- Deployed end-to-end — live API on Render, database on Supabase, public docs — not just running on localhost

## 🔮 Future Improvements

Things I know are missing and want to add as I keep learning:

- [ ] Pagination on feed, tweets, and replies
- [ ] Rate limiting on auth routes
- [ ] Refresh token support
- [ ] Media/image uploads for tweets
- [ ] Retweet functionality
- [ ] Unit and integration tests (Jest + Supertest)
- [ ] Dockerizing the app

## 👤 Author

**Giridhar**
Aspiring Backend Developer | Node.js · Express · PostgreSQL

I'm a CS graduate learning backend development hands-on through projects like this one. Feel free to check out my other work or connect with me.

- GitHub: [add your GitHub profile link]
- LinkedIn: [add your LinkedIn profile link]


