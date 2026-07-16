import { LogOut } from "lucide-react"
import { SidebarTrigger } from "~/components/ui/sidebar"
import AllowedEmailList from "~/features/settings/allowed-email-list"
import UserInformation from "~/features/settings/user-information"
import { useNavigate } from "react-router"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog"
import { Button } from "~/components/ui/button"
import { useState } from "react"
import { useFetchUser } from "~/hooks/use-fetchUser"
import { toast } from "sonner"

function Settings() {
  const { data, error } = useFetchUser()
  const navigate = useNavigate()
  const [showlogoutDialog, setShowLogoutDialog] = useState(false)

  if (error) toast.error(error)

  if (!data || error) {
    navigate("/login")
  }

  const handleLogOut = () => {
    localStorage.removeItem("token")
    navigate("/login")
  }
  return (
    <div className="h-full w-full">
      <div className="mb-5 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <SidebarTrigger size={"lg"} type="button" />
          <p className="text-sm font-medium">Settings</p>
        </div>
        <Dialog
          open={showlogoutDialog}
          onOpenChange={() => setShowLogoutDialog(!showlogoutDialog)}
        >
          <DialogTrigger asChild>
            <Button
              variant="outline"
              type="button"
              className="flex cursor-pointer items-center gap-2 rounded-md border border-red-500 px-3 py-1.5 text-xs font-medium transition duration-200 hover:bg-gray-100"
            >
              <LogOut size={16} color="red" strokeWidth={3} />
              <span className="font-semibold text-destructive">Log out</span>
            </Button>
          </DialogTrigger>
          <DialogContent showCloseButton={false}>
            <DialogHeader>
              <DialogTitle className="font-semibold">
                LOG OUT from Online SorSU CART?
              </DialogTitle>
              <DialogDescription className="">
                Are you sure you want to log out?
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="mt-4">
              <Button
                onClick={() => setShowLogoutDialog(false)}
                variant="outline"
                className="h-10 w-20"
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                className="h-10 w-30"
                onClick={handleLogOut}
              >
                Log out
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <UserInformation />
      <AllowedEmailList />
    </div>
  )
}

export default Settings
