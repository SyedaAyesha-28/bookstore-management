# 📚 Bookstore Management System — REST API

> A production-ready REST API for bookstore management with JWT authentication, built using Java Spring Boot and MySQL.

📁 Built by [Syeda Ayesha](https://github.com/syedaayesha-28)

---

## 🎯 Problem Statement

Physical and online bookstores need a secure, scalable backend to manage inventory, process orders, and handle user accounts. This project delivers a fully functional REST API with role-based access and JWT security.

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Language | Java 17 |
| Framework | Spring Boot 3.x |
| Database | MySQL 8 |
| Authentication | JWT (JSON Web Tokens) |
| API Style | RESTful |
| Build Tool | Maven |

## 🏗️ Architecture

```
Client (Postman / Frontend)
        ↓
   REST API Layer (Spring Boot Controllers)
        ↓
   JWT Auth Filter (Security Layer)
        ↓
   Service Layer (Business Logic)
        ↓
   Repository Layer (Spring Data JPA)
        ↓
   MySQL Database
```

## 📋 API Endpoints

### Auth
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login → returns JWT token |

### Books
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/books` | Get all books |
| GET | `/api/books/{id}` | Get book by ID |
| POST | `/api/books` | Add new book (Admin) |
| PUT | `/api/books/{id}` | Update book (Admin) |
| DELETE | `/api/books/{id}` | Delete book (Admin) |

### Orders
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/orders` | Place order |
| GET | `/api/orders/user/{userId}` | Get user's orders |
| GET | `/api/orders` | Get all orders (Admin) |

## 📁 Folder Structure

```
bookstore-api/
├── src/main/java/com/bookstore/
│   ├── controller/
│   │   ├── AuthController.java
│   │   ├── BookController.java
│   │   └── OrderController.java
│   ├── model/
│   │   ├── Book.java
│   │   ├── Order.java
│   │   └── User.java
│   ├── repository/
│   ├── service/
│   ├── security/
│   │   └── JwtFilter.java
│   └── BookstoreApplication.java
├── src/main/resources/
│   └── application.properties
├── pom.xml
└── README.md
```

## 🚀 How to Run

### Prerequisites
- Java 17+
- MySQL 8+
- Maven

```bash
git clone https://github.com/syedaayesha-28/bookstore-api
cd bookstore-api

# Configure DB in src/main/resources/application.properties
# spring.datasource.url=jdbc:mysql://localhost:3306/bookstore_db
# spring.datasource.username=root
# spring.datasource.password=yourpassword

mvn spring-boot:run
```

API runs at `http://localhost:8080`

### Test with curl

```bash
# Register
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"ayesha","password":"pass123","role":"USER"}'

# Login → get token
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"ayesha","password":"pass123"}'

# Get all books (with token)
curl http://localhost:8080/api/books \
  -H "Authorization: Bearer <your_jwt_token>"
```

## 🔑 Key Features

- **JWT authentication** — stateless, secure token-based auth
- **Role-based access** — USER vs ADMIN permissions
- **Full CRUD** — create, read, update, delete for books, orders, users
- **100+ records** managed efficiently via JPA/Hibernate
- **Clean layered architecture** — Controller → Service → Repository

## 🔗 Skills Demonstrated

- Java Spring Boot REST API development
- JWT security implementation
- MySQL database design and JPA/Hibernate ORM
- RESTful API design principles
- Backend architecture (layered pattern)
