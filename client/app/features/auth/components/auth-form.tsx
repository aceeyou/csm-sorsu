import { AlertCircleIcon, Eye, EyeClosed } from "lucide-react"
import React, { useEffect, useState } from "react"
// import axios from "axios"
import { Link, useLocation, useNavigate } from "react-router"
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
import FieldRequired from "~/components/field-required"
import { apiClient } from "~/api/client"

function AuthForm() {
  const [submitting, setSubmitting] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [error, setError] = useState({ title: "Login Failed", message: "" })
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (location.state?.message) {
      setError({ title: "Login Failed", message: location.state.message })
    }

    location.state = null
    return () => {
      setError({ title: "", message: "" })
    }
  }, [location])

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
      const res = await apiClient.post("/api/auth/login", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      // console.log("auth: ", res)

      if (res.status === 400) {
        console.log(res.data.message)
        setError({
          title: "Login Failed",
          message:
            res.data.message ||
            "An error occurred during login. Please try again.",
        })
      }

      if (res.status === 200) {
        setSubmitting(false)
        localStorage.setItem("token", res.data.token)
        navigate("/")
      }
    } catch (error: any) {
      setSubmitting(false)
      setError({
        title: "Login Failed",
        message:
          error.response?.data?.message ||
          "An error occurred during login. Please try again.",
      })
    }
  }

  return (
    <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
      <form method="POST" onSubmit={handleSubmit}>
        <FieldGroup>
          <FieldSet>
            <FieldLabel className="-mb-3 text-lg font-semibold">
              Online SorSU CART Login
            </FieldLabel>
            <FieldDescription className="">
              Welcome back, CART Member! Please login
              {error.message && (
                <>
                  <Alert variant="destructive" className="mt-4">
                    <AlertCircleIcon />
                    <AlertTitle>{error.title}</AlertTitle>
                    <AlertDescription>{error.message}</AlertDescription>
                  </Alert>
                </>
              )}
            </FieldDescription>
            <FieldGroup className="">
              <FieldLabel htmlFor="email" className="-mb-2">
                Email <FieldRequired />
              </FieldLabel>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="juan@email.com"
                autoComplete="off"
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
                  type={showPassword ? "text" : "password"}
                  placeholder="*******"
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
                  to="/forgot-password"
                  className="text-xs duration-150 hover:text-purple-500 hover:underline"
                >
                  Forgot Password?
                </Link>
                <Link
                  to="/register"
                  className="text-xs duration-150 hover:text-purple-500 hover:underline"
                >
                  Don't have an account? Register now
                </Link>
              </div>
            </FieldGroup>
            <Button type="submit" className="mt-2 w-full py-5 text-sm">
              {submitting && <Spinner className="mr-2" />}
              Login
            </Button>
          </FieldSet>
        </FieldGroup>
      </form>
    </div>
  )
}

export default AuthForm
