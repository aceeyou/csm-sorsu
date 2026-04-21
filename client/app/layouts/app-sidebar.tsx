import { Cog, File, House, User } from "lucide-react"
import { Link, NavLink, Outlet } from "react-router"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "~/components/ui/sidebar"

export default function AppSidebar() {
  return (
    <>
      <SidebarProvider className="">
        <Sidebar
          // collapsible="icon"
          className="p-4"
        >
          <SidebarHeader className="bg-white">
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold">SorSU CART</h1>
            </div>
          </SidebarHeader>
          <SidebarContent className="bg-white">
            <SidebarMenu>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? "rounded-md bg-gray-200" : ""
                }
              >
                <SidebarMenuItem className="flex flex-row items-center gap-2 rounded-md p-2 hover:bg-gray-200">
                  <House size={18} />
                  <span className="ml-2 text-sm">Home</span>
                </SidebarMenuItem>
              </NavLink>
              <NavLink
                to="/csmform"
                className={({ isActive }) =>
                  isActive ? "rounded-md bg-gray-200" : ""
                }
              >
                <SidebarMenuItem className="flex flex-row items-center gap-2 rounded-md p-2 hover:bg-gray-200">
                  <File size={18} />
                  <span className="ml-2 text-sm">CSM Form</span>
                </SidebarMenuItem>
              </NavLink>
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>
        <div className="w-full p-4">
          <SidebarTrigger size={"lg"} />
          <Outlet />
        </div>
      </SidebarProvider>
    </>
  )
}
