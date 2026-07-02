import axios from "axios"

export const apiClient = axios.create({
  // Uses production URL if available, otherwise falls back to Vite dev proxy
  //   baseURL: "http://127.0.0.1:1337",
  baseURL: import.meta.env.VITE_API_BASE_URL || "/api",
  headers: {
    "Content-Type": "application/json",
    // "Allow-Control-Allow-Origin": "http://127.0.0.1:3000", // Allow requests from any origin
    "Access-Control-Allow-Origin": "https://csm-sorsu.vercel.app", // Allow requests only from the specified origin
  },
  //   withCredentials: true, // Include credentials (cookies) in requests
})
