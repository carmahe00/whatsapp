import LoginForm from '../components/auth/LoginForm'

const Login = () => {
  return (
    <div className="h-screen dark:bg-dark_bg_1 flex items-center justify-center py-[19px] overflow-hidden">
      <div className="flex-w w-[1600px] mx-auto h-full">
        <LoginForm />
      </div>
    </div>
  )
}

export default Login