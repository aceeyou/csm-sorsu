import FieldRequired from "~/components/field-required"
import { FieldGroup } from "~/components/ui/field"
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"
import CampusSelect from "./components/campus-select"
import OfficeTypeSelect from "./components/office-type-select"

interface FieldsType {
  _id?: string
  office: string
  alias: string
  campus: string[]
  type: string
}

interface OfficeType {
  office: FieldsType
  fields: FieldsType
  setFields: React.Dispatch<React.SetStateAction<FieldsType>>
}

function OfficeForm({ office, fields, setFields }: OfficeType) {
  return (
    <form method="POST">
      <FieldGroup className="">
        <Label htmlFor="officeName">
          Name of Office <FieldRequired />
        </Label>
        <Input
          value={fields.office || office.office}
          autoFocus
          className="-mt-3"
          id="officeName"
          name="officeName"
          placeholder="Office of the President"
          type="text"
          onChange={(e) =>
            setFields((cur) => ({
              ...cur,
              office: e.target.value,
            }))
          }
        />
      </FieldGroup>
      <FieldGroup className="mt-3">
        <Label htmlFor="alias">
          Alias
          <FieldRequired />
        </Label>
        <Input
          value={fields.alias || office.alias}
          className="-mt-3"
          id="alias"
          name="alias"
          placeholder="OP"
          type="text"
          onChange={(e) =>
            setFields((cur) => ({
              ...cur,
              alias: e.target.value,
            }))
          }
        />
      </FieldGroup>

      {/* Campus Selection */}
      <FieldGroup className="mt-3">
        <Label htmlFor="campus" className="-mb-3">
          Campus Located
          <FieldRequired />
        </Label>
        <CampusSelect campuses={fields.campus} setFields={setFields} />
      </FieldGroup>

      {/* Type of Office Selction */}
      <FieldGroup className="mt-3">
        <Label htmlFor="officeName" className="-mb-3">
          Type of Office <FieldRequired />
        </Label>
        <OfficeTypeSelect fields={fields} setFields={setFields} />
      </FieldGroup>
    </form>
  )
}

export default OfficeForm
