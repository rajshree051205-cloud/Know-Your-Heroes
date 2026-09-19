# 🇮🇳 Know Your Heroes

**A living tribute to the soldiers of the Indian Armed Forces — their wars, their sacrifices, and the stories their families carry.**

Know Your Heroes is a full-stack web memorial that walks visitors through India's major conflicts since 1947, showcases the individual soldiers who received gallantry awards in each, and lets families submit personal tributes to loved ones who never returned — stored in a real database and reviewed before publishing.

---

## ✨ Features

- **Interactive War Timeline** — a 3D coverflow of every major Indian conflict from the 1947 Kashmir War to the 2020 Galwan Valley clash, with dates, statistics, and embedded documentaries
- **Heroes of Each War** — profiles of gallantry award recipients (Param Vir Chakra, Maha Vir Chakra, Vir Chakra) tied to the specific war they fought in
- **Major Operations Grid** — key military operations (Trident, Python, Balakot, and more) at a glance
- **Defence Today** — an animated breakdown of India's current armed forces composition
- **Share a Story — Memorial Wall** — a form where families can submit a tribute to a fallen soldier. Submissions are stored in MySQL and reviewed before appearing publicly, so every published story is a real, verified tribute
- **Fully responsive, animation-rich UI** with scroll-based reveals, parallax, and 3D tilt effects

---

## 🛠️ Tech Stack

| Layer        | Technology                          |
|--------------|--------------------------------------|
| Frontend     | HTML, CSS, Vanilla JavaScript        |
| Backend      | Node.js, Express.js                  |
| Database     | MySQL (via `mysql2`)                 |
| Environment  | dotenv for configuration             |

---

## 📁 Project Structure

```
Know Your Heroes/
├── index.html            # Main landing page — wars, operations, defence today
├── memoriam.html         # In Memoriam page
├── memoriam.js
├── Toll.html             # The Toll — casualty statistics page
├── Toll.js
├── script.js             # Core site logic + Share a Story (API-connected)
├── style.css
├── server.js             # Express backend + MySQL API
├── schema.sql            # Database schema (run once to set up MySQL)
├── package.json
├── .env.example          # Template for environment variables
├── .gitignore
├── LICENSE
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- MySQL server — either standalone or via [XAMPP](https://www.apachefriends.org/)/phpMyAdmin

### 1. Clone the repository

```bash
git clone https://github.com/rajshree051205-cloud/Know-Your-Heroes.git
cd Know-Your-Heroes
```

### 2. Set up the database

Start your MySQL server, then run the contents of `schema.sql` in phpMyAdmin, MySQL Workbench, or the MySQL CLI:

```bash
mysql -u root -p < schema.sql
```

This creates the `know_your_heroes` database and the `stories` table.

### 3. Configure environment variables

Copy the example file and fill in your own MySQL credentials:

```bash
cp .env.example .env
```

```dotenv
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=know_your_heroes
PORT=3000
```

> ⚠️ Never commit your real `.env` file — it's already excluded via `.gitignore`.

### 4. Install dependencies

```bash
npm install
```

### 5. Start the backend server

```bash
npm start
```

The API will be running at `http://localhost:3000`.

### 6. Open the site

Open `index.html` directly in your browser, or serve it with a tool like VS Code's **Live Server** extension for the best experience (some features rely on relative paths that work best behind a local server).

---

## 🔌 API Reference

| Method | Endpoint                   | Description                                      |
|--------|-----------------------------|---------------------------------------------------|
| GET    | `/api/health`               | Health check — confirms the server is running     |
| GET    | `/api/stories`              | Returns all **approved** memorial stories         |
| GET    | `/api/stories/:id`          | Returns a single approved story by ID             |
| POST   | `/api/stories`               | Submits a new story (defaults to unapproved)      |
| PATCH  | `/api/stories/:id/approve`  | Approves a story so it appears publicly           |

New submissions are saved with `is_approved = FALSE` by default. Review and approve them via phpMyAdmin (or the `/approve` endpoint) before they appear on the public Memorial Wall — this keeps the tribute wall genuine and free of spam.

---

## 🗺️ Roadmap

- [ ] Admin dashboard for approving stories (instead of using phpMyAdmin directly)
- [ ] Photo/video upload support for submitted tributes
- [ ] Search and filter stories by war, year, or region
- [ ] Email verification for story submissions

---

## 🤝 Contributing

Contributions, suggestions, and corrections (especially factual corrections about historical details) are welcome. Feel free to open an issue or submit a pull request.

## 📜 License

This project is licensed under the terms in [LICENSE](./LICENSE).

## 🙏 Acknowledgment

This project is dedicated to the soldiers of the Indian Armed Forces and the families who carry their memory forward. *Jai Hind.*
