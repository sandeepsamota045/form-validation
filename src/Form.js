import React from "react";
import "./Form.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const Form = () => {
  const schema = yup.object().shape({
    fullName: yup.string().required("name is required"),
    email: yup.string().email().required("email is required"),
    age: yup.number().positive().integer().min(18).required(),
    password: yup
      .string()
      .min(4)
      .max(10)
      .required("password should be in min 4 characters"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "password not matched")
      .required("should matched with password"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          type="text"
          placeholder="full name ..."
          {...register("fullName")}
        />
        <p>{errors.fullName?.message}</p>
        <input type="email" placeholder="email..." {...register("email")} />
        <p>{errors.email?.message}</p>

        <input type="number" placeholder="age..." {...register("age")} />
        <p>{errors.age?.message}</p>

        <input
          type="password"
          placeholder="password..."
          {...register("password")}
        />
        <p>{errors.password?.message}</p>

        <input
          type="password"
          placeholder="confirm password..."
          {...register("confirmPassword")}
        />
        <p>{errors.confirmPassword?.message}</p>

        <input
          style={{
            backgroundColor: "red",
            color: "white",
            fontWeight: "600",
            width: "200px",
            height: "42px",
            paddingLeft: "0px",
          }}
          type="submit"
        />
      </form>
    </>
  );
};
export default Form;
