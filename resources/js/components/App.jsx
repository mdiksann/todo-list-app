import React, { useState, useEffect } from "react";
import axios from "axios";

// Ganti base URL sesuai dengan endpoint API Laravel Anda
const API_URL = "/api";

/**
 * Komponen utama aplikasi To-Do List.
 * Mengambil dan menampilkan daftar tugas dari API Laravel.
 */
function App() {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTasks = async () => {
            setLoading(true);
            setError(null);
            try {
                // Fetch tasks from the API
                const response = await axios.get(`${API_URL}/tasks`);

                // --- PERBAIKAN UTAMA ---
                // Mengakses properti 'data' dari response.data
                // karena API Laravel mengembalikan { message: ..., data: [...] }
                if (response.data && Array.isArray(response.data.data)) {
                    setTasks(response.data.data);
                } else {
                    // Handle jika data yang dikembalikan bukan array
                    setTasks([]);
                    console.warn(
                        "API response data is not an array:",
                        response.data
                    );
                }
            } catch (err) {
                console.error("Error fetching tasks:", err);
                setError(
                    "Gagal memuat tugas. Pastikan server Laravel berjalan."
                );
            } finally {
                setLoading(false);
            }
        };
        fetchTasks();
    }, []);

    const getTaskStatusClass = (isCompleted) => {
        return isCompleted
            ? "bg-green-100 text-green-700 border-green-300"
            : "bg-yellow-100 text-yellow-700 border-yellow-300";
    };

    return (
        // Menggunakan layout responsive Tailwind CSS
        <div className="min-h-screen bg-gray-50 flex items-start justify-center p-4 sm:p-8 font-inter">
            <div className="w-full max-w-2xl bg-white shadow-xl rounded-xl p-6 sm:p-8">
                <header className="mb-6 border-b pb-4">
                    <h1 className="text-3xl font-bold text-gray-800">
                        Personal To-Do List
                    </h1>
                    <p className="text-sm text-gray-500">
                        Integrasi React Frontend dengan Laravel API
                    </p>
                </header>

                {/* --- Konten Utama --- */}
                {loading && (
                    <div className="p-4 bg-blue-50 text-blue-700 rounded-lg border border-blue-200">
                        Memuat tugas dari database...
                    </div>
                )}

                {error && (
                    <div className="p-4 bg-red-100 text-red-700 rounded-lg border border-red-300">
                        <p className="font-medium">Error:</p>
                        <p>{error}</p>
                    </div>
                )}

                {!loading && !error && (
                    <section>
                        <h2 className="text-xl font-semibold text-gray-700 mb-4">
                            Daftar Tugas ({tasks.length})
                        </h2>

                        {tasks.length === 0 ? (
                            <div className="p-6 text-center bg-gray-50 rounded-lg border border-dashed border-gray-300">
                                <p className="text-gray-500">
                                    Tidak ada tugas ditemukan. Silakan tambahkan
                                    satu melalui API!
                                </p>
                            </div>
                        ) : (
                            <ul className="space-y-3">
                                {tasks.map((task) => (
                                    <li
                                        key={task.id}
                                        className="p-4 rounded-lg shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center border"
                                        // Menggunakan properti is_completed untuk styling dinamis
                                        style={{ transition: "all 0.3s ease" }}
                                    >
                                        <div className="flex-1 min-w-0">
                                            <p
                                                className={`text-lg font-medium truncate ${
                                                    task.is_completed
                                                        ? "line-through text-gray-500"
                                                        : "text-gray-800"
                                                }`}
                                            >
                                                {task.title}
                                            </p>
                                            {task.description && (
                                                <p className="text-sm text-gray-500 mt-1">
                                                    {task.description}
                                                </p>
                                            )}
                                        </div>

                                        <div
                                            className={`mt-2 sm:mt-0 sm:ml-4 text-xs font-semibold px-3 py-1 rounded-full ${getTaskStatusClass(
                                                task.is_completed
                                            )}`}
                                        >
                                            {task.is_completed
                                                ? "Selesai"
                                                : "Tertunda"}
                                        </div>

                                        {/* // Catatan: Properti 'category' dan 'priority' 
                                            // yang ada di kode awal Anda mungkin belum ada di API 
                                            // (Karena kita baru implementasi kolom dasar).
                                            // Saya hapus bagian ini untuk menghindari error undefined.
                                            // Jika Anda ingin menggunakannya, pastikan API menyediakan relasi tersebut.
                                        */}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </section>
                )}
            </div>
        </div>
    );
}

export default App;
