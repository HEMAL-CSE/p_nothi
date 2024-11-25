import React from 'react'

import { BsPeople, BsSpeedometer } from 'react-icons/bs'
import { BiArrowFromBottom, BiArrowToBottom, BiChart, BiHealth, BiMoney, BiPlus, BiSolidArrowToBottom } from 'react-icons/bi'
import { FaCow, FaSeedling, FaUserDoctor } from 'react-icons/fa6'
import { GiBottomRight3dArrow, GiDoctorFace } from 'react-icons/gi'
import { MdReport } from 'react-icons/md'
import 'bootstrap/js/dist/dropdown'
import 'bootstrap/js/dist/collapse'
import { CgArrowBottomLeft } from 'react-icons/cg'
import { Outlet, useLocation } from 'react-router-dom'
import Sidebar from '../../Components/Sidebar'


const Employeelayout = ({children}) => {
    const sidebarElements = [
        {
            name: 'Purchase',
            pathname: '/cow/cowdetails',
            icon: BiPlus,
            submenu: []
        },
        
        {
            name: 'Delivery',
            pathname: '/cow/delivery',
            icon: FaCow,
            submenu: []
        },
        {
            name: 'Expenses',
            pathname: '',
            icon: BiMoney,
            submenu: [
                {
                    name: 'Feed',
                    pathname: '/cow/feed'
                },

                {
                    name: 'Labour',
                    pathname: '/cow/labour'
                },

                {
                    name: 'Labour Payment',
                    pathname: '/cow/labour_payment'
                },
                {
                    name: 'Others',
                    pathname: '/cow/others'
                },
                {
                    name: 'Others Payment',
                    pathname: '/cow/others_payment'
                }
            ]
        },

        {
            name: 'Treatment',
            pathname: '',
            icon: FaUserDoctor,
            submenu: [
                {
                    name: 'Doctors',
                    pathname: '/cow/doctors'
                },
                {
                    name: 'Treatment',
                    pathname: '/cow/treatment'
                }
            ]
        },

        {
            name: 'Selling',
            pathname: '/cow/selling',
            icon: BiMoney,
            submenu: []
        },

        {
            name: 'Healthcare',
            pathname: '',
            icon: BiHealth,
            submenu: [
                {
                    name: 'Vaccines',
                    pathname: '/cow/vaccines'
                },
                {
                    name: 'Medicine',
                    pathname: '/cow/medicine'
                }
            ]
        },
        {
            name: 'Feeding',
            pathname: '/cow/feeding',
            icon: FaSeedling,
            submenu: []
        },
        {
            name: 'Report',
            pathname: '/cow/report',
            icon: MdReport,
            submenu: []
        }
        
      ]
      
      return (
        <div className='layout d-flex'>
          <Sidebar className='calf' elements={sidebarElements} name={'Cow'} />
          <div className='ms-4 vw-100 d-flex justify-content-center'>
            <Outlet/>
          </div>
          
        </div>
      )
}

export default Employeelayout