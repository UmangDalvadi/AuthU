import React, { useState } from "react";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { IoFitnessSharp } from "react-icons/io5";
import { useUserContext } from "../contexts/userContext";
import UserDropdown from "./UserDropdown";

const Navbar = () => {
  // this state will tell if user is authenticated or not
  const navigate = useNavigate();
  const { isAuth } = useUserContext();

  return (
    <>
      <nav className="navbar font-lato font-semibold">
        <Link className="flex items-center gap-2" to="/">
          <span>
            <IoFitnessSharp className="text-xl  md:text-2xl lg:text-4xl xl:text-5xl" />
          </span>
          <span className="text-xl  md:text-2xl lg:text-3xl xl:text-4xl">
            Power Auth
          </span>
        </Link>
        {isAuth && (
          <div className="flex md:hidden">
            <HiOutlineMenuAlt2
              size={30}
              onClick={() => {
                console.log("menu clicked");
              }}
            />
          </div>
        )}
        <div className="hidden md:flex md:w-2/3 justify-end items-center gap-8">
          {isAuth ? (
            <>
              <Link to="/" className="text-xl">
                Ask a Question
              </Link>
              <UserDropdown />
            </>
          ) : (
            <button
              className="btn-dark"
              onClick={() => {
                navigate("/login");
              }}
            >
              {window.location.href === "/login" ? "register" : "login"}
            </button>
          )}
        </div>
      </nav>
      <Outlet />
    </>
  );
};

export default Navbar;
