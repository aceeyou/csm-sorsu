import { ChevronDown } from "lucide-react"
import { useEffect, useState } from "react"
import { useFormContext } from "react-hook-form"
import { Button } from "~/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "~/components/ui/input-group"

const defaultServices = [
  "Medical",
  "Vehicle Pass Sticker",
  "Enrollment",
  "Scholarship Application",
  "Document Request",
  "Admission for Incoming Students",
  "Service Records",
  "Request of Documents",
  "Nurse Intervention",
  "Internet access",
]

export default function AvailedServices({ office }: { office: string }) {
  const { register, setValue } = useFormContext()
  const [services, setServices] = useState<string[]>([])
  const [currentInputValue, setCurrentInputValue] = useState("")

  //   Todo
  // 1. Implement a reseter for the input section of the select services availed

  // Updates the services field in the form context whenever the services state changes
  useEffect(() => {
    setValue("services", services)
    setCurrentInputValue("")
  }, [services])

  function onEnter(event: React.KeyboardEvent<HTMLInputElement>) {
    const newService = event.currentTarget?.value
    setServices((old) => [...old, newService])
  }

  return (
    <div className="my-2">
      <label htmlFor="services" className="text-xs">
        Services Availed
      </label>
      <InputGroup className="flex h-auto flex-wrap border border-gray-200 px-2 py-1">
        <InputGroupInput
          // {...register("services")}
          id="services"
          type="text"
          value={currentInputValue}
          placeholder="Select service..."
          onKeyDown={(e) => e.key === "Enter" && onEnter(e)}
          onChange={(e) => setCurrentInputValue(e.target.value)}
        />
        {services.length > 0 && (
          <InputGroupAddon
            align={"inline-start"}
            className="flex w-full flex-wrap justify-start gap-2"
          >
            {services?.map((service, index) => (
              <Button
                onClick={() => {
                  setServices(
                    services.filter((serviceItem) => serviceItem !== service)
                  )
                }}
                key={index}
                variant={"default"}
                type="button"
              >
                {service}
              </Button>
            ))}
          </InputGroupAddon>
        )}
        <InputGroupAddon align={"inline-end"}>
          <DropdownMenu
          // {...register("services")}
          >
            <DropdownMenuTrigger asChild>
              <Button variant={"outline"} className="w-50 justify-between">
                <span>Select service</span> <ChevronDown />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {office &&
                defaultServices.map((service) => (
                  <DropdownMenuItem
                    key={service}
                    onClick={() =>
                      setServices((old) =>
                        old.includes(service) ? old : [...old, service]
                      )
                    }
                  >
                    {service}
                  </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </InputGroupAddon>
      </InputGroup>
    </div>
  )
}
