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
      <SidebarProvider>
        <Sidebar
          // collapsible="icon"
          className="p-4"
        >
          <SidebarHeader>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold">SorSU CART</h1>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              <NavLink to="/">
                <SidebarMenuItem className="flex flex-row items-center gap-2 rounded-md p-2 hover:bg-slate-400">
                  <House />
                  <span className="ml-2">Home</span>
                </SidebarMenuItem>
              </NavLink>
              <NavLink to="/csmform">
                <SidebarMenuItem className="flex flex-row items-center gap-2 rounded-md p-2 hover:bg-slate-400">
                  <File />
                  <span className="ml-2">CSM Form</span>
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
