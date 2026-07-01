import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router"
import { toast } from "sonner"
import { apiClient } from "~/api/client"
import { Button } from "~/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card"
import { Field, FieldGroup, FieldLabel } from "~/components/ui/field"
import { Input } from "~/components/ui/input"

function ForgotPassword() {
  const [emailToReset, setEmailToReset] = useState("")
  const [otpInput, setOTPInput] = useState("")
  const [showOTPInput, setShowOTPInput] = useState(false)
  const navigate = useNavigate()

  const handleSendResetLink = async () => {
    if (emailToReset) {
      setShowOTPInput(true)
      try {
        const res = await apiClient.post("/api/auth/send-otp", {
          email: emailToReset,
        })
        console.log("OTP sent successfully:", res.data)
      } catch (err) {
        console.error("Error sending reset link:", err)
      }
    }

    return
  }

  const handleVerifyOTP = async () => {
    try {
      const res = await axios.post("/api/auth/verify-otp", {
        email: emailToReset,
        otp: otpInput,
      })
      if (res.status === 200) {
        toast.success("OTP verified! You can now reset your password.")
        navigate("/reset-password", { state: { email: emailToReset } })
      }
    } catch (err) {
      toast.error("Invalid OTP. Please try again.")
    }
  }

  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-100">
      <Card className="w-[30%] bg-white">
        <CardHeader>
          <CardTitle className="font-medium">CSM Online Tally</CardTitle>
          <CardTitle className="mt-3 text-lg">Forgot Password?</CardTitle>
          <CardDescription>
            {showOTPInput
              ? "Enter the OTP sent to your email to reset your password."
              : "Enter your email address below and we'll send you a One-Time Password (OTP) to reset your password."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Field>
            {!showOTPInput ? (
              <FieldGroup>
                <FieldLabel htmlFor="emailToReset">Email Address</FieldLabel>
                <Input
                  id="emailToReset"
                  type="email"
                  placeholder="Enter your email address"
                  required
                  value={emailToReset}
                  className="-mt-2"
                  onChange={(e) => setEmailToReset(e.target.value)}
                />
                <Button
                  type="button"
                  className="mt-4 h-8"
                  onClick={handleSendResetLink}
                >
                  Send Reset Link
                </Button>
              </FieldGroup>
            ) : (
              <FieldGroup>
                <FieldLabel htmlFor="otp">OTP</FieldLabel>
                <div className="grid grid-cols-4 gap-2">
                  <Input
                    id="otp"
                    type="text"
                    className="w-full text-center text-lg"
                    value={otpInput}
                    onChange={(e) => setOTPInput(e.target.value)}
                  />
                </div>
                <Button
                  type="button"
                  className="mt-4 h-8"
                  onClick={handleVerifyOTP}
                >
                  Submit
                </Button>
              </FieldGroup>
            )}
          </Field>
        </CardContent>
      </Card>
    </div>
  )
}

export default ForgotPassword
