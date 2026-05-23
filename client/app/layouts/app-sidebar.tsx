import { Cog, CogIcon, File, House, LogIn, User } from "lucide-react"
import { Link, NavLink, Outlet } from "react-router"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarProvider,
} from "~/components/ui/sidebar"

export default function AppSidebar() {
  const handleLogOut = () => {
    localStorage.removeItem("token")
  }

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
              <div className="h-full">
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
              </div>
              <div className="mt-auto"></div>
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter className="bg-white">
            <NavLink
              to="/settings"
              className={({ isActive }) =>
                isActive ? "rounded-md bg-gray-100" : ""
              }
            >
              <SidebarMenuItem className="mt-auto flex flex-row items-center gap-2 rounded-md p-2 hover:bg-gray-200">
                <CogIcon size={18} />
                <span className="ml-2 text-sm">Settings</span>
              </SidebarMenuItem>
            </NavLink>
            <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive ? "rounded-md bg-gray-200" : ""
              }
            >
              <SidebarMenuItem
                onClick={handleLogOut}
                className="mt-auto flex flex-row items-center gap-2 rounded-md p-2 hover:bg-gray-200"
              >
                <LogIn size={18} />
                <span className="ml-2 text-sm">Log out</span>
              </SidebarMenuItem>
            </NavLink>
          </SidebarFooter>
        </Sidebar>
        <div className="h-svh w-full p-4">
          <Outlet />

          {/* Footer */}
          <div className="mt-30 grid grid-cols-1 gap-10 bg-gray-100 px-10 py-15 text-gray-400 md:grid-cols-4">
            <div>
              <p className="mb-1 text-xs md:text-sm">developed by</p>
              <h1
                // to="https://acelogronio.vercel.app"
                className="cursor-pointer text-sm font-medium text-gray-400 transition duration-150 hover:underline md:text-xl"
              >
                Ace Arwin Logronio
              </h1>
            </div>
            <div></div>
            <div></div>
            <div>
              <Link
                to="https://sorsu.edu.ph"
                className="font-medium hover:underline"
              >
                SorSU Official Website
              </Link>
            </div>
          </div>
        </div>
      </SidebarProvider>
    </>
  )
}
