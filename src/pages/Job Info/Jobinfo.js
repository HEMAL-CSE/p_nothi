import axios from 'axios'
import React, { useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'

export const Jobinfo = () => {
    const [jobtittle, setJobtittle] = useState('')
    const [jobdeg, setJobdef] = useState('')
    const [dept, setdept] = useState('')
    const [jobtype, setjobtype] = useState('')
    const [joining, setjoining] = useState('')
    const [joblocation, setjoblocation] = useState('')

    const addData = e => {
        e.preventDefault()
        const employee_id = localStorage.getItem('employee_id')

        axios.post(`http://68.178.163.174:5012/employees/job_info/add`, {
            employee_id,
            title: jobtittle,
            department: dept,
            designation: jobdeg,
            type: jobtype,
            joining_date: joining,
            location: joblocation
        }).then(res => {
            toast('Profile Updated')
        })
      }

  return (
    <div className='details'>
                {/* <h2>Cow Purchase</h2> */}
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
                                    <h1 className="m-2 display-4 text-success2"><span className="text-success2">Job</span> Info</h1>
                                </a>
                            </div>
                        </div>

                    </div>
                </div>

               <form>
               <label> Job Title: </label>
               <input value={jobtittle} onChange={e => setJobtittle(e.target.value)} className='input' type='text'/>

                <label> Job Designation: </label>
               <input value={jobdeg} onChange={e => setJobdef(e.target.value)} className='input' type='text'/>

               <label> Department:</label>
               <input value={dept} onChange={e => setdept(e.target.value)} className='input' type='text'/>

               <label> Job Type:</label>
               <input value={jobtype} onChange={e => setjobtype(e.target.value)} className='input' type='text'/>

               <label> Joining Date:</label>
               <input value={joining} onChange={e => setjoining(e.target.value)} className='input' type='date'/>

               <label> Job Location:</label>
               <input value={joblocation} onChange={e => setjoblocation(e.target.value)} className='input' type='text'/>

               <button onClick={addData} className='button'>Submit</button>



              </form> 
    </div>            
  )
}
