import {
  Briefcase,
  Building2,
  CogIcon,
  File,
  GraduationCap,
  House,
} from "lucide-react"
import { useState } from "react"
import { Link, NavLink, Outlet } from "react-router"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "~/components/ui/sidebar"

export default function AppSidebar() {
  const { state } = useSidebar()
  return (
    <>
      <Sidebar collapsible="icon" className="bg-white p-2 pt-4">
        <SidebarHeader className="-p-2 bg-white">
          <SidebarMenu className="">
            <SidebarMenuItem>
              <SidebarMenuButton>
                <GraduationCap size={20} />
                <span className="text-sm font-bold">SorSU CART</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent className="bg-white pt-4">
          <SidebarMenu>
            <SidebarMenuItem
              className={`flex flex-row items-center rounded-md ${state === "collapsed" ? "hover:bg-red-500" : "hover:bg-gray-200"} `}
            >
              <SidebarMenuButton asChild className="p-0">
                <NavLink to="/" end className={``}>
                  {({ isActive }) => (
                    <div
                      className={`flex w-full flex-row items-center gap-2 p-2 group-data-[state=collapsed]:p-0 ${isActive && state === "expanded" ? "bg-red-800" : ""}`}
                    >
                      <House
                        strokeWidth={
                          state === "collapsed" && isActive ? 2.5 : 2
                        }
                        size={18}
                        color={
                          state === "collapsed" && isActive
                            ? "maroon"
                            : isActive
                              ? "white"
                              : "gray"
                        }
                      />
                      <span
                        className={`ml-2 text-sm ${isActive ? "text-white" : "text-black"}`}
                      >
                        Home
                      </span>
                    </div>
                  )}
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem
              className={`flex flex-row items-center rounded-md hover:bg-gray-200`}
            >
              <SidebarMenuButton asChild className="p-0">
                <NavLink to="/csmform" end>
                  {({ isActive }) => (
                    <div
                      className={`flex w-full flex-row items-center gap-2 p-2 group-data-[state=collapsed]:p-0 ${isActive && state === "expanded" ? "bg-red-800" : ""}`}
                    >
                      <File
                        strokeWidth={
                          state === "collapsed" && isActive ? 2.5 : 2
                        }
                        size={18}
                        color={
                          state === "collapsed" && isActive
                            ? "maroon"
                            : isActive
                              ? "white"
                              : "gray"
                        }
                      />
                      <span
                        className={`ml-2 text-sm ${isActive ? "text-white" : "text-black"}`}
                      >
                        CSM Form
                      </span>
                    </div>
                  )}
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem className="flex flex-row items-center rounded-md hover:bg-gray-200">
              <SidebarMenuButton asChild className="p-0">
                <NavLink
                  to="/offices"
                  end
                  className={({ isActive }) =>
                    `${state === "collapsed" && isActive ? "bg-red-800" : "bg-transparent"}`
                  }
                >
                  {({ isActive }) => (
                    <div
                      className={`flex w-full flex-row items-center gap-2 p-2 group-data-[state=collapsed]:p-0 ${isActive && state === "expanded" ? "bg-red-800" : ""}`}
                    >
                      <Building2
                        strokeWidth={
                          state === "collapsed" && isActive ? 2.5 : 2
                        }
                        size={18}
                        color={
                          state === "collapsed" && isActive
                            ? "maroon"
                            : isActive
                              ? "white"
                              : "gray"
                        }
                      />
                      <span
                        className={`ml-2 text-sm ${isActive ? "text-white" : "text-black"}`}
                      >
                        Offices
                      </span>
                    </div>
                  )}
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem className="flex flex-row items-center rounded-md hover:bg-gray-200">
              <SidebarMenuButton asChild className="p-0">
                <NavLink
                  to="/services"
                  end
                  className={({ isActive }) =>
                    `${state === "collapsed" && isActive ? "bg-red-800" : "bg-transparent"}`
                  }
                >
                  {({ isActive }) => (
                    <div
                      className={`flex w-full flex-row items-center gap-2 p-2 group-data-[state=collapsed]:p-0 ${isActive && state === "expanded" ? "bg-red-800" : ""}`}
                    >
                      <Briefcase
                        strokeWidth={
                          state === "collapsed" && isActive ? 2.5 : 2
                        }
                        size={18}
                        color={
                          state === "collapsed" && isActive
                            ? "maroon"
                            : isActive
                              ? "white"
                              : "gray"
                        }
                      />
                      <span
                        className={`ml-2 text-sm ${isActive ? "text-white" : "text-black"}`}
                      >
                        Services
                      </span>
                    </div>
                  )}
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter className="-p-2 bg-white pb-4">
          <SidebarMenu>
            <SidebarMenuItem className="flex flex-row items-center gap-2 rounded-md hover:bg-gray-200">
              <SidebarMenuButton asChild className="p-0">
                <NavLink
                  to="/settings"
                  className={({ isActive }) =>
                    `${state === "collapsed" && isActive ? "bg-red-800" : "bg-transparent"}`
                  }
                >
                  {({ isActive }) => (
                    <div
                      className={`flex w-full flex-row items-center gap-2 p-2 group-data-[state=collapsed]:p-0 ${isActive && state === "expanded" ? "bg-red-800" : ""}`}
                    >
                      <CogIcon
                        strokeWidth={
                          state === "collapsed" && isActive ? 2.5 : 2
                        }
                        size={18}
                        color={
                          state === "collapsed" && isActive
                            ? "maroon"
                            : isActive
                              ? "white"
                              : "gray"
                        }
                      />
                      <span
                        className={`ml-2 text-sm ${isActive ? "text-white" : "text-black"}`}
                      >
                        Settings
                      </span>
                    </div>
                  )}
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <div className="w-full p-4">
        <SidebarInset className="h-full">
          <Outlet />
        </SidebarInset>

        {/* Footer */}
        <div className="mt-20 grid grid-cols-1 gap-10 bg-gray-100 px-10 py-15 text-gray-400 md:grid-cols-3">
          <div>
            <p className="mb-1 text-xs md:text-sm">developed by</p>
            <h1
              // to="https://acelogronio.vercel.app"
              className="md:text-md cursor-pointer text-sm font-medium text-gray-400 transition duration-150 hover:underline"
            >
              Ace Arwin Logronio
            </h1>
          </div>
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
    </>
  )
}
