-- create users table
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT NOT NULL UNIQUE,
    username TEXT NOT NULL UNIQUE,
    institusi TEXT NOT NULL,
    password_hash TEXT NOT NULL,
    role TEXT NOT NULL CHECK (role IN ('admin', 'user'))
);

-- create users_progress table
CREATE TABLE IF NOT EXISTS users_progress (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  stage_id INTEGER NOT NULL,
  no_of_missions INTEGER NOT NULL,
  last_attempted TEXT,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- create missions_attempted table
CREATE TABLE IF NOT EXISTS missions_attempted (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  users_progress_id INTEGER NOT NULL,
  mission_id INTEGER NO NULL,
  attempt INTEGER NOT NULL DEFAULT 0,
  last_attempted TEXT,
  FOREIGN KEY (users_progress_id) REFERENCES users_progress(id) ON DELETE CASCADE
);

-- create mission_attempted_scores
CREATE TABLE IF NOT EXISTS mission_attempted_scores (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  missions_attempted_id INTEGER NOT NULL,
  score INTEGER NOT NULL DEFAULT 0,
  FOREIGN KEY (missions_attempted_id) REFERENCES missions_attempted(id) ON DELETE CASCADE
);

-- create banned_tokens table
CREATE TABLE IF NOT EXISTS banned_tokens (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  token TEXT NOT NULL,
  expires_at TEXT NOT NULL
);

-- one account to rule them all (i.e admin)
-- username: admin
-- password: 12345678
INSERT OR IGNORE INTO users (id, email, username, institusi, password_hash, role)
VALUES(1, 'admin@sql-adventure.research-media.web.id', 'admin', 'Universitas Lambung Mangkurat', '$2a$12$LjDaqRkKlRRWWXzsGZJxFOmcdufcy8CB4fsevG9Hkb6zatDT0RyeK', 'admin');
