import axios from "axios"

export const apiClient = axios.create({
  // Uses production URL if available, otherwise falls back to Vite dev proxy
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:1337",
  headers: {
    "Content-Type": "application/json",
    // "Access-Control-Allow-Origin":
    //   import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:1337",
  },
})
