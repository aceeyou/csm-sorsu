import axios from "axios"
import { ChevronDown } from "lucide-react"
import React, { useEffect, useState } from "react"
import { toast } from "sonner"
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

interface FieldsType {
  _id: string
  office: string
  alias: string
  type: string
}

interface PropType {
  campus: string
  office: FieldsType
  setOffice: React.Dispatch<React.SetStateAction<FieldsType>>
}

function CSMOfficesSelect({ campus, office, setOffice }: PropType) {
  const [openPopover, setOpenPopover] = useState(false)
  const [officeList, setOfficeList] = useState<FieldsType[]>([
    { _id: "", office: "", alias: "", type: "" },
  ])

  const otherItem = {
    _id: "other",
    office: "Other",
    alias: "OTHER",
    type: "other",
  }

  useEffect(() => {
    if (campus.length === 0) return
    fetchOffices()
  }, [campus])

  async function fetchOffices() {
    const token = localStorage.getItem("token")
    try {
      const res = await axios.get(`/api/offices/list/${campus}`, {
        headers: { Authorization: `Bearer ${token}` },
      })

      if (res.status === 200) {
        setOfficeList([otherItem, ...res.data.offices])
      }
    } catch (error: any) {
      toast.error(error.response.data.message)
    }
  }

  return (
    <Popover modal={true} open={openPopover} onOpenChange={setOpenPopover}>
      <PopoverTrigger asChild>
        <div className="flex items-center gap-2">
          <Button
            className="flex h-9 w-full justify-between"
            type="button"
            variant={"outline"}
            role="combobox"
            aria-expanded={openPopover}
          >
            {office.office ? (
              <span className="justify-start truncate">{office.office}</span>
            ) : (
              "Select Office Visited..."
            )}
            <ChevronDown size={18} />
          </Button>
        </div>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        className="pointer-events-auto p-0"
        onCloseAutoFocus={(e) => e.preventDefault()}
      >
        <Command className="p-0">
          <CommandInput placeholder="Find the office type..." />
          <CommandList>
            <CommandEmpty>No office found.</CommandEmpty>
            <CommandGroup>
              {officeList &&
                officeList.map((officeItem) => (
                  <CommandItem
                    key={officeItem._id}
                    onSelect={() => {
                      setOffice(officeItem)
                      setOpenPopover(false)
                    }}
                  >
                    {officeItem.office}
                  </CommandItem>
                ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export default CSMOfficesSelect
