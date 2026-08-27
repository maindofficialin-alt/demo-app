# Enterprise Supply Chain Application Codebase

This repository contains the real multi-service implementation of the supply chain order lifecycle application, incorporating a Spring Boot backend, an Angular administration dashboard, and a React mobile retailer frontend.

---

## Repository Structure

```
├── backend-springboot/       # Java / Spring Boot Microservice
│   ├── pom.xml               # Maven configuration & dependency declarations
│   └── src/                  # Controllers, JPA repositories, Kafka configurations
│
├── frontend-angular/         # Angular Administration Panel
│   ├── package.json          # Node dependencies
│   └── src/                  # Gated components (Analytics, Fulfillment Board)
│
├── src/                      # React Mobile Web Frontend (Retailer App)
│   ├── App.tsx               # Order checkout & step-by-step notification tracker
│   └── index.css             # Shared Supply Chain UI styling sheet
│
├── docker-compose.yml        # PostgreSQL & Kafka container definitions
└── README.md                 # Setup & Execution guide
```

---

## Infrastructure Setup (PostgreSQL & Kafka)

Spin up the database and Kafka broker topics using Docker Compose:

```bash
docker-compose up -d
```

This will run:
- **PostgreSQL** on port `5432` (database: `supplychain_db`)
- **Apache Kafka** on port `9092` (Zookeeper on port `2181`)

---

## Running the Services

### 1. Spring Boot Backend
Navigate to the directory and run the application using Maven:

```bash
cd backend-springboot
mvn spring-boot:run
```

- Served at: `http://localhost:8080`
- Configured endpoints:
  - `POST /api/orders` (Gated: Role `RETAILER`)
  - `PUT /api/orders/{id}/status` (Gated: Roles `FRANCHISE` or `ADMIN`)
  - `GET /api/orders` (Gated: Role `ADMIN`)

### 2. Angular Administration Console
Navigate to the directory and serve the Angular SPA:

```bash
cd frontend-angular
npm install
npm run start
```

- Served at: `http://localhost:4200`
- Interacts with Spring Boot APIs passing OIDC JWT tokens for Role-Based Access Control (RBAC).

### 3. React Mobile App
Install dependencies and run the client dev server from the root workspace:

```bash
npm install
npm run dev
```

- Served at: `http://localhost:8082`
- Allows retailers to place orders, browse the catalog, and track status transitions in real-time.
