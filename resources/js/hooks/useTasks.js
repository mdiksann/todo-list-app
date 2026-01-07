import { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../utils/constants";

export const useTasks = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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

    useEffect(() => {
        fetchTasks()
            .then(() => setLoading(false))
            .catch(() => setLoading(false));
    }, []);

    const addTask = (newTask) => {
        setTasks((prevTasks) => [...prevTasks, newTask]);
    };

    const updateTask = (updatedTask) => {
        setTasks((prevTasks) =>
            prevTasks.map((task) =>
                task.id === updatedTask.id ? updatedTask : task
            )
        );
    };

    const deleteTask = async (taskId) => {
        if (!confirm("Apakah Anda yakin ingin menghapus tugas ini?")) {
            return;
        }

        try {
            await axios.delete(`${API_URL}/tasks/${taskId}`);
            setTasks((prevTasks) =>
                prevTasks.filter((task) => task.id !== taskId)
            );
        } catch (error) {
            console.error("Gagal menghapus tugas:", error.response.data);
            alert("Gagal menghapus tugas.");
        }
    };

    const toggleComplete = async (taskToUpdate) => {
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
                    task.id === updatedTask.id ? updatedTask : task
                )
            );
        } catch (error) {
            console.error("Gagal mengubah status tugas:", error.response.data);
        }
    };

    return {
        tasks,
        loading,
        error,
        addTask,
        updateTask,
        deleteTask,
        toggleComplete,
    };
};
