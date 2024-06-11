# ingat

tabel acara itu di butuhkan di tabel deskripsi, kontak,tiket

jadi kalo acara ,kontak,dekripsi aja di hapus. prisma transactionnya bakal gagal

karena id acara itu di butuhkan sama tiket

jadi jangan lupa data di tabel tiketnya juga di hapus

gagal delete kemungkinan karena salah berelasi tabel

# untk delete prisma itu harus delete induknya baru anak anaknya

itupun jika tabelnya berelasi
