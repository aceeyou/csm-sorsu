import axios from "axios"
import { Trash2 } from "lucide-react"
import { useState } from "react"
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

type DeleteOfficeType = {
  office: {
    _id: string
    type: string
    office: string
    alias: string
    campus: string[]
  }
  numCampuses: number
  fetchAllOffices: () => void
}

function DeleteOfficeDialog({
  office,
  numCampuses,
  fetchAllOffices,
}: DeleteOfficeType) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleConfirmDeleteOffice = async () => {
    const token = localStorage.getItem("token")
    setLoading(true)
    try {
      const res = await apiClient.delete(`/api/offices/delete/${office._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (res.status === 200) {
        toast.success(res.data.message)
        fetchAllOffices()
        setOpen(false)
      }
    } catch (error) {
      console.log(error)
      toast.error("Failed deleting the office. Please try again. 😢")
    } finally {
      setLoading(false)
    }
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button type="button" variant={"outline"} className="w-8">
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
              Delete Office?
            </div>
          </DialogTitle>
          <DialogDescription>
            Deleting this will not affect the recorded CSM feedback. But, this
            will be removed from the list of office seen from the selection on
            the CSM Form page.
          </DialogDescription>
        </DialogHeader>

        <div className="my-3 rounded-md border p-3">
          <div className="flex items-center justify-between">
            <span className="text-[0.6rem] text-gray-400">Office Name</span>
            <span className="text-[0.6rem] text-gray-400">Office Type</span>
          </div>
          <div className="flex items-center justify-between">
            <p className="w-50 truncate font-semibold">{office.office}</p>
            <span className="text-[0.7rem]">{office.type}</span>
          </div>
          <div className="mt-2 mb-1 flex items-center justify-between">
            <span className="text-[0.6rem] text-gray-400">Campus Located</span>
            {office.campus.length === numCampuses && (
              <span className="text-[0.7rem]">All Campuses</span>
            )}
          </div>
          {office.campus.length !== numCampuses && (
            <div className="flex flex-wrap items-center gap-1">
              {office.campus &&
                office.campus.map((campus) => (
                  <span
                    key={campus}
                    className="rounded-full bg-gray-200 px-3 py-1 text-[0.6rem]"
                  >
                    {campus}
                  </span>
                ))}
            </div>
          )}
        </div>

        <DialogFooter className="mt-3">
          <DialogClose asChild>
            <Button variant={"outline"} className="h-10 w-15">
              Close
            </Button>
          </DialogClose>
          <Button
            onClick={handleConfirmDeleteOffice}
            className="flex h-10 w-30 gap-2 font-bold"
            variant={"destructive"}
          >
            {loading && <Spinner />}
            DELETE
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default DeleteOfficeDialog
