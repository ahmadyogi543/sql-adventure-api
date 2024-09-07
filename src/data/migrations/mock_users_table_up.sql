-- mock users table
INSERT INTO users (id, name, email, institution, password_hash, role) VALUES
(1, 'Ahmad Yogi', 'ahmady@sql-adventure.research.web.id', 'Universitas Lambung Mangkurat', '$2a$12$wpw4m0f6G3oz8ZuyAkgLT.cYj8C8T601PUlo1taeLY5VKLn9dHVQK', 'user'),
(2, 'Mutiara Arasti Hasibuan', 'muthsb@sql-adventure.research.web.id', 'Universitas Lambung Mangkurat', '$2a$12$wpw4m0f6G3oz8ZuyAkgLT.cYj8C8T601PUlo1taeLY5VKLn9dHVQK', 'user');

-- mock users_progress table
INSERT INTO users_progress (id, user_id, stage_id, no_of_missions, score, last_attempted)
VALUES
  (1, 1, 1, 5, 100, '2024-08-31 10:30:00'),
  (2, 1, 2, 5, 50, '2024-08-31 10:30:00'),

  (3, 2, 1, 5, 40, '2024-10-31 10:30:00'),
  (4, 2, 2, 5, 80, '2024-10-31 10:30:00');

-- mock missions_attempted table
INSERT INTO missions_attempted (id, users_progress_id, mission_id, mission_name, attempt, last_attempted)
VALUES
  (1, 1, 1, 'Menampilkan Biaya Kunjungan', 2, '2024-08-25 10:30:00'),
  (2, 1, 2, 'Menampilkan Jenis Petugas', 2, '2024-09-25 10:30:00'),

  (3, 2, 1, 'Membagi Populasi Dua Hewan', 2, '2024-10-25 10:30:00'),
  (4, 2, 2, 'Menemukan Flora Langka', 2, '2024-11-25 10:30:00'),

  (5, 3, 1, 'Menampilkan Biaya Kunjungan', 2, '2024-11-25 10:30:00'),
  (6, 3, 2, 'Menampilkan Jenis Petugas', 2, '2024-12-25 10:30:00'),

  (7, 4, 1, 'Membagi Populasi Dua Hewan', 3, '2024-01-25 10:30:00'),
  (8, 4, 2, 'Menemukan Flora Langka', 1, '2024-02-25 10:30:00'),
  (9, 4, 3, 'Menghitung Rata-Rata Jumlah Hewan', 3, '2024-02-25 10:30:00');
