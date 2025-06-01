import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { Toast } from "bootstrap";
import Modal from 'react-modal'
import moment from 'moment'

const WorkreportAdc = () => {

  // Declare your state variables here using useState
  const [jobtitle, setjobtitle] = useState(''); // Initialize with an empty string or suitable default
  const [jobdeg, setjobdeg] = useState('');
  const [jobtype, setjobtype] = useState('');
  const [joining, setjoining] = useState('');
  const [joblocation, setjoblocation] = useState('');
  // const [jobtitle, setjobtitle] = useState('');


  const [isOpen, setIsOpen] = useState(false)
  const [selectedEmployee, setSelectedEmployee] = useState({})
  const [division, setdivision] = useState('')
  const [divisions, setdivisions] = useState([])
  const [branches, setBranches] = useState([])
  const [branch, setBranch] = useState('')
  const [dept, setdept] = useState('')
  const [isLoading, setIsLoading] = useState(false);
  const [report_date, setReport_date] = useState(new Date())

  const [employees, setEmployees] = useState([])

  const [employee, setEmployee] = useState({})

  const [education, setEducation] = useState([])

  const [job_info, setJob_info] = useState({})

  const [experience, setExperience] = useState([])

  const [departments, setDepartments] = useState([])

  const [workreport_date, setWorkreport_date] = useState('')

  const [workReports, setWorkReports] = useState([]);

  const [report1, setReport1] = useState("");
  const [report2, setReport2] = useState("");
  const [report3, setReport3] = useState("");
  const [report4, setReport4] = useState("");
  const [report5, setReport5] = useState("");

//   ADC Add
  const assistantDivisionHeads = [
  "202200267", "202200473", "202200306", "202200422",
  "202200385", "20220030", "202200148"
];


  // Edit Modal Section
  const [employee_data, setEmployee_data] = useState({})

  const [data, setData] = useState([]);

  const addData = (e, slot_number, report) => {
    
    const employee_id = localStorage.getItem('employee_id');
    
    console.log('Sending employee_id:', employee_id); // Debug log

    axios.post(`https://server.promisenothi.com/employees/daily_work_report/add`, {
      employee_id, // Ensure numeric value
      slot_number,
      report,
      report_date: report_date
    }).then(res => {
      toast('Report Submitted');
    }).catch(error => {
      console.error('Submission error:', error);
    });
  };

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



  // New function to fetch work report details
  const getWorkReportDetails = async (employee) => {
    try {
      setIsLoading(true);
      const response = await axios.get(`https://server.promisenothi.com/employees/daily_work_report?employee_id=${employee.id}&&report_date=${workreport_date}`);
      setWorkReports(response.data);
      setSelectedEmployee(employee)
      setIsOpen(true)
    } catch (error) {
      console.error('Error fetching work reports:', error);
      toast.error('Error fetching work reports');
      setWorkReports([]);
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="container py-4">
      <ToastContainer />
      <div className="row justify-content-center">
        <h3 className="mb-2 text-center fw-bold text-primary border-3 pb-0"
          style={{ fontSize: "2rem", letterSpacing: "0.5px" }}> 📝 Daily Work Report For ADC </h3>
        {['1', '2',].includes(localStorage.getItem('role')) && <div className='border border-1 border-black p-2 m-4 d-flex flex-column align-items-center'>

          {/* Selected date */}
          <br />
          <div
            className="d-flex align-items-center"
            style={{ gap: '8px', maxWidth: 400 }}
          >
            {/* Icon + Label একসাথে */}
            <label
              htmlFor="workreportDate"
              className="d-flex align-items-center fw-bold text-primary mb-0"
              style={{ whiteSpace: 'nowrap', userSelect: 'none', fontSize: '17px' }}
            >
              <span role="img" aria-label="calendar" style={{ marginRight: 6, }}>
                📅
              </span>
              Select Date:
            </label>

            {/* Date Input */}
            <input
              id="workreportDate"
              type="date"
              className="form-control border-primary shadow-sm"
              value={workreport_date}
              onChange={(e) => {
                console.log('Date selected:', e.target.value);
                setWorkreport_date(e.target.value);
              }}
              style={{ maxWidth: 200 }}
            />
          </div>

          {/* Job Dept Search Option */}
          <div className='d-flex flex-column w-50 '>
            <label style={{ fontSize: '18px' }} className="d-flex align-items-center fw-bold text-primary mb-0" > Job Department: </label>
            <select onChange={e => {
              setdept(e.target.value)
            }} className='select'
            style={{ padding: '7px'}}
            >
              <option>Select</option>
              {
                departments.map(item => (
                  <option value={item.id}>{item.name}</option>
                ))
              }
            </select>

            {dept == 2 &&
              <div style={{ display: 'flex', gap: '21px', alignItems: 'center', padding: '09px 0' }}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <label style={{ fontWeight: 500 }}>Division</label>
                  <select
                    value={division}
                    onChange={e => {
                      setdivision(e.target.value)
                      getBranches(e.target.value)
                    }}
                    className='select'
                    style={{ padding: '7px', minWidth: '150px' }}
                  >
                    <option>Select</option>
                    {divisions.map(item => (
                      <option key={item.id} value={item.id}>{item.name}</option>
                    ))}
                  </select>
                </div>

                
              </div>
            }

            <button onClick={getEmployees} className='btn btn-primary my-3'>Submit</button>
          </div>
          {

            <div>
              <table className='mt-10 table'>
                <thead>
                  <tr>
                    {/* <th scope="col text-start"> Date</th> */}
                    <th className="px-2" scope="col "> Report Date</th>

                    <th className="px-2" scope="col "> Employee Name</th>

                    <th className="px-3" scope="col">Employee ID</th>
                    <th className="px-3" scope="col">Designation</th>
                    {/* <th className="px-3" scope="col">Phone Number</th> */}

                    <th className="px-3" scope="col">Submission Status</th>
                    <th className="px-3" scope="col">Details</th>
                  </tr>
                </thead>
                <tbody>
                  {

                    employees.map((item, index) => (
                      <tr key={`${item.employee_id}-${index}`}>

                        <td className='px-3 text-start'>{item.Date}</td>
                        <td className='px-3 text-start'>{item.user_name}</td>
                        <td className='px-3'>{item.employee_id}</td>

                        {/* <td className='px-3'>{item.mobile_no}</td> */}

                        <td className='px-3'>{item.designation != null ? item.designation.toUpperCase() : ''}</td>
                        {/* <td className='px-3'>{item.mobile_no}</td> */}
                        <td className='px-3'> <button type="button" class="btn btn-success">Submitted</button></td>
                        <td className='px-3'>
                          <button onClick={() => getWorkReportDetails(item)} className='btn btn-warning'>Details</button>
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
                top: "06%",
                left: "15%",
                right: "12%",
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
              console.log('Modal closed, clearing work reports');
              setIsOpen(false);
              setWorkReports([]); // Clear previous data
            }}
          >
            {isLoading && <div className="text-center">Loading reports...</div>}

            <div className="container-fluid px-5 d-none d-lg-block">
              <div className="row gx-5 py-3 align-items-center">
                <div className="col-lg-3">
                  {/* Additional content can go here */}
                </div>
                <div className="col-lg-6">
                  <div className="d-flex align-items-center justify-content-center">
                    <a href="#" className="navbar-brand ms-lg-5">
                      <h1 className="m-2 display-5 fw-bold text-success2">
                        <span className="text-success2">Employee</span> Info
                      </h1>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Employee Info */}
            {Object.keys(selectedEmployee).length !== 0 && (
              <div className='d-flex p-3 flex-column bg-card align-items-start'>
                <div className='m-2'>
                  <span className='fw-bold'>Name:</span> {selectedEmployee.user_name}
                </div>
                {/* 
            <div className='m-2'>
                <span className='fw-bold'>NID:</span> {selectedEmployee.nid}
            </div> */}
                <div className='m-2'>
                  <span className='fw-bold'>Designation:</span> {selectedEmployee.designation}
                </div>
              </div>
            )}

            <div className="d-flex align-items-center justify-content-center">
              <a href="#" className="navbar-brand ms-lg-5">
                <h1 className="m-2 display-5 fw-bold text-success2">
                  <span className="text-success2">Employee</span> Work Report
                </h1>
              </a>
            </div>
            <div className='m-2'>
              <span className='fw-bold'>Selected Date: </span>
              {moment(workreport_date).format('DD/MM/YYYY')}
            </div>

            {/* Work Reports Section */}
            <div className="mt-4">
              <h3>Daily Work Reports</h3>
              <div className="row">
                {/* Slot 1 */}

                <div className="col-md-4 mb-3">
                  <div className="card h-100">
                    <div className="card-header bg-light">Slot 1 (9:00 AM - 12:00 PM)</div>
                    <div className="card-body">
                      {workReports.find(r => r.slot_number === 1)?.report ||
                        <span className="text-muted">No report submitted</span>}
                    </div>
                  </div>
                </div>

                {/* Slot 2 */}
                <div className="col-md-4 mb-3">
                  <div className="card h-100">
                    <div className="card-header bg-light">Slot 2 (12:00 PM - 2:00 PM)</div>
                    <div className="card-body">
                      {workReports.find(r => r.slot_number === 2)?.report ||
                        <span className="text-muted">No report submitted</span>}
                    </div>
                  </div>
                </div>

                {/* Slot 3 */}
                <div className="col-md-4 mb-3">
                  <div className="card h-100">
                    <div className="card-header bg-light">Slot 3 (2:00 PM - 4:00 PM)</div>
                    <div className="card-body">
                      {workReports.find(r => r.slot_number === 3)?.report ||
                        <span className="text-muted">No report submitted</span>}
                    </div>
                  </div>
                </div>

                {/* Slot 4 */}
                <div className="col-md-6 mb-3">
                  <div className="card h-100">
                    <div className="card-header bg-light">Slot 4 (4:00 PM - 6:00 PM)</div>
                    <div className="card-body">
                      {workReports.find(r => r.slot_number === 4)?.report ||
                        <span className="text-muted">No report submitted</span>}
                    </div>
                  </div>
                </div>

                {/* Slot 5 */}
                <div className="col-md-6 mb-3">
                  <div className="card h-100">
                    <div className="card-header bg-light">Slot 5 (6:00 PM - 8:00 PM)</div>
                    <div className="card-body">
                      {workReports.find(r => r.slot_number === 5)?.report ||
                        <span className="text-muted">No report submitted</span>}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Modal>

          {/* Edit Section On Modal */}


        </div>}


      </div>


    </div>

  );
};

export default WorkreportAdc;
