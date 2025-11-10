import React, { useState } from "react";

// Fungsi untuk mendapatkan array hari dalam bulan tertentu
const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const startOfMonth = new Date(year, month, 1);
    const endOfMonth = new Date(year, month + 1, 0);
    const totalDays = endOfMonth.getDate();
    const days = [];

    // Tentukan hari dalam seminggu untuk tanggal 1 (0=Minggu, 6=Sabtu)
    let dayOfWeek = startOfMonth.getDay();

    // menambahkan placeholder untuk hari-hari sebelum tanggal 1
    for (let i = 0; i < dayOfWeek; i++) {
        days.push({ day: null, isPlaceholder: true });
    }

    // menambahkan hari-hari aktual dalam bulan
    for (let i = 1; i <= totalDays; i++) {
        days.push({
            day: i,
            date: new Date(year, month, i),
            isPlaceholder: false,
        });
    }
    return days;
};

// Nama hari dalam seminggu
const dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
];

const TaskCalendar = ({ tasks }) => {
    const [currentDate, setCurrentDate] = useState(new Date());

    const monthName = currentDate.toLocaleString("id-ID", {
        month: "long",
        year: "numeric",
    });
    const days = getDaysInMonth(currentDate);

    // Filter events yang relevan dengan bulan yang ditampilkan
    const getTasksForDate = (date) => {
        if (!date) return [];
        return tasks.filter((task) => {
            // kolom 'due_date' di objek task
            const dueDate = new Date(task.due_date);
            return dueDate.toDateString() === date.toDateString();
        });
    };

    const handlePrevMonth = () => {
        setCurrentDate(
            (prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1)
        );
    };

    const handleNextMonth = () => {
        setCurrentDate(
            (prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1)
        );
    };

    return (
        <div className="flex flex-col bg-white p-4 sm:p-6 rounded-xl shadow-2xl border border-gray-100 h-[calc(100vh-150px)]">
            {/* Header Kalender dan Navigasi */}
            <header className="flex justify-between items-center mb-6 border-b pb-3">
                <h1 className="text-3xl font-bold text-gray-800">
                    {monthName}
                </h1>
                <div className="space-x-2">
                    <button
                        onClick={handlePrevMonth}
                        className="p-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition duration-150"
                    >
                        &lt; Sebelumnya
                    </button>
                    <button
                        onClick={handleNextMonth}
                        className="p-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition duration-150"
                    >
                        Berikutnya &gt;
                    </button>
                </div>
            </header>

            {/* Grid Kalender */}
            <div className="flex-grow grid grid-cols-7 gap-px border border-gray-200 bg-gray-200">
                {/* Nama Hari */}
                {dayNames.map((day) => (
                    <div
                        key={day}
                        className="text-center font-semibold py-2 bg-gray-100 text-gray-600 text-sm"
                    >
                        {day}
                    </div>
                ))}

                {/* Sel Hari */}
                {days.map((day, index) => {
                    const isToday =
                        day.date &&
                        day.date.toDateString() === new Date().toDateString();
                    const tasksOnDay = getTasksForDate(day.date);

                    return (
                        <div
                            key={index}
                            className={`flex-1 min-h-0 p-2 overflow-y-auto ${
                                day.isPlaceholder
                                    ? "bg-gray-100"
                                    : "bg-white hover:bg-indigo-50 transition duration-150"
                            }`}
                        >
                            <span
                                className={`text-sm font-medium ${
                                    day.isPlaceholder
                                        ? "text-gray-400"
                                        : "text-gray-800"
                                } ${
                                    isToday
                                        ? "bg-indigo-600 text-white rounded-full px-2 py-1"
                                        : ""
                                }`}
                            >
                                {day.day}
                            </span>

                            {tasksOnDay.map((task) => (
                                <div
                                    key={task.id}
                                    className={`mt-1 text-xs px-1 py-0.5 rounded-sm truncate ${
                                        task.is_completed
                                            ? "bg-green-200 text-green-800"
                                            : "bg-red-200 text-red-800"
                                    }`}
                                    title={task.title}
                                >
                                    {task.title}
                                </div>
                            ))}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default TaskCalendar;
