import { useEffect, useState } from "react"
import { SidebarTrigger } from "~/components/ui/sidebar"
import { useFetchUser } from "~/hooks/use-fetchUser"
import axios from "axios"

function Settings() {
  const { data, error } = useFetchUser()
  const [listOfEmails, setListOfEmails] = useState([
    { _id: "", email: "", allowed: false },
  ])
  const [newEmail, setNewEmail] = useState("")

  useEffect(() => {
    const token = localStorage.getItem("token")
    const fetchAllowedEmails = async () => {
      try {
        const res = await axios.get(
          "http://localhost:1337/emails/allowedemail",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        console.log(res.data.emails)
        setListOfEmails([...res?.data?.emails])
      } catch (error) {
        console.log(error)
      }
    }

    data.role === "admin" && fetchAllowedEmails()
  }, [])

  const handleSubmit = async () => {
    const token = localStorage.getItem("token")
    try {
      const res = axios.post(
        "http://localhost:1337/emails/addemail",
        { email: newEmail },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      console.log("post new email: ", res)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div>
      <div className="flex items-center justify-between">
        <SidebarTrigger size={"lg"} type="button" />
      </div>
      <p>Settings here</p>

      {data.role === "admin" && (
        <>
          <div className="mt-5">
            <p>List of Allowed Email addresses</p>
            {listOfEmails &&
              listOfEmails.map((item) => <p key={item._id}>{item.email}</p>)}
          </div>

          <div className="mt-10">
            <p>Add Email address to access the web app</p>
            <form onSubmit={handleSubmit}>
              <label htmlFor="newEmail">New Email address</label>
              <input
                type="email"
                name="newEmail"
                id="newEmail"
                placeholder="Enter new email address..."
                onChange={(e) => setNewEmail(e.target.value)}
                value={newEmail}
              />
              <button>Submit</button>
            </form>
          </div>
        </>
      )}
    </div>
  )
}

export default Settings
