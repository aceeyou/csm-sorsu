import axios from "axios"
import { Plus, SquarePen, Trash2 } from "lucide-react"
import { useEffect, useState } from "react"
import CustomSidebar from "~/components/custom-sidebar"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion"
import { Button } from "~/components/ui/button"
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

function Services() {
  const [loading, setLoading] = useState(true)
  const [officeTypes, setOfficeTypes] = useState([
    { _id: "", type: "", isActive: false },
  ])

  useEffect(() => {
    fetchOfficeTypes()
  }, [loading])

  async function fetchOfficeTypes() {
    const token = localStorage.getItem("token")
    try {
      const res = await axios.get("/api/officetype/list/all", {
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
        <AddOfficeType fetchOfficeTypes={fetchOfficeTypes} />
      </div>

      <div className="mt-5 mb-4">
        <h1 className="font-semibold">List of Services</h1>
        <p className="mt-1 text-xs text-gray-500">
          Add, View, and Update the services offered by the type of office
        </p>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-bold">Office Type</TableHead>
              <TableHead className="font-bold">Services</TableHead>
              <TableHead className="font-bold">Actions</TableHead>
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
