import axios from 'axios';
import { SubmitHandler, useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { Link, useNavigate } from "react-router-dom"

import { signUpSchema } from "../../utils/validation"
import AuthInput from "./AuthInput"
import { useAppDispatch, useAppSelector } from "../../app/store"
import { changeStatus, registerUser, selectUser } from "../../features/userSlice"
import Spinner from "../utils/Spinner"
import { useState } from "react"
import Picture from "./Picture"

type Inputs = {
  name: string,
  email: string,
  password: string,
  status?: string
}
const RegisterForm = () => {
  const dispatchUser = useAppDispatch()
  const navigate = useNavigate()
  const [picture, setPicture] = useState<File>();
  const [readablePicture, setReadablePicture] = useState<string | ArrayBuffer | null>()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(signUpSchema),
  })
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    let res
    dispatchUser(changeStatus("loading"))
    if (picture)
      uploadImage().then(async dataCloud => {
        res = await dispatchUser(registerUser({ ...data, picture: dataCloud.secure_url }))
        if (res && res.payload.user) navigate("/")
      })
    else{

      res = await dispatchUser(registerUser({ ...data, picture: "" }))
      if (res && res.payload.user) navigate("/")
    }
    

  }
  const { status, error } = useAppSelector(rootState => selectUser(rootState));
  const uploadImage = async () => {
    let formData = new FormData()
    if (!process.env.REACT_APP_CLOUD_SECRET || !picture)
      return
    formData.append("upload_preset", process.env.REACT_APP_CLOUD_SECRET!)
    formData.append("file", picture)
    const { data } = await axios.post(`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/image/upload`, formData)
    console.log(data)
    return data
  }
  return (
    <div className='min-h-full w-full flex items-center justify-center overflow-hidden' >
      <div className="w-full max-w-md space-y-8 p-10 dark:bg-dark_bg_2 rounded-xl ">
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
            placeholder="Status (Optional)"
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
          {/* Picture */}
          <Picture
            readablePicture={readablePicture}
            setPicture={setPicture}
            setReadablePicture={setReadablePicture}
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