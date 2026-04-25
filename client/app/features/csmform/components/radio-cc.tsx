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
  item: string
  cc: string[]
  setCC: (value: string[]) => void
}) {
  const isActive = cc[parseInt(item)] === label

  function handleClick() {
    if (disabled) return

    let tempCC = [...cc]
    tempCC[parseInt(item)] = isActive ? "" : label

    setCC(tempCC)
  }

  return (
    <div
      onClick={handleClick}
      className={`flex ${disabled ? "cursor-not-allowed" : "cursor-pointer"} flex-col items-center justify-center gap-2 rounded-sm border border-gray-200 ${label === "N/A" ? "p-1" : "p-2.5"} ${isActive ? "bg-green-600" : ""}`}
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
