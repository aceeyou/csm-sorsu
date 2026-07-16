import { Link, useNavigate } from "react-router"
import { useFetchUser } from "~/hooks/use-fetchUser"
import { Skeleton } from "~/components/ui/skeleton"
import CustomSidebar from "~/components/custom-sidebar"
import { toast } from "sonner"
import { apiClient } from "~/api/client"
import { useEffect, useState } from "react"
import { HeartPulse, SquareLibrary } from "lucide-react"
import { Spinner } from "~/components/ui/spinner"

export default function Home() {
  const { data, error } = useFetchUser()
  const [loadingDashboard, setLoadingDashboard] = useState(false)
  const [totalResponses, setTotalResponses] = useState<number | null>(null)
  const [overallRatingSQD0, setOverallRatingSQD0] = useState<number | null>(
    null
  )

  useEffect(() => {
    setLoadingDashboard(true)
    GetTotalCSMResponses()
    GetOverallRatingSQD0()

    if (error) {
      toast.error("Session Expired. Please log in again")
    }
  }, [])

  async function GetTotalCSMResponses() {
    try {
      const res = await apiClient.get("/api/gettotalresponses")
      setTotalResponses(res.data.totalResponses)
    } catch (error) {
      console.log(error)
    }
  }

  async function GetOverallRatingSQD0() {
    try {
      const res = await apiClient.get("/api/overallratingsqd0")
      setOverallRatingSQD0(res.data.overallRatingSQD0)
    } catch (error) {
      console.log(error)
    } finally {
      setLoadingDashboard(false)
    }
  }

  return (
    <div>
      {/* header */}
      <div className="flex items-center gap-2">
        <CustomSidebar />
        <p className="text-sm font-medium">Home</p>
      </div>
      <div className="mt-5">
        <div className="">
          <p className="text-lg font-semibold">Hello, {data?.name}! </p>
          <p className="text-sm font-normal text-gray-400">
            Here are some insights about the CSM Questionnaire Responses.
          </p>
        </div>

        <div className="mt-10 grid min-w-115 gap-4">
          <div className="sm:grid-col-1 grid w-full gap-4 rounded-lg md:grid-cols-2 lg:grid-cols-3">
            <div className="flex h-30 cursor-default flex-col justify-between rounded-xl border px-4 py-3">
              <h2 className="flex items-center justify-between text-[0.7rem] text-gray-900">
                Total CSM Responses for {new Date().getFullYear()}
                <span>
                  <SquareLibrary size={18} />
                </span>
              </h2>
              <div>
                <p
                  className="font-['Bowlby One'] -mb-0.5 text-2xl text-[#1c1c1c] lg:text-4xl"
                  style={{ fontFamily: "'Bowlby One', sans-serif" }}
                >
                  {loadingDashboard ? (
                    <Spinner />
                  ) : (
                    (Number(totalResponses) || 0).toLocaleString()
                  )}
                </p>
                <p className="leading-0.2 truncate text-[0.65rem] text-gray-400">
                  vs 0000 collected responses during the previous year
                </p>
              </div>
            </div>
            <div className="flex h-30 cursor-default flex-col justify-between rounded-xl border px-4 py-3">
              <h2 className="flex items-center justify-between text-[0.7rem] text-gray-900">
                Overall Rating (SQD0) for {new Date().getFullYear()}
                <HeartPulse size={18} />
              </h2>
              <div>
                <p
                  className="font-['Bowlby One'] -mb-0.5 text-2xl text-[#1c1c1c] lg:text-4xl"
                  style={{ fontFamily: "'Bowlby One', sans-serif" }}
                >
                  {loadingDashboard ? (
                    <Spinner className="size-6" />
                  ) : (
                    (Number(overallRatingSQD0) || "0").toLocaleString()
                  )}{" "}
                  %
                </p>
                <p className="leading-0.2 truncate text-[0.65rem] text-gray-400">
                  vs 00.00 % rating of the previous year
                </p>
              </div>
            </div>
            <Skeleton className="h-30 rounded-xl border" />
          </div>

          <div className="sm:grid-col-1 grid w-full gap-4 rounded-lg md:grid-cols-2">
            <Skeleton className="h-50 rounded-xl border" />
            <Skeleton className="h-50 rounded-xl border" />
          </div>
        </div>

        <div className="mt-8">
          <p className="text-sm">
            Dashboard is not yet available. Please visit the{" "}
            <Link to="/csmform" className="text-violet-500 underline">
              CSM Form page
            </Link>{" "}
            for now
          </p>
        </div>
      </div>
    </div>
  )
}
