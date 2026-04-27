# Sports Tournament Management System (Backend)

The **Sports Tournament Management System Backend** is a microservices-based backend application built with **Node.js**, **Express.js**, **MongoDB Cloud**, and **Docker**.

It provides RESTful APIs for managing users, tournaments, teams, matches, standings, and announcements. The system is designed to support multiple tournaments, different user roles, and scalable backend service separation.

---

## Features

- User registration and login
- JWT-based authentication
- Role-based user system
- Tournament creation and management
- Team registration and player assignment
- Match scheduling and result recording
- Tournament standings management
- Announcement creation and listing
- Docker-based microservices setup
- Separate database per service

---

## Technology Stack

| Technology | Purpose |
|---|---|
| Node.js | Backend runtime |
| Express.js | REST API framework |
| MongoDB | Database |
| Mongoose | MongoDB object modeling |
| Docker | Containerization |
| Docker Compose | Multi-service orchestration |
| JWT | Authentication |
| bcrypt.js | Password hashing |
| Helmet | Security headers |
| CORS | Cross-origin access |
| Morgan | Request logging |

---

## Microservices Architecture

The backend is divided into independent services. Each service is responsible for one business domain.

| Service | Responsibility | Port |
|---|---|---|
| Auth Service | User registration, login, authentication | `5000` |
| Tournament Service | Tournament creation and management | `6000` |
| Team Service | Team registration and player management | `7000` |
| Match Service | Match scheduling and results | `8000` |
| Standings Service | Tournament rankings and points | `9000` |
| Announcement Service | Tournament announcements and updates | `10000` |

Each service runs independently and connects to its own MongoDB database.

---

## Project Structure

```text
SPORTSTMS/
├── auth-service/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   └── app.js
│   ├── Dockerfile
│   ├── package.json
│   └── .env
│
├── tournament-service/
├── team-service/
├── match-service/
├── standings-service/
├── announcement-service/
│
├── docker-compose.yaml
└── README.md
```

---

## User Roles

The system supports the following user roles:

| Role | Description |
|---|---|
| `ORGANIZER` | Can manage tournaments, matches, results, and announcements |
| `TEAM_MANAGER` | Can register teams and manage players |
| `PLAYER` | Can participate as a player |
| `SPECTATOR` | Can view public tournament information |

---

## Getting Started

### Prerequisites

Make sure you have the following installed:

- Docker
- Docker Compose
- Node.js 
- MongoDB Atlas account or MongoDB connection string

---

## Environment Variables

Each service should have its own `.env` file.

Example for `auth-service/.env`:

```env
PORT=5001
MONGO_URI=mongodb+srv://your_username:your_password@your_cluster.mongodb.net/authdb
JWT_SECRET=your_jwt_secret
NODE_ENV=development
```

Example database names:

| Service | Database |
|---|---|
| Auth Service | `authdb` |
| Tournament Service | `tournamentdb` |
| Team Service | `teamdb` |
| Match Service | `matchdb` |
| Standings Service | `standingsdb` |
| Announcement Service | `announcementdb` |

---

## Running with Docker

From the root project directory, run:

```bash
docker compose up --build
```

To stop all services:

```bash
docker compose down
```

To rebuild all services:

```bash
docker compose up --build
```

To view logs for one service:

```bash
docker compose logs -f auth-service
```

---

## Service URLs

| Service | URL |
|---|---|
| Auth Service | `http://localhost:5000` |
| Tournament Service | `http://localhost:6000` |
| Team Service | `http://localhost:7000` |
| Match Service | `http://localhost:8000` |
| Standings Service | `http://localhost:9000` |
| Announcement Service | `http://localhost:10000` |

---

# API Endpoints

## Auth Service

Base URL:

```text
http://localhost:5000
```

### Register User

```http
POST /api/users/register
```

Example body:

```json
{
  "username": "faisal",
  "email": "faisal@example.com",
  "password": "123456",
  "role": "SPECTATOR"
}
```

### Login User

```http
POST /api/users/login
```

Example body:

```json
{
  "email": "faisal@example.com",
  "password": "123456"
}
```

Successful response:

```json
{
  "success": true,
  "msg": "Login successful",
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "username": "faisal",
    "email": "faisal@example.com",
    "role": "SPECTATOR"
  }
}
```

---

## Tournament Service

Base URL:

```text
http://localhost:6000
```

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/tournaments` | Create a tournament |
| GET | `/api/tournaments` | Get all tournaments |
| GET | `/api/tournaments/:id` | Get tournament by ID |
| PUT | `/api/tournaments/:id` | Update tournament |
| DELETE | `/api/tournaments/:id` | Delete tournament |

Example create body:

```json
{
  "name": "Summer Football Cup",
  "description": "Local football tournament",
  "startDate": "2026-05-01",
  "endDate": "2026-05-15",
  "sportType": "Football",
  "organizerId": "user_id_here"
}
```

---

## Team Service

Base URL:

```text
http://localhost:7000
```

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/teams` | Register a team |
| GET | `/api/teams` | Get all teams |
| GET | `/api/teams/:id` | Get team by ID |
| GET | `/api/teams/tournament/:tournamentId` | Get teams by tournament |
| POST | `/api/teams/:id/players` | Add player to team |
| DELETE | `/api/teams/:id` | Delete team |

Example create body:

```json
{
  "teamName": "Lahore Tigers",
  "captainId": "captain_user_id",
  "players": [],
  "tournamentId": "tournament_id_here"
}
```

---

## Match Service

Base URL:

```text
http://localhost:8000
```

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/matches` | Schedule a match |
| GET | `/api/matches` | Get all matches |
| GET | `/api/matches/:id` | Get match by ID |
| GET | `/api/matches/tournament/:tournamentId` | Get matches by tournament |
| PUT | `/api/matches/:id/result` | Record match result |
| DELETE | `/api/matches/:id` | Delete match |

Example schedule body:

```json
{
  "tournamentId": "tournament_id_here",
  "teamAId": "team_a_id",
  "teamBId": "team_b_id",
  "date": "2026-05-05T15:00:00.000Z",
  "venue": "Main Ground"
}
```

Example result body:

```json
{
  "teamAScore": 2,
  "teamBScore": 1
}
```

---

## Standings Service

Base URL:

```text
http://localhost:9000
```

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/standings/:tournamentId` | Get standings by tournament |
| POST | `/api/standings` | Create or update standing |
| DELETE | `/api/standings/:id` | Delete standing |

Example create/update body:

```json
{
  "tournamentId": "tournament_id_here",
  "teamId": "team_id_here",
  "played": 1,
  "won": 1,
  "lost": 0,
  "drawn": 0,
  "points": 3
}
```

---

## Announcement Service

Base URL:

```text
http://localhost:10000
```

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/announcements` | Create announcement |
| GET | `/api/announcements` | Get all announcements |
| GET | `/api/announcements/:id` | Get announcement by ID |
| GET | `/api/announcements/tournament/:tournamentId` | Get announcements by tournament |
| DELETE | `/api/announcements/:id` | Delete announcement |

Example create body:

```json
{
  "title": "Tournament Starting Soon",
  "content": "The tournament will start on May 1.",
  "authorId": "user_id_here",
  "tournamentId": "tournament_id_here"
}
```

---

# Testing with Postman

You can test all APIs using Postman.

Recommended workflow:

1. Register a user.
2. Login and copy the JWT token.
3. Create a tournament.
4. Register teams for the tournament.
5. Schedule matches.
6. Record match results.
7. Create or view standings.
8. Create announcements.

---

# Future Improvements

Planned features:

- API Gateway
- Centralized authentication middleware
- Role-based route protection
- Automatic standings calculation from match results
- Real-time updates using WebSockets
- Better input validation
- Unit and integration tests
- CI/CD deployment pipeline
- Cloud deployment support

---

# Conclusion

The **Sports Tournament Management System Backend** provides a structured and scalable foundation for managing sports tournaments through a microservices-based architecture.

By separating the system into independent services such as authentication, tournaments, teams, matches, standings, and announcements, the backend becomes easier to maintain, test, extend, and deploy. Each service has a clear responsibility and can be improved independently without affecting the entire system.

This project demonstrates how modern backend technologies such as **Node.js**, **Express.js**, **MongoDB**, **JWT**, and **Docker** can be combined to build a reliable REST API system suitable for real-world tournament management platforms.

Future improvements such as an API Gateway, real-time updates, automatic standings calculation, role-based route protection, and cloud deployment can further enhance the system and make it production-ready.

Overall, this backend is a strong starting point for building a complete sports tournament management platform for web, mobile, or enterprise use.