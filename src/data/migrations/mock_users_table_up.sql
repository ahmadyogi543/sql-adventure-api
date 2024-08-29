INSERT INTO users (username, email, password_hash, score) VALUES
('user1', 'user1@example.com', 'hashed_password_1', 100),
('user2', 'user2@example.com', 'hashed_password_2', 150),
('user3', 'user3@example.com', 'hashed_password_3', 120),
('user4', 'user4@example.com', 'hashed_password_4', 200),
('user5', 'user5@example.com', 'hashed_password_5', 300),
('user6', 'user6@example.com', 'hashed_password_6', 250),
('user7', 'user7@example.com', 'hashed_password_7', 180),
('user8', 'user8@example.com', 'hashed_password_8', 75),
('user9', 'user9@example.com', 'hashed_password_9', 90),
('user10', 'user10@example.com', 'hashed_password_10', 60);

INSERT INTO progresses (user_id, value) VALUES
(1, 10),
(1, 20),

(2, 15),
(2, 15),
(2, 15),

(3, 20),
(3, 20),
(3, 20),
(3, 20),

(4, 25),
(4, 25),

(5, 30),
(5, 30),
(5, 30),
(5, 30),
(5, 30),

(6, 35),
(6, 35),

(7, 40),
(7, 40),
(7, 40),
(7, 40),

(8, 45),
(8, 45),
(8, 45),

(9, 50),
(9, 50),
(9, 50),

(10, 55),
(10, 55);
