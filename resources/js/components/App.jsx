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
    const [activeView, setActiveView] = useState("today"); // 'today', 'calendar', 'upcoming'

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
                                <span className="mr-2">#</span>
                                <span>Upcoming</span>
                                <span className="ml-auto text-gray-500">
                                    {
                                        tasks.filter(
                                            (task) =>
                                                task.due_date &&
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
                                <span className="mr-2">#</span>
                                <span>Today</span>
                                <span className="ml-auto text-gray-500">
                                    {
                                        tasks.filter((task) => {
                                            if (!task.due_date) return false;
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
                                <span className="mr-2">#</span>
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
                                    className="flex items-center text-gray-700 hover:bg-gray-100 px-2 py-1 rounded"
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
                            : "Today's Tasks"}
                    </h1>
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
                </div>

                {/* Task Form - Initially Hidden */}
                <div id="taskForm" className="hidden mb-6">
                    <TaskForm
                        onTaskAdded={handleTaskAdded}
                        categories={categories}
                    />
                </div>

                {activeView === "calendar" ? (
                    <TaskCalendar tasks={tasks} />
                ) : (
                    /* Tasks List */
                    <div className="space-y-4">
                        {tasks.filter((task) => {
                            if (activeView === "today") {
                                if (!task.due_date) return false;
                                const today = new Date();
                                const dueDate = new Date(task.due_date);
                                return (
                                    dueDate.toDateString() ===
                                    today.toDateString()
                                );
                            }
                            if (activeView === "upcoming") {
                                if (!task.due_date) return false;
                                return new Date(task.due_date) > new Date();
                            }
                            return true;
                        }).length > 0 ? (
                            tasks
                                .filter((task) => {
                                    if (activeView === "today") {
                                        if (!task.due_date) return false;
                                        const today = new Date();
                                        const dueDate = new Date(task.due_date);
                                        return (
                                            dueDate.toDateString() ===
                                            today.toDateString()
                                        );
                                    }
                                    if (activeView === "upcoming") {
                                        if (!task.due_date) return false;
                                        return (
                                            new Date(task.due_date) > new Date()
                                        );
                                    }
                                    return true;
                                })
                                .map((task) => (
                                    <div
                                        key={task.id}
                                        className={`p-4 rounded-lg shadow-sm bg-white border-l-4 ${
                                            task.is_completed
                                                ? "border-green-500"
                                                : "border-yellow-500"
                                        }`}
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="flex-1">
                                                <h3 className="font-medium text-gray-800">
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
                                                <button className="text-gray-400 hover:text-green-500 text-xl">
                                                    ✓
                                                </button>
                                                <button className="text-gray-400 hover:text-red-500 text-xl">
                                                    ×
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                        ) : (
                            <div className="text-center p-8 bg-white rounded-lg shadow-sm">
                                <p className="text-gray-500">
                                    Belum ada tugas untuk hari ini
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
