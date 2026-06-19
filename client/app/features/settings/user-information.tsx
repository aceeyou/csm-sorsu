import { toast } from "sonner"
import { Input } from "~/components/ui/input"
import { Separator } from "~/components/ui/separator"
import { useFetchUser } from "~/hooks/use-fetchUser"

function UserInformation() {
  const { data, error } = useFetchUser()
  if (error) toast.error(error)
  return (
    <div className="mb-12">
      <p className="mb-3 text-xs font-semibold">User Information</p>
      <Separator className="mb-4 w-full" />
      <div className="grid w-[60%] grid-cols-[1.5fr_5fr] items-center gap-4">
        <p className="text-xs">Full Name</p>
        <Input value={data?.name || ""} disabled />
        <p className="text-xs">Email</p>
        <Input value={data?.email || ""} disabled />
        <p className="text-xs">Role</p>
        <Input value={data?.role.toUpperCase() || ""} disabled />
      </div>
    </div>
  )
}

export default UserInformation
