import {
  Angry,
  CircleOff,
  Frown,
  Laugh,
  Meh,
  Smile,
  type LucideIcon,
} from "lucide-react"

export default function SQDRatingsItem({
  label,
  item,
  sqd,
  setSQD,
}: {
  label: string
  item: string
  sqd: (string | boolean)[]
  setSQD: (value: (string | boolean)[]) => void
}) {
  return (
    <div
      className={`grid grid-cols-7 place-items-center gap-2 rounded-lg border border-gray-200 p-2 odd:bg-[#F9F9F9]`}
    >
      <p className="text-xs md:text-sm">{label}</p>
      <SQDRating
        item={item}
        Icon={Angry}
        value={"SD"}
        sqd={sqd}
        setSQD={setSQD}
      />
      <SQDRating
        item={item}
        Icon={Frown}
        value={"D"}
        sqd={sqd}
        setSQD={setSQD}
      />
      <SQDRating
        item={item}
        Icon={Meh}
        value={"NDA"}
        sqd={sqd}
        setSQD={setSQD}
      />
      <SQDRating
        item={item}
        Icon={Smile}
        value={"A"}
        sqd={sqd}
        setSQD={setSQD}
      />
      <SQDRating
        item={item}
        Icon={Laugh}
        value={"SA"}
        sqd={sqd}
        setSQD={setSQD}
      />
      <SQDRating
        item={item}
        Icon={CircleOff}
        value={"N/A"}
        sqd={sqd}
        setSQD={setSQD}
      />
    </div>
  )
}

function SQDRating({
  item,
  Icon,
  value,
  sqd,
  setSQD,
}: {
  item: string
  Icon: LucideIcon
  value: string
  sqd: (string | boolean)[]
  setSQD: (value: (string | boolean)[]) => void
}) {
  const isActive = value === sqd[parseInt(item)]

  function handleClick() {
    let tempSQD = [...sqd]
    if (isActive) {
      delete tempSQD[parseInt(item)]
    } else {
      tempSQD[parseInt(item)] = value
    }

    setSQD([...tempSQD])
  }

  return (
    <div
      onClick={handleClick}
      className={`${isActive ? "bg-slate-600" : "hover:bg-gray-200"} flex w-full cursor-pointer place-items-center items-center justify-center rounded-md border border-gray-200 py-2 md:p-3`}
    >
      <Icon size={18} color={isActive ? "white" : "black"} />
    </div>
  )
}
