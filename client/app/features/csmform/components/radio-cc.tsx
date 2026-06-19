import { CircleOff } from "lucide-react"

export default function RadioCC({
  disabled = false,
  label,
  item,
  cc,
  setCC,
}: {
  disabled?: true | false
  label: string
  item: number
  cc: string[]
  setCC: (value: string[]) => void
}) {
  // const { getValues } = useFormContext()
  const isActive = cc[item] === label

  // console.log(getValues("cc"))
  // console.log(isActive)

  function handleClick() {
    if (disabled) return
    if (cc[0] === "4" && item !== 0) return

    if (label === "4" && item === 0) {
      setCC(["4", "N/A", "N/A"])
      return
    }

    if (item === 0 && label !== "4") {
      isActive ? setCC([]) : setCC([label, "", ""])
      return
    }

    let tempCC = [...cc]
    tempCC[item] = isActive ? "" : label

    setCC(tempCC)
    return
  }

  return (
    <div
      onClick={handleClick}
      className={`flex ${disabled || (cc[0] === "4" && item !== 0) ? "cursor-not-allowed" : "cursor-pointer"} flex-col items-center justify-center gap-2 rounded-sm border border-gray-200 ${label === "N/A" ? "p-1" : "p-2.5"} ${isActive && cc[0] == "4" ? "bg-red-800" : isActive ? "bg-green-600" : "hover:bg-gray-100"} ${cc[0] === "4" && item !== 0 ? "bg-gray-200" : ""}`}
    >
      {label === "N/A" ? (
        <CircleOff
          size={13}
          color={disabled ? "gray" : isActive ? "white" : "black"}
        />
      ) : (
        <span
          className={`text-s text-gray-500 ${isActive && "font-bold text-white"}`}
        >
          {label}
        </span>
      )}
    </div>
  )
}
