import { useState, useEffect } from "react"
import SQDRatingsItem from "./components/sqd-ratings"
import { useFormContext } from "react-hook-form"

export default function RightPanel() {
  const {
    setValue,
    formState: { isSubmitSuccessful },
  } = useFormContext()
  const [sqd, setSQD] = useState<string[]>([])

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
    <div className="mt-4 h-min w-full rounded-lg border border-gray-200 p-4">
      <h1 className="text-lg font-bold">Service Quality Dimensions</h1>
      <div className="grid grid-cols-1 gap-2">
        {Array.from({ length: 9 }, (_, index) => (
          <SQDRatingsItem
            key={index}
            label={`SQD ${index}`}
            item={index.toString()}
            sqd={sqd}
            setSQD={setSQD}
          />
        ))}
      </div>
    </div>
  )
}
