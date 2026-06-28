import axios from "axios"
import { Plus, Search } from "lucide-react"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import CustomSidebar from "~/components/custom-sidebar"
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
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "~/components/ui/input-group"
import { Label } from "~/components/ui/label"
import { Spinner } from "~/components/ui/spinner"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table"
import DeleteOfficeDialog from "~/features/office/components/delete-office-dialog"
import EditOfficeDialog from "~/features/office/components/edit-office-dialog"
import OfficeForm from "~/features/office/office-form"

function Offices() {
  const [openAddOfficeDialog, setOpenAddOfficeDialog] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [query, setQuery] = useState("")
  const [listOfTypes, setListOfTypes] = useState([""])
  const [listOfCampuses, setListOfCampuses] = useState([""])
  const [fields, setFields] = useState<{
    type: string
    office: string
    alias: string
    campus: string[]
  }>({
    office: "",
    alias: "",
    campus: [],
    type: "",
  })
  const [listOfOffices, setListOfOffices] = useState([
    {
      _id: "",
      office: "",
      alias: "",
      campus: [""],
      type: "",
    },
  ])

  useEffect(() => {
    // const token = localStorage.getItem("token")

    // if (listOfOffices.length < 0) {
    fetchAllOffices()
    fetchCampuses()
    // }
  }, [])

  // Sets a delay for the search that prevents multiple request every after the user types.
  useEffect(() => {
    const token = localStorage.getItem("token")

    // if (query.length === 0) return

    // Delay 500ms
    const delayDebounceFn = setTimeout(async () => {
      try {
        const res = await axios.post(
          `/api/offices/query`,
          {
            query: query,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )

        if (res.status === 200) {
          if (res.data.query.length === 0) {
            toast.info("Cannot find office 🥲")
            return
          }
          setListOfOffices([...res.data.query])
        }
      } catch (error) {
        toast.info("Cannot find office 🥲")
        console.log(error)
      } finally {
      }
    }, 500)

    // CLEANUP: If the user types again within 500ms, this cancels the previous timer
    return () => clearTimeout(delayDebounceFn)
  }, [query])

  async function fetchAllOffices() {
    const token = localStorage.getItem("token")
    try {
      const offices = await axios.get("/api/offices/list", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (offices.status === 200) {
        setListOfOffices([...offices.data.offices])
        return
      }
    } catch (error) {
      console.log("fetch offices error: ", error)
      return
    }
  }

  async function fetchTypes() {
    const token = localStorage.getItem("token")
    try {
      const types = await axios.get("/api/officetype/list", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setListOfTypes([...types.data.types])
    } catch (error) {
      console.log(error)
    }
  }

  async function fetchCampuses() {
    const token = localStorage.getItem("token")
    try {
      const res = await axios.get("/api/campus/list", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      // console.log("campuses: ", res)
      if (res.status === 200) setListOfCampuses([...res.data.listOfCampuses])
    } catch (error) {
      console.log(error)
    }
  }

  async function handleSubmitNewOffice() {
    const token = localStorage.getItem("token")
    setSubmitting(true)
    // console.log("client fields: ", fields)
    try {
      const res = await axios.post(
        "/api/offices/addoffice",
        {
          office: fields.office,
          alias: fields.alias,
          campus: fields.campus,
          type: fields.type,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      if (res.status === 201) {
        setOpenAddOfficeDialog(false)
        toast.success("Successfully submitted new office 🎉")
      }
    } catch (error: any) {
      toast.error(error.response.data.message)
    } finally {
      // Resets all states
      setSubmitting(false)
      setFields({ office: "", alias: "", campus: [], type: "" })

      // Refreshes the list of offices to be displayed on the table
      fetchAllOffices()
    }
  }

  const handleFetchListsToAddOffice = () => {
    fetchCampuses()
    fetchTypes()
  }

  return (
    <div>
      {/* Popover for dialogs and comboboxes for submittion form */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <CustomSidebar />
          <p className="text-sm font-medium">Offices</p>
        </div>
        {/* Add office button and form in dialog modal */}
        <div>
          <Dialog
            open={openAddOfficeDialog}
            onOpenChange={setOpenAddOfficeDialog}
          >
            <DialogTrigger asChild>
              <Button onClick={handleFetchListsToAddOffice}>
                <Plus />
                Add Office
              </Button>
            </DialogTrigger>
            <DialogContent showCloseButton={false}>
              <DialogHeader>
                <DialogTitle className="text-lg font-semibold">
                  Add an Office to the database
                </DialogTitle>
                <DialogDescription>
                  Enter the details for the newly added office for it to be on
                  the list of offices from the Online SorSU CART.
                </DialogDescription>
              </DialogHeader>

              {/* Form for new office submission */}
              <OfficeForm
                office={fields}
                fields={fields}
                setFields={setFields}
              />

              <DialogFooter className="mt-3">
                <DialogClose asChild>
                  <Button variant={"outline"} className="h-8 w-15">
                    Close
                  </Button>
                </DialogClose>
                <Button
                  type="submit"
                  onClick={handleSubmitNewOffice}
                  className="h-8 w-30"
                >
                  {submitting && <Spinner />}
                  Submit
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Table Title and Description */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div className="mt-5 mb-4">
          <h1 className="font-semibold">List of Offices</h1>
          <p className="mt-1 text-xs text-gray-500">
            View, Edit, and Add new Office for the CSM Questionnaire Form office
            selection
          </p>
        </div>

        {/* Search office input */}
        <div className="w-[50%] flex-col items-center gap-1 pb-4 md:flex md:w-70 md:pb-0 lg:w-90">
          <Label htmlFor="searchOffice" className="sr-only">
            Search Office
          </Label>
          <InputGroup>
            <InputGroupInput
              name="searchOffice"
              placeholder="Search Office..."
              onChange={(e) => setQuery(e.target.value)}
            />
            <InputGroupAddon>
              <Search />
            </InputGroupAddon>
          </InputGroup>
        </div>
      </div>

      {/* Table of Offices */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow className="font-medium">
              <TableHead className="w-30">Office Name</TableHead>
              <TableHead className="w-20">Alias</TableHead>
              <TableHead className="w-40">Campus Located</TableHead>
              <TableHead className="w-20">Type of Office</TableHead>
              <TableHead className="w-30">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {listOfCampuses.length === 0 && (
              <div>
                <Spinner />
                Loading...
              </div>
            )}
            {listOfOffices &&
              listOfOffices.map((office) => (
                <TableRow key={office._id} className="align-top">
                  <TableCell className="w-50 align-top text-wrap">
                    {office.office}
                  </TableCell>
                  <TableCell className="align-top">{office.alias}</TableCell>
                  <TableCell className="flex max-w-50 flex-wrap">
                    {office.campus &&
                    office.campus.length === listOfCampuses.length ? (
                      <span className="rounded-full bg-gray-200 px-3 py-1">
                        All Campuses
                      </span>
                    ) : (
                      office.campus.map((campus) => (
                        <span
                          key={campus}
                          className="rounded-full bg-gray-200 px-3 py-1"
                        >
                          {campus}
                        </span>
                      ))
                    )}
                  </TableCell>
                  <TableCell className="align-top">{office.type}</TableCell>
                  <TableCell className="flex gap-1 align-top">
                    <EditOfficeDialog
                      office={office}
                      fetchAllOffices={fetchAllOffices}
                    />
                    <DeleteOfficeDialog
                      office={office}
                      numCampuses={listOfCampuses.length}
                      fetchAllOffices={fetchAllOffices}
                    />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default Offices
