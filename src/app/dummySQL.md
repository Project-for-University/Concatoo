# dummy data

- masuk ke php myadmin klik db mydb/ db kalian
- pada bagian menu bar di atas ada tulisan SQL --PENTING-- bukan klik tabel terus klik SQL
- lalu masukan kode sql di bawah ini dan klik go di kanan bawah
- pada tabel tiket masih eror

-- Insert into User table
INSERT INTO User (id_user, username, phonenumber, email, password, role, createdAt, updatedAt) VALUES
('cuid1', 'user1', '1234567890', 'user1@example.com', 'password123', 'SELLER', NOW(), NOW()),
('cuid2', 'user2', '0987654321', 'user2@example.com', 'password123', 'CUSTOMER', NOW(), NOW()),
('cuid3', 'user3', '1112223333', 'user3@example.com', 'password123', 'SELLER', NOW(), NOW()),
('cuid4', 'user4', '4445556666', 'user4@example.com', 'password123', 'CUSTOMER', NOW(), NOW()),
('cuid5', 'user5', '7778889999', 'user5@example.com', 'password123', 'SELLER', NOW(), NOW()),
('cuid6', 'user6', '2223334444', 'user6@example.com', 'password123', 'CUSTOMER', NOW(), NOW()),
('cuid7', 'user7', '5556667777', 'user7@example.com', 'password123', 'SELLER', NOW(), NOW()),
('cuid8', 'user8', '8889990000', 'user8@example.com', 'password123', 'CUSTOMER', NOW(), NOW()),
('cuid9', 'user9', '3334445555', 'user9@example.com', 'password123', 'SELLER', NOW(), NOW()),
('cuid10', 'user10', '6667778888', 'user10@example.com', 'password123', 'CUSTOMER', NOW(), NOW());

-- Insert into Kontak table
INSERT INTO Kontak (id_kontak, nama_narahubung, email, no_ponsel, createdAt, updatedAt) VALUES
('kontak1', 'John Doe', 'john.doe@example.com', '1234567890', NOW(), NOW()),
('kontak2', 'Jane Doe', 'jane.doe@example.com', '0987654321', NOW(), NOW()),
('kontak3', 'Alice Smith', 'alice.smith@example.com', '1112223333', NOW(), NOW()),
('kontak4', 'Bob Johnson', 'bob.johnson@example.com', '4445556666', NOW(), NOW()),
('kontak5', 'Charlie Brown', 'charlie.brown@example.com', '7778889999', NOW(), NOW()),
('kontak6', 'Dave Wilson', 'dave.wilson@example.com', '2223334444', NOW(), NOW()),
('kontak7', 'Eva Green', 'eva.green@example.com', '5556667777', NOW(), NOW()),
('kontak8', 'Frank White', 'frank.white@example.com', '8889990000', NOW(), NOW()),
('kontak9', 'Grace Lee', 'grace.lee@example.com', '3334445555', NOW(), NOW()),
('kontak10', 'Hank Miller', 'hank.miller@example.com', '6667778888', NOW(), NOW());

-- Insert into Deskrpsi table
INSERT INTO Deskrpsi (id_deskripsi, deskripsi_acara, syarat_ketentuan, createdAt, updatedAt) VALUES
('deskripsi1', 'Event 1 description.', 'Terms and conditions 1.', NOW(), NOW()),
('deskripsi2', 'Event 2 description.', 'Terms and conditions 2.', NOW(), NOW()),
('deskripsi3', 'Event 3 description.', 'Terms and conditions 3.', NOW(), NOW()),
('deskripsi4', 'Event 4 description.', 'Terms and conditions 4.', NOW(), NOW()),
('deskripsi5', 'Event 5 description.', 'Terms and conditions 5.', NOW(), NOW()),
('deskripsi6', 'Event 6 description.', 'Terms and conditions 6.', NOW(), NOW()),
('deskripsi7', 'Event 7 description.', 'Terms and conditions 7.', NOW(), NOW()),
('deskripsi8', 'Event 8 description.', 'Terms and conditions 8.', NOW(), NOW()),
('deskripsi9', 'Event 9 description.', 'Terms and conditions 9.', NOW(), NOW()),
('deskripsi10', 'Event 10 description.', 'Terms and conditions 10.', NOW(), NOW());

-- Insert into Acara table
INSERT INTO Acara (id_acara, nama_event, banner, tanggal_acara, waktu_acara, lokasi, id_kontak, id_deskripsi, id_user, createdAt, updatedAt) VALUES
('acara1', 'Event 1', 'banner1.jpg', '2024-06-01', '10:00:00', 'Location 1', 'kontak1', 'deskripsi1', 'cuid1', NOW(), NOW()),
('acara2', 'Event 2', 'banner2.jpg', '2024-07-01', '11:00:00', 'Location 2', 'kontak2', 'deskripsi2', 'cuid2', NOW(), NOW()),
('acara3', 'Event 3', 'banner3.jpg', '2024-08-01', '12:00:00', 'Location 3', 'kontak3', 'deskripsi3', 'cuid3', NOW(), NOW()),
('acara4', 'Event 4', 'banner4.jpg', '2024-09-01', '13:00:00', 'Location 4', 'kontak4', 'deskripsi4', 'cuid4', NOW(), NOW()),
('acara5', 'Event 5', 'banner5.jpg', '2024-10-01', '14:00:00', 'Location 5', 'kontak5', 'deskripsi5', 'cuid5', NOW(), NOW()),
('acara6', 'Event 6', 'banner6.jpg', '2024-11-01', '15:00:00', 'Location 6', 'kontak6', 'deskripsi6', 'cuid6', NOW(), NOW()),
('acara7', 'Event 7', 'banner7.jpg', '2024-12-01', '16:00:00', 'Location 7', 'kontak7', 'deskripsi7', 'cuid7', NOW(), NOW()),
('acara8', 'Event 8', 'banner8.jpg', '2025-01-01', '17:00:00', 'Location 8', 'kontak8', 'deskripsi8', 'cuid8', NOW(), NOW()),
('acara9', 'Event 9', 'banner9.jpg', '2025-02-01', '18:00:00', 'Location 9', 'kontak9', 'deskripsi9', 'cuid9', NOW(), NOW()),
('acara10', 'Event 10', 'banner10.jpg', '2025-03-01', '19:00:00', 'Location 10', 'kontak10', 'deskripsi10', 'cuid10', NOW(), NOW());

-- Insert into Tiket table
INSERT INTO Tiket (id_tiket, nama_tiket, jumlah_tiket, harga, deskripsi_tiket, tanggal_mulai_penjualan, waktu_penjualan, tanggal_akhir_penjualan, waktu_akhir_penjualan, id_acara, createdAt, updatedAt) VALUES
('tiket1', 'Ticket 1', '100', 50000, 'Ticket 1 description.', '2024-05-01', '09:00:00', '2024-05-31', '18:00:00', 'acara1', NOW(), NOW()),
('tiket2', 'Ticket 2', '150', 60000, 'Ticket 2 description.', '2024-06-01', '10:00:00', '2024-06-30', '19:00:00', 'acara2', NOW(), NOW()),
('tiket3', 'Ticket 3', '200', 70000, 'Ticket 3 description.', '2024-07-01', '11:00:00', '2024-07-31', '20:00:00', 'acara3', NOW(), NOW()),
('tiket4', 'Ticket 4', '250', 80000, 'Ticket 4 description.', '2024-08-01', '12:00:00', '2024-08-31', '21:00:00', 'acara4', NOW(), NOW()),
('tiket5', 'Ticket 5', '300', 90000, 'Ticket 5 description.', '2024-09-01', '13:00:00', '2024-09-30', '22:00:00', 'acara5', NOW(), NOW()),
('tiket6', 'Ticket 6', '350', 100000, 'Ticket 6 description.', '2024-10-01', '14:00:00', '2024-10-31', '23:00:00', 'acara6', NOW(), NOW()),
('tiket7', 'Ticket 7', '400', 110000, 'Ticket 7 description.', '2024-11-01', '15:00:00', '2024-11-30', '00:00:00', 'acara7', NOW(), NOW()),
('tiket8', 'Ticket 8', '450', 120000, 'Ticket 8 description.', '2024-12-01', '16:00:00', '2024-12-31', '01:00:00', 'acara8', NOW(), NOW()),
('tiket9', 'Ticket 9', '500', 130000, 'Ticket 9 description.', '2025-01-01', '17:00:00', '2025-01-31', '02:00:00', 'acara9', NOW(), NOW()),
('tiket10', 'Ticket 10', '550', 140000, 'Ticket 10 description.', '2025-02-01', '18:00:00', '2025-02-28', '03:00:00', 'acara10', NOW(), NOW());
