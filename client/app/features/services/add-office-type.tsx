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
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "~/components/ui/input-group"
import { Label } from "~/components/ui/label"
import { Spinner } from "~/components/ui/spinner"

type AddOfficeProps = {
  fetchOfficeTypes: () => void
}

function AddOfficeType({ fetchOfficeTypes }: AddOfficeProps) {
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const [officeType, setOfficeType] = useState("")
  const [newServiceItem, setNewServiceItem] = useState("")
  const [serviceList, setServiceList] = useState<string[]>([])
  const [error, setError] = useState("")

  async function handleSubmitOfficeType() {
    const token = localStorage.getItem("token")
    setLoading(true)
    try {
      const res = await axios.post(
        "/api/officetype/addtype",
        { type: officeType },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      if (res.status === 201) {
        if (serviceList.length > 0) {
          handleAddServiceRelatedToOfficeType(res.data.id)
          return
        }
        toast.success(res.data.message)
        fetchOfficeTypes()
        handleDialogClose()
      }
    } catch (error) {
      console.log(error)
    }
  }

  async function handleAddServiceRelatedToOfficeType(newOfficeTypeID: string) {
    const token = localStorage.getItem("token")
    try {
      const res = await axios.post(
        "/api/services/add",
        {
          typeID: newOfficeTypeID,
          services: serviceList,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      if (res.status === 201) {
        toast.success(
          "Successfully added new office type and its related services to the system"
        )
        fetchOfficeTypes()
      }
    } catch (error) {
      console.log(error)
    } finally {
      handleDialogClose()
    }
  }

  const handleDialogClose = () => {
    setLoading(false)
    setOpen(false)
    setOfficeType("")
    setError("")
    setServiceList([])
    setNewServiceItem("")
  }

  const handleKeyDownNewServiceItem = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    // Check if the pressed key is the Return/Enter key
    if (event.key === "Enter") {
      handleAddNewServiceItem()
    }
  }

  const handleAddNewServiceItem = () => {
    if (newServiceItem === "") return
    setServiceList((cur) => [...cur, newServiceItem])
    setNewServiceItem("")
  }

  const handleRemoveServiceItemFromList = (value: string) => {
    if (!value) return
    let listPlaceholder = serviceList.filter((service) => service !== value)

    setServiceList([...listPlaceholder])
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <form onSubmit={handleSubmitOfficeType}>
        <DialogTrigger asChild>
          <Button className="h-8" type="button">
            <Plus /> Add Office Type
          </Button>
        </DialogTrigger>
        <DialogContent showCloseButton={false} className="">
          <DialogHeader>
            <DialogTitle className="text-lg">Add Office Type</DialogTitle>
            <DialogDescription>
              Create a new office type. This will serve as a placeholder for the
              list of services provided of an office. The created 'office types'
              will appear as options from the new office submission. Avoid using
              <em>"/"</em> in naming the new office type to prevent system
              errors
            </DialogDescription>
          </DialogHeader>
          {error && (
            <Alert variant="destructive">
              <AlertCircleIcon />
              <AlertTitle>Failed to add office type</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <FieldGroup>
            <Field>
              <Label htmlFor="newEmail">
                New Office Type <FieldRequired />
              </Label>
              <Input
                className="h-8"
                id="officeType"
                name="officeType"
                value={officeType}
                required
                placeholder="cashier"
                onChange={(e) => setOfficeType(e.target.value)}
              />
            </Field>
          </FieldGroup>
          <FieldGroup className="mt-2">
            <Field>
              <Label htmlFor="relatedServices">Related Services</Label>
            </Field>
            {serviceList.length > 0 && (
              <div className="flex flex-wrap items-center gap-1">
                {serviceList.map((service) => (
                  <Button
                    key={service}
                    onClick={() => handleRemoveServiceItemFromList(service)}
                    className="max-w-80 rounded-lg px-3 py-1"
                  >
                    <span className="truncate text-left!">{service}</span>
                  </Button>
                ))}
              </div>
            )}
            <InputGroup className="h-8">
              <InputGroupInput
                value={newServiceItem}
                placeholder="Payment"
                onChange={(e) => setNewServiceItem(e.target.value)}
                onKeyDown={handleKeyDownNewServiceItem}
                className=""
              />
              <InputGroupAddon align={"inline-end"}>
                <Button
                  variant={"ghost"}
                  className="bg-gray-200 hover:bg-gray-300"
                  onClick={handleAddNewServiceItem}
                >
                  <Plus />
                  Add
                </Button>
              </InputGroupAddon>
            </InputGroup>
          </FieldGroup>
          <DialogFooter className="mt-4">
            <DialogClose asChild>
              <Button
                onClick={() => handleDialogClose()}
                className="h-8"
                type="button"
                variant="outline"
              >
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="submit"
              className="h-8 px-3"
              onClick={handleSubmitOfficeType}
            >
              {loading ? <Spinner /> : null}
              Add Office Type
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}

export default AddOfficeType
