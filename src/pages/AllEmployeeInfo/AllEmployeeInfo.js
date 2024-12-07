import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify'

const AllEmployeeInfo = () => {
    const [data, setData] = useState([])

    useEffect(() => {
        axios.get('http://68.178.163.174:5012/employees/')
        .then(res => {
            setData(res.data)
            
        })
    }, [])

  return (
    <div className='details'>
        <ToastContainer />
        <div className="container-fluid px-5 d-none d-lg-block">
                    <div className="row gx-5 py-3 align-items-center">
                        <div className="col-lg-3">
                            {/* <div className="d-flex align-items-center justify-content-start">
                              <BsPhoneVibrate className='text-success2 fs-1 me-2' />
                              <h2 className="mb-0">+012 345 6789</h2>
                          </div> */}
                        </div>
                        <div className="col-lg-6">
                            <div className="d-flex align-items-center justify-content-center">
                                <a href="#" className="navbar-brand ms-lg-5">
                                    <h1 className="m-2 display-5 fw-bold text-success2"><span className="text-success2">All Employee</span> Information</h1>
                                </a>
                            </div>
                        </div>

                    </div>
                </div>

                <table className='mt-10 table'>
                    <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Employee ID</th>
                            <th scope="col">Email</th>
                            <th scope="col">Phone Number</th>
                            <th scope="col">Present Address</th>
                            <th scope="col">Role</th>
                            <th>Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map(item => (
                                <tr>
                                    <td className='px-3'>{item.user_name}</td>
                                    <td className='px-3'>{item.employee_id}</td>
                                    <td className='px-3'>{item.email}</td>
                                    <td className='px-3'>{item.mobile_no}</td>
                                    <td className='px-3'>{item.present_address}</td>
                                    <td className='px-3'>{item.role.toUpperCase()}</td>
                                    <td className='px-3'>
                                        <button className='btn btn-warning'>Details</button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
    </div>
  )
}

export default AllEmployeeInfo