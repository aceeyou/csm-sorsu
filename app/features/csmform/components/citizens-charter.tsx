import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card"
import RadioCC from "./radio-cc"

export default function CitizensCharter({
  cc,
  setCC,
}: {
  cc: string[]
  setCC: (value: string[]) => void
}) {
  return (
    <div className="mt-4">
      <h2 className="font-medium">Citizen's Charter</h2>

      <div className="mt-2 grid grid-cols-3 gap-4">
        {Array.from({ length: 3 }, (_, index) => (
          <Card key={index}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>CC{index + 1}</CardTitle>
                <RadioCC
                  disabled={index === 0}
                  label={"0"}
                  item={index.toString()}
                  cc={cc}
                  setCC={setCC}
                />
              </div>
            </CardHeader>
            <CardContent className="grid h-full grid-cols-4 items-end gap-1">
              <RadioCC
                label={"1"}
                item={index.toString()}
                cc={cc}
                setCC={setCC}
              />
              <RadioCC
                label={"2"}
                item={index.toString()}
                cc={cc}
                setCC={setCC}
              />
              <RadioCC
                label={"3"}
                item={index.toString()}
                cc={cc}
                setCC={setCC}
              />
              <RadioCC
                label={"4"}
                item={index.toString()}
                cc={cc}
                setCC={setCC}
              />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
