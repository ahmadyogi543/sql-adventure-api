-- create users table
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    role TEXT NOT NULL CHECK (role IN ('admin', 'user'))
);

-- create progresses table
CREATE TABLE IF NOT EXISTS progresses (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  last_attempted TEXT,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- create attempted_missions
CREATE TABLE IF NOT EXISTS attempted_missions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  progresses_id INTEGER NOT NULL,
  attempt INTEGER NOT NULL DEFAULT 0,
  last_attempted TEXT NOT NULL,
  FOREIGN KEY (progresses_id) REFERENCES progresses(id) ON DELETE CASCADE
);

-- create attempted_mission_scores
CREATE TABLE IF NOT EXISTS aattempted_mission_scores (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  attempted_missions_id INTEGER NOT NULL,
  score INTEGER NOT NULL DEFAULT 0,
  FOREIGN KEY (attempted_missions_id) REFERENCES attempted_missions(id) ON DELETE CASCADE
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
INSERT OR IGNORE INTO users (id, username, password_hash, role)
VALUES(1, 'admin', '$2a$12$LjDaqRkKlRRWWXzsGZJxFOmcdufcy8CB4fsevG9Hkb6zatDT0RyeK', 'admin');
