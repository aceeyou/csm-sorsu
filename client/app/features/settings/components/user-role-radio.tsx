import { ShieldUser, Users } from "lucide-react"
import React from "react"
import { Label } from "~/components/ui/label"
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group"

function UserRoleRadio({
  currentRole,
  setRole,
}: {
  currentRole?: string
  setRole: React.Dispatch<React.SetStateAction<string>>
}) {
  return (
    <RadioGroup
      defaultValue={currentRole || "member"}
      onValueChange={(value) => setRole(value)}
      className="rounded-ld grid grid-cols-3 gap-2 overflow-hidden"
    >
      <div className="flex flex-col justify-between space-x-2 rounded-md border p-2">
        <div className="mb-4 flex items-start justify-between">
          <RadioGroupItem value="member" id="addAsMember" />
          <Users size={18} />
        </div>
        <Label htmlFor="addAsMember">Add as Member</Label>
      </div>
      <div className="flex flex-col justify-between space-x-2 rounded-md border p-2">
        <div className="mb-4 flex items-start justify-between">
          <RadioGroupItem value="secretariat" id="addAsSecretariat" />
          <ShieldUser size={18} />
        </div>
        <Label htmlFor="addAsSecretariat">Add as Secretariat</Label>
      </div>
      <div className="flex flex-col justify-between space-x-2 rounded-md border p-2">
        <div className="mb-4 flex items-start justify-between">
          <RadioGroupItem value="admin" id="addAsAdmin" />
          <ShieldUser size={18} />
        </div>
        <Label htmlFor="addAsAdmin">Add as Admin</Label>
      </div>
    </RadioGroup>
  )
}

export default UserRoleRadio
