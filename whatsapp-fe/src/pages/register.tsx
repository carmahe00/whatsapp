import RegisterForm from "../components/auth/RegisterForm"


const Register = () => {
  return (
    <div className="m-h-screen dark:bg-dark_bg_1 flex items-center justify-center py-[19px] overflow-hidden">
      <div className="flex-w w-[1600px] mx-auto h-full">
        <RegisterForm />
      </div>
    </div>
  )
}

export default Register