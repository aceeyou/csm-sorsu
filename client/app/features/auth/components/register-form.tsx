import { AlertCircleIcon, Eye, EyeClosed } from "lucide-react"
import React, { useState } from "react"
import axios from "axios"
import { Link, useNavigate } from "react-router"
import { Button } from "~/components/ui/button"
import {
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "~/components/ui/field"
import { Input } from "~/components/ui/input"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "~/components/ui/input-group"
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert"
import { Spinner } from "~/components/ui/spinner"
import { toast } from "sonner"
import FieldRequired from "~/components/field-required"

function RegisterForm() {
  const [submitting, setSubmitting] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitting(true)

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match")
      setSubmitting(false)
      return
    }

    try {
      const res = await axios.post("/api/auth/register", formData)

      if (res.status === 400) {
        setError(res.data.message)
      }

      if (res.status === 201) {
        localStorage.setItem("token", res.data.token)
        setSubmitting(false)
        toast.success("Registration successful! Logging you in.")
        navigate("/")
      }
    } catch (error: any) {
      setSubmitting(false)
      toast.error("Registration failed. Please try again.")
      setError(
        error?.response?.data?.message ||
          "An error occurred during registration. Please try again."
      )
    }
  }

  return (
    <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
      <form onSubmit={handleSubmit}>
        <FieldGroup>
          <FieldSet>
            <FieldLabel className="-mb-3 text-lg font-semibold">
              Online SorSU CART Registration
            </FieldLabel>
            <FieldDescription>
              Welcome to the Online CART Dashboard!
            </FieldDescription>
            {error && (
              <Alert variant="destructive">
                <AlertCircleIcon />
                <AlertTitle>Registration Failed</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <FieldGroup className="">
              <FieldLabel htmlFor="name" className="-mb-2">
                Name <FieldRequired />
              </FieldLabel>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Juan Dela Cruz"
                autoComplete="off"
                required
                value={formData.name}
                onChange={handleInputChange}
              />
            </FieldGroup>
            <FieldGroup className="">
              <FieldLabel htmlFor="email" className="-mb-2">
                Email <FieldRequired />
              </FieldLabel>
              <Input
                id="email"
                name="email"
                type="email"
                required
                placeholder="juan@email.com"
                autoComplete="off"
                value={formData.email}
                onChange={handleInputChange}
              />
            </FieldGroup>
            <FieldGroup>
              <FieldLabel htmlFor="password" className="-mb-2">
                Password <FieldRequired />
              </FieldLabel>
              <InputGroup>
                <InputGroupInput
                  id="password"
                  name="password"
                  required
                  type={showPassword ? "text" : "password"}
                  placeholder="*******"
                  value={formData.password}
                  onChange={handleInputChange}
                />
                <InputGroupAddon align="inline-end">
                  <Button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    variant="ghost"
                    // size="icon-sm"
                  >
                    {showPassword ? <Eye /> : <EyeClosed />}
                  </Button>
                </InputGroupAddon>
              </InputGroup>
            </FieldGroup>
            <FieldGroup>
              <FieldLabel htmlFor="confirmPassword" className="-mb-2">
                Confirm Password <FieldRequired />
              </FieldLabel>
              <InputGroup>
                <InputGroupInput
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  placeholder="*******"
                  value={formData.confirmPassword || ""}
                  onChange={handleInputChange}
                />

                <InputGroupAddon align="inline-end">
                  <Button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    variant="ghost"
                    // size="icon-sm"
                  >
                    {showPassword ? <Eye /> : <EyeClosed />}
                  </Button>
                </InputGroupAddon>
              </InputGroup>
              {formData.confirmPassword === formData.password ? null : (
                <p className="-mt-3.5 text-[0.7rem] text-destructive">
                  Passwords do not match
                </p>
              )}
            </FieldGroup>
            <Button type="submit" className="mt-4 w-full py-5 text-sm">
              {submitting && <Spinner className="mr-2" />}
              Register
            </Button>
            <Link
              to="/login"
              className="text-center text-xs duration-150 hover:text-purple-500 hover:underline"
            >
              Already have an account? Login
            </Link>
          </FieldSet>
        </FieldGroup>
      </form>
    </div>
  )
}

export default RegisterForm
