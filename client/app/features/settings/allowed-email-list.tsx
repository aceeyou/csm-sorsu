import { useEffect, useState } from "react"
import { useFetchUser } from "~/hooks/use-fetchUser"
import AddEmailDialog from "./add-email-dialog"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table"
import { Link } from "react-router"
import { Separator } from "~/components/ui/separator"
import { toast } from "sonner"
import TableRowComponent from "./components/table-row"
import { Button } from "~/components/ui/button"
import { RefreshCcw } from "lucide-react"
import { apiClient } from "~/api/client"

function AllowedEmailList() {
  const { data, error } = useFetchUser()
  const [token, setToken] = useState("")
  const [listOfEmails, setListOfEmails] = useState([
    { _id: "", email: "", authorized: false, role: "user" },
  ])

  useEffect(() => {
    setToken(localStorage.getItem("token") || "")
  }, [])

  useEffect(() => {
    if (data?.role === "admin") {
      fetchAllowedEmails()
    }

    return () => {
      fetchAllowedEmails()
    }
  }, [data])

  async function fetchAllowedEmails() {
    try {
      const res = await apiClient.get("/api/emails/allowedemail", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      // console.log(res.data)
      setListOfEmails([...res?.data?.emails])
    } catch (error) {
      setListOfEmails([{ _id: "", email: "", authorized: false, role: "user" }])
      console.log(error)
    }
  }

  async function handleToggleEmailPrivelages(
    emailID: string,
    emailAddress: string
  ) {
    try {
      if (emailAddress === data.email) {
        toast.error("You cannot change your own email privileges")
        return
      }

      // const token = localStorage.getItem("token")
      const res = await apiClient.post(
        "/api/emails/toggleemailprivelages",
        {
          id: emailID,
          email: emailAddress,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      toast.success(res.data.message)
    } catch (error) {
      toast.error("Error toggling email privileges")
    } finally {
      fetchAllowedEmails()
    }
  }

  async function handleUpdateEmailAddress(emailID: string, newEmail: string) {
    try {
      // const token = localStorage.getItem("token")
      const res = await apiClient.post(
        "/api/emails/updateemailaddress",
        {
          id: emailID,
          newEmail,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      toast.success(res.data.message)
    } catch (error) {
      toast.error("Error updating email address")
    } finally {
      fetchAllowedEmails()
    }
  }

  async function handleUpdateUserRole(emailID: string, newRole: string) {
    try {
      console.log(`${emailID} ${newRole}`)
      const token = localStorage.getItem("token")
      const res = await apiClient.post(
        "/api/emails/updateuserrole",
        {
          id: emailID,
          role: newRole,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      toast.success(res.data.message)
    } catch (error) {
      toast.error("Error updating user role")
    } finally {
      fetchAllowedEmails()
    }
  }

  if (error) {
    return (
      <p className="text-red-500">
        Error fetching user data.{" "}
        <Link to="/login" className="text-purple-500 underline">
          Please log in again
        </Link>
      </p>
    )
  }

  return (
    <div className="w-full">
      {data.role === "admin" && (
        <div className="min-w-125">
          <div className="mb-3 flex max-w-[60%] items-center justify-between">
            <h2 className="text-xs font-semibold">
              List of authorized email addresses
            </h2>
            {/* Add Email Form || Dialog */}
            <AddEmailDialog setListOfEmails={setListOfEmails} />
          </div>
          <Separator className="mb-4 w-full" />
          <div className="max-w-[60%] rounded-lg border">
            <Table className="">
              <TableHeader>
                <TableRow className="w-full text-[0.7rem] font-normal">
                  <TableHead className="w-[50%]">Email</TableHead>
                  <TableHead className="w-[20%] text-center">
                    Authorized
                  </TableHead>
                  <TableHead className="w-[20%] text-center">Role</TableHead>
                  <TableHead className="w-min text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {listOfEmails[0]._id ? (
                  listOfEmails.map((listItem) => (
                    <TableRowComponent
                      key={listItem._id}
                      listItem={listItem}
                      handleToggleEmailPrivelages={handleToggleEmailPrivelages}
                      handleUpdateEmailAddress={handleUpdateEmailAddress}
                      handleUpdateUserRole={handleUpdateUserRole}
                      disabled={listItem.email === data.email}
                    />
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      className="text-center text-sm text-gray-500"
                      colSpan={3}
                    >
                      <div className="flex flex-col items-center justify-center gap-y-2 py-4">
                        <span>No authorized emails found.</span>
                        <Button className="w-min" onClick={fetchAllowedEmails}>
                          <RefreshCcw /> Refresh
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      )}
    </div>
  )
}

export default AllowedEmailList
