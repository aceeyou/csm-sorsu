import { Link } from "react-router"
import { Button } from "~/components/ui/button"

export default function Home() {
  return (
    <div className="flex w-full py-10">
      <h1 className="">CART Dashboard coming soon...</h1>
      <Link to="/csmform" className="text-violet-500 underline">
        go to the CSM Form page instead
      </Link>
    </div>
  )
}
