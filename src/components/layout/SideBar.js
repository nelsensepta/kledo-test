import { NavLink } from "react-router-dom";
import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useMutation } from "react-query";
import { clearAll } from "../../slices/userSlice";
export default function SideBar() {
  const dispatch = useDispatch();
  let location = useLocation();
  let navigate = useNavigate();
  let from = location.state?.from?.pathname || "/";
  const [resError, setResError] = useState(null);
  const { token } = useSelector((state) => state.user);
  const { mutate: userLogout } = useMutation(
    async () => {
      return await axios.post(
        `${process.env.REACT_APP_API_URL}/authentication/logout`,
        {},
        {
          headers: {
            Authorization: `${token.token_type} ${token.access_token}`,
          },
        }
      );
    },
    {
      onSuccess: (res) => {
        console.log(res);
        navigate(from, { replace: true });
      },
      onError: (err) => {
        setResError(err?.response?.data?.message || err);
      },
    }
  );

  const handleLogout = () => {
    try {
      userLogout();
      dispatch(clearAll());
    } catch (err) {
      setResError(err);
    }
  };
  const activeStyle = {
    color: "#0437F2",
    backgroundColor: "transparent",
  };
  return (
    <div className="flex w-2/12 flex-col justify-between items-start">
      {resError !== null && (
        <div className="  bg-red-500 p-4 w-1/2 rounded-xl">
          <p className="text-white text-center p">{resError}</p>
        </div>
      )}
      <div className="flex justify-start items-start flex-col mt-10 w-full">
        <NavLink
          to="/dashboard"
          className="p-4 w-full gap-2 flex"
          style={({ isActive }) => (isActive ? activeStyle : undefined)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
          Dashboard
        </NavLink>
        <NavLink
          to="/shipping"
          className="p-4  w-full flex gap-2"
          style={({ isActive }) => (isActive ? activeStyle : undefined)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"
            />
          </svg>
          Shipping Comps
        </NavLink>
      </div>
      <button
        className="flex bg-primary p-3 w-full text-white justify-center"
        onClick={handleLogout}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
          />
        </svg>
        Log out
      </button>
    </div>
  );
}
