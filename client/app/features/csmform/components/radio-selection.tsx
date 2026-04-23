import { type LucideIcon } from "lucide-react"
import { useFormContext } from "react-hook-form"

export default function RadioSelection({
  Icon,
  label,
  citizenType,
  setCitizenType,
}: {
  Icon: LucideIcon
  label: string
  citizenType: string
  setCitizenType: (value: string) => void
}) {
  const { setValue } = useFormContext()
  const isActive = citizenType === label

  function handleClick() {
    const newValue = isActive ? "" : label
    setCitizenType(newValue)
    setValue("citizenType", newValue)
  }

  return (
    <div
      onClick={handleClick}
      className={`flex cursor-pointer flex-col gap-2 rounded-sm border border-gray-200 p-2.5 ${isActive ? "bg-amber-600" : ""}`}
    >
      <Icon size={20} color={isActive ? "white" : "black"} />
      <span
        className={`text-xs text-gray-500 ${isActive && "font-bold text-white"}`}
      >
        {label === "Government" ? "Govt" : label}
      </span>
    </div>
  )
}
