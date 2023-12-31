import { SubmitHandler, useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { signUpSchema } from "../../utils/validation"
import AuthInput from "./AuthInput"
import { useAppSelector } from "../../app/store"
import { selectUser } from "../../features/userSlice"
import Spinner from "../utils/Spinner"
import { Link } from "react-router-dom"
type Inputs = {
  name: string,
  email: string,
  password: string,
  status?: string
}
const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(signUpSchema),
  })
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data)
  const { status } = useAppSelector(rootState => selectUser(rootState));
  return (
    <div className='h-full w-full flex items-center justify-center overflow-hidden' >
      <div className="max-w-md space-y-8 p-10 dark:bg-dark_bg_2 rounded-xl ">
        {/* Heading */}
        <div className="text-center dark:text-dark_text_1">
          <h2 className="mt-6 text-3xl font-bold">Welcome</h2>
          <p className="mt-2 text-sm">Sign Up</p>
        </div>
        {/* form */}
        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-6">
          <AuthInput
            name="name"
            placeholder="Enter name"
            error={errors.name}
            register={register}
            type="text"
          />
          <AuthInput
            name="email"
            placeholder="Enter email"
            error={errors.email}
            register={register}
            type="email"
          />

          <AuthInput
            name="status"
            placeholder="Enter status"
            error={errors.status}
            register={register}
            type="text"
          />

          <AuthInput
            name="password"
            placeholder="Enter password"
            error={errors.password}
            register={register}
            type="password"
          />
          <button
            className="w-full flex justify-center bg-green_1 text-gray-100 p-4 rounded-full tracking-wide
          font-semibold focus:outline-none hover:bg-green_2 shadow-lg cursor-pointer transition ease-in duration-300"
            type="submit" >

            {status == "loading" ?
              <Spinner /> :
              "Sign Up"}
            
          </button>
          <p className="flex flex-col items-center justify-center mt-10 text-center text-md dark:text-dark_text_1">
            <span>have an account ?</span>
            <Link to="/login" className=" hover:underline cursor-pointer transition ease-in duration-1000" > Sign In</Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default RegisterForm