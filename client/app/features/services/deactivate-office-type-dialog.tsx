import axios from "axios"
import { Trash2 } from "lucide-react"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import { apiClient } from "~/api/client"
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
import { Spinner } from "~/components/ui/spinner"

type DeleteOfficeTypeProps = {
  officeType: {
    _id: string
    type: string
  }
  fetchAllOfficeTypes: () => void
}

function DeactivateOfficeTypeDialog({
  officeType,
  fetchAllOfficeTypes,
}: DeleteOfficeTypeProps) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [services, setServices] = useState<string[]>([])

  const handleFetchServicesOfType = async () => {
    const token = localStorage.getItem("token")
    try {
      const res = await apiClient.get(`/api/services/${officeType.type}`, {
        headers: { Authorization: `Bearer ${token}` },
      })

      // console.log("delete:", res.data.services.services)
      if (res.status === 200) setServices(res.data.services.services)
    } catch (error) {
      console.log(error)
    }
  }

  const handleConfirmDeleteOffice = async () => {
    const token = localStorage.getItem("token")
    setLoading(true)
    try {
      const res = await apiClient.patch(
        `/api/officetype/deactivate/${officeType._id}`,
        { type: officeType.type },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      if (res.status === 200) {
        toast.success(res.data.message)
        fetchAllOfficeTypes()
      }
    } catch (error) {
      console.log(error)
      toast.error("Failed removing the office type. Please try again. 😢")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          onClick={handleFetchServicesOfType}
          type="button"
          variant={"outline"}
          className="h-8 w-8 duration-150 hover:border-red-800"
        >
          <Trash2 color="maroon" />
        </Button>
      </DialogTrigger>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle className="mb-2 text-lg font-semibold text-red-800">
            <div className="flex items-center gap-2">
              <div className="rounded-sm bg-gray-100 p-1.5">
                <Trash2 size={16} />
              </div>
              Delete Office Type?
            </div>
          </DialogTitle>
          <DialogDescription>
            Deleting this will not affect the recorded CSM feedback. But, this
            will be removed from the list of office types seen from the
            selection on the CSM Form page.
          </DialogDescription>
        </DialogHeader>

        <div className="my-3 rounded-md border p-3">
          <div className="flex items-center justify-between">
            <span className="text-[0.6rem] text-gray-400">Office Type</span>
          </div>
          <div className="mt-1 flex items-center justify-between">
            <p className="w-50 truncate font-semibold">
              {officeType.type.toLocaleUpperCase()}
            </p>
          </div>
          <div>
            <span className="text-[0.6rem] text-gray-400">Services</span>
          </div>
          <div className="mt-1 flex flex-wrap items-center gap-1">
            {services &&
              services.map((service) => (
                <span
                  key={service}
                  className="cursor-default rounded-lg bg-gray-200 px-3 py-1"
                >
                  {service}
                </span>
              ))}
          </div>
        </div>

        <DialogFooter className="mt-3">
          <DialogClose asChild>
            <Button variant={"outline"} className="h-10 w-15">
              Close
            </Button>
          </DialogClose>
          <Button
            onClick={handleConfirmDeleteOffice}
            className="flex h-10 w-40 gap-2 font-bold"
            variant={"destructive"}
          >
            {loading && <Spinner />}
            DELETE OFFICE TYPE
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default DeactivateOfficeTypeDialog
