import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'
import Modal from 'react-modal'

export const Responsibilities = () => {
    const [primary_duties, setPrimary_duties] = useState('')
    const [key_responsibilities, setKey_responsibilities] = useState('')




  const addData = e => {
    e.preventDefault()

    const employee_id = localStorage.getItem('employee_id')

    axios.post(`http://68.178.163.174:5012/employees/job_responsibility/add`, {
        employee_id,
        primary_duties,
        key_responsibilities
    }).then(res => {
        toast('Submitted')
        setPrimary_duties('')
        setKey_responsibilities('')
    })
  }


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
                                    <h1 className="m-2 display-5 fw-bold text-success2"><span className="text-success2">Job</span> Responsibilty</h1>
                                </a>
                            </div>
                        </div>

                    </div>
                </div>

                

                

                <label> Primary Duties:</label>
                <input value={primary_duties} onChange={e => setPrimary_duties(e.target.value)} className='input' type='text'/>

                <label> Key Responsibilities:</label>
                <input value={key_responsibilities} onChange={e => setKey_responsibilities(e.target.value)} className='input' type='text'/>

                
    </div>
    
  )
}
