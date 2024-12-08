import axios from 'axios'
import React, { useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import '../LeaveInformation/Leave.css'

export const Leaveinfo = () => {
    const [jobtittle, setJobtittle] = useState('')
    const [jobdeg, setJobdef] = useState('')
    const [des, setdes] = useState('')
    const [fromdate, setfromdate] = useState('')
    const [todate, settodate] = useState('')
    const [nextjoindate, setnextjoindate] = useState('')
    const [joining, setjoining] = useState('')
    const [end_date, setend_date] = useState('')
    const [acheivement, setacheivement] = useState('')
    const [personres, setpersonres] = useState('')
    const [persondesignation, setpersondesignation] = useState('')
    const [address, setaddress] = useState('')


    const addData = e => {
        // e.preventDefault()
        // const employee_id = localStorage.getItem('employee_id')

        // axios.post(`http://68.178.163.174:5012/employees/experience/add`, {
        //     employee_id,
        //     title: jobtittle,
        //     // department: dept,
        //     company_name: jobdeg,
        //     start_date: joining,
        //     end_date: end_date,
        //     description: des,
        //     achievements: acheivement
        // }).then(res => {
        //     toast('Profile Updated')
        //     setJobtittle('')
        //     setJobdef('')
        //     setjoining('')
        //     setend_date('')
        //     setdes('')
        //     setacheivement('')
        // })
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
                                    <h1 className="m-2 display-5 fw-bold text-success2"><span className="text-success2">Leave</span> Application Form</h1>
                                </a>
                            </div>
                        </div>

                    </div>
                </div>

               <form>
               <label>Name of Applicant/Employee: </label>
               <input value={jobtittle} onChange={e => setJobtittle(e.target.value)} className='input' type='text'/>

               <label>Designation: </label>
               <input value={jobdeg} onChange={e => setJobdef(e.target.value)} className='input' type='text'/>

               <label>Department:</label>
               <input value={joining} onChange={e => setjoining(e.target.value)} className='input' type='text'/>

               <label>Employee ID No:</label>
               <input value={end_date} onChange={e => setend_date(e.target.value)} className='input' type='text'/>

               <label> Reason For Leave: </label>
               <input value={des} onChange={e => setdes(e.target.value)} className='input' type='text'/>

               <label> Number of Days:</label>
               <input value={acheivement} onChange={e => setacheivement(e.target.value)} className='input' type='text'/>

               <label> Select Specific Mention the Date From:</label>
               <input value={fromdate} onChange={e => setfromdate(e.target.value)} className='input' type='date'/>
                
               <label>Select Specific Mention the Date To:</label>
               <input value={todate} onChange={e => settodate(e.target.value)} className='input' type='date'/>

               <label> Next Joining Date:</label>
               <input value={nextjoindate} onChange={e => setnextjoindate(e.target.value)} className='input' type='date'/>

               <label> Address During Leave & contact number:</label>
               <input value={address} onChange={e => setaddress(e.target.value)} className='input' type='text'/>

               <label> Person's to take responsibilities on applicant's behalf that's Person Name:</label>
               <input value={personres} onChange={e => setpersonres(e.target.value)} className='input' type='text'/>

               <label>Applicant's behalf that's Person Designation:</label>
               <input value={persondesignation} onChange={e => setpersondesignation(e.target.value)} className='input' type='text'/>

               <button onClick={addData} className='button'>Submit</button>

              </form>

{/* Table section start */}
    <div className="leave-container">
      <p className="leave-title">Leave Position:</p>
      <table className="leave-table">
        <thead>
          <tr>
            <td className='title' colSpan={4} style={{ textAlign: 'center' }} > Current Leave Status </td>
          </tr>
          <tr>
            <th>Type</th>
            <th>Total</th>
            <th>Enjoyed</th>
            <th>Balance</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>C/L</td>
            <td>10</td>
            <td>1</td>
            <td>9</td>
          </tr>
          <tr>
            <td>S/L</td>
            <td>10</td>
            <td>0</td>
            <td>10</td>
          </tr>
          <tr>
            <td>E/L</td>
            <td>20</td>
            <td>1</td>
            <td>19</td>
          </tr>
        </tbody>
      </table>
      <p className="leave-footer">Last Leave Taken on: __________________________</p>
      <p className="leave-footer">Joining Date: ______________________________</p>
    </div>


    
              
    </div>            
  )
}
