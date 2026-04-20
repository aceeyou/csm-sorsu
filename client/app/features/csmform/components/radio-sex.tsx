import { type LucideIcon } from "lucide-react"
import { useFormContext } from "react-hook-form"

export default function RadioSex({
  Icon,
  label,
  clientSex,
  setClientSex,
}: {
  Icon: LucideIcon
  label: "Male" | "Female"
  clientSex: string
  setClientSex: (value: string) => void
}) {
  const { setValue } = useFormContext()
  const isActive = clientSex === label

  function handleClick() {
    const newValue = isActive ? "" : label
    setClientSex(newValue)
    setValue("clientSex", newValue)
  }

  return (
    <div
      onClick={handleClick}
      className={`flex cursor-pointer flex-col gap-2 rounded-sm border border-gray-200 p-2.5 ${label === "Male" && isActive && "bg-blue-600"} ${label === "Female" && isActive && "bg-red-600"}`}
    >
      <Icon size={20} color={isActive ? "white" : "black"} />
      <span
        className={`text-xs text-gray-500 ${isActive && "font-bold text-white"}`}
      >
        {label}
      </span>
    </div>
  )
}
