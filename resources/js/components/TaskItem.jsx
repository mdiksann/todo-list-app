import React from "react";

function TaskItem({ task, activeView, onEdit, onToggleComplete, onDelete }) {
    return (
        <div
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
                                {new Date(task.due_date).toLocaleDateString()}
                            </span>
                        )}
                        {task.priority && (
                            <span
                                className={`text-sm font-medium ${
                                    task.priority === "High"
                                        ? "text-red-500"
                                        : task.priority === "Medium"
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
                    {activeView === "category" && task.is_completed ? (
                        <>
                            <span className="px-4 py-2 bg-green-100 text-green-700 rounded-lg font-medium">
                                Completed
                            </span>
                            <button
                                onClick={() => onDelete(task.id)}
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
                                onClick={() => onEdit(task)}
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
                                onClick={() => onToggleComplete(task)}
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
                                onClick={() => onDelete(task.id)}
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
    );
}

export default TaskItem;
