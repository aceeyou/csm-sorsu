import {
  Building2,
  Eraser,
  Landmark,
  Mars,
  SquareUserRound,
  Venus,
} from "lucide-react"
import { useEffect, useState } from "react"
import { Button } from "~/components/ui/button"
import { Field, FieldGroup, FieldLabel } from "~/components/ui/field"
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
import { Textarea } from "~/components/ui/textarea"
import { useFormContext } from "react-hook-form"
import { Separator } from "~/components/ui/separator"
import CitizensCharter from "./components/citizens-charter"
import { useNavigate } from "react-router"

const campuses = [
  "Bulan Campus",
  "Castilla Campus",
  "Magallanes Campus",
  "Sorsogon City Campus",
]

const ccOffices = [
  "Admission Services Unit",
  "Office of the University Registrar",
  "Scholarship and Financial Assistance Unit",
  "Guidance and Counceling",
  "Library Services Unit",
  "Health Services Unit",
  "Safety and Security Services Unit",
  "Student Council Affairs",
  "National Service Training Program Office",
  "Graduate School",
  "Accounting Office",
  "Budget Office",
  "Cashier's Office",
  "Human Resource Management and Development Office",
  "ICT / MIS Office",
  "Records Office",
  "Supply and Property Office",
]

export default function LeftPanel() {
  const {
    resetField,
    register,
    setValue,
    formState: { isSubmitSuccessful },
  } = useFormContext()

  const [campus, setCampus] = useState("")
  const [office, setOffice] = useState("")
  const [listOfOffices, setListOfOffices] = useState<string[]>([...ccOffices])
  const [citizenType, setCitizenType] = useState("")
  const [clientSex, setClientSex] = useState("")
  const [clientAge, setClientAge] = useState("")
  const [cc, setCC] = useState<string[]>([])

  useEffect(() => {
    if (isSubmitSuccessful) {
      setCitizenType("")
      setClientSex("")
      setClientAge("")
      setCC([])
    }
  }, [isSubmitSuccessful, resetField])

  useEffect(() => {
    setValue("campus", campus)
  }, [campus])

  useEffect(() => {
    setValue("office", office)
    resetField("services")
  }, [office])

  useEffect(() => {
    setValue("cc", cc)
  }, [cc])

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
                <SelectTrigger className="w-full text-lg font-medium">
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
                <SelectTrigger className="w-full text-lg font-medium">
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

          {/* Availed Service/s from the visited office */}
          <AvailedServices office={office} />
        </Section>

        <Section sectionName="Demographic Information">
          {/* row */}
          <div className="grid grid-cols-[59fr_0.2fr_40fr] gap-5">
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
                  label="Govt"
                  citizenType={citizenType}
                  setCitizenType={setCitizenType}
                />
              </div>
            </div>
            <Separator orientation="vertical" color="red" />
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
          <CitizensCharter cc={cc} setCC={setCC} />
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
                  <Button
                    type="button"
                    onClick={() => resetField("dissatisfactionReason")}
                    variant={"outline"}
                    size={"icon"}
                    className=""
                  >
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
                  <Button
                    type="button"
                    onClick={() => resetField("feedbackSuggestions")}
                    variant={"outline"}
                    size={"icon"}
                    className=""
                  >
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
      </div>
    </div>
  )
}
