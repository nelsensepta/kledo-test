import SideBar from "../../components/layout/SideBar";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import { useSelector } from "react-redux";
export default function Shipping() {
  const [getResult, setGetResult] = useState(null);
  const [resError, setResError] = useState(null);
  const [searchVal, setSearchVal] = useState("");
  const [filtered, setFiltered] = useState([]);

  const { token } = useSelector((state) => state.user);
  const { isLoading, refetch: getAll } = useQuery(
    "getAll",
    async () => {
      return await axios.get(
        `${process.env.REACT_APP_API_URL}/finance/shippingComps`,
        {
          headers: { Authorization: `Bearer ${token.access_token}` },
        }
      );
    },
    {
      onSuccess: (res) => {
        setGetResult(res.data.data);
      },
      onError: (err) => {
        setResError(err?.response?.data?.message || err);
      },
    }
  );

  useEffect(() => {
    try {
      return getAll();
    } catch (err) {
      return setResError(err);
    }
  }, [getAll]);
  useEffect(() => {
    if (!isLoading) {
      if (searchVal !== "" && getResult.length !== 0) {
        setFiltered(
          getResult.filter((item) => {
            return item.name.toLowerCase().includes(searchVal.toLowerCase());
          })
        );
      } else {
        setFiltered(getResult);
      }
    }
  }, [getResult, searchVal]);
  // const handleChange = async () => {};

  return (
    <div className="flex mt-10 min-h-full">
      <SideBar />
      <div className="flex w-10/12 bg-gray-400 justify-center items-center min-h-screen py-14 ">
        <div className="w-full h-full bg-white p-5 m-10 rounded-2xl ">
          <div className="grid grid-cols-6 gap-10">
            <div className="col-span-6 flex justify-between items-start h-auto">
              <div className="flex justify-between items-center">
                <div className="flex gap-3 justify-start items-center">
                  <span className="font-semibold">Shipping Comps</span>
                  <Link
                    to="/shipping/tambah"
                    className="p-2 bg-primary rounded-full"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="#FFF"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                  </Link>
                </div>
                {resError !== null && (
                  <div className="  bg-red-500 p-4 w-1/2 rounded-xl">
                    <p className="text-white text-center p">{resError}</p>
                  </div>
                )}
              </div>
              <div className="relative">
                <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
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
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  className=" rounded-lg focus:ring-primary block w-full pl-10 p-2.5 ring-2 ring-black "
                  placeholder="cari"
                  onChange={(e) => setSearchVal(e.target.value)}
                />
              </div>
            </div>
            <div className="flex col-span-6 justify-start items-start">
              {isLoading && <p>Loading...</p>}
              <div className="flex flex-col w-full">
                <div className="overflow-x-auto shadow-md sm:rounded-lg">
                  <div className="inline-block min-w-full align-middle">
                    <div className="overflow-hidden">
                      {getResult !== null && (
                        <table className="min-w-full divide-y divide-gray-200 table-fixed ">
                          <thead className="bg-gray-100 ">
                            <tr>
                              <th
                                scope="col"
                                className="py-3 px-6 font-medium tracking-wider text-left text-gray-700  "
                              >
                                Name
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {filtered.length !== 0 &&
                              filtered.map((item) => (
                                <tr className="hover:bg-gray-100" key={item.id}>
                                  <td className="py-4 px-6 text-sm font-medium text-gray-900  whitespace-nowrap">
                                    <Link
                                      to={`/shipping/edit/${item.id}/${item.name}`}
                                      className="flex w-full"
                                    >
                                      {item.name}
                                    </Link>
                                  </td>
                                </tr>
                              ))}
                          </tbody>
                        </table>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
