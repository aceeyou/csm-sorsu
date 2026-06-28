import axios from "axios"
import { AlertCircleIcon, Plus } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"
import FieldRequired from "~/components/field-required"
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert"
import { Button } from "~/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog"
import { Field, FieldGroup } from "~/components/ui/field"
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"
import { Spinner } from "~/components/ui/spinner"

function AddEmailDialog({
  setListOfEmails,
}: {
  setListOfEmails: React.Dispatch<React.SetStateAction<any[]>>
}) {
  const [newEmail, setNewEmail] = useState("")
  const [dialogToggle, setDialogToggle] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    setLoading(true)
    const token = localStorage.getItem("token")
    try {
      const res = await axios.post(
        "/api/emails/addemail",
        { email: newEmail },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      console.log(res.data)
      setLoading(false)
      setDialogToggle(false)
      setListOfEmails((prev) => [...prev, res.data])
      toast.success("Email added successfully")
      // console.log("post new email: ", res.data)
    } catch (error: any) {
      setLoading(false)
      setError(error.response?.data?.message || error.message)
      toast.error(
        "Failed to add email",
        error.response?.data?.message || error.message
      )
      console.log(error)
    }
  }

  const handleDialogClose = () => {
    setDialogToggle((prev) => !prev)
    setNewEmail("")
    setError("")
  }

  return (
    <Dialog open={dialogToggle} onOpenChange={handleDialogClose}>
      <form onSubmit={handleSubmit}>
        <DialogTrigger asChild>
          <Button variant="outline" className="cursor-pointer" type="button">
            <Plus /> Add an Email
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-lg">Add Email to the List</DialogTitle>
            <DialogDescription>
              Submit the new CART member's email address to add them to the
              access list of the Online CSM Tally Application. This will allow
              them to log in, submit the clients' responses, and access the
              dashboard. Adding the email will automatically set the role to
              "user". Only users with the "admin" role can add new emails to the
              list.
            </DialogDescription>
          </DialogHeader>
          {error && (
            <Alert variant="destructive">
              <AlertCircleIcon />
              <AlertTitle>Failed to add email</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <FieldGroup>
            <Field>
              <Label htmlFor="newEmail">
                Email <FieldRequired />
              </Label>
              <Input
                className="h-8"
                id="newEmail"
                name="newEmail"
                value={newEmail}
                required
                placeholder="juan@email.com"
                onChange={(e) => setNewEmail(e.target.value)}
              />
            </Field>
          </FieldGroup>
          <DialogFooter className="mt-4">
            <DialogClose asChild>
              <Button
                onClick={() => setNewEmail("")}
                type="button"
                variant="outline"
              >
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" onClick={handleSubmit}>
              {loading ? <Spinner /> : null}
              Add Email
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}

export default AddEmailDialog
