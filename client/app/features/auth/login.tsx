import React from "react"
import AuthForm from "./components/auth-form"
import Showcase from "./components/showcase"

function Login() {
  return (
    <div className="flex h-svh w-full items-center justify-center bg-gray-200">
      {/* <div className=""> */}
      {/* <Showcase /> */}
      <AuthForm />
      {/* </div> */}
    </div>
  )
}

export default Login
