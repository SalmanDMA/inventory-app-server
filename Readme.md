# ManStock - Inventory Management ( SERVER )

ManStock adalah aplikasi manajemen inventory yang bertujuan untuk mengelola produk yang tersedia di berbagai gudang dengan fitur CRUD untuk users, roles, warehouses, products (dengan categories dan brands), serta manajemen customers dan suppliers. Server ini dibangun menggunakan Node.js, Express.js, dan Prisma sebagai ORM, serta dilengkapi dengan autentikasi berbasis JWT, validasi input, dan berbagai fitur keamanan lainnya.

## Fitur Utama

- **CRUD Operations:** Users, Roles, Warehouses, Products (beserta Categories & Brands), Customers, dan Suppliers.
- **Authentication:** Menggunakan email atau username tanpa notifikasi email.
- **Authorization:** Hak akses berdasarkan role pengguna dengan kontrol module/fitur sesuai role.
- **Product Stock Management:** Fitur untuk manajemen produk di berbagai gudang dan pelacakan barang masuk/keluar.
- **Report Generation:** Laporan terkait stock, produk masuk/keluar.
- **Security:** Dilengkapi dengan proteksi terhadap brute-force attacks melalui rate-limiting, validasi input, dan penggunaan helmet untuk headers keamanan.

## Persyaratan Sistem

- **Node.js:** v18.0.0 atau lebih baru
- **npm:** v9.0.0 atau lebih baru
- **PostgreSQL** (atau database lain yang didukung oleh Prisma)

## Instalasi

Ikuti langkah-langkah di bawah ini untuk menjalankan proyek secara lokal.

### 1. Clone repository:

```bash
git clone <repository-url>
cd server
```

### 2. Install dependencies:

```bash
npm install
```

### 3. Buat file .env.local dari template .env.example dan sesuaikan dengan konfigurasi lingkungan Anda:

```bash
cp .env.example .env.local
```

Anda juga dapat membuat file .env.staging dan .env.production jika diperlukan.

### 4. Setup Prisma dan migrasi database:

```bash
npm run migrate
```

### 5. Jalankan server:

```bash
npm run dev
```

## Teknologi yang Digunakan

- **Express.js:** Framework backend untuk Node.js.
- **Prisma:** ORM untuk database.
- **JSON Web Token (JWT):** Untuk autentikasi dan autorisasi.
- **bcrypt:** Untuk hashing password.
- **Cloudinary:** Untuk penyimpanan dan pengelolaan file gambar.
- **Winston & Morgan:** Untuk logging.
- **Helmet:** Untuk proteksi header keamanan.
- **Express-Rate-Limit:** Untuk membatasi jumlah request yang masuk (rate limiting).
- **Express Validator:** Untuk validasi input data.

ManStock adalah aplikasi sederhana namun lengkap untuk mengelola inventaris barang dalam berbagai warehouse dan melacak supplier serta customer dengan mudah. Selamat menggunakan!
