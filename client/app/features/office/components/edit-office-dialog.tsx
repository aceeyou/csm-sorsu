import axios from "axios"
import { SquarePen } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"
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
import OfficeForm from "../office-form"
import { apiClient } from "~/api/client"

interface FieldsType {
  type: string
  office: string
  alias: string
  campus: string[]
}

interface EditOfficeType {
  office: {
    _id: string
    type: string
    office: string
    alias: string
    campus: string[]
  }
  fetchAllOffices: () => void
}

function EditOfficeDialog({ office, fetchAllOffices }: EditOfficeType) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [editFields, setEditFields] = useState({
    office: office.office || "",
    alias: office.alias || "",
    campus: office.campus || [""],
    type: office.type || "",
  })

  const handleConfirmEditOffice = async () => {
    const token = localStorage.getItem("token")
    setLoading(true)

    try {
      const res = await apiClient.patch(
        `/api/offices/update/${office._id}`,
        {
          office: editFields.office,
          alias: editFields.alias,
          campus: editFields.campus,
          type: editFields.type,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      if (res.status === 200) {
        toast.success(res.data.message)
        fetchAllOffices()
        setOpen(false)
      }
    } catch (error) {
      toast.error("Update failed 😢", {
        description: "Make sure fields are filled out.",
      })
    } finally {
      setLoading(false)
    }
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button type="button" variant={"outline"} className="w-8">
          <SquarePen />
        </Button>
      </DialogTrigger>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            Edit Office
          </DialogTitle>
          <DialogDescription>Edit the details of the office.</DialogDescription>
        </DialogHeader>

        <OfficeForm
          office={office}
          fields={editFields}
          setFields={setEditFields}
        />

        <DialogFooter className="mt-3">
          <DialogClose asChild>
            <Button variant={"outline"} className="h-8 w-15">
              Close
            </Button>
          </DialogClose>
          <Button
            onClick={handleConfirmEditOffice}
            className="flex h-8 w-30 gap-2 font-bold"
          >
            {loading && <Spinner />}
            Cofirm Edit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default EditOfficeDialog
