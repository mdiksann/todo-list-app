export const API_URL = "/api";

export const isToday = (dateString) => {
    if (!dateString) return false;
    const today = new Date();
    const date = new Date(dateString);
    return date.toDateString() === today.toDateString();
};

export const isUpcoming = (dateString) => {
    if (!dateString) return false;
    return new Date(dateString) > new Date();
};
