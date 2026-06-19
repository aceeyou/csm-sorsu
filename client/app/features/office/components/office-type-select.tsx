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
  fields: FieldsType
  setFields: React.Dispatch<React.SetStateAction<FieldsType>>
}

function OfficeTypeSelect({ fields, setFields }: PropType) {
  const [openPopover, setOpenPopover] = useState(false)
  const [listOfTypes, setListOfTypes] = useState([""])

  useEffect(() => {
    fetchTypes()
  }, [])

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
  return (
    <Popover modal={true} open={openPopover} onOpenChange={setOpenPopover}>
      <PopoverTrigger asChild>
        <div className="flex items-center gap-2">
          <Button
            className="flex h-8 w-full justify-between"
            type="button"
            variant={"outline"}
            role="combobox"
            aria-expanded={openPopover}
            // onClick={fetchTypes}
          >
            {fields.type ? (
              <span className="">{fields.type}</span>
            ) : (
              "Select the type of Office"
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
            <CommandEmpty>No types found.</CommandEmpty>
            <CommandGroup>
              {listOfTypes &&
                listOfTypes.map((officeType) => (
                  <CommandItem
                    key={officeType}
                    onSelect={(currentValue) => {
                      setFields((cur) => ({
                        ...cur,
                        type: currentValue === fields.type ? "" : currentValue,
                      }))
                      setOpenPopover(false)
                    }}
                  >
                    {officeType}
                  </CommandItem>
                ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export default OfficeTypeSelect
