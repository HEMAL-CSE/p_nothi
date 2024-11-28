import axios from 'axios'
import React, { useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'

export const Experience = () => {
    const [jobtittle, setJobtittle] = useState('')
    const [jobdeg, setJobdef] = useState('')
    const [des, setdes] = useState('')
    const [joining, setjoining] = useState('')
    const [end_date, setend_date] = useState('')
    const [acheivement, setacheivement] = useState('')

    const addData = e => {
        e.preventDefault()
        const employee_id = localStorage.getItem('employee_id')

        axios.post(`http://68.178.163.174:5012/employees/job_info/add`, {
            employee_id,
            title: jobtittle,
            // department: dept,
            designation: jobdeg,
            start_date: joining,
            end_date: joining,
            acheivement: acheivement
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
                                    <h1 className="m-2 display-5 fw-bold text-success2"><span className="text-success2">Experiences</span></h1>
                                </a>
                            </div>
                        </div>

                    </div>
                </div>

               <form>
               <label> Job Title: </label>
               <input value={jobtittle} onChange={e => setJobtittle(e.target.value)} className='input' type='text'/>

                <label> Company Name: </label>
               <input value={jobdeg} onChange={e => setJobdef(e.target.value)} className='input' type='text'/>

               <label> Start Date:</label>
               <input value={joining} onChange={e => setjoining(e.target.value)} className='input' type='date'/>

               <label> End Date:</label>
               <input value={end_date} onChange={e => setend_date(e.target.value)} className='input' type='date'/>

               <label> Job Description: </label>
               <input value={des} onChange={e => setdes(e.target.value)} className='input' type='text'/>


               <label> Achievements:</label>
               <input value={acheivement} onChange={e => setacheivement(e.target.value)} className='input' type='text'/>

               <button onClick={addData} className='button'>Submit</button>



              </form> 
    </div>            
  )
}
