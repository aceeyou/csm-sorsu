import axios from "axios"
import { ChevronDown } from "lucide-react"
import React, { useEffect, useState } from "react"
import { toast } from "sonner"
import { apiClient } from "~/api/client"
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

type CampusPropTypes = { campus: string; code: string }

interface PropType {
  campus: CampusPropTypes
  setCampus: React.Dispatch<React.SetStateAction<CampusPropTypes>>
}

function CSMCampusSelect({ campus, setCampus }: PropType) {
  const [openPopover, setOpenPopover] = useState(false)
  const [campusList, setCampusList] = useState([{ campus: "", code: "" }])

  useEffect(() => {
    fetchCampuses()
  }, [campus])

  async function fetchCampuses() {
    const token = localStorage.getItem("token")

    try {
      const res = await apiClient.get("/api/campus/list", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      if (res.status === 200) {
        setCampusList([...res.data.listOfCampuses])
      }
    } catch (error: any) {
      toast.error(error.response.data.message)
      console.log(error)
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
            // onClick={fetchTypes}
          >
            {campus.campus ? (
              <span className="truncate">{campus.campus}</span>
            ) : (
              "Select Office Visited..."
            )}
            <ChevronDown size={18} />
          </Button>
        </div>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className="pointer-events-auto p-0"
        onCloseAutoFocus={(e) => e.preventDefault()}
      >
        <Command className="p-0">
          <CommandInput placeholder="Find the office type..." />
          <CommandList>
            <CommandEmpty>No office found.</CommandEmpty>
            <CommandGroup>
              {campusList &&
                campusList.map((campusItem) => (
                  <CommandItem
                    key={campusItem.campus}
                    onSelect={() => {
                      setCampus(campusItem)
                      setOpenPopover(false)
                    }}
                  >
                    {campusItem.campus}
                  </CommandItem>
                ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export default CSMCampusSelect
