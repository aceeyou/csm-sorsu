import { Link } from "react-router"
import { SidebarTrigger } from "~/components/ui/sidebar"

export default function Home() {
  return (
    <div className="h-svh w-full">
      <SidebarTrigger size={"lg"} type="button" />
      <div className="mt-10">
        <h1 className="">CART Dashboard coming soon...</h1>
        <Link to="/csmform" className="text-violet-500 underline">
          go to the CSM Form page instead
        </Link>
      </div>
    </div>
  )
}
