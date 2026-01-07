import { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../utils/constants";

export const useCategories = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
        fetchCategories()
            .then(() => setLoading(false))
            .catch(() => setLoading(false));
    }, []);

    return {
        categories,
        loading,
        error,
    };
};
