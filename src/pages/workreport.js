// Workreport.jsx
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { Toast } from "bootstrap";

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
  

  return (
    <div className="container py-4">
      <ToastContainer />
      <div className="row justify-content-center">
        <div className="col-12 col-md-10 col-lg-8">
          <h2 className="mb-4 text-center fw-bold text-primary border-3 pb-0"
            style={{ fontSize: "2rem", letterSpacing: "0.5px" }}>
          📝 Daily Work Report </h2>

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
                                        <th scope="col text-start">Name</th>
                                        <th scope="col">Employee ID</th>
                                        <th scope="col">Designation</th>
                                        <th scope="col">Phone Number</th>
                                       
                                        <th scope="col">Status</th>
                                        <th>Details</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {

                                        employees.map(item => (
                                            <tr>
                                                <td className='px-3 text-start'>{item.user_name}</td>
                                                <td className='px-3'>{item.employee_id}</td>
                                                
                                                <td className='px-3'>{item.mobile_no}</td>
                                               
                                                <td className='px-3'>{item.designation != null ? item.designation.toUpperCase() : ''}</td>
                                                <td className='px-3'>
                                                    <button onClick={(e) => {
                                                        setIsOpen(true)
                                                        setSelectedEmployee(item)
                                                    }} className='btn btn-warning'>Details</button>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>

                    }
                </div>


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
