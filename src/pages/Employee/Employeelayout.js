import React from 'react'

import { BsInfo, BsMenuUp, BsPeople, BsSpeedometer } from 'react-icons/bs'
import { BiArrowFromBottom, BiArrowToBottom, BiBook, BiBookAlt, BiChart, BiDollar, BiExit, BiHealth, BiMoney, BiPencil, BiPlus, BiSolidArrowToBottom, BiStore } from 'react-icons/bi'
import { FaCow, FaSeedling, FaUserDoctor } from 'react-icons/fa6'
import { GiBottomRight3dArrow, GiDoctorFace, GiPaper } from 'react-icons/gi'
import { MdDashboard, MdReport } from 'react-icons/md'
import 'bootstrap/js/dist/dropdown'
import 'bootstrap/js/dist/collapse'
import { CgArrowBottomLeft, CgChart, CgProfile } from 'react-icons/cg'
import { Outlet, useLocation } from 'react-router-dom'
import Sidebar from '../../Components/Sidebar'
import { IoInformation } from 'react-icons/io5'
import { LuLogOut, LuSheet } from 'react-icons/lu'
import { GrDocument, GrDocumentConfig } from 'react-icons/gr'
import { FaHandHoldingUsd } from 'react-icons/fa'
import { HiDocumentSearch } from 'react-icons/hi'
import { TbHierarchy } from 'react-icons/tb'


const Employeelayout = ({ children }) => {
  const sidebarElements = [
    {
      name: 'Dashboard',
      pathname: '/employee/dashboard',
      icon: MdDashboard,
      roles: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'],
      submenu: []
    },

    {
      name: 'User',
      pathname: '/employee',
      roles: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'],
      icon: CgProfile,
      submenu: [
        {
          name: 'Profile',
          pathname: '/employee/profile',
          roles: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'],
          // icon: BsMenuUp,
          // submenu: []
        },

        {
          name: 'Job Info',
          pathname: '/employee/job',
          roles: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'],
          // icon: BiBookAlt,
          // submenu: []
        },

        {
          name: 'General Info',
          pathname: '/employee/general',
          roles: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'],
          // icon: CgChart,
          // submenu: []
        },
        {
          name: 'Education',
          pathname: '/employee/education',
          roles: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'],
          // icon: BiPencil,
          // submenu: []
        },

        {
          name: 'Experience',
          pathname: '/employee/experience',
          roles: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'],
          // icon: GrDocument,
          // submenu: []
        },

        {
          name: 'Job Responsibilty',
          pathname: '/employee/responsibility',
          roles: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'],
          // icon: FaHandHoldingUsd,
          // submenu: []
        },
      ]
    },

    {
      name: 'Pay Roll',
      pathname: '/employee/responsibility',
      roles: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'],
      icon: BiDollar,
      submenu: []
    },

    {
      name: 'Leave Information',
      pathname: '/employee/leave',
      roles: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'],
      icon: BiExit,
      submenu: []
    },
    {
      name: 'All Employee Info',
      pathname: '/employee/all_employee_info',
      roles: ['1', '2', '3', '4', '5', '6', '7'],
      icon: HiDocumentSearch,
      submenu: []
    },
    {
      name: 'Hierarchy',
      pathname: '/employee/hierarchy',
      roles: ['1', '2', '3', '4', '5', '6', '7'],
      icon: TbHierarchy,
      submenu: []
    },
    {
      name: 'Application/Requsition',
      pathname: '/employee/application',
      roles: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
      icon: GrDocumentConfig,
      submenu: []
    },

    {
      name: 'Store',
      pathname: '/employee/store',
      roles: ['1', '2', '3', '4', '5', '6', '7', '11'],
      icon: BiStore,
      submenu: []
    },

    {
      name: 'Log Out',
      pathname: '/login',
      roles: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'],
      icon: LuLogOut,
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