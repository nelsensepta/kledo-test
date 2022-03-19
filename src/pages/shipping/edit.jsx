import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import SideBar from "../../components/layout/SideBar";
import { useMutation } from "react-query";
export default function ShippingTambah() {
  let location = useLocation();
  let navigate = useNavigate();
  let params = useParams();
  console.log(params, navigate, location);
  const { token } = useSelector((state) => state.user);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { name: params.name },
  });

  let from = location.state?.from?.pathname || "/shipping";
  const [resError, setResError] = useState(null);
  // update
  const { mutate: updateData } = useMutation(
    async (e) => {
      return await axios.put(
        `${process.env.REACT_APP_API_URL}/finance/shippingComps/${params.id}`,
        {
          ...e,
        },
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

  // delete
  const { mutate: deleteData } = useMutation(
    async () => {
      return await axios.delete(
        `${process.env.REACT_APP_API_URL}/finance/shippingComps/${params.id}`,

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
      return updateData(e);
    } catch (err) {
      setResError(err);
    }
  };
  const handleDelete = () => {
    try {
      return deleteData();
    } catch (err) {
      setResError(err);
    }
  };
  return (
    <div className="flex mt-10 min-h-full">
      <SideBar />
      <div className="flex w-10/12 bg-gray-400 justify-center items-center min-h-screen py-14 ">
        <div className="w-full h-full bg-white p-5 m-5 rounded-2xl">
          <div className="grid grid-cols-6 gap-10">
            <div className="col-span-6">
              <div className="flex justify-between items-center">
                <div className="flex justify-start gap-3 items-center">
                  <span className="font-semibold">Edit Shipping Comps</span>
                  <button
                    aria-label="btn-delete"
                    className="bg-red-500 p-2 rounded-full"
                    onClick={handleDelete}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>
                {resError !== null && (
                  <div className="  bg-red-500 p-4 w-1/2 rounded-xl">
                    <p className="text-white text-center p">{resError}</p>
                  </div>
                )}
              </div>
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
