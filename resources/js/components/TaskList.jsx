import React from "react";
import TaskItem from "./TaskItem";
import { isToday, isUpcoming } from "../utils/constants";

function TaskList({
    tasks,
    activeView,
    selectedCategory,
    onEditTask,
    onToggleComplete,
    onDeleteTask,
}) {
    const filterTasks = (task) => {
        if (activeView === "today") {
            return (
                task.due_date && !task.is_completed && isToday(task.due_date)
            );
        }
        if (activeView === "upcoming") {
            return (
                task.due_date && !task.is_completed && isUpcoming(task.due_date)
            );
        }
        if (activeView === "category" && selectedCategory) {
            return task.category && task.category.id === selectedCategory.id;
        }
        return true;
    };

    const filteredTasks = tasks.filter(filterTasks);

    if (filteredTasks.length === 0) {
        return (
            <div className="text-center p-8 bg-white rounded-lg shadow-sm">
                <p className="text-gray-500">
                    {activeView === "category" && selectedCategory
                        ? `Belum ada tugas di kategori ${selectedCategory.name}`
                        : activeView === "upcoming"
                        ? "Belum ada tugas yang akan datang"
                        : "Belum ada tugas untuk hari ini"}
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {filteredTasks.map((task) => (
                <TaskItem
                    key={task.id}
                    task={task}
                    activeView={activeView}
                    onEdit={onEditTask}
                    onToggleComplete={onToggleComplete}
                    onDelete={onDeleteTask}
                />
            ))}
        </div>
    );
}

export default TaskList;
