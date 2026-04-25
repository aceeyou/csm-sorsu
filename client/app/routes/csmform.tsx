import { useEffect } from "react"
import { FormProvider, useForm } from "react-hook-form"
import { Form } from "react-router"
import { toast } from "sonner"
import { Button } from "~/components/ui/button"
import { Spinner } from "~/components/ui/spinner"
import LeftPanel from "~/features/csmform/left-panel"
import RightPanel from "~/features/csmform/right-panel"

export default function CSMForm() {
  const methods = useForm()

  useEffect(() => {
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

    // 2. reset all state from formcontext
    methods.reset()

    // 3. reassign the retained values to the respective states
    if (otherOffice) methods.setValue("otherOffice", otherOffice)
    methods.setValue("campus", campus)
    methods.setValue("office", office)
    methods.setValue("services", services)
    methods.setValue("officeCode", officeCode)
    methods.setValue("campusCode", campusCode)
  }

  const onSubmit = async (data: any) => {
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

    const office = methods.getValues("office") === 'Other'
      ? methods.getValues("otherOffice")
      : methods.getValues("office")

    // traverse through the service/s availed by the client
    for (let index = 0; index < listOfServicesAvailed.length; index++) {
      try {
        console.log("before cleanup -> ", data)
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
            date: new Date(
              methods.getValues("dateCollected") || new Date()
            ).toLocaleDateString(),
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
            // TODO: create a system that assigns document control number
            controlNumber: `${methods.getValues("officeCode")}-${methods.getValues("campusCode")}-0000`,
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

  return (
    <div>
      <FormProvider {...methods}>
        <Form onSubmit={methods.handleSubmit(onSubmit)}>
          <div className="flex items-center justify-between">
            <h1 className="mt-2 mb-3 text-xl font-bold">
              CSM Questionnaire Form
            </h1>
            <Button
              disabled={methods.formState.isSubmitting}
              type="submit"
              className="h-10 w-40 cursor-pointer text-sm"
            >
              {methods.formState.isSubmitting && <Spinner />}
              SUBMIT
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-7">
            <LeftPanel />
            <RightPanel />
          </div>

          {/* Submit Button */}
          <div>
            <Button
              disabled={methods.formState.isSubmitting}
              type="submit"
              className="mt-2 h-13 w-full cursor-pointer text-lg font-bold"
            >
              {methods.formState.isSubmitting && <Spinner />}
              SUBMIT
            </Button>
          </div>
        </Form>
      </FormProvider>
    </div>
  )
}
