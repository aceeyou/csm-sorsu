import { CircleOff, type LucideIcon } from "lucide-react"
import { useFormContext } from "react-hook-form"

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
  cc: string
  setCC: (value: string) => void
}) {
  const { register } = useFormContext()
  const isActive = cc === label

  function handleClick() {
    if (disabled) return

    const newValue = isActive ? "" : label
    setCC(newValue)
    register(item, { value: newValue })
  }

  return (
    <div
      onClick={handleClick}
      className={`flex ${disabled ? "cursor-not-allowed" : "cursor-pointer"} flex-col items-center justify-center gap-2 rounded-sm border border-gray-200 ${label === "0" ? "p-1" : "p-2.5"} ${isActive ? "bg-green-600" : ""}`}
    >
      {label === "0" ? (
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
