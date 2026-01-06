import React, { useState, useEffect } from "react";
import axios from "axios";
import TaskForm from "./TaskForm";
import TaskCalendar from "./TaskCalender";

const API_URL = "/api";

function App() {
    const [tasks, setTasks] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeView, setActiveView] = useState("today"); // 'today', 'calendar', 'upcoming', 'category'
    const [editingTask, setEditingTask] = useState(null); // Task yang sedang diedit
    const [selectedCategory, setSelectedCategory] = useState(null); // Kategori yang dipilih

    // Fungsi untuk mengubah status penyelesaian tugas
    const handleToggleComplete = async (taskToUpdate) => {
        try {
            const newStatus = !taskToUpdate.is_completed;
            const response = await axios.put(
                `${API_URL}/tasks/${taskToUpdate.id}`,
                {
                    is_completed: newStatus,
                }
            );

            const updatedTask = response.data.data;

            setTasks((prevTasks) =>
                prevTasks.map((task) =>
                    // Ganti task lama dengan task baru
                    task.id === updatedTask.id ? updatedTask : task
                )
            );
        } catch (error) {
            console.error("Gagal mengubah status tugas:", error.response.data);
        }
    };

    // Edit Task
    const handleEditTask = (task) => {
        setEditingTask(task);
        document.getElementById("taskForm").classList.remove("hidden");
    };

    // Update Task
    const handleUpdateTask = (updatedTask) => {
        setTasks((prevTasks) =>
            prevTasks.map((task) =>
                task.id === updatedTask.id ? updatedTask : task
            )
        );
        setEditingTask(null);
    };

    //Delete Task
    const handleDeleteTask = async (taskId) => {
        if (!confirm("Apakah Anda yakin ingin menghapus tugas ini?")) {
            return;
        }

        try {
            await axios.delete(`${API_URL}/tasks/${taskId}`);

            // Hapus tugas dari state lokal
            setTasks((prevTasks) =>
                prevTasks.filter((task) => task.id !== taskId)
            );
        } catch (error) {
            console.error("Gagal menghapus tugas:", error.response.data);
            alert("Gagal menghapus tugas.");
        }
    };

    // 1. Fungsi untuk mengambil data TUGAS
    const fetchTasks = async () => {
        try {
            const response = await axios.get(`${API_URL}/tasks`);

            if (response.data && response.data.data) {
                setTasks(response.data.data);
            } else {
                setTasks([]);
                console.warn("Unexpected API response format:", response.data);
            }
        } catch (err) {
            console.error("Error fetching tasks:", err);
            setError("Gagal memuat tugas. Silakan coba lagi.");
        }
    };

    // 2. Fungsi untuk mengambil data KATEGORI
    const fetchCategories = async () => {
        try {
            const response = await axios.get(`${API_URL}/categories`);

            if (response.data && response.data.data) {
                setCategories(response.data.data);
            } else {
                setCategories([]);
                console.warn("Unexpected API response format:", response.data);
            }
        } catch (err) {
            console.error("Error fetching categories:", err);
            setError("Gagal memuat kategori. Silakan coba lagi.");
        }
    };

    useEffect(() => {
        // Ambil data kategori dan tugas saat mount
        Promise.all([fetchTasks(), fetchCategories()])
            .then(() => setLoading(false))
            .catch(() => setLoading(false));
    }, []);

    // 3. Fungsi yang dipanggil dari TaskForm setelah tugas berhasil dibuat
    const handleTaskAdded = (newTask) => {
        setTasks((prevTasks) => [...prevTasks, newTask]);
    };

    // Handler untuk klik kategori
    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
        setActiveView("category");
    };

    if (loading)
        return (
            <div className="container mx-auto p-4">
                <div className="p-6 bg-blue-50 text-blue-600 rounded-lg">
                    Memuat data...
                </div>
            </div>
        );

    if (error)
        return (
            <div className="container mx-auto p-4">
                <div className="p-6 bg-red-50 text-red-600 rounded-lg">
                    {error}
                </div>
            </div>
        );

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <div className="w-64 bg-white shadow-lg">
                <div className="p-4">
                    <h1 className="text-2xl font-semibold mb-4">Menu</h1>
                    <div className="mb-4">
                        <input
                            type="text"
                            placeholder="Search"
                            className="w-full px-3 py-2 border rounded-lg text-sm"
                        />
                    </div>
                </div>

                {/* Menu Items */}
                <div className="px-4">
                    <div className="mb-6">
                        <h2 className="text-xs font-semibold text-gray-600 uppercase mb-2">
                            TASKS
                        </h2>
                        <ul className="space-y-2">
                            <li
                                onClick={() => setActiveView("upcoming")}
                                className={`flex items-center text-gray-700 hover:bg-gray-100 px-2 py-1 rounded cursor-pointer ${
                                    activeView === "upcoming"
                                        ? "bg-gray-100"
                                        : ""
                                }`}
                            >
                                <svg
                                    className="w-4 h-4 mr-2"
                                    fill="none"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"></path>
                                </svg>
                                <span>Upcoming</span>
                                <span className="ml-auto text-gray-500">
                                    {
                                        tasks.filter(
                                            (task) =>
                                                task.due_date &&
                                                !task.is_completed &&
                                                new Date(task.due_date) >
                                                    new Date()
                                        ).length
                                    }
                                </span>
                            </li>
                            <li
                                onClick={() => setActiveView("today")}
                                className={`flex items-center text-gray-700 hover:bg-gray-100 px-2 py-1 rounded cursor-pointer ${
                                    activeView === "today" ? "bg-gray-100" : ""
                                }`}
                            >
                                <svg
                                    className="w-4 h-4 mr-2"
                                    fill="none"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                                <span>Today</span>
                                <span className="ml-auto text-gray-500">
                                    {
                                        tasks.filter((task) => {
                                            if (
                                                !task.due_date ||
                                                task.is_completed
                                            )
                                                return false;
                                            const today = new Date();
                                            const dueDate = new Date(
                                                task.due_date
                                            );
                                            return (
                                                dueDate.toDateString() ===
                                                today.toDateString()
                                            );
                                        }).length
                                    }
                                </span>
                            </li>
                            <li
                                onClick={() => setActiveView("calendar")}
                                className={`flex items-center text-gray-700 hover:bg-gray-100 px-2 py-1 rounded cursor-pointer ${
                                    activeView === "calendar"
                                        ? "bg-gray-100"
                                        : ""
                                }`}
                            >
                                <svg
                                    className="w-4 h-4 mr-2"
                                    fill="none"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                </svg>
                                <span>Calendar</span>
                            </li>
                        </ul>
                    </div>

                    <div className="mb-6">
                        <h2 className="text-xs font-semibold text-gray-600 uppercase mb-2">
                            LISTS
                        </h2>
                        <ul className="space-y-2">
                            {categories.map((category) => (
                                <li
                                    key={category.id}
                                    onClick={() =>
                                        handleCategoryClick(category)
                                    }
                                    className={`flex items-center text-gray-700 hover:bg-gray-100 px-2 py-1 rounded cursor-pointer ${
                                        activeView === "category" &&
                                        selectedCategory?.id === category.id
                                            ? "bg-gray-100"
                                            : ""
                                    }`}
                                >
                                    <span className="w-3 h-3 rounded-full bg-red-500 mr-2"></span>
                                    <span>{category.name}</span>
                                    <span className="ml-auto text-gray-500">
                                        {
                                            tasks.filter(
                                                (task) =>
                                                    task.category &&
                                                    task.category.id ===
                                                        category.id
                                            ).length
                                        }
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-8">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-semibold">
                        {activeView === "calendar"
                            ? "Calendar View"
                            : activeView === "upcoming"
                            ? "Upcoming Tasks"
                            : activeView === "category" && selectedCategory
                            ? selectedCategory.name
                            : "Today's Tasks"}
                    </h1>
                    {activeView !== "category" && (
                        <button
                            onClick={() =>
                                document
                                    .getElementById("taskForm")
                                    .classList.remove("hidden")
                            }
                            className="flex items-center text-gray-600 hover:text-gray-800"
                        >
                            <span className="text-xl mr-1">+</span> Add New Task
                        </button>
                    )}
                </div>

                {/* Task Form - Initially Hidden */}
                <div id="taskForm" className="hidden mb-6">
                    <TaskForm
                        onTaskAdded={handleTaskAdded}
                        onTaskUpdated={handleUpdateTask}
                        categories={categories}
                        editingTask={editingTask}
                        onCancelEdit={() => setEditingTask(null)}
                    />
                </div>

                {activeView === "calendar" ? (
                    <TaskCalendar tasks={tasks} />
                ) : (
                    /* Tasks List */
                    <div className="space-y-4">
                        {tasks.filter((task) => {
                            if (activeView === "today") {
                                if (!task.due_date || task.is_completed)
                                    return false;
                                const today = new Date();
                                const dueDate = new Date(task.due_date);
                                return (
                                    dueDate.toDateString() ===
                                    today.toDateString()
                                );
                            }
                            if (activeView === "upcoming") {
                                if (!task.due_date || task.is_completed)
                                    return false;
                                return new Date(task.due_date) > new Date();
                            }
                            if (activeView === "category" && selectedCategory) {
                                return (
                                    task.category &&
                                    task.category.id === selectedCategory.id
                                );
                            }
                            return true;
                        }).length > 0 ? (
                            tasks
                                .filter((task) => {
                                    if (activeView === "today") {
                                        if (!task.due_date || task.is_completed)
                                            return false;
                                        const today = new Date();
                                        const dueDate = new Date(task.due_date);
                                        return (
                                            dueDate.toDateString() ===
                                            today.toDateString()
                                        );
                                    }
                                    if (activeView === "upcoming") {
                                        if (!task.due_date || task.is_completed)
                                            return false;
                                        return (
                                            new Date(task.due_date) > new Date()
                                        );
                                    }
                                    if (
                                        activeView === "category" &&
                                        selectedCategory
                                    ) {
                                        return (
                                            task.category &&
                                            task.category.id ===
                                                selectedCategory.id
                                        );
                                    }
                                    return true;
                                })
                                .map((task) => (
                                    <div
                                        key={task.id}
                                        className={`p-4 rounded-lg shadow-sm bg-white border-l-4 ${
                                            task.is_completed
                                                ? "border-green-500 line-through"
                                                : "border-yellow-500"
                                        }`}
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="flex-1">
                                                <h3 className="font-medium text-gray-800 ${task.is_completed ? 'line-through text-gray-500' : ''}">
                                                    {task.title}
                                                </h3>
                                                <div className="flex items-center mt-1 space-x-4">
                                                    {task.category && (
                                                        <span className="text-sm text-gray-500">
                                                            {task.category.name}
                                                        </span>
                                                    )}
                                                    {task.due_date && (
                                                        <span className="text-sm text-gray-500">
                                                            Due:{" "}
                                                            {new Date(
                                                                task.due_date
                                                            ).toLocaleDateString()}
                                                        </span>
                                                    )}
                                                    {task.priority && (
                                                        <span
                                                            className={`text-sm font-medium ${
                                                                task.priority ===
                                                                "High"
                                                                    ? "text-red-500"
                                                                    : task.priority ===
                                                                      "Medium"
                                                                    ? "text-orange-500"
                                                                    : "text-green-500"
                                                            }`}
                                                        >
                                                            {task.priority}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                {activeView === "category" &&
                                                task.is_completed ? (
                                                    <>
                                                        <span className="px-4 py-2 bg-green-100 text-green-700 rounded-lg font-medium">
                                                            Completed
                                                        </span>
                                                        <button
                                                            onClick={() =>
                                                                handleDeleteTask(
                                                                    task.id
                                                                )
                                                            }
                                                            className="w-8 h-8 rounded-lg bg-red-500 border-2 border-red-600 hover:bg-red-600 flex items-center justify-center transition-colors"
                                                            title="Hapus Tugas"
                                                        >
                                                            <svg
                                                                className="w-5 h-5 text-white"
                                                                fill="none"
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth="2"
                                                                viewBox="0 0 24 24"
                                                                stroke="currentColor"
                                                            >
                                                                <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                                                            </svg>
                                                        </button>
                                                    </>
                                                ) : (
                                                    <>
                                                        <button
                                                            onClick={() =>
                                                                handleEditTask(
                                                                    task
                                                                )
                                                            }
                                                            className="w-8 h-8 rounded-lg bg-blue-500 border-2 border-blue-600 hover:bg-blue-600 flex items-center justify-center transition-colors"
                                                            title="Edit Tugas"
                                                        >
                                                            <svg
                                                                className="w-5 h-5 text-white"
                                                                fill="none"
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth="2"
                                                                viewBox="0 0 24 24"
                                                                stroke="currentColor"
                                                            >
                                                                <path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                                                            </svg>
                                                        </button>
                                                        <button
                                                            onClick={() =>
                                                                handleToggleComplete(
                                                                    task
                                                                )
                                                            }
                                                            className="w-8 h-8 rounded-lg border-2 bg-green-500 border-green-600 hover:bg-green-600 flex items-center justify-center transition-colors"
                                                            title={
                                                                task.is_completed
                                                                    ? "Tandai Belum Selesai"
                                                                    : "Tandai Selesai"
                                                            }
                                                        >
                                                            <svg
                                                                className="w-5 h-5 text-white"
                                                                fill="none"
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth="3"
                                                                viewBox="0 0 24 24"
                                                                stroke="currentColor"
                                                            >
                                                                <path d="M5 13l4 4L19 7"></path>
                                                            </svg>
                                                        </button>
                                                        <button
                                                            onClick={() =>
                                                                handleDeleteTask(
                                                                    task.id
                                                                )
                                                            }
                                                            className="w-8 h-8 rounded-lg bg-red-500 border-2 border-red-600 hover:bg-red-600 flex items-center justify-center transition-colors"
                                                            title="Hapus Tugas"
                                                        >
                                                            <svg
                                                                className="w-5 h-5 text-white"
                                                                fill="none"
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth="2"
                                                                viewBox="0 0 24 24"
                                                                stroke="currentColor"
                                                            >
                                                                <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                                                            </svg>
                                                        </button>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))
                        ) : (
                            <div className="text-center p-8 bg-white rounded-lg shadow-sm">
                                <p className="text-gray-500">
                                    {activeView === "category" &&
                                    selectedCategory
                                        ? `Belum ada tugas di kategori ${selectedCategory.name}`
                                        : activeView === "upcoming"
                                        ? "Belum ada tugas yang akan datang"
                                        : "Belum ada tugas untuk hari ini"}
                                </p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;
