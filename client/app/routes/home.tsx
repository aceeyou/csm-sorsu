import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router"
import { SidebarTrigger } from "~/components/ui/sidebar"
import axios from "axios"

export default function Home() {
  const [error, setError] = useState("")
  const [user, setUser] = useState({
    name: "",
    email: "",
  })
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem("token")
    const handleGetUserData = async () => {
      try {
        const res = await axios.get("http://localhost:1337/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        if (res.status === 200) {
          setUser({
            name: res.data.name,
            email: res.data.email,
          })
        }
      } catch (error) {
        setError("Session expired. Please log in again.")
        navigate("/login")
      }
    }

    handleGetUserData()
  }, [])

  return (
    <div className="h-svh w-full">
      {/* header */}
      <SidebarTrigger size={"lg"} type="button" />
      <div className="mt-10">
        <p>Hello, {user.name}!</p>
        <h1 className="">CART Dashboard coming soon...</h1>
        <Link to="/csmform" className="text-violet-500 underline">
          go to the CSM Form page instead
        </Link>
      </div>
    </div>
  )
}
