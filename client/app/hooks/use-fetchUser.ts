import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { apiClient } from "~/api/client"

export function useFetchUser() {
  const [data, setData] = useState({
    id: "",
    name: "",
    email: "",
    role: "",
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem("token")
    const fetchData = async () => {
      setLoading(true)
      setError(null)

      try {
        const res = await apiClient.get("/api/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        if (res.status === 200) {
          setData({
            id: res.data._id,
            name: res.data.name,
            email: res.data.email,
            role: res.data.role,
          })
        }
      } catch (error: any) {
        setError(error.response?.data?.message)
        if (error.response?.status === 401) {
          localStorage.removeItem("token")
          navigate("/login", {
            state: { message: "Session expired. Please log in again." },
          })
        }
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return { data, loading, error }
}
