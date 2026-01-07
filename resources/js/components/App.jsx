import React, { useState } from "react";
import TaskForm from "./TaskForm";
import TaskCalendar from "./TaskCalender";
import Sidebar from "./Sidebar";
import TaskList from "./TaskList";
import { useTasks } from "../hooks/useTasks";
import { useCategories } from "../hooks/useCategories";

function App() {
    const {
        tasks,
        loading: tasksLoading,
        error: tasksError,
        addTask,
        updateTask,
        deleteTask,
        toggleComplete,
    } = useTasks();
    const {
        categories,
        loading: categoriesLoading,
        error: categoriesError,
    } = useCategories();

    const [activeView, setActiveView] = useState("today");
    const [editingTask, setEditingTask] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);

    const loading = tasksLoading || categoriesLoading;
    const error = tasksError || categoriesError;

    const handleEditTask = (task) => {
        setEditingTask(task);
        document.getElementById("taskForm").classList.remove("hidden");
    };

    const handleUpdateTask = (updatedTask) => {
        updateTask(updatedTask);
        setEditingTask(null);
    };

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
            <Sidebar
                tasks={tasks}
                categories={categories}
                activeView={activeView}
                selectedCategory={selectedCategory}
                onViewChange={setActiveView}
                onCategoryClick={handleCategoryClick}
            />

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
                        onTaskAdded={addTask}
                        onTaskUpdated={handleUpdateTask}
                        categories={categories}
                        editingTask={editingTask}
                        onCancelEdit={() => setEditingTask(null)}
                    />
                </div>

                {activeView === "calendar" ? (
                    <TaskCalendar tasks={tasks} />
                ) : (
                    <TaskList
                        tasks={tasks}
                        activeView={activeView}
                        selectedCategory={selectedCategory}
                        onEditTask={handleEditTask}
                        onToggleComplete={toggleComplete}
                        onDeleteTask={deleteTask}
                    />
                )}
            </div>
        </div>
    );
}

export default App;
