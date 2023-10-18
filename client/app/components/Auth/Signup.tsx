import { styles } from "../../../app/styles/style";
import { useFormik } from "formik";
import React, { FC, useState } from "react";
import * as Yup from "yup";
import {
  AiFillGithub,
  AiOutlineEye,
  AiOutlineEyeInvisible,
} from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";

type Props = {
  setRoute: (route: string) => void;
};

const schema = Yup.object().shape({
  name: Yup.string().required("Please enter your name"),
  email: Yup.string()
    .email("Invalid email")
    .required("Please enter your email"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Please enter your password"),
});

const Signup: FC<Props> = ({ setRoute }) => {
  const [show, setShow] = useState(false);
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: schema,
    onSubmit: async ({ name, email, password }) => {
      console.log(name, email, password);
      setRoute('Verification')
    },
  });
  const { errors, touched, values, handleChange, handleSubmit } = formik;
  return (
    <div className="w-full ">
      <h1 className={`${styles.title}`}>Join to Learnbay</h1>
      <form onSubmit={handleSubmit} className="py-2">
        <label htmlFor="email" className={`${styles.label}`}>
          Enter Your Name
        </label>
        <input
          type="text"
          name="name"
          value={values.name}
          onChange={handleChange}
          id="name"
          placeholder="John Doe"
          className={`${errors.name && touched.name && "border-red-500"} ${
            styles.input
          }`}
        />
        {errors.name && touched.name && (
          <span className="text-red-500 pt-2 block">{errors.name}</span>
        )}

        <div className="w-full mt-5 relative mb-1">
          <label htmlFor="email" className={`${styles.label}`}>
            Enter Your Email
          </label>
          <input
            type="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            id="email"
            placeholder="email@gmail.com"
            className={`${errors.email && touched.email && "border-red-500"} ${
              styles.input
            }`}
          />
          {errors.email && touched.email && (
            <span className="text-red-500 pt-2 block">{errors.email}</span>
          )}
        </div>

        <div className="w-full mt-5 relative mb-1">
          <label htmlFor="password" className={`${styles.label}`}>
            Enter Your Password
          </label>
          <input
            type={!show ? "password" : "text"}
            name="password"
            value={values.password}
            onChange={handleChange}
            id="password"
            placeholder="password!@%"
            className={`${
              errors.password && touched.password && "border-red-500"
            } ${styles.input}`}
          />

          {!show ? (
            <AiOutlineEye
              className="absolute bottom-3 right-2 z-1 cursor-pointer  dark:text-white "
              size={20}
              onClick={() => setShow(true)}
            />
          ) : (
            <AiOutlineEyeInvisible
              className="absolute bottom-3 right-2 z-1 cursor-pointer dark:text-white"
              size={20}
              onClick={() => setShow(false)}
            />
          )}

          {errors.password && touched.password && (
            <span className="text-red-500 pt-2 block">{errors.password}</span>
          )}
        </div>
        <div className="w-full mt-5">
          <input type="submit" value="Signup" className={`${styles.button}`} />
        </div>

        <br />
        <h5 className="text-center font-[14px] pt-4 font-Poppins text-black dark:text-white">
          Or Login using :
        </h5>
        <div className="flex items-center justify-center my-3">
          <FcGoogle size={30} className="cursor-pointer mr-2" />
          <AiFillGithub
            size={30}
            className="cursor-pointer ml-2  text-black dark:text-white"
          />
        </div>
        <h5 className="text-center pt-4 font-Poppins text-[14px]  text-black dark:text-white">
          Already have an account?
          <span
            className="text-[#2190ff] pl-1 cursor-pointer"
            onClick={() => setRoute("Login")}
          >
            Login here!
          </span>
        </h5>
      </form>
      <br />
    </div>
  );
};

export default Signup;
