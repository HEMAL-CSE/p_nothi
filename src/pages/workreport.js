// Workreport.jsx
import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { Toast } from "bootstrap";
import Modal from 'react-modal'
import moment from 'moment'

const Workreport = () => {

        const [isOpen, setIsOpen] = useState(false)
        const [selectedEmployee, setSelectedEmployee] = useState({})
        const [division, setdivision] = useState('')
        const [divisions, setdivisions] = useState([])
        const [branches, setBranches] = useState([])
        const [branch, setBranch] = useState('')
        const [dept, setdept] = useState('')
    
        const [employees, setEmployees] = useState([])
    
        const [employee, setEmployee] = useState({})
    
        const [education, setEducation] = useState([])
    
        const [job_info, setJob_info] = useState({})
    
        const [experience, setExperience] = useState([])
    
        const [departments, setDepartments] = useState([])

    const [report1, setReport1] = useState("");
    const [report2, setReport2] = useState("");
    const [report3, setReport3] = useState("");
    const [report4, setReport4] = useState("");
    const [report5, setReport5] = useState("");

    const [data, setData] = useState([]);

    const addData = (e, slot_number, report) => {
      let employee_id = localStorage.getItem('employee_id')
      axios.post(`https://server.promisenothi.com/employees/daily_work_report/add`, {
        employee_id,
        slot_number,
        report,
        report_date: new Date().toISOString()
      }).then(res => {
        toast('Report Submitted')
      })
      
    }

    const getData = () => {
      axios.get(`https://server.promisenothi.com/employees/daily_work_report`).then(res => {
        setData(res.data)
      })
    }

     useEffect(() => {
            axios.get('https://server.promisenothi.com/employees/departments').then(res => {
                setDepartments(res.data)
            })
        }, [])
    
        useEffect(() => {
    
            if (dept == 2) {
                axios.get('https://server.promisenothi.com/employees/divisions').then(res => {
                    setdivisions(res.data)
                })
    
            }
        }, [dept])
    
        const getBranches = (division_id) => {
            axios.get(`https://server.promisenothi.com/employees/branches?division_id=${division_id}`).then(res => {
                setBranches(res.data)
            })
        }
    
        const getEmployees = () => {
            if (branch != '') {
                axios.get(`https://server.promisenothi.com/employees?department=${dept}&&branch_id=${branch}`).then(res => {
                    setEmployees(res.data)
                })
            } else if (dept == 2 && branch == '' && division != '') {
                axios.get(`https://server.promisenothi.com/employees?department=${dept}&&branch_division_id=${division}`).then(res => {
                    setEmployees(res.data)
                })
            } else {
                axios.get(`https://server.promisenothi.com/employees?department=${dept}`).then(res => {
                    setEmployees(res.data)
                })
            }
        }

        useEffect(() => {
                  axios.get('https://server.promisenothi.com/employees/departments').then(res => {
                      setDepartments(res.data)
                  })
              }, [])
            
  
  return (
    <div className="container py-4">
      <ToastContainer />
      <div className="row justify-content-center">

         <h2 className="mb-2 text-center fw-bold text-primary border-3 pb-0"
            style={{ fontSize: "2rem", letterSpacing: "0.5px" }}> 📝 Daily Work Report </h2>
 <div className='border border-1 border-black p-2 m-4 d-flex flex-column align-items-center'>
                    <div className='d-flex flex-column w-50'>
                        <label> Job Department: </label>
                        <select onChange={e => {
                            setdept(e.target.value)
                        }} className='select'>
                            <option>Select</option>
                            {
                                departments.filter(e => e.id != 3).map(item => (
                                    <option value={item.id}>{item.name}</option>
                                ))
                            }
                        </select>

                        {dept == 2 &&
                            <div>
                                <label>Division</label>

                                <select value={division} onChange={e => {

                                    setdivision(e.target.value)
                                    getBranches(e.target.value)
                                }} className='select' >
                                    <option >Select</option>
                                    {
                                        divisions.map(item => (
                                            <option value={item.id}>{item.name}</option>
                                        ))
                                    }
                                </select>

                                <label>Branch</label>

                                <select value={branch} onChange={e => {

                                    setBranch(e.target.value)

                                }} className='select' >
                                    <option >Select</option>
                                    {
                                        branches.map(item => (
                                            <option value={item.id}>{item.name}</option>
                                        ))
                                    }
                                </select></div>}

                        <button onClick={getEmployees} className='btn btn-primary my-3'>Submit</button>
                    </div>
                    {

                        <div>
                            <table className='mt-10 table'>
                                <thead>
                                    <tr>
                                        <th scope="col text-start"> Date</th>
                                        <th className="px-2" scope="col "> Employee Name</th>
                                    
                                        <th className="px-3" scope="col">Employee ID</th>
                                        <th className="px-3" scope="col">Designation</th>
                                        <th className="px-3" scope="col">Phone Number</th>
                                       
                                        <th className="px-3" scope="col">Submission Status</th>
                                        <th className="px-3" scope="col">Details</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {

                                        employees.map(item => (
                                            <tr>
                                                <td className='px-3 text-start'>{item.Date}</td>
                                                <td className='px-3 text-start'>{item.user_name}</td>
                                                <td className='px-3'>{item.employee_id}</td>
                                                
                                                {/* <td className='px-3'>{item.mobile_no}</td> */}
                                               
                                                <td className='px-3'>{item.designation != null ? item.designation.toUpperCase() : ''}</td>
                                                <td className='px-3'>{item.mobile_no}</td>
                                                <td className='px-3'> <button type="button" class="btn btn-success">Submitted</button></td>
                                                <td className='px-3'>
                                                    <button onClick={(e) => {
                                                        setIsOpen(true)
                                                        setSelectedEmployee(item)
                                                    }} className='btn btn-warning' >Details</button>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    }

                        <Modal
                                    style={{
                                        content: {
                                            width: "70%",
                                            height: "70%",
                                            zIndex: 10,
                                            top: "5%",
                                            left: "10%",
                                            right: "10%",
                                            bottom: "5%",
                                            overflow: "auto",
                                            WebkitBoxShadow: "0 5px 15px rgba(0, 0, 0, 0.5)",
                                            MozBoxShadow: "0 5px 15px rgba(0, 0, 0, 0.5)",
                                            boxShadow: "0 5px 15px rgba(0, 0, 0, 0.5)",
                                            borderRadius: "5px",
                                            border: "1px solid #ccc",
                                        },
                                        overlay: { zIndex: 10000 }
                                    }}
                                    isOpen={isOpen}
                                    onRequestClose={() => {
                                        setIsOpen(false)
                                    }}
                                >
                    
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
                                                        <h1 className="m-2 display-5 fw-bold text-success2"><span className="text-success2">Employee</span> Profile</h1>
                                                    </a>
                                                </div>
                                            </div>
                    
                                        </div>
                                    </div>
                    
                                    {
                                        Object.keys(employee).length != 0 &&
                                        <div className='d-flex p-3 flex-column bg-card align-items-start'>
                                            <div className='m-2'>
                                                <span className='fw-bold'>Name:</span> {employee.user_name}
                                            </div>
                    
                                            <div className='m-2'>
                                                <span className='fw-bold'>Father Name:</span> {employee.father_name}
                                            </div>
                    
                                            <div className='m-2'>
                                                <span className='fw-bold'>Mother Name:</span> {employee.mother_name}
                                            </div>
                    
                                            <div className='m-2'>
                                                <span className='fw-bold'>NID:</span> {employee.nid}
                                            </div>
                                            <div className='m-2'>
                                                <span className='fw-bold'>Present Address:</span> {employee.present_address}
                                            </div>
                                            <div className='m-2'>
                                                <span className='fw-bold'>Division:</span> {employee.division_name}
                    
                                            </div>
                                            <div className='m-2'>
                                                <span className='fw-bold'>District:</span> {employee.district_name}
                    
                                            </div>
                                            <div className='m-2'>
                                                <span className='fw-bold'>Upazila:</span> {employee.upazila_name}
                    
                                            </div>
                                            <div className='m-2'>
                                                <span className='fw-bold'>Village:</span> {employee.village}
                    
                                            </div>
                                            <div className='m-2'>
                                                <span className='fw-bold'>Blood Group:</span> {employee.blood_group}
                    
                                            </div>
                                        </div>
                                    }
                    
                                   
                                    <h2 className='mt-3'>Job Info</h2>
                    
                                    {
                                        Object.keys(job_info).length != 0 && job_info != undefined &&
                                        <div className='d-flex p-3 flex-column bg-card align-items-start'>
                                            <div className='m-2'>
                                                <span className='fw-bold'>Job Title:</span> {job_info.title}
                                            </div>
                    
                                            <div className='m-2'>
                                                <span className='fw-bold'>Job Department:</span> {job_info.department_name}
                                            </div>
                    
                                            <div className='m-2'>
                                                <span className='fw-bold'>Job Designation:</span> {job_info.designation}
                                            </div>
                    
                                            {job_info.department == 2 && <div className='m-2'>
                                                <span className='fw-bold'>Branch:</span> {job_info.branch_name}
                                            </div>}
                    
                                            {job_info.department == 2 && <div className='m-2'>
                                                <span className='fw-bold'>Division:</span> {job_info.division_name}
                                            </div>}
                    
                                            <div className='m-2'>
                                                <span className='fw-bold'>Job Type:</span> {job_info.type}
                                            </div>
                                            <div className='m-2'>
                                                <span className='fw-bold'>Joining Date:</span> {moment(job_info.joining_date).format('DD/MM/yyyy')}
                                            </div>
                                            <div className='m-2'>
                                                <span className='fw-bold'>Location:</span> {job_info.location}
                    
                                            </div>
                                        </div>
                                    }
                    
                            </Modal>
                </div> 

  <div className="col-12 col-md-10 col-lg-8">


{/* 1st Slot */}
      <div className="d-flex border rounded-4 p-0 overflow-hidden shadow-sm" style={{ minHeight: "132px" }}>
      {/* Left Time Slot Section (Narrowed) */}
      <div
        className="bg-light d-flex align-items-center justify-content-center px-2"
        style={{
          minWidth: "101px", // ⬅️ Reduced from 120px
          borderRight: "1px solid #dee2e6",
          fontWeight: "500",
          fontSize: "0.88rem",
          textAlign: "center"}}> 9:00 AM - 12:00 PM
      </div>

      {/* Right Text Area Section */}
      <div className="flex-grow-1">
        <textarea
          className="form-control border-0 h-100 rounded-0 p-3"
          placeholder="Enter work update here..."
          id="text1"
          style={{ height: "100%", minHeight: "130px", resize: "none" }}
          value={report1}
          onChange={(e) => setReport1(e.target.value)}/>
      </div>
    </div> 
       <br/>
    <div className="text-end">
          <button onClick={(e) => addData(e, 1, report1)} type="submit" className="btn btn-primary px-3">
            Submit
          </button>
        </div> <br/>


{/* 2nd Slot */}
      <div className="d-flex border rounded-4 p-0 overflow-hidden shadow-sm" style={{ minHeight: "132px" }}>
      {/* Left Time Slot Section (Narrowed) */}
      <div
        className="bg-light d-flex align-items-center justify-content-center px-2"
        style={{
          minWidth: "101px", // ⬅️ Reduced from 120px
          borderRight: "1px solid #dee2e6",
          fontWeight: "500",
          fontSize: "0.88rem",
          textAlign: "center"}}> 12:00 AM - 2:00 PM
      </div>

      {/* Right Text Area Section */}
      <div className="flex-grow-1">
        <textarea
          className="form-control border-0 h-100 rounded-0 p-3"
          placeholder="Enter work update here..."
          id="text1"
          style={{ height: "100%", minHeight: "130px", resize: "none" }}
          value={report2}
          onChange={(e) => setReport2(e.target.value)}/>
      </div>
    </div> <br/>

  <div className="text-end">
          <button onClick={(e) => addData(e, 2, report2)} type="submit" className="btn btn-primary px-3">
            Submit
          </button>
      </div> <br/>

    {/* 3rd Slot */}
      <div className="d-flex border rounded-4 p-0 overflow-hidden shadow-sm" style={{ minHeight: "132px" }}>
      {/* Left Time Slot Section (Narrowed) */}
      <div
        className="bg-light d-flex align-items-center justify-content-center px-2"
        style={{
          minWidth: "101px", // ⬅️ Reduced from 120px
          borderRight: "1px solid #dee2e6",
          fontWeight: "500",
          fontSize: "0.88rem",
          textAlign: "center"}}> 2:00 PM - 4:00 PM
      </div>

      {/* Right Text Area Section */}
      <div className="flex-grow-1">
        <textarea
          className="form-control border-0 h-100 rounded-0 p-3"
          placeholder="Enter work update here..."
          id="text1"
          style={{ height: "100%", minHeight: "130px", resize: "none" }}
          value={report3}
          onChange={(e) => setReport3(e.target.value)}/>
      </div>
    </div> <br/>

      <div className="text-end">
          <button onClick={(e) => addData(e, 3, report3)} type="submit" className="btn btn-primary px-3">
            Submit
          </button>
        </div> <br/>

    {/* 4th Slot */}
      <div className="d-flex border rounded-4 p-0 overflow-hidden shadow-sm" style={{ minHeight: "132px" }}>
      {/* Left Time Slot Section (Narrowed) */}
      <div
        className="bg-light d-flex align-items-center justify-content-center px-2"
        style={{
          minWidth: "101px", // ⬅️ Reduced from 120px
          borderRight: "1px solid #dee2e6",
          fontWeight: "500",
          fontSize: "0.88rem",
          textAlign: "center"}}> 4:00 PM - 6:00 PM
      </div>

      {/* Right Text Area Section */}
      <div className="flex-grow-1">
        <textarea
          className="form-control border-0 h-100 rounded-0 p-3"
          placeholder="Enter work update here..."
          id="text1"
          style={{ height: "100%", minHeight: "130px", resize: "none" }}
          value={report4}
          onChange={(e) => setReport4(e.target.value)}/>
      </div>
    </div> <br/>

     <div className="text-end">
          <button onClick={(e) => addData(e, 4, report4)} type="submit" className="btn btn-primary px-3">
            Submit
          </button>
        </div> <br/>


    {/* Last Slot */}
      <div className="d-flex border rounded-4 p-0 overflow-hidden shadow-sm" style={{ minHeight: "100px" }}>
      {/* Left Time Slot Section (Narrowed) */}
      <div
        className="bg-light d-flex align-items-center justify-content-center px-2"
        style={{
          minWidth: "101px", // ⬅️ Reduced from 120px
          borderRight: "1px solid #dee2e6",
          fontWeight: "500",
          fontSize: "0.88rem",
          textAlign: "center"}}> 6:00 PM - 8:00 PM
      </div>

      {/* Right Text Area Section */}
      <div className="flex-grow-1">
        <textarea
          className="form-control border-0 h-100 rounded-0 p-3"
          placeholder="Enter work update here..."
          id="text1"
          style={{ height: "100%", minHeight: "130px", resize: "none" }}
          value={report5}
          onChange={(e) => setReport5(e.target.value)}/>
      </div>
    </div> <br/>

           <div className="text-end">
          <button   onClick={(e) => addData(e, 5, report5)} type="submit" className="btn btn-primary px-3">
            Submit
          </button>
        </div>

        </div>
      </div>


    </div>

  );
};

export default Workreport;
