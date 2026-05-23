import axios from "axios"
import { useEffect, useState } from "react"

export function useFetchUser() {
  const [data, setData] = useState({
    name: "",
    email: "",
    role: "",
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem("token")
    const fetchData = async () => {
      setLoading(true)
      setError(null)

      try {
        const res = await axios.get("http://localhost:1337/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        if (res.status === 200) {
          setData({
            name: res.data.name,
            email: res.data.email,
            role: res.data.role,
          })
        }
      } catch (error: any) {
        setError(error.response?.data?.message)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return { data, loading, error }
}
