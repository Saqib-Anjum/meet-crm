import React from 'react';
import { HiOutlineCog, HiOutlineBell } from 'react-icons/hi';
import { MdAccountCircle } from "react-icons/md";

function Header() {
  return (
    <div className="bg-gradient-to-r from-[#27AE60] to-[#3A6882] rounded-xl text-white p-6 flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-semibold">Hello, Frank Dicostanzo!</h1>
        <p>Welcome back to Aurora Family Counseling</p>
      </div>
      <div className="flex items-center space-x-4">
        <HiOutlineCog className="w-6 h-6 cursor-pointer" />
        <HiOutlineBell className="w-6 h-6 cursor-pointer" />
        <MdAccountCircle className="w-6 h-6 cursor-pointer" />
      </div>
    </div>
  );
}

export default Header;