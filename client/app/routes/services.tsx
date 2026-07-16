import { useEffect, useState } from "react"
import CustomSidebar from "~/components/custom-sidebar"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table"
import AddOfficeType from "~/features/services/add-office-type"
import DeactivateOfficeTypeDialog from "~/features/services/deactivate-office-type-dialog"
import ServiceList from "~/features/services/components/services-service-list"
import UpdateOfficeType from "~/features/services/update-dialog"
import { Spinner } from "~/components/ui/spinner"
import { apiClient } from "~/api/client"
import { useFetchUser } from "~/hooks/use-fetchUser"
import { useNavigate } from "react-router"
import { toast } from "sonner"
import { Label } from "~/components/ui/label"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "~/components/ui/input-group"
import { Search } from "lucide-react"

function Services() {
  const { data, error } = useFetchUser()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [query, setQuery] = useState("")
  const [officeTypes, setOfficeTypes] = useState([
    { _id: "", type: "", isActive: false },
  ])
  if (error) toast.error(error)

  if (!data || error) {
    navigate("/login")
  }

  if (data.role === "member") {
    navigate("/")
  }

  useEffect(() => {
    fetchOfficeTypes()
  }, [loading])

  // Sets a delay for the search that prevents multiple request every after the user types.
  useEffect(() => {
    const token = localStorage.getItem("token")

    // Delay 500ms
    const delayDebounceFn = setTimeout(async () => {
      try {
        const res = await apiClient.post(
          `/api/officetype/query`,
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
            toast.info("Cannot find office type 🥲")
            return
          }
          setOfficeTypes([...res.data.query])
        }
      } catch (error) {
        toast.info("Cannot find office type 🥲")
      } finally {
      }
    }, 500)

    // CLEANUP: If the user types again within 500ms, this cancels the previous timer
    return () => clearTimeout(delayDebounceFn)
  }, [query])

  async function fetchOfficeTypes() {
    const token = localStorage.getItem("token")
    try {
      const res = await apiClient.get("/api/officetype/list/all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (res.status === 200) {
        setOfficeTypes([...res.data.types])
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <CustomSidebar />
          <p className="text-sm font-medium">Services</p>
        </div>

        {data.role === "admin" && (
          <AddOfficeType fetchOfficeTypes={fetchOfficeTypes} />
        )}
      </div>

      <div className="mt-5 mb-4 flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="font-semibold">List of Services</h1>
          <p className="mt-1 text-xs text-gray-500">
            Add, View, and Update the services offered by the type of office
          </p>
        </div>
        {/* Search office input */}
        <div className="w-[50%] flex-col items-center gap-1 pb-4 md:flex md:w-70 md:pb-0 lg:w-90">
          <Label htmlFor="search-office-type" className="sr-only">
            Search Office
          </Label>
          <InputGroup>
            <InputGroupInput
              name="search-office-type"
              placeholder="Search Service..."
              onChange={(e) => setQuery(e.target.value)}
            />
            <InputGroupAddon>
              <Search />
            </InputGroupAddon>
          </InputGroup>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-bold">Office Type</TableHead>
              <TableHead className="font-bold">Services</TableHead>
              {data.role === "admin" && (
                <TableHead className="font-bold">Actions</TableHead>
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell
                  colSpan={3}
                  className="flex w-full items-center justify-center gap-4"
                >
                  <Spinner /> <span>Loading Rows...</span>
                </TableCell>
              </TableRow>
            ) : (
              officeTypes &&
              officeTypes.map((officeType) => (
                <TableRow key={officeType.type}>
                  <TableCell>{officeType.type.toLocaleUpperCase()}</TableCell>
                  <TableCell className="">
                    <ServiceList officeType={officeType.type} />
                  </TableCell>
                  {data.role === "admin" && (
                    <TableCell className="flex items-center gap-1">
                      <UpdateOfficeType
                        officeType={officeType}
                        fetchOfficeTypes={fetchOfficeTypes}
                      />
                      <DeactivateOfficeTypeDialog
                        officeType={officeType}
                        fetchAllOfficeTypes={fetchOfficeTypes}
                      />
                    </TableCell>
                  )}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default Services
