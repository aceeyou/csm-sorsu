import {
  Angry,
  CircleOff,
  Frown,
  Laugh,
  Meh,
  Smile,
  type LucideIcon,
} from "lucide-react"
import { useFormContext } from "react-hook-form"

export default function SQDRatingsItem({
  label,
  sqd,
  setSQD,
}: {
  label: string
  sqd: string
  setSQD: (value: string) => void
}) {
  return (
    <div className="grid grid-cols-7 place-items-center gap-2 rounded-lg border border-gray-200 p-2">
      <p className="text-sm">{label}</p>
      <SQDRating Icon={Angry} value={"1"} sqd={sqd} setSQD={setSQD} />
      <SQDRating Icon={Frown} value={"2"} sqd={sqd} setSQD={setSQD} />
      <SQDRating Icon={Meh} value={"3"} sqd={sqd} setSQD={setSQD} />
      <SQDRating Icon={Smile} value={"4"} sqd={sqd} setSQD={setSQD} />
      <SQDRating Icon={Laugh} value={"5"} sqd={sqd} setSQD={setSQD} />
      <SQDRating Icon={CircleOff} value={"0"} sqd={sqd} setSQD={setSQD} />
    </div>
  )
}

function SQDRating({
  Icon,
  value,
  sqd,
  setSQD,
}: {
  Icon: LucideIcon
  value: string
  sqd: string
  setSQD: (value: string) => void
}) {
  const isActive = value === sqd

  function handleClick() {
    if (isActive) setSQD("")
    else setSQD(value)
  }

  return (
    <div
      onClick={handleClick}
      className={`${isActive && "bg-slate-600"} w-full cursor-pointer place-items-center rounded-md border border-gray-200 p-3`}
    >
      <Icon color={isActive ? "white" : "black"} />
    </div>
  )
}
