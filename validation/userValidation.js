import * as yup from "yup";

export const userValidationSchema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup.string().length(8).required("Password is required"),
});

export const loginValidationSchema = yup.object({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup
    .string()
    .length(8, "Password must be exactly 8 characters") // you can change to min(8) if needed
    .required("Password is required"),
});
export const forgotValidation = yup.object({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
});
