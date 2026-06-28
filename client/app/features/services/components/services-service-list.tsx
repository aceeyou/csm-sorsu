import axios from "axios"
import { useEffect, useState } from "react"
import { Spinner } from "~/components/ui/spinner"

function ServiceList({ officeType }: { officeType: string }) {
  const [loading, setLoading] = useState(true)
  const [services, setServices] = useState<{
    _id: string
    typeID: string
    services: string[]
  }>({
    _id: "",
    typeID: "",
    services: [],
  })

  useEffect(() => {
    handleFetchServices()
  }, [])

  async function handleFetchServices() {
    const token = localStorage.getItem("token")
    try {
      const res = await axios.get(`/api/services/${officeType}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (res.status === 200) {
        setServices({ ...res.data.services })
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }

    return
  }
  return (
    <>
      {services.services?.length > 0 ? (
        <div className="flex flex-wrap items-center gap-1">
          {loading ? (
            <Spinner />
          ) : (
            services?.services?.map((service) => (
              <span key={service} className="rounded-lg bg-gray-200 px-3 py-1">
                {service}
              </span>
            ))
          )}
        </div>
      ) : (
        <p className="text-gray-400/70">No services found.</p>
      )}
    </>
  )
}

export default ServiceList
