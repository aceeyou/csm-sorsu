import { FormProvider, useForm } from "react-hook-form"
import { Form, useNavigate } from "react-router"
import { toast } from "sonner"
import { Button } from "~/components/ui/button"
import LeftPanel from "~/features/csmform/left-panel"
import RightPanel from "~/features/csmform/right-panel"

export default function CSMForm() {
  const methods = useForm()

  const onSubmit = (data: any) => {
    // Checks if services is empty
    if (
      methods.getValues("services") === undefined ||
      methods.getValues("services").length === 0
    ) {
      toast.error("Must select at least 1 service to record the CSM response", {
        position: "top-right",
      })
      return
    }

    // Check if CC or SQD has a response from the client
    if (
      methods.getValues("sqd").length === 0 ||
      methods.getValues("cc").length === 0
    ) {
      toast.error(
        "Must answer at least 1 SQD and CC to record the CSM response",
        {
          position: "top-right",
        }
      )
      return
    }

    try {
      console.log(data)
      toast.success("Form Submitted", { position: "top-right" })

      // Reset Fields
      handleResetOfFields()
    } catch (error) {
      toast.error("Form failed to submit. Please try again", {
        position: "top-right",
      })
    }
  }

  function handleResetOfFields() {
    // Reset Fields
    methods.resetField("clientType")
    methods.resetField("clientSex")
    methods.resetField("clientAge")
    methods.resetField("cc")
    methods.resetField("sqd")
    methods.resetField("dissatisfactionReason")
    methods.resetField("feedbackSuggestions")

    console.log("after reset: ", methods.getValues())
    //
  }

  return (
    <div className="">
      <FormProvider {...methods}>
        <Form onSubmit={methods.handleSubmit(onSubmit)}>
          <div className="flex items-center justify-between">
            <h1 className="mt-2 mb-3 text-xl font-bold">
              CSM Questionnaire Form
            </h1>
            <Button type="submit" className="h-8 w-30 text-sm">
              Submit
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-7">
            <LeftPanel />
            <RightPanel />
          </div>
        </Form>
      </FormProvider>
    </div>
  )
}
