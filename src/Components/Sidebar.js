import React from 'react'
import './Sidebar.css'
import { BsPeople, BsSpeedometer } from 'react-icons/bs'
import { BiArrowFromBottom, BiArrowToBottom, BiChart, BiHome, BiMoney, BiSolidArrowToBottom } from 'react-icons/bi'
import { FaCow, FaUserDoctor } from 'react-icons/fa6'
import { GiBottomRight3dArrow, GiDoctorFace } from 'react-icons/gi'
import { MdReport } from 'react-icons/md'
import 'bootstrap/js/dist/dropdown'
import 'bootstrap/js/dist/collapse'
import { CgArrowBottomLeft } from 'react-icons/cg'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const Sidebar = ({ elements, name }) => {
    const location = useLocation();
    const { hash, pathname, search } = location;
    const navigator = useNavigate();
    return (
        <div className='w-25 '>
            <div className='row  sticky-top'>
                <div className='w-100 bg-dark col-md-2 col-auto min-vh-100'>
                    <a className='text-decoration-none text-white d-none d-sm-inline d-flex align-items-center'>
                        <span className='ms-1 fs-4'>{name}</span>
                    </a>
                    <hr className='text-secondary' />
                    <ul className='nav nav-pills flex-column' id='parentM'>
                        <li className='nav-item text-white fs-4 my-1'>
                            <a href='/farmar' className={`nav-link text-white`}>
                                <BiHome />
                                <span className='ms-2 d-none d-sm-inline'>Home</span>
                            </a>
                        </li>
                        {
                            elements.map(element => (
                                <li  onClick={ () => {
                                    if(element.submenu.length == 0){
                                        console.log('hello');
                                        
                                        navigator(element.pathname)
                                    }
                                   
                                }} className='nav-item text-white fs-4 my-1'>
                                    <a href={element.submenu.length >0 && `#submenu-${element.name}`} className={`nav-link text-white`}  data-bs-toggle={element.submenu.length >0 &&`collapse`}>
                                        <element.icon />
                                        <span className='ms-2 d-none d-sm-inline'>{element.name}</span>
                                        {element.submenu.length >0 && <BiArrowToBottom className='mx-2' />}
                                    </a>
                                    <ul className={`nav collapse  ms-1 flex-column`} id={`submenu-${element.name}`} data-bs-parent='#parentM'>
                                        {element.submenu.length >0 &&
                                            element.submenu.map(sub => (
                                                <li onClick={() => {
                                                    navigator(sub.pathname)
                                                }} className='nav-item text-white ms-4'>
                                                    <a className={`nav-link text-white`}>{sub.name}</a>
                                                </li>
                                            ))
                                        }
                                    </ul>
                                </li>
                            ))
                        }

                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Sidebar