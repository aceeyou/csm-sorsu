import { useState, useEffect } from "react"
import SQDRatingsItem from "./components/sqd-ratings"
import { useFormContext } from "react-hook-form"
import { Field, FieldGroup, FieldLabel } from "~/components/ui/field"
import { Button } from "~/components/ui/button"
import { Eraser } from "lucide-react"
import { Textarea } from "~/components/ui/textarea"

export default function RightPanel() {
  const {
    setValue,
    resetField,
    register,
    formState: { isSubmitSuccessful },
  } = useFormContext()
  const [sqd, setSQD] = useState<(string | boolean)[]>([])

  // Updates the Form Context/Hook
  useEffect(() => {
    setValue("sqd", sqd)
  }, [sqd])

  // Resets the state if form submission was successful
  useEffect(() => {
    if (isSubmitSuccessful) {
      setSQD([])
    }
  }, [isSubmitSuccessful])

  return (
    <div>
      <div className="mt-4 h-min w-full rounded-lg border border-gray-200 p-4">
        <h1 className="text-lg font-bold">Service Quality Dimensions</h1>
        <div className="grid grid-cols-1 gap-2">
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
