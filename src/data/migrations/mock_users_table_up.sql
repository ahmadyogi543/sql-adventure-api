-- mock users table
INSERT INTO users (id, username, password_hash, role) VALUES
(2, 'ahmady', '$2a$12$wpw4m0f6G3oz8ZuyAkgLT.cYj8C8T601PUlo1taeLY5VKLn9dHVQK', 'user'),
(3, 'muthsb','$2a$12$wpw4m0f6G3oz8ZuyAkgLT.cYj8C8T601PUlo1taeLY5VKLn9dHVQK', 'user');

-- mock users_progress table
INSERT INTO users_progress (id, user_id, stage_id, no_of_missions, last_attempted)
VALUES
  (1, 2, 1, 5, '2024-08-31 10:30:00'),
  (2, 2, 2, 5, '2024-08-31 10:30:00'),

  (3, 3, 1, 5, '2024-10-31 10:30:00'),
  (4, 3, 2, 5, '2024-10-31 10:30:00');

-- mock missions_attempted table
INSERT INTO missions_attempted (id, users_progress_id, mission_id, attempt, last_attempted)
VALUES
  (1, 1, 1, 2, '2024-08-25 10:30:00'),
  (2, 1, 2, 2, '2024-09-25 10:30:00'),

  (3, 2, 1, 2, '2024-10-25 10:30:00'),
  (4, 2, 2, 2, '2024-11-25 10:30:00'),

  (5, 3, 1, 2, '2024-11-25 10:30:00'),
  (6, 3, 2, 2, '2024-12-25 10:30:00'),

  (7, 4, 1, 3, '2024-01-25 10:30:00'),
  (8, 4, 2, 1, '2024-02-25 10:30:00'),
  (9, 4, 3, 3, '2024-02-25 10:30:00');

-- mock mission_attempted_scores table
INSERT INTO mission_attempted_scores (id, missions_attempted_id, score)
VALUES
  (1, 1, 80),
  (2, 1, 100),

  (3, 2, 60),
  (4, 2, 40),

  (5, 3, 10),
  (6, 3, 50),

  (7, 4, 20),
  (8, 4, 80),

  (9, 5, 10),
  (10, 5, 50),

  (11, 6, 40),
  (12, 6, 60),

  (13, 7, 80),
  (14, 7, 100),
  (15, 7, 100),

  (16, 8, 20),

  (17, 9, 50),
  (18, 9, 100),
  (19, 9, 100);