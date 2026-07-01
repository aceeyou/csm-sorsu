import axios from "axios"

export const apiClient = axios.create({
  // Uses production URL if available, otherwise falls back to Vite dev proxy
  baseURL: import.meta.env.VITE_API_BASE_URL || "/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Include credentials (cookies) in requests
})
