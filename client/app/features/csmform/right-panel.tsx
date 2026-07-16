import { useState, useEffect } from "react"
import SQDRatingsItem from "./components/sqd-ratings"
import { useFormContext } from "react-hook-form"
import { Switch } from "~/components/ui/switch"
import { Label } from "~/components/ui/label"
import { Button } from "~/components/ui/button"

export default function RightPanel() {
  const {
    setValue,
    formState: { isSubmitSuccessful },
  } = useFormContext()
  const [sqd, setSQD] = useState<(string | boolean)[]>([])
  const [switchSQDValues, setSwitchSQDValues] = useState<"on" | "off">("off")
  const [columnSelected, setColumnSelected] = useState<number>(-1 || null)

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

  const sqdLabels = ["SQD", "SD", "D", "NDA", "A", "SA", "N/A"]

  const handleColumnClick = (index: number) => {
    let newSQDArray
    setColumnSelected(index)

    // handles deselection of column
    if (columnSelected === index) {
      newSQDArray = new Array(9).fill("")
      setColumnSelected(-1)
    } else newSQDArray = new Array(9).fill(sqdLabels[index])

    setSQD(newSQDArray)
  }

  return (
    <div>
      <div className="mt-4 h-min w-full rounded-lg border border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <h1 className="md:text-md text-sm font-semibold lg:text-[1.16rem]">
            Service Quality Dimensions
          </h1>
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
              className={`w-20 text-[0.7rem] font-normal ${switchSQDValues === "on" ? "text-violet-500" : "text-gray-400"}`}
            >
              Retain Values
            </Label>
          </div>
        </div>
        <div className="mt-2 grid grid-cols-1 gap-2">
          <div className="grid grid-cols-7 gap-2 border-b border-gray-200 px-2 pb-1">
            {sqdLabels.map((sqdLabel, index) => (
              <Button
                key={sqdLabel}
                onClick={() => {
                  if (index !== 0) handleColumnClick(index)
                }}
                variant="ghost"
                type="button"
                className={`cursor-copy text-center text-xs text-gray-400 ${index === 0 && "cursor-default hover:bg-none"} `}
              >
                {sqdLabel}
              </Button>
            ))}
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
