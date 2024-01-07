
import { SubmitHandler, useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { Link, useNavigate } from "react-router-dom"

import { signInSchema } from "../../utils/validation"
import AuthInput from "./AuthInput"
import { useAppDispatch, useAppSelector } from "../../app/store"
import { changeStatus, loginUser, selectUser } from "../../features/userSlice"
import Spinner from "../utils/Spinner"

type Inputs = {
  email: string,
  password: string,
}
const LoginForm = () => {
  const dispatchUser = useAppDispatch()
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(signInSchema),
  })
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    let res
    dispatchUser(changeStatus("loading"))
    res = await dispatchUser(loginUser({ ...data }))
    if (res && res.payload.user) navigate("/")
  }
  const { status, error } = useAppSelector(rootState => selectUser(rootState));
  
  return (
    <div className='min-h-full w-full flex items-center justify-center overflow-hidden' >
      <div className="w-full max-w-md space-y-8 p-10 dark:bg-dark_bg_2 rounded-xl ">
        {/* Heading */}
        <div className="text-center dark:text-dark_text_1">
          <h2 className="mt-6 text-3xl font-bold">Welcome back</h2>
          <p className="mt-2 text-sm">Sign In</p>
        </div>
        {/* form */}
        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-6">
          
          <AuthInput
            name="email"
            placeholder="Enter email"
            error={errors.email}
            register={register}
            type="email"
          />

          <AuthInput
            name="password"
            placeholder="Enter password"
            error={errors.password}
            register={register}
            type="password"
          />
         
          {/* if we ahve an error */}
          {
            error && typeof error === "string" ?
              <div >
                <p className="text-red-400">{error}</p>
              </div> :
              Array.isArray(error) && <div >
                {error.map((err: any) => (
                  <>
                    <p className="text-red-400">{err.msg} {", "}</p>
                  </>
                ))}
              </div>
          }
          <button
            className="w-full flex justify-center bg-green_1 text-gray-100 p-4 rounded-full tracking-wide
          font-semibold focus:outline-none hover:bg-green_2 shadow-lg cursor-pointer transition ease-in duration-300"
            type="submit" >

            {status === "loading" ?
              <Spinner /> :
              "Sign in"}

          </button>
          <p className="flex flex-col items-center justify-center mt-10 text-center text-md dark:text-dark_text_1">
            <span>Do you not have an account ?</span>
            <Link to="/register" className=" hover:underline cursor-pointer transition ease-in duration-1000" > Sign Up</Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default LoginForm