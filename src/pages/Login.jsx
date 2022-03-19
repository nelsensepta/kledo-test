import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../slices/userSlice";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useMutation } from "react-query";
const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  let location = useLocation();
  let navigate = useNavigate();

  let from = location.state?.from?.pathname || "/dashboard";

  const [resError, setResError] = useState(null);

  const { mutate: userLogin } = useMutation(
    async (e) => {
      return await axios.post(
        `${process.env.REACT_APP_API_URL}/authentication/login`,
        { ...e }
      );
    },
    {
      onSuccess: (res) => {
        dispatch(addUser(res.data));
        navigate(from, { replace: true });
      },
      onError: (err) => {
        setResError(err?.response?.data?.message || err);
        return err;
      },
    }
  );

  const onSubmit = (e) => {
    try {
      return userLogin(e);
    } catch (err) {
      setResError(err);
    }
  };

  return (
    <div className="flex  justify-center flex-col items-center mt-36 container">
      {resError !== null && (
        <div className="inline-block  bg-red-500 p-4 w-1/2 rounded-xl">
          <p className="text-white text-center p">{resError}</p>
        </div>
      )}
      <span
        className="text-5xl font-semibold
      my-5"
      >
        Login
      </span>
      <div className="flex bg-second w-1/2 p-12 rounded-xl">
        <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block mb-2 font-bold text-primary-light text-xl"
            >
              Email
            </label>
            <input
              autoComplete="off"
              id="email"
              {...register("email", {
                required: true,
                pattern: /^\S+@\S+$/i,
              })}
              className="text-black border rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Your Email"
            />
            {errors.email && errors.email.type === "required" && (
              <p className="text-red-600 mt-1 ml-1">Email Required </p>
            )}
            {errors.email && errors.email.type === "pattern" && (
              <p className="text-red mt-1 ml-1"> Invalid Email </p>
            )}
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block mb-2 font-bold text-primary-light text-xl"
            >
              Password
            </label>
            <input
              id="password"
              autoComplete="off"
              type="password"
              className="text-black border  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required=""
              {...register("password", { required: true, min: 6 })}
            />
            {errors.password && errors.password.type === "min" && (
              <p className="text-red-600 mt-1 ml-1">Password Min 6 karakter </p>
            )}
            {errors.password && errors.password.type === "required" && (
              <p className="text-red-600 mt-1 ml-1">
                Password Tidak boleh kosong
              </p>
            )}
          </div>
          <div className="flex justify-center items-center">
            <button
              type="submit"
              className="text-white mt-8 bg-blue-700 hover:bg-blue-800 text-xl focus:ring-4 focus:ring-blue-300 font-semimedium rounded-full w-3/4 px-5 py-3 text-center "
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
