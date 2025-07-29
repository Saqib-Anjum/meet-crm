// src/components/Sidebar.js
import React from 'react';
import {
  HiOutlineComputerDesktop,
  HiOutlineFolder,
  HiOutlineArrowLeftOnRectangle
} from 'react-icons/hi2';
import { PiFolderUser } from "react-icons/pi";
import { IoHomeOutline } from "react-icons/io5";
import { logout } from './Redux/Slices/AuthSlices';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { FaUserDoctor } from "react-icons/fa6";


const icons = [
  HiOutlineComputerDesktop,
  HiOutlineFolder,
];



function Sidebar() {

  const homeNavigate = function home() {
  window.location.href = "#/"
  }

  const UsersDetail = function user() {
  window.location.href = "/#users-detail"
  }

   const PatientDetail = function user() {
  window.location.href = "/#patient-detail"
  }

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());

    localStorage.removeItem('authToken');

    navigate('/login', { replace: true });
  };



  return (
    <aside className="pt-20 w-28 bg-[#0B5CFF] text-white flex flex-col items-center py-6 space-y-6">
      {/* {icons.map((Icon, idx) => (
        <Icon key={idx} className="h-6 w-6 hover:text-yellow-400 cursor-pointer" />
      ))} */}
      <IoHomeOutline onClick={homeNavigate} className="h-10 w-10 hover:text-yellow-400 cursor-pointer" />
      <PiFolderUser onClick={UsersDetail} className="h-10 w-10 hover:text-yellow-400 cursor-pointer" />
      <FaUserDoctor onClick={PatientDetail} className="h-10 w-10 hover:text-yellow-400 cursor-pointer" />
      <HiOutlineArrowLeftOnRectangle onClick={handleLogout} className="h-10 w-10 hover:text-yellow-400 cursor-pointer" />
    </aside>
  );
}

export default Sidebar;
