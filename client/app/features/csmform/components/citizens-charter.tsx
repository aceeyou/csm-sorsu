import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card"
import RadioCC from "./radio-cc"
import { Switch } from "~/components/ui/switch"
import { Label } from "~/components/ui/label"
import { set, useFormContext } from "react-hook-form"
import { useEffect, useState } from "react"

export default function CitizensCharter({
  cc,
  setCC,
}: {
  cc: string[]
  setCC: (value: string[]) => void
}) {
  const {
    setValue,
    getValues,
    formState: { isSubmitSuccessful },
  } = useFormContext()
  const [switchCCValues, setSwitchCCValues] = useState("off")

  useEffect(() => {
    // console.log(getValues("cc"))
    setCC(getValues("cc") || [])
  }, [isSubmitSuccessful])

  useEffect(() => {
    if (isSubmitSuccessful && switchCCValues === "off") {
      setCC([])
    }
  }, [isSubmitSuccessful])

  useEffect(() => {
    setValue("toggle-cc-values", switchCCValues, { shouldDirty: true })
  }, [switchCCValues])

  return (
    <div className="">
      <div className="flex items-center justify-between gap-5">
        <h2 className="font-medium">Citizen's Charter</h2>
        <div className="flex items-center gap-2">
          <Switch
            defaultValue={switchCCValues}
            onCheckedChange={(prev) =>
              prev ? setSwitchCCValues("on") : setSwitchCCValues("off")
            }
            id="toggle-cc-values"
            color="orange"
          />
          <Label
            htmlFor="toggle-cc-values"
            className={`text-[0.7rem] font-normal ${switchCCValues === "on" ? "text-violet-500" : "text-gray-400"}`}
          >
            Retain Values
          </Label>
        </div>
      </div>

      <div className="mt-2 grid grid-cols-2 gap-4 md:grid-cols-3">
        {Array.from({ length: 3 }, (_, index) => (
          <Card key={index} className="">
            <CardHeader>
              <div className="flex items-center justify-between pt-2">
                <CardTitle>CC{index + 1}</CardTitle>
                <RadioCC
                  disabled={index === 0}
                  label={"N/A"}
                  item={index}
                  cc={cc}
                  setCC={setCC}
                  value={cc[index]}
                />
              </div>
            </CardHeader>
            <CardContent
              className={`grid h-full pb-2 md:pb-0 ${index !== 2 ? "grid-cols-4" : "grid-cols-3"} items-end gap-1`}
            >
              <RadioCC
                label={"1"}
                item={index}
                cc={cc}
                setCC={setCC}
                value={cc[index]}
              />
              <RadioCC
                label={"2"}
                item={index}
                cc={cc}
                setCC={setCC}
                value={cc[index]}
              />
              <RadioCC
                label={"3"}
                item={index}
                cc={cc}
                setCC={setCC}
                value={cc[index]}
              />
              {index !== 2 && (
                <RadioCC
                  label={"4"}
                  item={index}
                  cc={cc}
                  setCC={setCC}
                  value={cc[index]}
                />
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
