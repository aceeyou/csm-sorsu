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

function RegisterForm() {
  const [submitting, setSubmitting] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
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

    try {
      const res = await axios.post(
        "http://localhost:1337/auth/register",
        formData
      )

      if (res.data.status === 400) {
        setError(res.data.message)
        // setFormData({
        //   name: "",
        //   email: "",
        //   password: "",
        // })
      }

      if (res.data.status === 201) {
        setSubmitting(false)
        localStorage.setItem("token", res.data.token)
        navigate("/")
      }
    } catch (error: any) {
      setSubmitting(false)
      // setFormData({
      //   name: "",
      //   email: "",
      //   password: "",
      // })
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
              CSM Tally Registration
            </FieldLabel>
            <FieldDescription>
              Welcome to the Online CART Dashboard!
            </FieldDescription>
            {error && (
              <Alert variant="destructive">
                <AlertCircleIcon />
                <AlertTitle>Registration Failed</AlertTitle>
                <AlertDescription>
                  {error}{" "}
                  <Link to="/login" className="text-purple-500">
                    Log in instead?
                  </Link>
                </AlertDescription>
              </Alert>
            )}
            <FieldGroup className="">
              <FieldLabel htmlFor="name" className="-mb-2">
                Name
              </FieldLabel>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Juan Dela Cruz"
                autoComplete="off"
                value={formData.name}
                onChange={handleInputChange}
              />
            </FieldGroup>
            <FieldGroup className="">
              <FieldLabel htmlFor="email" className="-mb-2">
                Email
              </FieldLabel>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="juan@email.com"
                autoComplete="off"
                value={formData.email}
                onChange={handleInputChange}
              />
            </FieldGroup>
            <FieldGroup>
              <FieldLabel htmlFor="password" className="-mb-2">
                Password
              </FieldLabel>
              <InputGroup>
                <InputGroupInput
                  id="password"
                  name="password"
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
              <div className="flex flex-wrap items-center justify-between">
                <Link
                  to="/login"
                  className="text-xs duration-150 hover:text-purple-500 hover:underline"
                >
                  Already have an account? Login
                </Link>
              </div>
            </FieldGroup>
            <Button type="submit" className="mt-2 w-full py-5 text-sm">
              {submitting && <Spinner className="mr-2" />}
              Register
            </Button>
          </FieldSet>
        </FieldGroup>
      </form>
    </div>
  )
}

export default RegisterForm
