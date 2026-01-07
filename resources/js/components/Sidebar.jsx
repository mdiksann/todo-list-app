import React from "react";
import { isToday, isUpcoming } from "../utils/constants";

function Sidebar({
    tasks,
    categories,
    activeView,
    selectedCategory,
    onViewChange,
    onCategoryClick,
}) {
    const getUpcomingCount = () => {
        return tasks.filter(
            (task) =>
                task.due_date && !task.is_completed && isUpcoming(task.due_date)
        ).length;
    };

    const getTodayCount = () => {
        return tasks.filter((task) => {
            if (!task.due_date || task.is_completed) return false;
            return isToday(task.due_date);
        }).length;
    };

    const getCategoryCount = (categoryId) => {
        return tasks.filter(
            (task) => task.category && task.category.id === categoryId
        ).length;
    };

    return (
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
                            onClick={() => onViewChange("upcoming")}
                            className={`flex items-center text-gray-700 hover:bg-gray-100 px-2 py-1 rounded cursor-pointer ${
                                activeView === "upcoming" ? "bg-gray-100" : ""
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
                                {getUpcomingCount()}
                            </span>
                        </li>
                        <li
                            onClick={() => onViewChange("today")}
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
                                {getTodayCount()}
                            </span>
                        </li>
                        <li
                            onClick={() => onViewChange("calendar")}
                            className={`flex items-center text-gray-700 hover:bg-gray-100 px-2 py-1 rounded cursor-pointer ${
                                activeView === "calendar" ? "bg-gray-100" : ""
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
                                onClick={() => onCategoryClick(category)}
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
                                    {getCategoryCount(category.id)}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;
