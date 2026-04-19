import { FormProvider, useForm } from "react-hook-form"
import { Form } from "react-router"
import { Button } from "~/components/ui/button"
import LeftPanel from "~/features/csmform/left-panel"
import RightPanel from "~/features/csmform/right-panel"

export default function CSMForm() {
  const methods = useForm()

  const onSubmit = (data: any) => {
    console.log(data)
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
