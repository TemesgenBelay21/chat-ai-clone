# 🤖 ChatGPT Clone (Full-Stack AI Chat Application)

[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-5.x-black?logo=express)](https://expressjs.com/)
[![React](https://img.shields.io/badge/React-18%2B-blue?logo=react)](https://react.dev/)
[![MySQL](https://img.shields.io/badge/MySQL-8.0%2B-4479A1?logo=mysql&logoColor=white)](https://www.mysql.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

A modern, full-stack AI Conversational Assistant application inspired by ChatGPT. Built with **React** on the frontend, **Node.js / Express** on the backend, and **MySQL** for structured conversation persistence.

---

## 📑 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Architecture](#-project-architecture)
- [Database Schema](#-database-schema)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Backend Setup](#backend-setup)
  - [Database Setup](#database-setup)
- [API Endpoints](#-api-endpoints)
- [Roadmap](#-roadmap)
- [Contributing](#-contributing)
- [License](#-license)

---

## ✨ Features

- **⚡ Fast & Lightweight Backend**: Express.js server utilizing connection pooling with `mysql2`.
- **💬 Conversation History**: Store and retrieve user & AI chat messages persistently.
- **📊 Token & Usage Tracking**: Data models designed to track token counts and interaction timestamps.
- **🔐 Secure Environment Config**: Dotenv-managed environment variable configuration.
- **🎨 Sleek React UI (In Progress)**: Interactive real-time chat interface mimicking modern AI assistants.

---

## 🛠 Tech Stack

### **Backend**
- **Node.js** - Runtime environment (ES Modules)
- **Express.js (v5)** - Fast, unopinionated REST API framework
- **MySQL2** - High-performance MySQL client with Promise & connection pooling support
- **dotenv** - Zero-dependency module for environment variable management

### **Frontend**
- **React.js** - Component-driven user interface
- **Vite / Modern Tooling** - Ultra-fast development and build environment
- **CSS / Modern UI Design** - Clean dark-mode layout with responsive design

### **Database**
- **MySQL 8.0+** - Relational database for conversations and token tracking

---

## 🏛 Project Architecture

```
chat-ai-clone/
├── Backend/
│   ├── db/
│   │   ├── db.config.js       # MySQL connection pool configuration
│   │   └── schema.sql         # SQL schema definitions for tables
│   ├── .env                   # Environment variables (ignored in Git)
│   ├── .env.example           # Example template for environment config
│   ├── .gitignore             # Backend-specific ignore rules
│   └── index.js               # Express server entry point & route definitions
├── .gitignore                 # Root gitignore
├── package.json               # Root dependencies & scripts
├── package-lock.json          # Dependency lockfile
└── README.md                  # Project documentation
```

---

## 🗄 Database Schema

The application uses MySQL to persist conversational data.

### `conversations` Table

```sql
CREATE TABLE IF NOT EXISTS conversations (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    role ENUM('user', 'assistant') NOT NULL,
    content TEXT NOT NULL,
    token_count INT UNSIGNED NOT NULL DEFAULT 0,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
```

| Field | Type | Description |
| :--- | :--- | :--- |
| `id` | `BIGINT UNSIGNED` | Unique identifier (Auto Increment PK) |
| `role` | `ENUM('user', 'assistant')` | Indicates message author (`user` or `assistant`) |
| `content` | `TEXT` | Actual message content / prompt |
| `token_count` | `INT UNSIGNED` | Count of tokens used for the message |
| `created_at` | `TIMESTAMP` | Automatic timestamp of message creation |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18.x or later recommended)
- **npm** or **yarn**
- **MySQL Server** (local or cloud instance)

---

### Backend Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/TemesgenBelay21/chat-ai-clone.git
   cd chat-ai-clone
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env` file in the `Backend/` directory based on `.env.example`:
   ```env
   PORT=3000
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_mysql_password
   DB_DATABASE=chat_ai_db
   ```

4. **Initialize the Database**:
   Log in to your MySQL terminal or client and run:
   ```sql
   CREATE DATABASE chat_ai_db;
   USE chat_ai_db;
   ```
   Execute the schema defined in [`Backend/db/schema.sql`](./Backend/db/schema.sql).

5. **Start the Backend Server**:
   ```bash
   node Backend/index.js
   # or with nodemon for live reload
   npx nodemon Backend/index.js
   ```

---

## 🔌 API Endpoints

| Method | Endpoint | Description | Status |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/chat/conversations` | Submit a new chat message / prompt | 🟡 Initialized |
| `GET` | `/api/chat/conversations` | Retrieve conversation history | 🟡 Initialized |

---

## 🗺 Roadmap

- [x] Project initialization & Express server structure
- [x] MySQL database connection pool & schema design
- [ ] LLM / OpenAI / Gemini API integration
- [ ] React frontend setup with chat bubble interface & Markdown rendering
- [ ] Streaming responses (Server-Sent Events / WebSockets)
- [ ] Multi-session chat support & sidebar management
- [ ] Authentication & user profiles (JWT / OAuth)

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page or submit a Pull Request.

1. Fork the project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

Distributed under the MIT License.
