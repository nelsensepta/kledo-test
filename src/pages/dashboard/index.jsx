import SideBar from "../../components/layout/SideBar";
import { useSelector } from "react-redux";
export default function Dashboard() {
  const { user } = useSelector((state) => state.user);

  return (
    <div className="flex mt-10 min-h-full">
      <SideBar />
      <div className="flex w-10/12 bg-gray-400 justify-center items-center min-h-screen py-14 ">
        <div className="grid grid-cols-6 grid-flow-row r w-full m-10 h-full rounded-2xl bg-white p-5">
          <div className="col-span-6 row-span-1">
            <span className="font-semibold">Dashboard</span>
          </div>
          <div className="flex col-span-6 row-span-6 justify-center">
            <div className="flex flex-col justify-center items-center w-1/2 h-1/2 bg-second rounded-2xl">
              <span>Selamat Datang </span>
              <span>Nama : {user.name}</span>
              <span>Email : {user.email}</span>
              <span>No Hp : {user.phone_number}</span>
              <span>Status : {user.is_active && "Aktif"}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
