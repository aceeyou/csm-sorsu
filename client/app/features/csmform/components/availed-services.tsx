import { ChevronDown } from "lucide-react"
import { useEffect, useState } from "react"
import { useFormContext } from "react-hook-form"
import { Button } from "~/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "~/components/ui/input-group"

const defaultServices = [
  "Enrollment",
  "Receive Document/s",
  "Document Request",
  "Release of Document/s",
  "Admission for Incoming Student",
  "Scholarship Application",
  "Service Records",
  "Medical",
  "Vehicle Pass Sticker",
  "Nurse Intervention",
  "Internet access",
]

const adsuServices = [
  "Application for Admission Test for Grade 7",
  "Application for College Freshment and Transferees",
  "Application of New Students to The Graduate School",
  "Conduct of Laboratory High School Admission Test",
  "Conduct of College Admission Test",
  "Conduct of Graduate Shcool Admission Test",
  "College Freshmen and Transferees",
  "Graduate School Applicant",
]

const uniReg = [
  "Enrollment - Registrar Assisted - Form Incoming First-Year Tertiary Students",
  "Enrollment - Registrar Assisted",
  "Enrollment - Face-to-Face - For Tertiary Transferee Returnee, Shifter and Irregular Tertiary Students",
  "Processing of Request and Submission of Academic Forms",
  "Application for Graduation",
  "Request of Student Records",
]

const sfasu = [
  "Issuance of Application Form for Scholarship and Financial Assistance",
  "Submission of Documentary Requirements",
  "Facilitate the Release of Financial Assistance and Scholarship Grant",
  "Issuance of Certification of No-Scholarship and Not a Recipient of Tertiary Education Subsidy (TES)",
]

const guidance = [
  "Intake Interview Consultation",
  "Issuance of Certificate of Good Moral Character (CGMC)",
  "Referral Services",
]

const uniLibrary = [
  "Application of Library Card",
  "Internet Access",
  "Online Reference Assistance",
  "Library Circulation",
]

const healthServices = [
  "Nursing Intervention",
  "Medical and Dental Consultation",
  "Tooth Extraction",
  "Issuance of Medical Examination Result",
  "Receiving and Assessment of Medical Requirements for Enrollment of incoming Freshmen/Returnees/Transferees",
]

const safety = [
  "Application for Vehicle Pass Sticker",
  "Endorsement of Insurance Claim",
  "Facilitating Reports and Claims of Lost Items",
  "Providing Security Assistance for Official School Activity",
]

const studentCouncil = [
  "Accreditation of New Student Organization",
  "Re-Accreditation of Student Organization",
]

const nstp = ["Issuance of Certificate of Completion with Serial Number"]

const gradSchool = ["Issuance of Certification"]

const accounting = ["Processing of Claims for Payment", "Clearance"]

const budgetOffice = [
  "Processing of Funding Request and Purchase Orders and Obligation Requests",
]

const cashier = ["Cash and Check Disbursement", "Collection"]

const hrmdo = [
  "Request of Personnel Documents/Records",
  "Application for Employment",
  "Conduct of Assessment of Qualified Applicants",
  "Issuance of Appointment",
  "Processing of Application for Leave of Absence",
]

const ict = [
  "ID Card Application for Existing Students",
  "ID Card Application for Freshmen Students",
]

const recordsOffice = [
  "Receiving, Recording, and Routing Communications",
  "Request for Authentication of Documents",
  "Request for Copies of Documents",
  "Online Dissemination of Issuance & Communications",
  "Process of Archiving Documents",
  "Process of Disposal of Non-Current & In-Active Records",
]

const supplyProperty = ["Procurement Process", "Preparation of Funding Request"]

export default function AvailedServices({ office }: { office: string }) {
  const { setValue } = useFormContext()
  const [services, setServices] = useState<string[]>([])
  const [officeServices, setOfficeServices] = useState<string[]>([])
  const [currentInputValue, setCurrentInputValue] = useState("")

  useEffect(() => {
    // Empties the services list and user input whenever the user changes the office visited
    setServices([])
    setCurrentInputValue("")

    // Changes the officeServices list/state based on the selected office
    switch (office) {
      case "Admission Services Unit":
        setOfficeServices(adsuServices)
        break

      case "Office of the University Registrar":
        setOfficeServices(uniReg)
        break

      case "Scholarship and Financial Assistance Unit":
        setOfficeServices(sfasu)
        break

      case "Guidance and Counceling":
        setOfficeServices(guidance)
        break

      case "Library Services Unit":
        setOfficeServices(uniLibrary)
        break

      case "Health Services Unit":
        setOfficeServices(healthServices)
        break

      case "Safety and Security Services Unit":
        setOfficeServices(safety)
        break

      case "Student Council Affairs":
        setOfficeServices(studentCouncil)
        break

      case "National Service Training Program Office":
        setOfficeServices(nstp)
        break

      case "Graduate School":
        setOfficeServices(gradSchool)
        break

      case "Accounting Office":
        setOfficeServices(accounting)
        break

      case "Budget Office":
        setOfficeServices(budgetOffice)
        break

      case "Cashier's Office":
        setOfficeServices(cashier)
        break

      case "Human Resource Management and Development Office":
        setOfficeServices(hrmdo)
        break

      case "ICT / MIS Office":
        setOfficeServices(ict)
        break

      case "Records Office":
        setOfficeServices(recordsOffice)
        break

      case "Supply and Property Office":
        setOfficeServices(supplyProperty)
        break

      default:
        setOfficeServices(defaultServices)
        break
    }
  }, [office])

  // Updates the services field in the form context whenever the services state changes
  useEffect(() => {
    setValue("services", services)
    setCurrentInputValue("")
  }, [services])

  function onEnter(event: React.KeyboardEvent<HTMLInputElement>) {
    event.preventDefault()
    const newService = event.currentTarget?.value
    setServices((old) => [...old, newService])
  }

  return (
    <div className="my-2">
      <label htmlFor="services" className="text-xs">
        Services Availed
      </label>
      <InputGroup className="flex h-auto flex-wrap gap-2 border border-gray-200 px-2 py-1">
        <InputGroupInput
          id="services"
          type="text"
          value={currentInputValue}
          placeholder="Enter service availed..."
          className="rounded-md border border-gray-200"
          onKeyDown={(e) => e.key === "Enter" && onEnter(e)}
          onChange={(e) => setCurrentInputValue(e.target.value)}
        />
        {services.length > 0 && (
          <InputGroupAddon
            align={"inline-start"}
            className="flex w-full flex-wrap justify-start gap-2"
          >
            {services?.map((service, index) => (
              <Button
                type="button"
                onClick={() => {
                  setServices(
                    services.filter((serviceItem) => serviceItem !== service)
                  )
                }}
                key={index}
                variant={"default"}
                className="max-w-60 justify-start text-start"
              >
                {service}
              </Button>
            ))}
          </InputGroupAddon>
        )}
        <InputGroupAddon align={"inline-end"}>
          <DropdownMenu
          // {...register("services")}
          >
            <DropdownMenuTrigger asChild>
              <Button
                type="button"
                variant={"outline"}
                className="w-50 justify-between"
              >
                <span>Select service...</span> <ChevronDown />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {office &&
                officeServices.map((service) => (
                  <DropdownMenuItem
                    key={service}
                    onClick={() =>
                      setServices((old) =>
                        old.includes(service) ? old : [...old, service]
                      )
                    }
                  >
                    {service}
                  </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </InputGroupAddon>
      </InputGroup>
    </div>
  )
}
