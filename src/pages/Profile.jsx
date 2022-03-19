import React from "react";

const Profile = () => {
  return (
    <div className="flex justify-center flex-col items-center mt-36 container">
      <span
        className="text-5xl font-semibold
      mb-5"
      >
        Profile
      </span>
      <div className="flex flex-col bg-second w-1/2 p-12 rounded-xl relative gap-4">
        <div className="right-10 absolute top-10">
          <img
            src="/me.jpg"
            alt="profile"
            className="object-cover rounded-full w-20 h-20"
          />
        </div>
        <div className="div">
          <h1>Nama</h1>
          <span>Nelsen Septa Henidar</span>
        </div>
        <div className="div">
          <h1>Alamat</h1>
          <span>Tegal, Jawa Tengah</span>
        </div>
        <div className="div">
          <h1>No.Hp</h1>
          <span>083837184881</span>
        </div>
        <div className="div">
          <h1>Email</h1>
          <span>nelsenseptahenidar@gmail.com</span>
        </div>
        <div className="div">
          <h1>Motto</h1>
          <span>Jangan Lupa Makan</span>
        </div>
      </div>
    </div>
  );
};

export default Profile;
