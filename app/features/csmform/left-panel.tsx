import {
  Building2,
  ChevronDown,
  Eraser,
  Landmark,
  Mars,
  SquareUserRound,
  Venus,
} from "lucide-react"
import { useEffect, useState } from "react"
import { Button } from "~/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSet,
  FieldTitle,
} from "~/components/ui/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "~/components/ui/input-group"
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select"
import AvailedServices from "./components/availed-services"
import Section from "./components/section"
import RadioSelection from "./components/radio-selection"
import RadioSex from "./components/radio-sex"
import RadioAge from "./components/radio-age"
import RadioCC from "./components/radio-cc"
import { Textarea } from "~/components/ui/textarea"
import { useFormContext } from "react-hook-form"

const campuses = [
  "Bulan Campus",
  "Castilla Campus",
  "Magallanes Campus",
  "Sorsogon City Campus",
]

const sorsogonOffices = [
  "University/Graduate Registrar",
  "Cashier",
  "Guidance and Counceling Office",
  "Student Affairs and Services Office",
  "Accounting Office",
  "UniversityLibrary",
  "ICT/MIS Office",
  "Office of the President",
  "OVPAA",
  "OVPAF",
  "OVPRET",
  "Planning and Development",
  "HRMDO",
  "Records and Archives",
  "Safety and Security",
  "Health Services Unit",
  "COHAS Registrar",
  "CBM Registrar",
  "COT Registrar",
  "ILDO",
  "Budget Office",
  "Supply and Property",
  "Other (specify)",
]

const magallanesOffices = [
  "Magallanes Registrar",
  "Cashier",
  "Supply and Prperty",
  "Budget Office",
  "Library",
  "Safety and Security",
  "Health Services Unit",
  "Other (specify)",
]

const castillaOffices = [
  "Castilla Registrar",
  "Cashier",
  "Supply and Prperty",
  "Budget Office",
  "Library",
  "Safety and Security",
  "Health Services Unit",
  "Other (specify)",
]

const bulanOffices = [
  "Bulan Registrar",
  "Cashier",
  "Supply and Prperty",
  "Budget Office",
  "Library",
  "Safety and Security",
  "Health Services Unit",
  "Other (specify)",
]

export default function LeftPanel() {
  const { register, setValue } = useFormContext()

  const [campus, setCampus] = useState("")
  const [office, setOffice] = useState("")
  const [listOfOffices, setListOfOffices] = useState<string[]>([])
  const [citizenType, setCitizenType] = useState("")
  const [clientSex, setClientSex] = useState("")
  const [clientAge, setClientAge] = useState("")
  const [cc1, setCC1] = useState("")
  const [cc2, setCC2] = useState("")
  const [cc3, setCC3] = useState("")

  useEffect(() => {
    setValue("campus", campus)
  }, [campus])

  useEffect(() => {
    setValue("office", office)
  }, [office])

  useEffect(() => {
    register("campus", { value: campus })

    switch (campus) {
      case "Sorsogon City Campus":
        setListOfOffices(sorsogonOffices)
        break
      case "Magallanes Campus":
        setListOfOffices(magallanesOffices)
        break
      case "Castilla Campus":
        setListOfOffices(castillaOffices)
        break
      case "Bulan Campus":
        setListOfOffices(bulanOffices)
        break
      default:
        setListOfOffices(["Select campus first to load offices..."])
    }
  }, [campus])

  return (
    <div className="">
      {/* Insert form input here */}

      <div className="">
        <Section sectionName="Visit Details">
          {/* row */}
          <div className="grid grid-cols-2 gap-5">
            {/* Campus */}
            <div>
              <label className="text-xs" htmlFor="campus">
                Campus CSM Collected
              </label>
              <Select
                onValueChange={(selectedCampus) => setCampus(selectedCampus)}
              >
                <SelectTrigger className="w-full font-bold">
                  <SelectValue placeholder="Select campus..." />
                </SelectTrigger>
                <SelectContent>
                  {campuses.map((campus) => (
                    <SelectItem key={campus} value={campus} className="w-full">
                      {campus}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Office */}
            <div>
              <label htmlFor="office" className="mb-1 text-xs">
                Office Visited
              </label>
              <Select
                onValueChange={(selectedOffice) => setOffice(selectedOffice)}
              >
                <SelectTrigger className="w-full font-bold">
                  <SelectValue placeholder="Select office..." />
                </SelectTrigger>
                <SelectContent>
                  {listOfOffices.map((office) => (
                    <SelectItem key={office} value={office} className="w-full">
                      {office}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* row */}
          <AvailedServices office={office} />
        </Section>

        <Section sectionName="Demographic Information">
          {/* row */}
          <div className="grid grid-cols-[60fr_40fr] gap-5">
            <div>
              <label htmlFor="client_type" className="text-xs">
                Client Type
              </label>
              <div className="grid grid-cols-3 gap-3">
                <RadioSelection
                  Icon={SquareUserRound}
                  label={"Citizen"}
                  citizenType={citizenType}
                  setCitizenType={setCitizenType}
                />
                <RadioSelection
                  Icon={Building2}
                  label="Business"
                  citizenType={citizenType}
                  setCitizenType={setCitizenType}
                />
                <RadioSelection
                  Icon={Landmark}
                  label="Gov't"
                  citizenType={citizenType}
                  setCitizenType={setCitizenType}
                />
              </div>
            </div>

            <div>
              <label htmlFor="sex" className="text-xs">
                Sex
              </label>
              <div className="grid grid-cols-2 gap-3">
                <RadioSex
                  Icon={Mars}
                  label={"Male"}
                  clientSex={clientSex}
                  setClientSex={setClientSex}
                />
                <RadioSex
                  Icon={Venus}
                  label={"Female"}
                  clientSex={clientSex}
                  setClientSex={setClientSex}
                />
              </div>
            </div>
          </div>

          {/* row */}

          {/* row */}
          <div className="my-4">
            <label htmlFor="age" className="text-xs">
              Age
            </label>
            <div className="grid grid-cols-5 gap-3">
              <RadioAge
                label="19-younger"
                clientAge={clientAge}
                setClientAge={setClientAge}
              />
              <RadioAge
                label="20-24"
                clientAge={clientAge}
                setClientAge={setClientAge}
              />
              <RadioAge
                label="25-49"
                clientAge={clientAge}
                setClientAge={setClientAge}
              />
              <RadioAge
                label="50-64"
                clientAge={clientAge}
                setClientAge={setClientAge}
              />
              <RadioAge
                label="65-older"
                clientAge={clientAge}
                setClientAge={setClientAge}
              />
            </div>
          </div>
        </Section>

        {/* Citizen's Charter */}
        <Section>
          <div className="mt-4">
            <h2 className="font-medium">Citizen's Charter</h2>

            <div className="mt-2 grid grid-cols-3 gap-4">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>CC1</CardTitle>
                    <RadioCC
                      disabled
                      item="cc1"
                      label={"0"}
                      cc={cc1}
                      setCC={setCC1}
                    />
                  </div>
                </CardHeader>
                <CardContent className="grid h-full grid-cols-4 items-end gap-1">
                  <RadioCC label={"1"} item={"cc1"} cc={cc1} setCC={setCC1} />
                  <RadioCC label={"2"} item={"cc1"} cc={cc1} setCC={setCC1} />
                  <RadioCC label={"3"} item={"cc1"} cc={cc1} setCC={setCC1} />
                  <RadioCC label={"4"} item={"cc1"} cc={cc1} setCC={setCC1} />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>CC2</CardTitle>
                    <RadioCC label={"0"} item={"cc2"} cc={cc2} setCC={setCC2} />
                  </div>
                </CardHeader>
                <CardContent className="grid grid-cols-4 gap-1">
                  <RadioCC label={"1"} item={"cc2"} cc={cc2} setCC={setCC2} />
                  <RadioCC label={"2"} item={"cc2"} cc={cc2} setCC={setCC2} />
                  <RadioCC label={"3"} item={"cc2"} cc={cc2} setCC={setCC2} />
                  <RadioCC label={"4"} item={"cc2"} cc={cc2} setCC={setCC2} />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>CC3</CardTitle>
                    <RadioCC label={"0"} item={"cc3"} cc={cc3} setCC={setCC3} />
                  </div>
                </CardHeader>
                <CardContent className="grid grid-cols-3 gap-1">
                  <RadioCC label={"1"} item={"cc3"} cc={cc3} setCC={setCC3} />
                  <RadioCC label={"2"} item={"cc3"} cc={cc3} setCC={setCC3} />
                  <RadioCC label={"3"} item={"cc3"} cc={cc3} setCC={setCC3} />
                </CardContent>
              </Card>
            </div>
          </div>
        </Section>

        {/* Feedback */}
        <Section sectionName="Feedback and Suggestions">
          <div className="mt-2 grid grid-cols-2 gap-5">
            <FieldGroup className="rounded-lg border border-gray-200 p-4">
              <Field>
                <div className="flex items-center justify-between">
                  <FieldLabel
                    className="text-xs font-medium"
                    htmlFor="dissatisfactionReason"
                  >
                    Reason/s of dissatisfaction
                  </FieldLabel>
                  <Button variant={"outline"} size={"icon"} className="">
                    <Eraser size={16} />
                  </Button>
                </div>
                <Textarea
                  id="dissatisfactionReason"
                  placeholder="Enter client input..."
                  className="resize-zone"
                  {...register("dissatisfactionReason")}
                />
              </Field>
            </FieldGroup>
            <FieldGroup className="rounded-lg border border-gray-200 p-4">
              <Field>
                <div className="flex items-center justify-between">
                  <FieldLabel
                    className="text-xs font-medium"
                    htmlFor="feedbackSuggestions"
                  >
                    Feedback and Suggestions
                  </FieldLabel>
                  <Button variant={"outline"} size={"icon"} className="">
                    <Eraser size={16} />
                  </Button>
                </div>
                <Textarea
                  id="feedbackSuggestions"
                  placeholder="Enter client input..."
                  className="resize-zone"
                  {...register("feedbackSuggestions")}
                />
              </Field>
            </FieldGroup>
          </div>
        </Section>

        {/* Submit Button */}
        <div>
          <Button type="submit" className="mt-2 h-10 w-full cursor-pointer">
            Submit
          </Button>
        </div>
      </div>
    </div>
  )
}
