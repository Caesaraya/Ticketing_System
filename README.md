Ticketing System

Ticketing System adalah aplikasi untuk membantu proses pelaporan, pengelolaan, dan pemantauan tiket IT dalam satu sistem.

Aplikasi ini memiliki beberapa jenis pengguna dengan hak akses yang berbeda, yaitu:

- **User**: membuat dan memantau tiket yang dilaporkan.
- **PM IT**: mengelola tiket, menentukan prioritas, melakukan assignment kepada Staff IT, serta memantau aktivitas sistem.
- **Staff IT**: melihat tiket yang diberikan kepadanya dan mengerjakan proses penyelesaian tiket.

Fitur Utama

1. Authentication
Sistem menyediakan fitur:

- Login
- Register
- Logout
- JWT Authentication
- Pemilihan role saat registrasi
- Pengaturan profile dan settings

2. Ticket Management

User dapat membuat tiket dengan informasi:

- Ticket type
- Judul
- Deskripsi
- Priority
- Module
- Attachment

Tiket memiliki alur status:

`OPEN → ASSIGNED → IN_PROGRESS → QA → DONE`

PM IT dapat:

- Melihat seluruh tiket
- Mengubah priority
- Melakukan assignment Staff IT
- Memantau status tiket

Staff IT dapat:

- Melihat tiket yang diberikan kepadanya
- Memproses tiket sesuai assignment
- Mengubah status tiket sesuai hak aksesnya

3. Ticket Detail

Halaman detail tiket menyediakan:

- Informasi tiket
- Status dan workflow
- Priority
- Reporter
- Assignee
- Description
- Attachment
- Comment

Comment menampilkan identitas pengguna yang memberikan komentar sehingga pengguna dapat mengetahui siapa yang memberikan setiap komentar.

4. Attachment

Tiket dapat memiliki attachment dengan dukungan:

- JPG
- PNG
- PDF
- DOCX
- Maksimal ukuran file 10 MB

Attachment dapat:

- Diupload saat membuat tiket
- Dilihat pada detail tiket
- Dipreview untuk tipe file yang didukung
- Didownload

5. Dashboard

Setiap role memiliki dashboard sesuai kebutuhannya.

User Dashboard

Menampilkan:

- Ringkasan tiket
- My Recent Tickets
- Recent Notifications
- Status tiket

PM Dashboard

Menampilkan:

- Total Tickets
- Open Tickets
- Assigned Tickets
- In Progress
- QA Review
- Done
- Distribusi status tiket
- Distribusi priority
- Tiket yang belum memiliki assignment
- Recent Activity

PM dapat langsung membuka detail tiket dari daftar tiket yang belum di-assign untuk melakukan assignment.

Staff Dashboard

Menampilkan:

- Ringkasan tiket dalam bentuk statistik
- My Assigned Tickets
- Tiket yang sedang ditangani oleh Staff tersebut

6. Activity History

Sistem menyediakan Activity Log untuk mencatat aktivitas pengguna, seperti:

- Membuat tiket
- Assignment tiket
- Perubahan status
- Perubahan priority
- Aktivitas lainnya yang dicatat oleh backend

Activity yang berkaitan dengan login dan logout tidak ditampilkan pada Recent Activity dashboard.

7. Notification

Sistem menyediakan notification untuk pengguna.

Pengguna dapat:

- Melihat notification terbaru
- Mengetahui notification yang sudah/belum dibaca
- Menandai notification sebagai sudah dibaca

8. Filtering & Pagination

Halaman ticket list mendukung:

- Filtering tiket
- Pagination
- Pencarian dan pemilahan data sesuai kebutuhan halaman

9. Role-Based Access

Fitur dan halaman disesuaikan dengan role pengguna sehingga User, PM IT, dan Staff IT memiliki akses yang berbeda sesuai tanggung jawabnya.

---

Tech Stack

Frontend

- React
- JavaScript
- Vite
- Tailwind CSS
- React Router
- Lucide React
- Sonner
- REST API
- JWT Authentication

Backend

- Python
- FastAPI
- REST API
- JWT Authentication
- Uvicorn

---

Cara Menjalankan Frontend

1. Clone Repository

```bash
git clone <repository-url>
cd <project-folder>
````

2. Masuk ke Folder Frontend

```bash
cd frontend
```

Sesuaikan nama folder jika struktur repository menggunakan nama folder yang berbeda.

3. Install Dependency

```bash
npm install
```

4. Pastikan Backend Berjalan

Frontend membutuhkan backend API untuk melakukan login, mengambil data tiket, membuat tiket, upload attachment, comment, notification, dan fitur lainnya.

Pastikan alamat API yang digunakan frontend mengarah ke backend yang sedang berjalan.

Default backend pada development:

```text
http://127.0.0.1:8000
```

5. Jalankan Frontend

```bash
npm run dev
```

Setelah berhasil dijalankan, Vite akan memberikan alamat development server, biasanya:

```text
http://localhost:5173
```

Buka alamat tersebut melalui browser.

Development

Untuk menjalankan aplikasi secara lokal, jalankan dua server:

Terminal 1 - Backend

```bash
cd backend
uvicorn main:app --reload
```

Terminal 2 - Frontend

```bash
cd frontend
npm install
npm run dev
```

Kemudian buka frontend melalui alamat yang diberikan oleh Vite.

---

Status Project

Fitur utama Ticketing System yang telah tersedia meliputi:

* Authentication
* Register
* Role-based access
* Ticket management
* Ticket detail
* Ticket assignment
* Ticket status workflow
* Ticket priority
* Attachment
* Comment
* Dashboard User
* Dashboard PM IT
* Dashboard Staff IT
* Activity Log
* Notification
* Filtering
* Pagination
