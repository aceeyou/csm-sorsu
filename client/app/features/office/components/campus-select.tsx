import axios from "axios"
import { ChevronDown } from "lucide-react"
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

interface FieldsType {
  office: string
  alias: string
  campus: string[]
  type: string
}

interface PropType {
  campuses: string[]
  setFields: React.Dispatch<React.SetStateAction<FieldsType>>
}

function CampusSelect({ campuses, setFields }: PropType) {
  const [openPopover, setOpenPopover] = useState(false)
  const [listOfCampuses, setListOfCampuses] = useState([""])

  useEffect(() => {
    fetchCampuses()
  }, [])

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
  return (
    <Popover modal={true} open={openPopover} onOpenChange={setOpenPopover}>
      <PopoverTrigger asChild>
        <div>
          <div className="mb-1 flex flex-1 flex-wrap gap-1 py-1">
            {campuses &&
              campuses.map((camp) => (
                <span
                  key={camp}
                  className="h-min rounded-lg bg-gray-200 px-2 py-1"
                >
                  {camp}
                </span>
              ))}
          </div>
          <div className="flex cursor-pointer items-center justify-between gap-2 rounded-md border pr-2 hover:bg-gray-100">
            <Button
              className=""
              type="button"
              variant={"ghost"}
              role="combobox"
              aria-expanded={openPopover}
              onClick={fetchCampuses}
            >
              Select Campus
            </Button>
            <ChevronDown size={14} />
          </div>
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
            <CommandEmpty>Campus not found.</CommandEmpty>
            <CommandGroup>
              {listOfCampuses &&
                listOfCampuses.map((campus) => (
                  <CommandItem
                    key={campus}
                    onSelect={(currentValue) => {
                      let campusToAssign
                      if (campuses.includes(currentValue))
                        campusToAssign = campuses.filter(
                          (item) => item !== currentValue
                        )
                      else campusToAssign = [...campuses, currentValue]

                      setFields((cur: FieldsType) => ({
                        ...cur,
                        campus: campusToAssign,
                      }))
                      setOpenPopover(false)
                    }}
                  >
                    {campus}
                  </CommandItem>
                ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export default CampusSelect
