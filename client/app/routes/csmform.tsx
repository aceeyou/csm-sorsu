import axios from "axios"
import { Check } from "lucide-react"
import { useEffect, useState } from "react"
import { FormProvider, useForm } from "react-hook-form"
import { Form, useNavigate } from "react-router"
import { toast } from "sonner"
import { apiClient } from "~/api/client"
import CustomSidebar from "~/components/custom-sidebar"
import { Button } from "~/components/ui/button"
import { Spinner } from "~/components/ui/spinner"
import LeftPanel from "~/features/csmform/left-panel"
import RightPanel from "~/features/csmform/right-panel"

export default function CSMForm() {
  const methods = useForm()
  const [error, setError] = useState("")
  // const [downloading, setDownloading] = useState(false)
  const [user, setUser] = useState({
    name: "",
    email: "",
  })
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem("token")
    const handleGetUserData = async () => {
      try {
        const res = await apiClient.get("/api/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        if (res.status === 200) {
          setUser({
            name: res.data.name,
            email: res.data.email,
          })
        }
      } catch (error) {
        setError("Session expired. Please log in again.")
        navigate("/login")
      }
    }

    handleGetUserData()
  }, [])

  useEffect(() => {
    if (
      methods.getValues("services") === undefined ||
      methods.getValues("services").length === 0
    ) {
      return
    }

    if (methods.formState.isSubmitSuccessful) {
      formStateResetter()
    }
  }, [methods.formState.isSubmitSuccessful])

  function formStateResetter() {
    // 1. retain the campus, office, and services values
    const campus = methods.getValues("campus")
    const office = methods.getValues("office")
    const services = methods.getValues("services")
    const otherOffice = methods.getValues("otherOffice")
    const officeCode = methods.getValues("officeCode")
    const campusCode = methods.getValues("campusCode")
    const sqdToggleValue = methods.getValues("toggle-sqd-values")
    const ccToggleValue = methods.getValues("toggle-cc-values")
    const sqd =
      methods.getValues("toggle-sqd-values") === "on"
        ? methods.getValues("sqd")
        : []
    const cc =
      methods.getValues("toggle-cc-values") === "on"
        ? methods.getValues("cc")
        : []

    // 2. reset all state from formcontext
    methods.reset(undefined, { keepDirty: true })

    // 3. reassign the retained values to the respective states
    if (otherOffice) methods.setValue("otherOffice", otherOffice)
    methods.setValue("campus", campus)
    methods.setValue("office", office)
    methods.setValue("services", services)
    methods.setValue("officeCode", officeCode)
    methods.setValue("campusCode", campusCode)
    methods.setValue("sqd", sqd)
    methods.setValue("cc", cc)
    methods.setValue("toggle-sqd-values", sqdToggleValue)
    methods.setValue("toggle-cc-values", ccToggleValue)
  }

  async function onSubmit(data: any) {
    // Checks if services is empty
    if (
      methods.getValues("services") === undefined ||
      methods.getValues("services").length === 0
    ) {
      toast.error("Must select at least 1 service to record the CSM response")
      return
    }

    // Checks if CC or SQD has a response from the client
    if (
      methods.getValues("sqd").length === 0 &&
      methods.getValues("cc").length === 0
    ) {
      toast.error("Must answer at least 1 SQD or CC to record the CSM response")
      return
    }

    // get the arrays from the form
    const listOfServicesAvailed = methods.getValues("services")
    const cc = methods.getValues("cc")
    const sqd = methods.getValues("sqd")

    const office =
      methods.getValues("office") === "Other"
        ? methods.getValues("otherOffice")
        : methods.getValues("office")

    // Console log what is being sent to the database/spreadsheet
    // console.log(methods.getValues())
    // return

    // traverse through the service/s availed by the client
    for (let index = 0; index < listOfServicesAvailed.length; index++) {
      try {
        await fetch("https://csm-sorsu-server.vercel.app/postcsmresponse", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            //!!! DO N0T MOVE. IT IS IN EXACT ORDER
            timestamp: `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`,
            campus: methods.getValues("campus") || "",
            office: office || "",
            service: listOfServicesAvailed[index] || "",
            date:
              new Date(
                methods.getValues("dateCollected")
              ).toLocaleDateString() || "",
            citizenType: methods.getValues("citizenType") || "",
            clientAge: methods.getValues("clientAge") || "",
            clientSex: methods.getValues("clientSex") || "",
            cc1: cc[0] || "",
            cc2: cc[1] || "",
            cc3: cc[2] || "",
            sqd0: sqd[0] || "",
            sqd1: sqd[1] || "",
            sqd2: sqd[2] || "",
            sqd3: sqd[3] || "",
            sqd4: sqd[4] || "",
            sqd5: sqd[5] || "",
            sqd6: sqd[6] || "",
            sqd7: sqd[7] || "",
            sqd8: sqd[8] || "",
            dissastifactionReason:
              methods.getValues("dissatisfactionReason") || "",
            feedbackSuggestions: methods.getValues("feedbackSuggestions") || "",
            // TODO : Determine if the last three properties are necessary in recording the CSM Responses
            controlNumber: `${methods.getValues("officeCode")}-${methods.getValues("campusCode")}-${Date.now()}${Math.random().toString(36).slice(2, 9)}`,
            secretariat: user.name,
            secretariatEmail: user.email,
          }),
        })
          .then((res) => res.json())
          .then((res) => {
            toast.success(res.message)
          })
      } catch (error) {
        toast.error("Form failed to submit. Please try again")
      }
    }
  }

  // const handleDownloadSpreadSheet = async () => {
  //   setDownloading(true)
  //   try {
  //     const token = localStorage.getItem("token")
  //     const res = await axios.get("/api/spreadsheet/download", {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //       responseType: "blob", // Important for handling binary data
  //     })
  //     if (res.status === 200) {
  //       toast.success(
  //         "Spreadsheet downloaded successfully. Check your downloads folder"
  //       )
  //     }
  //     setDownloading(false)
  //   } catch (error) {
  //     console.log("download error: ", error)
  //     toast.error("Failed to download spreadsheet. Please try again.")
  //     setDownloading(false)
  //   }
  // }

  return (
    <div>
      <FormProvider {...methods}>
        <Form onSubmit={methods.handleSubmit(onSubmit)}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 md:gap-3">
              <CustomSidebar />
              <h1 className="text:sm mt-2 mb-3 font-semibold md:text-lg md:font-bold">
                CSM Questionnaire Form
              </h1>
            </div>
            <div className="hidden items-center gap-2 md:flex md:gap-3">
              {/* ! SAVE FOR LATER ! */}

              {/* DOWNLOAD SPREADSHEET BUTTON */}
              {/* <Button
                className="h-8 cursor-pointer text-xs md:h-10"
                variant="outline"
                disabled={downloading}
                type="button"
                onClick={handleDownloadSpreadSheet}
              >
                {downloading && <Spinner />}
                Download Spreadsheet
              </Button> */}
              {/* <Link
                to="https://docs.google.com/spreadsheets/d/1fmt8wFcMBGBEUH3AdFZeQ8XeJKmwPUS-esiWqPPPGes/edit?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
              >
                Download Spreadsheet
              </Link> */}
              <Button
                disabled={methods.formState.isSubmitting}
                type="submit"
                className="flex h-8 w-20 cursor-pointer gap-3 text-xs md:h-10 md:w-40 md:text-sm"
              >
                {methods.formState.isSubmitting && <Spinner />}
                SUBMIT
              </Button>
            </div>
          </div>
          {/* ACTUAL FORM */}
          <div className="grid grid-cols-1 md:mt-4 md:grid-cols-2 md:gap-7">
            <LeftPanel />
            <RightPanel />
          </div>

          {/* Submit Button */}
          <div>
            <Button
              disabled={methods.formState.isSubmitting}
              type="submit"
              className="mt-8 h-13 w-full cursor-pointer text-lg font-bold md:mt-5"
            >
              {methods.formState.isSubmitting && <Spinner />}
              SUBMIT CLIENT RESPONSE
            </Button>
          </div>
        </Form>
      </FormProvider>
    </div>
  )
}
