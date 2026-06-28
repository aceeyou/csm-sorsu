import { CircleOff } from "lucide-react"
import { Button } from "~/components/ui/button"

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
  const isActive = cc[item] === label

  // "4" being N/A or did not see a citizen's charter around the office
  function handleClick() {
    // Will not allow selection on other CC items if disable set to true
    if (disabled) return
    if (cc[0] === "4" && item !== 0) return

    // Deselects cc item 1 if value is "4"
    if (isActive && label === "4" && item === 0) {
      setCC(["", "", ""])
      return
    }

    // Automatically sets the other CC item to N/A if CC item 1 is N/A
    if (label === "4" && item === 0) {
      setCC(["4", "N/A", "N/A"])
      return
    }

    // Otherwise, set the value for the CC item
    let tempCC = [...cc]
    tempCC[item] = isActive ? "" : label

    setCC(tempCC)
    return
  }

  return (
    <Button
      disabled={disabled}
      variant={"ghost"}
      type="button"
      onClick={handleClick}
      className={`flex flex-col items-center justify-center gap-2 rounded-sm border border-gray-200 ${label === "N/A" ? "p-1" : "h-10 p-2.5"} ${
        cc[0] === "4" && item !== 0
          ? "cursor-not-allowed bg-gray-200 text-gray-300"
          : "cursor-pointer"
      } ${isActive && cc[0] === "4" ? "bg-red-900" : isActive && "bg-green-700"} ${cc[0] === "4" && item !== 0 ? "bg-gray-200" : ""} ${isActive && cc[0] === "4" ? "hover:bg-red-800" : isActive && "hover:bg-greeb-400"} `}
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
    </Button>
  )
}
