// src/components/Sidebar.js
import React from 'react';
import {
  HiOutlineAdjustmentsVertical,
  HiOutlineComputerDesktop,
  HiOutlineFolder,
  HiOutlineLockClosed,
  HiOutlineArrowLeftOnRectangle
} from 'react-icons/hi2';
import { PiFolderUser } from "react-icons/pi";
import { FaUserTie } from "react-icons/fa6";
import { IoHomeOutline } from "react-icons/io5";

const icons = [
  HiOutlineComputerDesktop,
  HiOutlineFolder,
];



function Sidebar() {

  const homeNavigate = function home() {
  window.location.href = "/"
  }
  const log = function logOut() {
  window.location.href = "/#login"
  }

   const AddUserDetial = function user() {
  window.location.href = "/#user"
  }

   const UsersDetial = function user() {
  window.location.href = "/#users-detail"
  }


  return (
    <aside className="w-20 bg-[#3A6882] text-white flex flex-col items-center py-6 space-y-6">
      <div className="text-2xl font-bold">A</div>
      {/* {icons.map((Icon, idx) => (
        <Icon key={idx} className="h-6 w-6 hover:text-yellow-400 cursor-pointer" />
      ))} */}
      <IoHomeOutline onClick={homeNavigate} className="h-6 w-6 hover:text-yellow-400 cursor-pointer" />
      {/* <FaUserTie onClick={AddUserDetial} className="h-6 w-6 hover:text-yellow-400 cursor-pointer" /> */}
      <PiFolderUser onClick={UsersDetial} className="h-6 w-6 hover:text-yellow-400 cursor-pointer" />
      <HiOutlineArrowLeftOnRectangle onClick={log} className="h-6 w-6 hover:text-yellow-400 cursor-pointer" />
    </aside>
  );
}

export default Sidebar;
