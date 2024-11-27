import React from 'react'

import { BsInfo, BsMenuUp, BsPeople, BsSpeedometer } from 'react-icons/bs'
import { BiArrowFromBottom, BiArrowToBottom, BiBook, BiBookAlt, BiChart, BiHealth, BiMoney, BiPencil, BiPlus, BiSolidArrowToBottom } from 'react-icons/bi'
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


const Employeelayout = ({children}) => {
    const sidebarElements = [
        {
            name: 'Dashboard',
            pathname: '/employee/dashboard',
            icon: MdDashboard,
            submenu: []
        },

        {
          name: 'Profile',
          pathname: '/employee/profile',
          icon: BsMenuUp,
          submenu: []
      },

        {
            name: 'Job Info',
            pathname: '/employee/job',
            icon: BiBookAlt,
            submenu: []
        },

        {
            name: 'General Info',
            pathname: '/employee/general',
            icon: CgChart,
            submenu: []
        },
        {
            name: 'Education',
            pathname: '/employee/education',
            icon: BiPencil,
            submenu: []
        },

        {
            name: 'Experience',
            pathname: '/employee/experience',
            icon: GrDocument,
            submenu: []
        },

        {
            name: 'Job Responsibilty',
            pathname: '/employee/responsibility',
            icon: BiBook,
            submenu: []
        },

        {
          name: 'Pay Roll',
          pathname: '/employee/responsibility',
          icon: BiBook,
          submenu: []
      },

      {
        name: 'Leave Information',
        pathname: '/employee/leave',
        icon: BiBook,
        submenu: []
    },


        
        
      ]
      
      return (
        <div className='layout d-flex'>
          <Sidebar className='calf' elements={sidebarElements} name={'Employee'} />
          <div className='ms-4 vw-100 d-flex justify-content-center'>
            <Outlet/>
          </div>
          
        </div>
      )
}

export default Employeelayout