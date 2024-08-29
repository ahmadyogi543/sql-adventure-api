INSERT INTO stages (title, introduction, closing, db_name)
VALUES (
  'Menjelajahi Pulau Kembang', 
  'Selamat datang di Pulau Kembang! ...', 
  'Selamat! Kamu telah menyelesaikan semua misi di stage ini...',
  'stage1.db'
),
(
  'Menjelajahi Ngawi Island', 
  'Selamat datang di Ngawi! ...', 
  'Selamat! Kamu telah menyelesaikan semua misi di stage ini...',
  'stage2.db'
);

INSERT INTO missions (stage_id, title)
VALUES 
(1, 'Menampilkan Biaya Kunjungan'),
(1, 'Mencari Hewan Indah'),
(2, 'Memusuhi Ambatakam'),
(2, 'Membantu Rusdi Ngawi');

INSERT INTO dialogs (mission_id, type, text)
VALUES
(1, 'narration', 'Mengetahui biaya kunjungan sangat penting agar kamu dapat memasuki Pulau Kembang.'),
(1, 'narration', 'Mari kita lihat biaya yang dikenakan untuk mengunjungi Pulau Kembang.'),
(1, 'instruction', 'Ketikan query untuk menampilkan informasi tentang biaya kunjungan ...'),
(1, 'narration', 'Bagus! Kamu sekarang tahu biaya yang dikenakan untuk mengunjungi Pulau Kembang.'),

(2, 'narration', 'Mengetahui biaya kunjungan sangat penting agar kamu dapat memasuki Pulau Kembang.'),
(2, 'narration', 'Mari kita lihat biaya yang dikenakan untuk mengunjungi Pulau Kembang.'),
(2, 'instruction', 'Ketikan query untuk menampilkan informasi tentang biaya kunjungan ...'),
(2, 'narration', 'Bagus! Kamu sekarang tahu biaya yang dikenakan untuk mengunjungi Pulau Kembang.'),

(3, 'narration', 'Mengetahui biaya kunjungan sangat penting agar kamu dapat memasuki Pulau Kembang.'),
(3, 'narration', 'Mari kita lihat biaya yang dikenakan untuk mengunjungi Pulau Kembang.'),
(3, 'instruction', 'Ketikan query untuk menampilkan informasi tentang biaya kunjungan ...'),
(3, 'narration', 'Bagus! Kamu sekarang tahu biaya yang dikenakan untuk mengunjungi Pulau Kembang.'),

(4, 'narration', 'Mengetahui biaya kunjungan sangat penting agar kamu dapat memasuki Pulau Kembang.'),
(4, 'narration', 'Mari kita lihat biaya yang dikenakan untuk mengunjungi Pulau Kembang.'),
(4, 'instruction', 'Ketikan query untuk menampilkan informasi tentang biaya kunjungan ...'),
(4, 'narration', 'Bagus! Kamu sekarang tahu biaya yang dikenakan untuk mengunjungi Pulau Kembang.');

INSERT INTO queries (dialog_id, type, text, validation)
VALUES
(3, 'read', 'SELECT * FROM biaya', null),
(7, 'read', 'SELECT * FROM hewan', null),
(11, 'write', 'UPDATE FROM hewan SET id = 1 WHERE id = 1', 'SELECT * FROM hewan'),
(15, 'write', 'DELET FROM hewan WHERE id = 1', 'SELECT * FROM pisang');
