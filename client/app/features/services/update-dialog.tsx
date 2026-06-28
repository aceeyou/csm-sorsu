import axios from "axios"
import { AlertCircleIcon, Plus, SquarePen } from "lucide-react"
import { useEffect, useState } from "react"
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
  officeType: {
    _id: string
    type: string
  }
  fetchOfficeTypes: () => void
}

function UpdateOfficeType({ officeType, fetchOfficeTypes }: AddOfficeProps) {
  const [fetchLoading, setFetchLoading] = useState(false)
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const [newOfficeType, setNewOfficeType] = useState(officeType.type)
  const [newServiceItem, setNewServiceItem] = useState("")
  const [serviceList, setServiceList] = useState<string[]>([])
  const [serviceID, setServiceID] = useState("")
  const [error, setError] = useState("")
  const [typeChanged, setTypeChanged] = useState(false)
  const [servicesChanged, setServicesChanged] = useState(false)

  useEffect(() => {
    setServicesChanged(false)
  }, [])

  useEffect(() => {
    setServicesChanged(true)
  }, [setNewServiceItem])

  async function handleUpdateOfficeType() {
    if (!typeChanged) {
      handleUpdateServiceRelatedToOfficeType()
      return
    }
    const token = localStorage.getItem("token")
    setLoading(true)
    try {
      const res = await axios.patch(
        `/api/officetype/update/${officeType._id}`,
        { type: newOfficeType },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      if (res.status === 200) {
        if (servicesChanged) {
          handleUpdateServiceRelatedToOfficeType()
          return
        }
        toast.success(res.data.message)
        handleDialogClose()
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message)
    } finally {
      fetchOfficeTypes()
      setLoading(false)
    }
  }

  async function handleUpdateServiceRelatedToOfficeType() {
    const token = localStorage.getItem("token")
    // setLoading(true)
    try {
      // Creates a new list if the office type doesn't have an existing list of services
      if (!serviceID) {
        const res = await axios.post(
          "/api/services/add",
          { typeID: officeType._id, services: serviceList },
          { headers: { Authorization: `Bearer ${token}` } }
        )

        if (res.status === 201) {
          toast.success(res.data.message)
        }
      } else {
        // Updates the list connected to the office type
        const res = await axios.patch(
          `/api/services/update/${serviceID}`,
          {
            typeID: officeType._id,
            services: serviceList,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )

        if (res.status === 200) {
          toast.success(res.data.message)
        }
      }
    } catch (error: any) {
      toast.error(error.response.data.message)
    } finally {
      handleDialogClose()
    }
  }

  async function fetchOfficeTypeServices() {
    const token = localStorage.getItem("token")
    setFetchLoading(true)
    try {
      const res = await axios.get(`/api/services/${officeType.type}`, {
        headers: { Authorization: `Bearer ${token}` },
      })

      if (res.status === 200) {
        if (res.data.services._id) {
          setServiceID(res.data.services._id)
          setServiceList(res.data.services.services)
          return
        }
        setServiceList(res.data.services)
      }
    } catch (error) {
      console.log(error)
    } finally {
      setFetchLoading(false)
    }
  }

  const handleDialogClose = () => {
    setLoading(false)
    setOpen(false)
    setError("")
    setServiceList([])
    setNewServiceItem("")
    setServicesChanged(false)
    fetchOfficeTypes()
  }

  const handleKeyDownNewServiceItem = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    // Check if the pressed key is the Return/Enter key
    if (event.key === "Enter") {
      setServicesChanged(true)
      handleAddNewServiceItem()
    }
  }

  const handleAddNewServiceItem = () => {
    if (newServiceItem === "") return
    setServiceList((cur) => [...cur, newServiceItem])
    setNewServiceItem("")
    setServicesChanged(true)
  }

  const handleRemoveServiceItemFromList = (value: string) => {
    if (!value) return
    let listPlaceholder = serviceList.filter((service) => service !== value)

    setServiceList([...listPlaceholder])
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <form onSubmit={handleUpdateOfficeType}>
        <DialogTrigger asChild>
          <Button
            onClick={fetchOfficeTypeServices}
            variant={"outline"}
            className="h-8"
            type="button"
          >
            <SquarePen />
          </Button>
        </DialogTrigger>
        <DialogContent showCloseButton={false} className="">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-lg">
              <SquarePen size={16} />
              Edit Office Type
            </DialogTitle>
            <DialogDescription>
              Update the office type details. Avoid using
              <em>"/"</em> in renaming the office type to prevent system errors
            </DialogDescription>
          </DialogHeader>
          {error && (
            <Alert variant="destructive">
              <AlertCircleIcon />
              <AlertTitle>Failed to update office type</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <form method="POST">
            <FieldGroup>
              <Field>
                <Label htmlFor="newEmail">
                  Office Type <FieldRequired />
                </Label>
                <Input
                  className="h-8"
                  id="officeType"
                  name="officeType"
                  value={newOfficeType}
                  required
                  placeholder="cashier"
                  onChange={(e) => {
                    setTypeChanged(true)
                    setNewOfficeType(e.target.value)
                  }}
                />
              </Field>
            </FieldGroup>
            <FieldGroup className="mt-2">
              <Field>
                <Label htmlFor="relatedServices">Related Services</Label>
              </Field>
              {fetchLoading ? (
                <span>
                  <Spinner /> Loading...
                </span>
              ) : serviceList.length > 0 ? (
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
              ) : (
                <span className="flex justify-center text-gray-400">
                  No services found.
                </span>
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
          </form>
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
              onClick={handleUpdateOfficeType}
            >
              {loading ? <Spinner /> : null}
              Update Office Type
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}

export default UpdateOfficeType
