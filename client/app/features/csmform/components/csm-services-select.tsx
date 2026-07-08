import axios from "axios"
import { ChevronDown } from "lucide-react"
import { useFormContext } from "react-hook-form"
import React, { useEffect, useState } from "react"
import { Button } from "~/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "~/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover"
import { Input } from "~/components/ui/input"
import { apiClient } from "~/api/client"

interface FieldsType {
  _id: string
  services: string[]
  alias: string
  type: string
}

interface PropType {
  office: {
    _id: string
    office: string
    alias: string
    type: string
  }
  // setServicesSelected: React.Dispatch<React.SetStateAction<string>>
  // setOffice: React.Dispatch<React.SetStateAction<FieldsType>>
}

function CSMServicesSelect({ office }: PropType) {
  const { setValue } = useFormContext()
  const [openPopover, setOpenPopover] = useState(false)
  const [servicesList, setServicesList] = useState<string[]>([])
  const [servicesSelected, setServicesSelected] = useState<string[]>([])
  const [newServiceItem, setNewServiceItem] = useState("")

  useEffect(() => {
    if (office.office.length === 0) return
    setServicesSelected([])
    setNewServiceItem("")
    fetchServices()
  }, [office])

  useEffect(() => {
    setValue("services", servicesSelected)
  }, [servicesSelected])

  async function fetchServices() {
    const token = localStorage.getItem("token")
    try {
      if (office.type.length === 0) return
      const res = await apiClient.get(`/api/services/${office.type}`, {
        headers: { Authorization: `Bearer ${token}` },
      })

      // console.log("lislist: ", res.data.services.services)

      if (res.status === 200) {
        setServicesList([...res.data.services.services])
      }
    } catch (error: any) {
      setServicesList([])
      // toast.error(error.response.data.message)
      console.log(error)
    }
  }

  const handleRemoveService = (valueClicked: string) => {
    let listOfServicesSelectedTemp = servicesSelected.filter(
      (serviceItem) => serviceItem !== valueClicked
    )
    setServicesSelected(listOfServicesSelectedTemp)
  }

  const handleKeyDownNewServiceItem = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    // event.preventDefault()
    // Check if the pressed key is the Return/Enter key
    if (event.key === "Enter") {
      event.preventDefault()
      setServicesSelected((cur) => [...cur, newServiceItem])
      setNewServiceItem("")
    }
  }

  return (
    <Popover modal={true} open={openPopover} onOpenChange={setOpenPopover}>
      <div
        className={`flex w-full flex-wrap items-center gap-1 ${servicesSelected.length !== 0 && "mb-2"}`}
      >
        {servicesSelected &&
          servicesSelected.map((serviceItem) => (
            <Button
              key={serviceItem}
              type="button"
              className="h-9 w-min"
              onClick={() => handleRemoveService(serviceItem)}
            >
              <span className="w-fit">{serviceItem}</span>
            </Button>
          ))}
      </div>
      <div className="flex gap-1">
        {office.office === "Other" && (
          <Input
            placeholder="Enter services availed..."
            onKeyDown={handleKeyDownNewServiceItem}
            className="h-9 w-full"
            value={newServiceItem}
            onChange={(e) => setNewServiceItem(e.target.value)}
          />
        )}
        <PopoverTrigger asChild>
          <Button
            className={`flex h-9 justify-between ${office.office !== "Other" && "w-full"}`}
            type="button"
            variant={"outline"}
            role="combobox"
            aria-expanded={openPopover}
          >
            Select Services Availed...
            <ChevronDown size={18} />
          </Button>
        </PopoverTrigger>
      </div>
      <PopoverContent
        align="end"
        className="pointer-events-auto p-0"
        onCloseAutoFocus={(e) => e.preventDefault()}
      >
        <Command className="p-0">
          <CommandInput placeholder="Find the office type..." />
          <CommandList>
            <CommandEmpty className="text-gray-400">
              No services found.
            </CommandEmpty>
            <CommandGroup>
              {servicesList.map((serviceItem) => (
                <CommandItem
                  key={serviceItem}
                  onSelect={() => {
                    setServicesSelected((cur) => [...cur, serviceItem])
                    setOpenPopover(false)
                  }}
                >
                  {serviceItem}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export default CSMServicesSelect
