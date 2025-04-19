import React from 'react'

import { BsInfo, BsMenuUp, BsPeople, BsSpeedometer } from 'react-icons/bs'
import { BiArrowFromBottom, BiArrowToBottom, BiBook, BiBookAlt, BiChart, BiDollar, BiExit, BiHealth, BiMoney, BiPencil, BiPlus, BiPurchaseTag, BiSolidArrowToBottom, BiStore } from 'react-icons/bi'
import { FaCow, FaSeedling, FaUserDoctor } from 'react-icons/fa6'
import { GiBottomRight3dArrow, GiBuyCard, GiDoctorFace, GiPaper } from 'react-icons/gi'
import { MdDashboard, MdNotificationsNone, MdReport } from 'react-icons/md'
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
import { useNotificationCenter } from 'react-toastify/addons/use-notification-center'
import Navbar from '../../Components/Navbar'


const Employeelayout = ({ children }) => {
  const sidebarElements = [
    {
      name: 'Dashboard',
      pathname: '/employee/Dashboard',
      icon: MdDashboard,
      roles: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12','13'],
      submenu: []
    },

    {
      name: 'User',
      pathname: '/employee',
      roles: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '15'],
      icon: CgProfile,
      submenu: [
        {
          name: 'Profile',
          pathname: '/employee/profile',
          roles: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '15'],
          // icon: BsMenuUp,
          // submenu: []
        },

        {
          name: 'Job Info',
          pathname: '/employee/job',
          roles: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '15'],
          // icon: BiBookAlt,
          // submenu: []
        },

        {
          name: 'General Info',
          pathname: '/employee/general',
          roles: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '15'],
          // icon: CgChart,
          // submenu: []
        },
        {
          name: 'Education',
          pathname: '/employee/education',
          roles: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '15'],
          // icon: BiPencil,
          // submenu: []
        },

        {
          name: 'Experience',
          pathname: '/employee/experience',
          roles: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '15'],
          // icon: GrDocument,
          // submenu: []
        },

        {
          name: 'Job Responsibilty',
          pathname: '/employee/responsibility',
          roles: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '15'],
          // icon: FaHandHoldingUsd,
          // submenu: []
        },
      ]
    },

    {
      name: 'Pay Roll',
      pathname: '/employee/responsibility',
      roles: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '15'],
      icon: BiDollar,
      submenu: []
    },

    {
      name: 'Leave Information',
      pathname: '/employee/leave',
      roles: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '15'],
      icon: BiExit,
      submenu: []
    },
    {
      name: 'All Employee Info',
      pathname: '/employee/all_employee_info',
      roles: ['1', '2', '3', '4', '5', '6', '7','12', '15'],
      icon: HiDocumentSearch,
      submenu: []
    },
    {
      name: 'Hierarchy',
      pathname: '/employee/hierarchy',
      roles: ['1', '2', '3', '4', '5', '6', '7','12', '15'],
      icon: TbHierarchy,
      submenu: []
    },
    {
      name: 'Application/Requsition',
      pathname: '/employee/application',
      roles: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '15'],
      icon: GrDocumentConfig,
      submenu: []
    },

    {
      name: 'Notice',
      pathname: '/employee/Notice',
      roles: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '15'],
      icon: MdNotificationsNone,
      submenu: []
    },

    {
      name: 'Purchase',
      pathname: '/employee/purchase',
      roles: ['1', '2', '3', '4', '5', '6', '7','12', '13', '15'],
      icon: BiPurchaseTag,
      submenu: []
    },

    {
      name: 'Store / Asset',
      pathname: '/employee/store',
      roles: ['1', '2', '3', '4', '5', '6', '7','12', '11', '15'],
      icon: BiStore,
      submenu: []
    },

    {
      name: 'Log Out',
      pathname: '/login',
      roles: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '15'],
      icon: LuLogOut,
      submenu: []
    },
  ]

  return (
    <div>
      <Navbar />
      <div className='layout d-flex'>
        <Sidebar className='calf' elements={sidebarElements} name={'Employee'} />
        <div className='ms-4 vw-100 d-flex justify-content-center'>
          <Outlet />
        </div>
      </div>
    </div>

  )
}

export default Employeelayout