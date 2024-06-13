proyek

- no ts
- with eslint
- with tailwindcss
- with src
- with app router

node v20.11.1

clone to local proyek

- npm install, to install node_modules

ingat

## note

untuk menangkap id dengan route.js function GET(param) = ini memang tanpa tanda kurung meski sudah pale dynamic route [id]
tapi kalo nangkap id dengan page.js function DetailAcara({id}) = nah itu baru harus pake kururng meski sudah pale dynamic route [id]

## fetch

- pada body fetch jangan ngirim data kosong
- harus number atau text type data js nanti bakal eror atau gagal fetch
- fetch tidak bisa jalan di 'use server' harus di 'use client'
- dalam body fetch harus tupe
- PERTING perhatikan alur variable jangan asal copas nanti eror makin pusing
- PENTING perhatikan data yang ingin di input kalo shecma table db nya unique harus ada varidasi dulu atau jangan masukan data berulang nanti eror makin pusing pula

## 1 action 2 query / lebih

- jika ingin delete maka delete dulu data di tabel induk baru tabel anaknya
- misal delte acara dulu baru delete kontak dan deskripsi

# tentang FormData

- kalo mau ambil form data memang harus pake get
- kalo pake log + form data memang bakal kosong

  const formData = new FormData();
  formData.append('banner', data.banner);

  console.log(formData.get('banner')); // logs the value of data.banner
  console.log(formData.get('nama_narahubung')); // logs the value of data.nama_narahubung

// body: JSON.stringify({
// banner: data.banner,
// nama_narahubung: data.nama_narahubung,
// email: data.email,
// no_ponsel: data.no_ponsel,
// deskripsi_acara: data.deskripsi_acara,
// syarat_ketentuan: data.syarat_ketentuan,
// nama_event: data.nama_event,
// tanggal_acara: new Date(tanggalA), // Tanggal dengan format baru
// waktu_acara: new Date(tanggalA),
// lokasi: data.lokasi,
// })
