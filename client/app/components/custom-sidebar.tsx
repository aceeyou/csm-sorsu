import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip"
import { SidebarTrigger } from "./ui/sidebar"

function CustomSidebar() {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <SidebarTrigger size={"lg"} type="button" />
      </TooltipTrigger>
      <TooltipContent side="top" className="">
        <span className="">Toggle Sidebar</span>
      </TooltipContent>
    </Tooltip>
  )
}

export default CustomSidebar
