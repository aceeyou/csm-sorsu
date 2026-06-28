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
import Section from "./components/section"
import RadioSelection from "./components/radio-selection"
import RadioSex from "./components/radio-sex"
import RadioAge from "./components/radio-age"
import { Textarea } from "~/components/ui/textarea"
import { useFormContext } from "react-hook-form"
import { Separator } from "~/components/ui/separator"
import CitizensCharter from "./components/citizens-charter"
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card"
import { Input } from "~/components/ui/input"
import CSMOfficesSelect from "./components/csm-offices-select"
import { Label } from "~/components/ui/label"
import CSMServicesSelect from "./components/csm-services-select"
import CSMCampusSelect from "./components/csm-campus-select"

// TODO MAYBE add an "origin office" property

export default function LeftPanel() {
  const {
    resetField,
    register,
    setValue,
    formState: { isSubmitSuccessful },
  } = useFormContext()

  const [campus, setCampus] = useState({ campus: "", code: "" })
  const [office, setOffice] = useState({
    _id: "",
    office: "",
    alias: "",
    type: "",
  })
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
    setValue("campus", campus.campus)
    setValue("campusCode", campus.code)
  }, [campus])

  useEffect(() => {
    setValue("office", office.office)
    setValue("officeCode", office.alias)
    resetField("services")
  }, [office])

  useEffect(() => {
    setValue("cc", cc)
  }, [cc])

  return (
    <div className="">
      <div className="">
        <Section sectionName="Visit Details">
          <div className="mg:gap-3 grid-cols-1 gap-2 md:grid-cols-2 lg:grid">
            {/* Campus */}
            <div className="md:mb-2">
              <Label className="mt-2 pb-1 text-xs font-normal" htmlFor="campus">
                Campus CSM Collected
              </Label>
              <CSMCampusSelect campus={campus} setCampus={setCampus} />
            </div>

            {/* Office */}
            <div>
              <Label htmlFor="office" className="mt-2 mb-1 text-xs">
                Office Visited
              </Label>
              <CSMOfficesSelect
                campus={campus.campus}
                office={office}
                setOffice={setOffice}
              />
            </div>
          </div>

          {/* Other Office Field */}
          {office.office === "Other" && (
            <Card className="my-5">
              <CardHeader>
                <CardTitle>Other Office...</CardTitle>
              </CardHeader>
              <CardContent>
                <Input
                  type="text"
                  {...register("otherOffice")}
                  placeholder="Enter office visited..."
                />
              </CardContent>
            </Card>
          )}

          {/* Availed Service/s from the visited office */}
          <div className="mt-2 mb-3">
            <Label
              htmlFor="servicesavailed"
              className="mb-1 text-xs font-normal"
            >
              Services Availed
            </Label>
            <CSMServicesSelect office={office} />
          </div>

          {/* Date Collected */}
          <div className="w-full">
            <label htmlFor="dateCollected" className="mb-1 text-xs">
              Date Visited
            </label>
            <Input
              type="date"
              {...register("dateCollected")}
              className="w-full cursor-pointer py-5"
            />
          </div>
        </Section>

        {/* Demographic Information Section */}
        <Section sectionName="Demographic Information">
          <div className="grid grid-cols-1 gap-1 md:grid-cols-[59fr_0.2fr_40fr] md:gap-5">
            {/* Client Type Select */}
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
                  label="Government"
                  citizenType={citizenType}
                  setCitizenType={setCitizenType}
                />
              </div>
            </div>
            <Separator orientation="vertical" color="red" />
            {/* Sex Field */}
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

          {/* Age Field */}
          <div className="my-2 md:my-4">
            <label htmlFor="age" className="text-xs">
              Age
            </label>
            <div className="grid grid-cols-3 gap-3 md:grid-cols-5">
              <RadioAge
                label="19 - Younger"
                clientAge={clientAge}
                setClientAge={setClientAge}
              />
              <RadioAge
                label="20 - 24"
                clientAge={clientAge}
                setClientAge={setClientAge}
              />
              <RadioAge
                label="25 - 49"
                clientAge={clientAge}
                setClientAge={setClientAge}
              />
              <RadioAge
                label="50 - 64"
                clientAge={clientAge}
                setClientAge={setClientAge}
              />
              <RadioAge
                label="65 - Older"
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

        {/* Feedback Fields */}
        <Section sectionName="Feedback and Suggestions">
          {/* Feedback Field */}
          <div className="mt-2 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5">
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
                    onClick={() => setValue("feedbackSuggestions", "")}
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
            {/* Reasons for Dissatisfaction Field */}
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
                    onClick={() => setValue("dissatisfactionReason", "")}
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
          </div>
        </Section>
      </div>
    </div>
  )
}
