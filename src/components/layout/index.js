import React from "react";
import { NavLink } from "react-router-dom";

export default function Layout({ children }) {
  const activeStyle = {
    color: "#FFF",
    backgroundColor: "#000",
  };
  return (
    <>
      <header className="fixed bg-primary inset-x-0 top-0">
        <nav className="flex justify-between items-center container text-white">
          <span className="uppercase font-medium">Kledo Test</span>
          <div className="flex justify-center items-center gap-6">
            <NavLink
              to="/profile"
              className="p-4"
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
            >
              Profile
            </NavLink>
            <NavLink
              to="/"
              className="p-4"
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
            >
              Login
            </NavLink>
          </div>
        </nav>
      </header>
      <main className=" bg-white">{children}</main>
    </>
  );
}
