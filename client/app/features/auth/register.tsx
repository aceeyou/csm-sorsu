import RegisterForm from "./components/register-form"

function Register() {
  return (
    <div className="flex h-svh w-full items-center justify-center bg-gray-200">
      <div className="flex h-auto w-[60%] justify-center">
        <RegisterForm />
      </div>
    </div>
  )
}

export default Register
