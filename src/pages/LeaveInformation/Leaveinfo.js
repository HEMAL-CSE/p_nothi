import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import '../LeaveInformation/Leave.css'

export const Leaveinfo = () => {

  const [reason_for_leave, setReason_for_leave] = useState('')
  const [number_of_days, setNumberOfDays] = useState('')
  const [date_from, setDate_from] = useState('')
  const [leave_type, setLeave_type] = useState('')
  const [leave_types, setLeave_types] = useState([
    {
      name: 'cl'
    }, {
      name: 'sl'
    },{
      name: 'el'
    },
  ])

  const [leave_duration, setLeave_duration] = useState('')
  const [leave_durations, setLeave_durations] = useState([
    {
      name: 'Full Day'
    }, {
      name: 'Half Day'
    },
  ])

  const role = localStorage.getItem('role')
  const [date_to, setDate_to] = useState('')
  const [next_joining_date, setNext_joining_date] = useState('')
  const [address_during_leave, setAddress_during_leave] = useState('')
  const [contact_number_during_leave, setContact_number_during_leave] = useState('')
  const [responsible_employee_id, setResponsible_employee_id] = useState('')
  const [responsible_employees, setResponsible_employees] = useState([])
  const [cl, setCl] = useState(0)
  const [sl, setSl] = useState(0)
  const [el, setEl] = useState(0)
  const [data, setData] = useState([])
  const [pending_leaves, setPending_leaves] = useState([])

  const addData = e => {
    e.preventDefault()
    const employee_id = localStorage.getItem('employee_id')

    axios.get(`http://68.178.163.174:5012/employees/leave_info?employee_id=${employee_id}`)
      .then(res => {
        axios.post(`http://68.178.163.174:5012/employees/leave_info/add`, {
          employee_id,
          reason_for_leave,
          number_of_days,
          date_from,
          date_to,
          next_joining_date,
          contact_number_during_leave,
          address_during_leave,
          responsible_employee_id,
          leave_type,
          leave_duration
        }).then(res => {
        getLeaves()

          toast('Leave Information Submitted')

        })
      })


  }

  const getPendingLeaves = () => {
    const employee_id = localStorage.getItem('employee_id')

    axios.get(`http://68.178.163.174:5012/employees/pending_leaves?reporting_officer=${employee_id}`)
    .then(res => {
    
      setPending_leaves(res.data)
    })
  }
  

  const getLeaves = () => {
    const employee_id = localStorage.getItem('employee_id')


    axios.get(`http://68.178.163.174:5012/employees/leave_info?employee_id=${employee_id}`)
      .then(res => {
        if (res.data.length > 0) {
          setCl(res.data[res.data.length - 1].cl)
          setSl(res.data[res.data.length - 1].sl)
          setEl(res.data[res.data.length - 1].el)
          setData(res.data)

        }
      })
  }

  useEffect(() => {

    axios.get(`http://68.178.163.174:5012/employees/job_info?employee_id=${localStorage.getItem('employee_id')}`).then(res => {
      axios.get(`http://68.178.163.174:5012/employees/job_info?department=${res.data[0].department}`).then(res2 => {
        setResponsible_employees(res2.data)
      })
    })

    getLeaves()
    getPendingLeaves()
  }, [])

  const approve = (e, id, leave_type, leave_duration) => {
    e.preventDefault()
    axios.put(`http://68.178.163.174:5012/employees/pending_leaves/approve?id=${id}`, {
      leave_type,
      leave_duration
    }).then(res => {
      toast('Approved Successfully')
      getPendingLeaves()
    })
  }

  const reject = (e, id) => {
    e.preventDefault()
    axios.put(`http://68.178.163.174:5012/employees/pending_leaves/approve?id=${id}`).then(res => {
      toast('Rejected Successfully')
      getPendingLeaves()
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
                <h1 className="m-2 display-5 fw-bold text-success2"><span className="text-success2">Leave</span> Application Form</h1>
              </a>
            </div>
          </div>

        </div>
      </div>

      <form>
        <label>Leave Type</label>
        <select onChange={e => {
          setLeave_type(e.target.value)
        }} className='select'>
          <option>Select</option>
          {
            leave_types.map(item => (
              <option value={item.name}>{item.name}</option>
            ))
          }
        </select>

        <label>Leave Duration</label>
        <select onChange={e => {
          setLeave_duration(e.target.value)
        }} className='select'>
          <option>Select</option>
          {
            leave_durations.map(item => (
              <option value={item.name}>{item.name}</option>
            ))
          }
        </select>

        <label> Reason For Leave: </label>
        <input value={reason_for_leave} onChange={e => setReason_for_leave(e.target.value)} className='input' type='text' />

        <label> Number of Days:</label>
        <input value={number_of_days} onChange={e => setNumberOfDays(e.target.value)} className='input' type='text' />

        <label> Select Specific Mention the Date From:</label>
        <input value={date_from} onChange={e => setDate_from(e.target.value)} className='input' type='date' />

        <label>Select Specific Mention the Date To:</label>
        <input value={date_to} onChange={e => setDate_to(e.target.value)} className='input' type='date' />

        <label> Next Joining Date:</label>
        <input value={next_joining_date} onChange={e => setNext_joining_date(e.target.value)} className='input' type='date' />

        <label> Address During Leave:</label>
        <input value={address_during_leave} onChange={e => setAddress_during_leave(e.target.value)} className='input' type='text' />

        <label> Contact Number During Leave:</label>
        <input value={contact_number_during_leave} onChange={e => setContact_number_during_leave(e.target.value)} className='input' type='text' />

        <label> Person's to take responsibilities on applicant's behalf that person:</label>
        <select onChange={e => {
          setResponsible_employee_id(e.target.value)
        }} className='select'>
          <option>Select</option>
          {
            responsible_employees.map(item => (
              <option value={item.employee_id}>{item.user_name}</option>
            ))
          }
        </select>

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
              <td>{cl}</td>
              <td>{10 - cl}</td>
            </tr>
            <tr>
              <td>S/L</td>
              <td>10</td>
              <td>{sl}</td>
              <td>{10 - sl}</td>
            </tr>
            <tr>
              <td>E/L</td>
              <td>20</td>
              <td>{el}</td>
              <td>{20 - el}</td>
            </tr>
          </tbody>
        </table>
        {/* <p className="leave-footer">Last Leave Taken on: __________________________</p>
        <p className="leave-footer">Joining Date: ______________________________</p>
       */}
      </div>
      {
        ['manager', 'admin'].includes(role)
         && 
         <div>
      <label>Pending Leaves</label>
      <table className='table'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Number of days</th>
              <th>Reason</th>
              <th>Approved</th>
            </tr>
          </thead>
          <tbody>
            {
              pending_leaves.map(item => (
                <tr>
                  <td>{item.user_name}</td>
                  <td>{item.number_of_days}</td>
                  <td>{item.reason_for_leave}</td>
                  {item.approved == 'PENDING' ? <td> 
                    <button onClick={e => approve(e, item.id, item.leave_type, item.leave_duration)} className='btn btn-success mx-2'>
                      Approve
                    </button>
                    <button onClick={e => reject(e, item.id)} className='btn btn-danger'>
                      Reject
                    </button>
                  </td> : <td>{item.approved}</td>}
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
      }
      
        

        <table className='table mt-5'>
          <thead>
            <tr>
              <th>Number of days</th>
              <th>Reason</th>
              <th>Approved</th>
            </tr>
          </thead>
          <tbody>
            {
              data.map(item => (
                <tr>
                  <td>{item.number_of_days}</td>
                  <td>{item.reason_for_leave}</td>
                  <td>{item.approved}</td>
                </tr>
              ))
            }
          </tbody>
        </table>


    </div>
  )
}
