import { Link } from "react-router"
import { useFetchUser } from "~/hooks/use-fetchUser"
import { Skeleton } from "~/components/ui/skeleton"
import CustomSidebar from "~/components/custom-sidebar"
import { toast } from "sonner"
// import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card"

export default function Home() {
  const { data, error } = useFetchUser()

  if (error) toast.error(error)

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

        <div className="mt-10 min-w-125">
          <div className="grid h-30 w-full grid-cols-3 gap-4 gap-y-4 rounded-lg">
            {/* <Card>
              <CardContent className="grid h-full grid-cols-[2fr_2.2fr] items-center justify-between text-center">
                <p className="text-md font-medium">
                  CSM Questionnaire Forms Total Collections (unofficial data)
                </p>

                <p className="pl-4 text-4xl font-semibold">1234</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="grid h-full grid-cols-[2fr_2.2fr] items-center justify-between text-center">
                <p className="text-md font-medium">
                  SorSU's Satisfaction Rate (unofficial data)
                </p>

                <p className="pl-4 text-4xl font-semibold">
                  81.03%{" "}
                  <span className="text-sm text-gray-400">1000 / 1234</span>
                </p>
              </CardContent>
            </Card> */}
            <Skeleton className="rounded-md bg-gray-200" />
            <Skeleton className="rounded-md bg-gray-200" />
            <Skeleton className="rounded-md bg-gray-200" />
          </div>
          <div className="mt-5 grid w-full grid-cols-2 gap-4">
            <Skeleton className="h-80 rounded-lg bg-gray-100" />
            <Skeleton className="grid h-80 w-full grid-cols-1 gap-4 rounded-lg p-4" />
          </div>
          <Skeleton className="mt-4 h-80 rounded-lg bg-gray-100" />
        </div>
        <p className="mt-8 text-sm">
          Dashboard is not yet available. Please visit the{" "}
          <Link to="/csmform" className="text-violet-500 underline">
            CSM Form page
          </Link>{" "}
          for now
        </p>
      </div>
    </div>
  )
}
