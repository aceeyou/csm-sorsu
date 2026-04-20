import { ContactRound } from "lucide-react"
import { useFormContext } from "react-hook-form"

export default function RadioAge({
  label,
  clientAge,
  setClientAge,
}: {
  label: string
  clientAge: string
  setClientAge: (value: string) => void
}) {
  const { setValue } = useFormContext()
  const isActive = clientAge === label

  function handleClick() {
    const newValue = isActive ? "" : label
    setClientAge(newValue)
    setValue("clientAge", newValue)
  }

  return (
    <div
      onClick={handleClick}
      className={`flex cursor-pointer flex-col gap-2 rounded-sm border border-gray-200 p-2.5 ${isActive ? "bg-purple-600" : ""}`}
    >
      <ContactRound size={20} color={isActive ? "white" : "black"} />
      <span
        className={`text-xs text-gray-500 ${isActive && "font-bold text-white"}`}
      >
        {label}
      </span>
    </div>
  )
}
