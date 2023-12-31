import React from 'react'
import { FieldError } from 'react-hook-form/dist/types/errors'
import { UseFormRegister } from 'react-hook-form/dist/types'

interface Props {
  name: string,
  type: React.HTMLInputTypeAttribute,
  placeholder: string,
  register: UseFormRegister<any>
  error?: FieldError
}
const AuthInput = ({ name, placeholder, type, register, error }: Props) => {

  return (
    <div className="mt-8 content-center dark:text-dark_text_1 space-y-1 ">
      <label htmlFor={name} className='text-sm font-bold tracking-wide' >
        {placeholder}
      </label>
      <input
        autoComplete={type.toString() === "password" ? "current-passwor" : ""}
        className='w-full dark:bg-dark_bg_3 text-base py-2 px-4 rounded-lg outline-none'
        type={type} placeholder={placeholder} {...register(name)} />
      {error && <p className='text-red-400' >{error.message}</p>}
    </div>
  )
}

export default AuthInput