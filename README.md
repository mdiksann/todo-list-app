# Todo List Application

Aplikasi manajemen tugas (Todo List) yang dibangun menggunakan Laravel 9 untuk backend dan React untuk frontend. Aplikasi ini memungkinkan pengguna untuk mengelola tugas dengan fitur kategori, prioritas, dan tanggal jatuh tempo.

## Fitur Utama

-   **Manajemen Tugas**: Buat, edit, hapus, dan tandai tugas sebagai selesai
-   **Kategori**: Organisasi tugas berdasarkan kategori dengan kode warna
-   **Prioritas**: Tetapkan tingkat prioritas (Low, Medium, High) untuk setiap tugas
-   **Tanggal Jatuh Tempo**: Atur deadline untuk tugas-tugas penting
-   **RESTful API**: API endpoint yang terstruktur dengan baik
-   **Frontend React**: Antarmuka pengguna yang modern dan interaktif

## Teknologi yang Digunakan

### Backend

-   **Laravel 9.x** - Framework PHP
-   **PHP 8.0+** - Bahasa pemrograman
-   **MySQL/PostgreSQL** - Database
-   **Laravel Sanctum** - API authentication

### Frontend

-   **React 18.2** - Library JavaScript untuk UI
-   **Vite** - Build tool dan dev server
-   **Tailwind CSS** - CSS framework
-   **Axios** - HTTP client
-   **React Big Calendar** - Komponen kalender
-   **Moment.js** - Manipulasi tanggal dan waktu

## Persyaratan Sistem

-   PHP >= 8.0.2
-   Composer
-   Node.js & NPM
-   MySQL/PostgreSQL
-   Web server (Apache/Nginx)

## Instalasi

### 1. Clone Repository

```bash
git clone <repository-url>
cd todo-list
```

### 2. Install Dependencies Backend

```bash
composer install
```

### 3. Konfigurasi Environment

```bash
cp .env.example .env
php artisan key:generate
```

Edit file `.env` dan sesuaikan konfigurasi database:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=todo_list
DB_USERNAME=root
DB_PASSWORD=
```

### 4. Migrasi Database & Seeding

```bash
php artisan migrate
php artisan db:seed
```

### 5. Install Dependencies Frontend

```bash
npm install
```

### 6. Menjalankan Aplikasi

Jalankan Laravel development server:

```bash
php artisan serve
```

Di terminal terpisah, jalankan Vite dev server:

```bash
npm run dev
```

Aplikasi akan berjalan di `http://localhost:8000`

## Struktur Database

### Tabel Categories

-   `id` - Primary key
-   `name` - Nama kategori
-   `color_code` - Kode warna untuk kategori
-   `timestamps` - Created at & Updated at

### Tabel Tasks

-   `id` - Primary key
-   `category_id` - Foreign key ke tabel categories
-   `title` - Judul tugas
-   `description` - Deskripsi tugas (nullable)
-   `is_completed` - Status penyelesaian (boolean)
-   `priority` - Tingkat prioritas (Low, Medium, High)
-   `due_date` - Tanggal jatuh tempo (nullable)
-   `timestamps` - Created at & Updated at

## API Endpoints

### Tasks

-   `GET /api/tasks` - Mendapatkan semua tugas
-   `POST /api/tasks` - Membuat tugas baru
-   `GET /api/tasks/{id}` - Mendapatkan detail tugas
-   `PUT/PATCH /api/tasks/{id}` - Update tugas
-   `DELETE /api/tasks/{id}` - Hapus tugas

### Categories

-   `GET /api/categories` - Mendapatkan semua kategori
-   `POST /api/categories` - Membuat kategori baru
-   `GET /api/categories/{id}` - Mendapatkan detail kategori
-   `PUT/PATCH /api/categories/{id}` - Update kategori
-   `DELETE /api/categories/{id}` - Hapus kategori
-   `GET /api/categories/{id}/tasks` - Mendapatkan semua tugas dalam kategori

## Build untuk Production

### Build Frontend

```bash
npm run build
```

### Optimasi Laravel

```bash
php artisan config:cache
php artisan route:cache
php artisan view:cache
```



## Lisensi

Project ini dibuat untuk keperluan pembelajaran dan pengembangan. Silakan digunakan sesuai kebutuhan.

## Kontribusi

Kontribusi selalu diterima. Silakan buat pull request atau laporkan issue jika menemukan bug atau memiliki saran fitur baru.
