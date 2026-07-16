import { SquarePen, ToggleLeft, ToggleRight, UserKey } from "lucide-react"
import { useEffect, useState } from "react"
import { apiClient } from "~/api/client"
import FieldRequired from "~/components/field-required"
import { Button } from "~/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog"
import { Field, FieldGroup } from "~/components/ui/field"
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"
import { RadioGroup } from "~/components/ui/radio-group"
import { Spinner } from "~/components/ui/spinner"
import { TableCell, TableRow } from "~/components/ui/table"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "~/components/ui/tooltip"
import UserRoleRadio from "./user-role-radio"

function TableRowComponent({
  listItem,
  handleToggleEmailPrivelages,
  handleUpdateEmailAddress,
  handleUpdateUserRole,
  disabled,
}: {
  listItem: {
    email: string
    authorized: boolean
    _id: string
    role: string
  }
  handleToggleEmailPrivelages: (id: string, emailAddress: string) => void
  handleUpdateEmailAddress: (id: string, newEmail: string) => void
  handleUpdateUserRole: (id: string, newRole: string) => void
  disabled: boolean
}) {
  const [updateDialogOpen, setUpdateDialogOpen] = useState(false)
  const [updateEmailOpen, setUpdateEmailOpen] = useState(false)
  const [updateRoleOpen, setUpdateRoleOpen] = useState(false)
  const [newEmail, setNewEmail] = useState(listItem.email)
  const [emailAvailable, setEmailAvailable] = useState<boolean | null>(null)
  const [checkingEmail, setCheckingEmail] = useState(false)
  const [role, setRole] = useState(listItem.role)

  useEffect(() => {
    // Skip the initial render or empty strings
    if (!newEmail) return
    setCheckingEmail(true)
    const token = localStorage.getItem("token")
    // Set a timer to trigger Axios after 500ms
    const delayDebounceFn = setTimeout(async () => {
      try {
        const res = await apiClient.post(
          `/api/emails/emailavailability`,
          {
            email: newEmail,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        // setCheckingEmail(false)
        setEmailAvailable(res.data.available)
      } catch (error) {
        console.log("check email availability error: ", error)
      } finally {
        setCheckingEmail(false)
      }
    }, 500)

    // CLEANUP: If the user types again within 500ms, this cancels the previous timer
    return () => clearTimeout(delayDebounceFn)
  }, [newEmail])

  return (
    <TableRow key={listItem.email} className="odd:bg-gray-50">
      <TableCell className={`${disabled ? "text-gray-400" : ""}`}>
        {listItem.email}
      </TableCell>
      <TableCell className="place-items-center">
        <p
          className={`w-15 rounded-md px-2 py-1 text-center font-medium ${listItem.authorized ? "" : "bg-red-800/80 text-white"}`}
        >
          {listItem.authorized ? "Yes" : "No"}
        </p>
      </TableCell>
      <TableCell className={`place-items-center`}>
        <p
          className={`text-centerm w-min ${listItem.role === "admin" && "rounded-md bg-gray-200 px-3 py-1"}`}
        >
          {listItem?.role.toLocaleUpperCase()}
        </p>
      </TableCell>
      <TableCell className="flex justify-end gap-2">
        <Dialog open={updateDialogOpen} onOpenChange={setUpdateDialogOpen}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon-lg"
                onClick={() => setUpdateDialogOpen(true)}
                disabled={disabled}
                className={disabled ? "cursor-not-allowed" : ""}
              >
                {listItem.authorized ? <ToggleRight /> : <ToggleLeft />}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{disabled ? "Your email" : "Update email permission"}</p>
            </TooltipContent>
          </Tooltip>
          <DialogContent showCloseButton={false}>
            <DialogHeader>
              <DialogTitle className="font-semibold">
                Confirm Change Email Permission
              </DialogTitle>
              <DialogDescription>
                Review and confirm the update to the email permission settings.
                This action will {listItem.authorized ? "revoke" : "grant"}{" "}
                access for <span className="font-bold">{listItem.email}</span>{" "}
                to use the application.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="mt-5">
              <DialogClose asChild>
                <Button variant="outline" className="h-8 w-15">
                  Close
                </Button>
              </DialogClose>
              <Button
                className="h-8"
                onClick={() => {
                  handleToggleEmailPrivelages(listItem._id, listItem.email)
                  setUpdateDialogOpen(false)
                }}
              >
                Confirm Changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog open={updateRoleOpen} onOpenChange={setUpdateRoleOpen}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon-lg"
                onClick={() => setUpdateRoleOpen(true)}
                disabled={disabled}
                className={disabled ? "cursor-not-allowed" : ""}
              >
                <UserKey />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Switch User Role</p>
            </TooltipContent>
          </Tooltip>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="font-semibold">
                Update User Role for {listItem.email}
              </DialogTitle>
              <DialogDescription>
                Review and confirm the update to the user role settings.
                <br /> This action will grant the user{" "}
                <span className="font-semibold"> {role} </span>
                access to the <br /> Online SorSU CART web app.
              </DialogDescription>
            </DialogHeader>
            <div>
              <UserRoleRadio currentRole={role} setRole={setRole} />
            </div>
            <DialogFooter className="mt-2">
              <DialogClose asChild>
                <Button
                  variant="outline"
                  onClick={() => {
                    setRole(listItem.role)
                    setUpdateRoleOpen(false)
                  }}
                >
                  Cancel
                </Button>
              </DialogClose>
              <Button
                onClick={() => {
                  handleUpdateUserRole(listItem._id, role)
                  setUpdateRoleOpen(false)
                }}
              >
                Confirm Changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* <Dialog open={updateEmailOpen} onOpenChange={setUpdateEmailOpen}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon-lg"
                onClick={() => setUpdateEmailOpen(true)}
              >
                <SquarePen />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Edit</p>
            </TooltipContent>
          </Tooltip>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Email Address</DialogTitle>
              <DialogDescription>
                Update the email address associated with this entry. Please
                enter a valid email address to ensure proper validation.
              </DialogDescription>
            </DialogHeader>
            <FieldGroup>
              <Field>
                <Label htmlFor="newEmail">
                  Email <FieldRequired />
                </Label>
                <Input
                  placeholder={`juan@email.com`}
                  id="newEmail"
                  name="newEmail"
                  type="email"
                  required
                  autoComplete="off"
                  value={newEmail}
                  className="h-10 py-2"
                  onChange={(e) => setNewEmail(e.target.value)}
                />
                {checkingEmail && (
                  <p className="-mt-1 flex items-center gap-1 text-gray-400">
                    <Spinner className="size-3" /> Checking availability...
                  </p>
                )}
                {!checkingEmail && newEmail && emailAvailable !== null && (
                  <p className="-mt-1 text-gray-400">
                    {emailAvailable === null ? <Spinner /> : null}
                    {newEmail} is{" "}
                    {emailAvailable ? (
                      <span className="text-green-500/50">available</span>
                    ) : (
                      <span className="text-red-500/50">not available</span>
                    )}
                  </p>
                )}
              </Field>
            </FieldGroup>
            <DialogFooter className="mt-2">
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button
                onClick={() => {
                  handleUpdateEmailAddress(listItem._id, newEmail)
                  setUpdateEmailOpen(false)
                }}
              >
                Confirm Changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog> */}
      </TableCell>
    </TableRow>
  )
}

export default TableRowComponent
