import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import SideBar from "../../components/layout/SideBar";
import { useMutation } from "react-query";
export default function ShippingTambah() {
  const { token } = useSelector((state) => state.user);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  let location = useLocation();
  let navigate = useNavigate();

  let from = location.state?.from?.pathname || "/shipping";

  const [resError, setResError] = useState(null);

  const { mutate: addData } = useMutation(
    async (e) => {
      return await axios.post(
        `${process.env.REACT_APP_API_URL}/finance/shippingComps`,
        { ...e },
        {
          headers: {
            Authorization: `${token.token_type} ${token.access_token}`,
          },
        }
      );
    },
    {
      onSuccess: (res) => {
        navigate(from, { replace: true });
      },
      onError: (err) => {
        setResError(err?.response?.data?.message || err);
      },
    }
  );

  const onSubmit = (e) => {
    try {
      return addData(e);
    } catch (err) {
      setResError(err);
    }
  };
  return (
    <div className="flex mt-10 min-h-full">
      <SideBar />
      <div className="flex w-10/12 bg-gray-400 justify-center items-center min-h-screen py-14 ">
        <div className="w-full h-full bg-white p-5 m-10 rounded-2xl">
          <div className="grid grid-cols-6 gap-10">
            <div className="col-span-6 flex justify-between items-start">
              <span className="font-semibold">Tambah Shipping Comps</span>
              {resError !== null && (
                <div className="inline-block  bg-red-500 p-4 w-1/2 rounded-xl">
                  <p className="text-white text-center p">{resError}</p>
                </div>
              )}
            </div>
            <div className="flex col-span-4 justify-center">
              <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-6">
                  <label
                    htmlFor="name"
                    className="block mb-2 font-bold text-primary-light text-xl"
                  >
                    Nama
                  </label>
                  <input
                    id="name"
                    type="text"
                    className="text-black border  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    {...register("name", {
                      required: true,
                    })}
                  />
                  {errors.name && errors.name.type === "required" && (
                    <p className="text-red-600 mt-1 ml-1">Name Required </p>
                  )}
                </div>
                <div className="flex justify-start items-center">
                  <button
                    type="submit"
                    className="text-white mt-8 bg-blue-700 hover:bg-blue-800 text-xl focus:ring-4 focus:ring-blue-300 font-semimedium rounded-xl px-5 py-3 text-center "
                  >
                    Simpan
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
