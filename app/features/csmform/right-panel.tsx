import { useState, useEffect } from "react"
import SQDRatingsItem from "./components/sqd-ratings"
import { useFormContext } from "react-hook-form"

export default function RightPanel() {
  const { setValue } = useFormContext()
  const [sqd0, setSQD0] = useState("")
  const [sqd1, setSQD1] = useState("")
  const [sqd2, setSQD2] = useState("")
  const [sqd3, setSQD3] = useState("")
  const [sqd4, setSQD4] = useState("")
  const [sqd5, setSQD5] = useState("")
  const [sqd6, setSQD6] = useState("")
  const [sqd7, setSQD7] = useState("")
  const [sqd8, setSQD8] = useState("")

  useEffect(() => {
    setValue("sqd0", sqd0)
    setValue("sqd1", sqd1)
    setValue("sqd2", sqd2)
    setValue("sqd3", sqd3)
    setValue("sqd4", sqd4)
    setValue("sqd5", sqd5)
    setValue("sqd6", sqd6)
    setValue("sqd7", sqd7)
    setValue("sqd8", sqd8)
  }, [sqd0, sqd1, sqd2, sqd3, sqd4, sqd5, sqd6, sqd7, sqd8])

  return (
    <div className="mt-4 h-min w-full rounded-lg border border-gray-200 p-4">
      <h1 className="text-lg font-bold">Service Quality Dimensions</h1>
      <div className="grid grid-cols-1 gap-2">
        <SQDRatingsItem label="SQD 0" sqd={sqd0} setSQD={setSQD0} />
        <SQDRatingsItem label="SQD 1" sqd={sqd1} setSQD={setSQD1} />
        <SQDRatingsItem label="SQD 2" sqd={sqd2} setSQD={setSQD2} />
        <SQDRatingsItem label="SQD 3" sqd={sqd3} setSQD={setSQD3} />
        <SQDRatingsItem label="SQD 4" sqd={sqd4} setSQD={setSQD4} />
        <SQDRatingsItem label="SQD 5" sqd={sqd5} setSQD={setSQD5} />
        <SQDRatingsItem label="SQD 6" sqd={sqd6} setSQD={setSQD6} />
        <SQDRatingsItem label="SQD 7" sqd={sqd7} setSQD={setSQD7} />
        <SQDRatingsItem label="SQD 8" sqd={sqd8} setSQD={setSQD8} />
      </div>
    </div>
  )
}
