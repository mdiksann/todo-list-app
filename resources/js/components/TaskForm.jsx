import React, { useState, useEffect, use } from "react";
import axios from "axios";

const API_URL = "/api";

const TaskForm = ({
    onTaskAdded,
    onTaskUpdated,
    categories,
    editingTask,
    onCancelEdit,
}) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [priority, setPriority] = useState("Medium");
    const [dueDate, setDueDate] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (categories.length > 0 && !categoryId) {
            setCategoryId(categories[0].id);
        }
    }, [categories, categoryId]);

    // Load data task yang akan diedit
    useEffect(() => {
        if (editingTask) {
            setTitle(editingTask.title || "");
            setDescription(editingTask.description || "");
            setCategoryId(editingTask.category_id || "");
            setPriority(editingTask.priority || "Medium");
            setDueDate(editingTask.due_date || "");
        }
    }, [editingTask]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const taskData = {
            title,
            description,
            category_id: categoryId,
            priority,
            due_date: dueDate || null,
        };

        try {
            if (editingTask) {
                // Mode Edit - Update task
                const response = await axios.put(
                    `${API_URL}/tasks/${editingTask.id}`,
                    taskData
                );
                onTaskUpdated(response.data.data);
            } else {
                // Mode Tambah - Create task baru
                const response = await axios.post(`${API_URL}/tasks`, taskData);
                onTaskAdded(response.data.data);
            }

            // Reset form
            setTitle("");
            setDescription("");
            setDueDate("");
            setPriority("Medium");

            document.getElementById("taskForm").classList.add("hidden");
        } catch (error) {
            console.error("Gagal menyimpan tugas:", error.response?.data);
            alert("Gagal menyimpan tugas. Cek konsol untuk detail.");
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        setTitle("");
        setDescription("");
        setDueDate("");
        setPriority("Medium");
        onCancelEdit();
        document.getElementById("taskForm").classList.add("hidden");
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="p-4 bg-white shadow-md rounded-lg mb-6"
        >
            <h2 className="text-xl font-bold mb-4">
                {editingTask ? "Edit Tugas" : "Tambah Tugas Baru"}
            </h2>

            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    Judul Tugas:
                </label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    Kategori:
                </label>
                <select
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                    required
                    className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                    {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                            {cat.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="flex space-x-4 mb-4">
                <div className="w-1/2">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Prioritas:
                    </label>
                    <select
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)}
                        className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    >
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                    </select>
                </div>
                <div className="w-1/2">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Batas Waktu (Due Date):
                    </label>
                    <input
                        type="date"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                        className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
            </div>

            <div className="flex space-x-2">
                <button
                    type="submit"
                    disabled={loading}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:bg-blue-300"
                >
                    {loading
                        ? "Menyimpan..."
                        : editingTask
                        ? "Update Tugas"
                        : "Tambahkan Tugas"}
                </button>
                {editingTask && (
                    <button
                        type="button"
                        onClick={handleCancel}
                        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Batal
                    </button>
                )}
            </div>
        </form>
    );
};

export default TaskForm;
