import { useState, useEffect } from "react"
import SQDRatingsItem from "./components/sqd-ratings"
import { useFormContext } from "react-hook-form"
import { Switch } from "~/components/ui/switch"
import { Label } from "~/components/ui/label"

export default function RightPanel() {
  const {
    setValue,
    formState: { isSubmitSuccessful },
  } = useFormContext()
  const [sqd, setSQD] = useState<(string | boolean)[]>([])
  const [switchSQDValues, setSwitchSQDValues] = useState<"on" | "off">("off")

  useEffect(() => {
    if (isSubmitSuccessful && switchSQDValues === "off") {
      setSQD([])
    }
  }, [isSubmitSuccessful])

  // Updates the Form Context/Hook
  useEffect(() => {
    setValue("sqd", sqd)
  }, [sqd])

  useEffect(() => {
    setValue("toggle-sqd-values", switchSQDValues)
  }, [switchSQDValues])

  return (
    <div>
      <div className="mt-4 h-min w-full rounded-lg border border-gray-200 p-4">
        <div className="flex items-center justify-between gap-5">
          <h1 className="text-lg font-bold">Service Quality Dimensions</h1>
          <div className="flex items-center gap-2">
            <Switch
              defaultValue={switchSQDValues}
              id="toggle-sqd-values"
              onCheckedChange={(cur) =>
                cur ? setSwitchSQDValues("on") : setSwitchSQDValues("off")
              }
            />
            <Label
              htmlFor="toggle-sqd-values"
              className={`text-[0.7rem] font-normal ${switchSQDValues === "on" ? "text-violet-500" : "text-gray-400"}`}
            >
              Retain Values
            </Label>
          </div>
        </div>
        <div className="mt-2 grid grid-cols-1 gap-2">
          <div className="grid grid-cols-7 gap-2 border-b border-gray-200 px-2 pb-1">
            <p className="text-center text-xs text-gray-400">SQD</p>
            <p className="text-center text-xs text-gray-400">SD</p>
            <p className="text-center text-xs text-gray-400">D</p>
            <p className="text-center text-xs text-gray-400">NDA</p>
            <p className="text-center text-xs text-gray-400">A</p>
            <p className="text-center text-xs text-gray-400">SA</p>
            <p className="text-center text-xs text-gray-400">N/A</p>
          </div>
          {Array.from({ length: 9 }, (_, index) => (
            <SQDRatingsItem
              key={index}
              label={`SQD${index}`}
              item={index.toString()}
              sqd={sqd}
              setSQD={setSQD}
            />
          ))}
        </div>
      </div>
      {/* <FieldGroup className="rounded-lg border border-gray-200 p-4">
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
      </FieldGroup> */}
    </div>
  )
}
