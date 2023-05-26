import * as yup from "yup";

const passwordPattern = new RegExp(
  "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,25})"
);

const errorMessage = "use lowercase, uppercase, digits and symbols!";

const loginSchema = yup.object().shape({
  username: yup.string().min(5).max(30).required("username is required"),
  password: yup
    .string()
    .min(8)
    .max(25)
    .matches(passwordPattern, { message: errorMessage })
    .required(),
});

export default loginSchema;
