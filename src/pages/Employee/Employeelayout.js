import React from 'react'

import { BsInfo, BsMenuUp, BsPeople, BsSpeedometer } from 'react-icons/bs'
import { BiArrowFromBottom, BiArrowToBottom, BiBook, BiBookAlt, BiChart, BiDollar, BiExit, BiHealth, BiMoney, BiPencil, BiPlus, BiSolidArrowToBottom } from 'react-icons/bi'
import { FaCow, FaSeedling, FaUserDoctor } from 'react-icons/fa6'
import { GiBottomRight3dArrow, GiDoctorFace, GiPaper } from 'react-icons/gi'
import { MdDashboard, MdReport } from 'react-icons/md'
import 'bootstrap/js/dist/dropdown'
import 'bootstrap/js/dist/collapse'
import { CgArrowBottomLeft, CgChart } from 'react-icons/cg'
import { Outlet, useLocation } from 'react-router-dom'
import Sidebar from '../../Components/Sidebar'
import { IoInformation } from 'react-icons/io5'
import { LuSheet } from 'react-icons/lu'
import { GrDocument } from 'react-icons/gr'
import { FaHandHoldingUsd } from 'react-icons/fa'
import { HiDocumentSearch } from 'react-icons/hi'
import { TbHierarchy } from 'react-icons/tb'


const Employeelayout = ({ children }) => {
  const sidebarElements = [
    {
      name: 'Dashboard',
      pathname: '/employee/dashboard',
      icon: MdDashboard,
      roles: ['employee', 'admin'],
      submenu: []
    },

    {
      name: 'Profile',
      pathname: '/employee/profile',
      roles: ['employee', 'admin'],
      icon: BsMenuUp,
      submenu: []
    },

    {
      name: 'Job Info',
      pathname: '/employee/job',
      roles: ['employee', 'admin'],
      icon: BiBookAlt,
      submenu: []
    },

    {
      name: 'General Info',
      pathname: '/employee/general',
      roles: ['employee', 'admin'],
      icon: CgChart,
      submenu: []
    },
    {
      name: 'Education',
      pathname: '/employee/education',
      roles: ['employee', 'admin'],
      icon: BiPencil,
      submenu: []
    },

    {
      name: 'Experience',
      pathname: '/employee/experience',
      roles: ['employee', 'admin'],
      icon: GrDocument,
      submenu: []
    },

    {
      name: 'Job Responsibilty',
      pathname: '/employee/responsibility',
      roles: ['employee', 'admin'],
      icon: FaHandHoldingUsd,
      submenu: []
    },

    {
      name: 'Pay Roll',
      pathname: '/employee/responsibility',
      roles: ['employee', 'admin'],
      icon: BiDollar,
      submenu: []
    },

    {
      name: 'Leave Information',
      pathname: '/employee/leave',
      roles: ['employee', 'admin'],
      icon: BiExit,
      submenu: []
    },
    {
      name: 'All Employee Info',
      pathname: '/employee/all_employee_info',
      roles: [ 'admin'],
      icon: HiDocumentSearch,
      submenu: []
    },
    {
      name: 'Hierarchy',
      pathname: '/employee/leave',
      roles: [ 'admin'],
      icon: TbHierarchy,
      submenu: []
    },

  ]

  return (
    <div className='layout d-flex'>
      <Sidebar className='calf' elements={sidebarElements} name={'Employee'} />
      <div className='ms-4 vw-100 d-flex justify-content-center'>
        <Outlet />
      </div>

    </div>
  )
}

export default Employeelayout