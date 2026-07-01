import { AlertCircleIcon, Eye, EyeClosed } from "lucide-react"
import { useState } from "react"
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert"
import { Button } from "~/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card"
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldLegend,
} from "~/components/ui/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "~/components/ui/input-group"
import { Spinner } from "~/components/ui/spinner"
// import axios from "axios"
import { useLocation, useNavigate } from "react-router"
import { toast } from "sonner"
import { apiClient } from "~/api/client"

function ResetPassword() {
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const { email } = useLocation().state || {}
  const navigate = useNavigate()
  async function handleResetPassword() {
    setError("")
    setLoading(true)
    try {
      if (newPassword !== confirmPassword) {
        setError("Passwords do not match")
        return
      }

      const res = await apiClient.post("/api/auth/reset-password", {
        email,
        newPassword,
      })
      if (res.status === 200) {
        toast.success(
          "Password reset successful! Please log in with your new password."
        )
        navigate("/login")
      }
    } catch (error) {
      setError("Failed to reset password")
      console.log("Reset password error: ", error)
    } finally {
      setLoading(false)
    }
  }
  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-100">
      <Card className="w-[30%] bg-white">
        <CardHeader>
          <CardTitle className="font-medium">CSM Online Tally</CardTitle>
          <CardTitle className="mt-3 text-lg">Reset Password</CardTitle>
          <CardDescription>Enter your new password below.</CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircleIcon />
              <AlertTitle>Failed to reset password</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <form
            method="POST"
            onSubmit={(e) => {
              e.preventDefault()
              handleResetPassword()
            }}
          >
            <Field className="mt-2">
              <FieldGroup className="mb-2">
                <FieldLabel htmlFor="newPassword">New Password</FieldLabel>
                <InputGroup className="-mt-2">
                  <InputGroupInput
                    id="newPassword"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your new password"
                    value={newPassword}
                    required
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                  <InputGroupAddon
                    align="inline-end"
                    onClick={() => setShowPassword(!showPassword)}
                    className="cursor-pointer"
                  >
                    {showPassword ? <Eye /> : <EyeClosed />}
                  </InputGroupAddon>
                </InputGroup>
              </FieldGroup>
              <FieldGroup>
                <FieldLabel htmlFor="confirmPassword">
                  Confirm Password
                </FieldLabel>
                <InputGroup className="-mt-2">
                  <InputGroupInput
                    id="confirmPassword"
                    type={showPassword ? "text" : "password"}
                    placeholder="Confirm your new password"
                    value={confirmPassword}
                    required
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <InputGroupAddon
                    align="inline-end"
                    onClick={() => setShowPassword(!showPassword)}
                    className="cursor-pointer"
                  >
                    {showPassword ? <Eye /> : <EyeClosed />}
                  </InputGroupAddon>
                </InputGroup>
              </FieldGroup>
            </Field>

            <CardFooter className="-p-4 mt-8">
              <Button className="h-10 w-full">
                {loading && <Spinner />}
                Reset Password
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default ResetPassword
