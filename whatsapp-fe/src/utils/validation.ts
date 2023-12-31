import * as Yup from 'yup'
export const signUpSchema = Yup.object({
    name: Yup.string().required("Name is required")
    .matches(/^[a-zA-Z_ ]*$/,{
        message: "No special characters."
    })
    .min(2, "Name must be between 2 and 16 characters.")
    .max(16, "Name must be between 2 and 16 characters."),
    email: Yup.string().required("Email is required").email("Provide valid email."),
    status: Yup.string().max(64,"Status must be less than 64 characters."),
    password: Yup.string().required("Password is required")
    .matches(﻿
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/
        ,{
            message: "Password must be have 6 characters, lowercase, uppercase and special characters."
        })
})