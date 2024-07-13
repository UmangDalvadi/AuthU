import React, { useEffect } from "react";
import { useState } from "react";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Accordion from "@mui/material/Accordion";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

import {
  ComputerIcon,
  FileMinus,
  Cpu,
  Podcast,
  SearchIcon,
  Laptop,
  Dices,
  Gamepad2,
} from "lucide-react";
import { useUserContext } from "../contexts/userContext";
import { Toaster, toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import UserDropdown from "../components/UserDropdown";
const SideBar = () => {
  const [mobile, setMobile] = useState(window.innerWidth < 700 ? true : false);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const channels = [
    { name: "Tech", link: "/channel", icon: Laptop },
    { name: "Fun", link: "/channel", icon: Dices },
    { name: "Games", link: "/channel", icon: Gamepad2 },
  ];

  const suggestedChannels = [
    { name: "CE", link: "/channel", icon: ComputerIcon },
    { name: "IT", link: "/channel", icon: FileMinus },
    { name: "EC", link: "/channel", icon: Cpu },
  ];

  useEffect(() => {
    window.addEventListener("resize", () => {
      window.innerWidth < 700 ? setMobile(true) : setMobile(false);
    });
  }, [mobile]);


  function renderRooms(channel, i) {
    const currentChat = {
      isChannel: true,
      chatName: channel.name,
      receiverId: "",
    };
    return (
      <>
        <button
          className={`group flex items-center text-sm border-b md:border-0 border-black gap-3 font-medium p-3 hover:bg-white rounded-md rounded-l-none rounded-r-none border-opacity-25`}
          onClick={(e) => {
            e.preventDefault();
            if (mobile) setOpen(!open);
          }}
          key={channel}
        >
          {channel?.icon && (
            <div>{React.createElement(channel?.icon, { size: "20" })}</div>
          )}
          <h2
            style={{
              transitionDelay: `${i + 3}00ms`,
            }}
            className={`whitespace-pre duration-500 ${
              !open && "opacity-0 translate-x-28 overflow-hidden"
            }`}
          >
            {channel?.name}
          </h2>
          <h2
            className={`${
              open && "hidden"
            } absolute left-48 bg-white font-semibold whitespace-pre text-dark-grey rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
          >
            {channel?.name}
          </h2>
        </button>
      </>
    );
  }

  function rednerNewChannels(channel, i) {
    const currentChat = {
      isChannel: true,
      chatName: channel.name,
      receiverId: "",
    };
    return (
      <>
        <button
          className={`group flex items-center text-sm px-3 border-black gap-4 font-medium pb-3 pt-2 hover:bg-white rounded-md rounded-l-none rounded-r-none border-opacity-25`}
          onClick={(e) => {
            e.preventDefault();
            if (mobile) setOpen(!open);
          }}
          key={channel}
        >
          {channel?.icon && (
            <div>{React.createElement(channel?.icon, { size: "20" })}</div>
          )}
          <h2
            style={{
              transitionDelay: `${i + 3}00ms`,
            }}
            className={`whitespace-pre duration-500 ${
              !open && "opacity-0 translate-x-28 overflow-hidden"
            }`}
          >
            {channel?.name}
          </h2>
          <h2
            className={`${
              open && "hidden"
            } absolute left-48 bg-white font-semibold whitespace-pre text-dark-grey rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
          >
            {channel?.name}
          </h2>
        </button>
      </>
    );
  }

  return (
    <div
      className={`bg-lightGray opacity-0 z-10 h-full fixed md:opacity-100 md:block md:relative overflow-y-auto overflow-x-hidden ${
        open
          ? "opacity-100 w-[85%] md:w-[30%] lg:w-[23%] xl:w-[18%]"
          : `${mobile ? "hidden" : "w-20"}`
      } duration-500 px-4`}
    >
      <Toaster />
      <HiOutlineMenuAlt2
        size={30}
        className={`cursor-pointer hidden md:block text-black absolute top-3 ${
          open ? "right-3" : "left-0 w-full"
        } duration-100`}
        onClick={() => setOpen(!open)}
      />
      <hr className="hidden md:block md:relative top-14 text-black" />

      <div className="mt-8 md:mt-16 flex flex-col gap-3 relative text-black">
        <button
          className={` md:mt-2 group flex items-center text-sm border-b md:border-0 border-black gap-3.5 font-medium p-3 hover:bg-white rounded-md rounded-l-none rounded-r-none border-opacity-25`}
          onClick={(e) => {
            e.preventDefault();
            if (mobile) setOpen(!open);
            navigate("/");
          }}
        >
          <div>{React.createElement(Podcast, { size: "20" })}</div>
          <h2
            style={{
              transitionDelay: `200ms`,
            }}
            className={`whitespace-pre mt-1 duration-500 ${
              !open && "opacity-0 translate-x-28 overflow-hidden"
            }`}
          >
            All Posts
          </h2>
          <h2
            className={`${
              open && "hidden"
            } absolute left-48 group-hover:z-20 bg-white font-semibold whitespace-pre text-dark-grey rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit`}
          >
            All Posts
          </h2>
        </button>

        {channels.map(renderRooms)}
      </div>

      {/* SearchInput field for channels */}
      <div
        className={`whitespace-pre bg-white rounded-md border-dark-grey border duration-500 mt-11 mb-4 ${
          !open && "opacity-0 overflow-hidden"
        }`}
      >
        <div className="flex relative items-center h-12 hover:transition">
          <input
            type="text"
            className={`text-black w-full px-3 pr-12 bg-transparent outline-none h-full`}
            placeholder="Search Channels..."
          />
          <button className="bg-transparent absolute right-4 text-black rounded-r-md">
            <SearchIcon size={22} />
          </button>
        </div>
      </div>

      {/* <hr className="mt-5" /> */}

      <Accordion className="md:hidden">
        <AccordionSummary
          expandIcon={<MdOutlineKeyboardArrowDown className="text-xl" />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <div className="">
            <h2
              style={{
                transitionDelay: `400ms`,
              }}
              className={`whitespace-pre font-semibold text-sm md:text-lg duration-500 ${
                !open && "opacity-0 overflow-hidden  "
              }`}
            >
              Suggested Channels
            </h2>
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <div className="md:border-b-0 opacity-90 pb-2 flex flex-col gap-4 relative">
            {suggestedChannels.map(rednerNewChannels)}
          </div>
        </AccordionDetails>
      </Accordion>

      <div className="md:flex flex-col border-t border-black mt-6 hidden">
        <h2
          style={{
            transitionDelay: `400ms`,
          }}
          className={`whitespace-pre font-semibold mb-4 mt-3 mx-3 text-sm md:text-lg duration-500 ${
            !open && "opacity-0 overflow-hidden mb-0"
          }`}
        >
          Suggested Channels
        </h2>
        <div className="border-b border-black opacity-90 pb-3 flex flex-col gap-4 relative">
          {suggestedChannels.map(rednerNewChannels)}
        </div>
      </div>

      <button
        className="md:hidden bg-white px-2.5 w-full mt-3 font-semibold py-2.5 xl:py-3 xl:px-3 rounded-md"
        onClick={() => {
          navigate("/alumni");
          setOpen(!open);
        }}
      >
        Alumni Connect
      </button>
      <div className="mt-6 md:hidden">
        <UserDropdown mobile={mobile} />
      </div>

      <button
        className="flex md:hidden w-full items-center justify-center py-3 mt-20 rounded-md bg-dark-grey text-white text-md font-semibold"
        onClick={() => {
          toast.success("Logged out successfully", {
            duration: 900,
          });
          setTimeout(() => {
            dispatch(logOutUser());
          }, 910);
          return;
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default SideBar;
