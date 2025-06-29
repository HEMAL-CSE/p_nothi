import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import Modal from 'react-modal';
import moment from 'moment';

const Workreport = () => {
  // State declarations
  const [isOpen, setIsOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState({});
  const [division, setdivision] = useState('');
  const [divisions, setdivisions] = useState([]);
  const [branches, setBranches] = useState([]);
  const [branch, setBranch] = useState('');
  const [dept, setdept] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [report_date, setReport_date] = useState(new Date());
  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [workreport_date, setWorkreport_date] = useState('');
  const [workReports, setWorkReports] = useState([]);
  const [report1, setReport1] = useState("");
  const [report2, setReport2] = useState("");
  const [report3, setReport3] = useState("");
  const [employeeReports, setEmployeeReports] = useState({});

  // Check if employee has submitted report
  const hasSubmittedReport = (employee) => {
    const employeeId = employee.id || employee.employee_id;
    const reports = employeeReports[employeeId] || [];
    return reports.length > 0;
  };

  // Fetch reports for a single employee
  const fetchEmployeeReports = async (employee) => {
    try {
      const response = await axios.get(
        `https://server.promisenothi.com/employees/daily_work_report?employee_id=${employee.id || employee.employee_id}&report_date=${workreport_date}`
      );
      setEmployeeReports(prev => ({
        ...prev,
        [`${employee.id || employee.employee_id}`]: response.data
      }));
    } catch (error) {
      console.error('Error fetching work reports:', error);
    }
  };

  // Submit report data
  const addData = (e, slot_number, report, setReport) => {
    const employee_id = localStorage.getItem('employee_id');

    axios.post(`https://server.promisenothi.com/employees/daily_work_report/add`, {
      employee_id,
      slot_number,
      report,
      report_date: report_date
    }).then(res => {
      toast.success('Report Submitted Successfully');
      // Clear the textarea after submission
      setReport("");
      // Refresh reports after submission
      if (selectedEmployee.id) {
        fetchEmployeeReports(selectedEmployee);
      }
    }).catch(error => {
      console.error('Submission error:', error);
      toast.error('Failed to submit report');
    });
  };

  // Get employees with their report status
  const getEmployees = () => {
    if (branch != '') {
      axios.get(`https://server.promisenothi.com/employees?department=${dept}&&branch_id=${branch}`)
        .then(res => {
          setEmployees(res.data);
          res.data.forEach(employee => {
            fetchEmployeeReports(employee);
          });
        });
    } else if (dept == 2 && branch == '' && division != '') {
      axios.get(`https://server.promisenothi.com/employees?department=${dept}&&branch_division_id=${division}`)
        .then(res => {
          setEmployees(res.data);
          res.data.forEach(employee => {
            fetchEmployeeReports(employee);
          });
        });
    } else {
      axios.get(`https://server.promisenothi.com/employees?department=${dept}`)
        .then(res => {
          setEmployees(res.data);
          res.data.forEach(employee => {
            fetchEmployeeReports(employee);
          });
        });
    }
  };

  // Get work report details
  const getWorkReportDetails = async (employee) => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `https://server.promisenothi.com/employees/daily_work_report?employee_id=${employee.id}&&report_date=${workreport_date}`
      );
      setWorkReports(response.data);
      setSelectedEmployee(employee);
      setIsOpen(true);
    } catch (error) {
      console.error('Error fetching work reports:', error);
      toast.error('Error fetching work reports');
      setWorkReports([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch departments on mount
  useEffect(() => {
    axios.get('https://server.promisenothi.com/employees/departments').then(res => {
      setDepartments(res.data);
    });
  }, []);

  // Fetch divisions when department changes
  useEffect(() => {
    if (dept == 2) {
      axios.get('https://server.promisenothi.com/employees/divisions').then(res => {
        setdivisions(res.data);
      });
    }
  }, [dept]);

  // Get branches for division
  const getBranches = (division_id) => {
    axios.get(`https://server.promisenothi.com/employees/branches?division_id=${division_id}`)
      .then(res => {
        setBranches(res.data);
      });
  };

  return (
    <div className="container py-4">
      <ToastContainer />
      <div className="row justify-content-center">
        <h2 className="mb-2 text-center fw-bold text-primary border-3 pb-0"
          style={{ fontSize: "2rem", letterSpacing: "0.5px" }}> 📝 Daily Work Report </h2>

        {['1', '2', '9'].includes(localStorage.getItem('role')) && (
          <div className='border border-1 border-black p-2 m-4 d-flex flex-column align-items-center'>
            {/* Date Selection */}
            <div className="d-flex align-items-center" style={{ gap: '8px', maxWidth: 400 }}>
              <label htmlFor="workreportDate" className="d-flex align-items-center fw-bold text-primary mb-0"
                style={{ whiteSpace: 'nowrap', userSelect: 'none', fontSize: '17px' }}>
                <span role="img" aria-label="calendar" style={{ marginRight: 6 }}>📅</span>
                Select Date:
              </label>
              <input
                id="workreportDate"
                type="date"
                className="form-control border-primary shadow-sm"
                value={workreport_date}
                onChange={(e) => setWorkreport_date(e.target.value)}
                style={{ maxWidth: 200 }}
              />
            </div>

            {/* Department Selection */}
            <div className='d-flex flex-column w-50 '>
              <label style={{ fontSize: '18px' }} className="d-flex align-items-center fw-bold text-primary mb-0">
                Job Department:
              </label>
              <select onChange={e => setdept(e.target.value)} className='select' style={{ padding: '7px' }}>
                <option>Select</option>
                {departments.map(item => (
                  <option value={item.id}>{item.name}</option>
                ))}
              </select>

              {dept == 2 && (
                <div style={{ display: 'flex', gap: '21px', alignItems: 'center', padding: '09px 0' }}>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <label style={{ fontWeight: 500 }}>Division</label>
                    <select
                      value={division}
                      onChange={e => {
                        setdivision(e.target.value);
                        getBranches(e.target.value);
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

                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <label style={{ fontWeight: 500 }}>Branch</label>
                    <select
                      value={branch}
                      onChange={e => setBranch(e.target.value)}
                      className='select'
                      style={{ padding: '7px', minWidth: '150px' }}
                    >
                      <option>Select</option>
                      {branches.map(item => (
                        <option key={item.id} value={item.id}>{item.name}</option>
                      ))}
                    </select>
                  </div>
                </div>
              )}

              <button onClick={getEmployees} className='btn btn-primary my-3'>Submit</button>
            </div>

            {/* Employees Table */}
            {employees.length > 0 && (
              <div>
                <table className='mt-10 table'>
                  <thead>
                    <tr>
                      <th scope="col text-start">Date</th>
                      <th className="px-2" scope="col">Employee Name</th>
                      <th className="px-3" scope="col">Employee ID</th>
                      <th className="px-3" scope="col">Designation</th>
                      <th className="px-3" scope="col">Submission Status</th>
                      <th className="px-3" scope="col">Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    {employees.map((item, index) => (
                      <tr key={`${item.employee_id}-${index}`}>
                        <td>{moment(workreport_date).format('DD/MM/YYYY')}</td>
                        <td className='px-3 text-start'>{item.user_name}</td>
                        <td className='px-3'>{item.employee_id}</td>
                        <td className='px-3'>{item.designation != null ? item.designation.toUpperCase() : ''}</td>
                        <td className='px-3'>
                          {hasSubmittedReport(item) ? (
                            <button className="btn btn-success px-4 py-2">
                              <i className="bi bi-check-circle-fill me-2"></i>
                              Submitted
                            </button>
                          ) : (
                            <button className="btn btn-danger px-2 py-2">
                              <i className="bi bi-x-circle-fill me-2"></i>
                              Not Submitted
                            </button>
                          )}
                        </td>
                        <td className='px-3'>
                          <button onClick={() => getWorkReportDetails(item)} className='btn btn-warning px-4 py-2'>
                            <i className="bi bi-eye-fill me-2"></i>
                            View Report
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Report Details Modal */}
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
                  boxShadow: "0 5px 15px rgba(0, 0, 0, 0.5)",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                },
                overlay: { zIndex: 10000 }
              }}
              isOpen={isOpen}
              onRequestClose={() => {
                setIsOpen(false);
                setWorkReports([]);
              }}
            >
              {isLoading && <div className="text-center">Loading reports...</div>}

              <div className="container-fluid px-5 d-none d-lg-block">
                <div className="row gx-5 py-3 align-items-center">
                  <div className="col-lg-3"></div>
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
                      <div className="card-header bg-light">Slot 1 (9:00 AM - 2:00 PM)</div>
                      <div className="card-body">
                        {workReports.find(r => r.slot_number === 1)?.report ||
                          <span className="text-muted">No report submitted</span>}
                      </div>
                    </div>
                  </div>

                  {/* Slot 2 */}
                  <div className="col-md-4 mb-3">
                    <div className="card h-100">
                      <div className="card-header bg-light">Slot 2 (2:00 PM - 6:00 PM)</div>
                      <div className="card-body">
                        {workReports.find(r => r.slot_number === 2)?.report ||
                          <span className="text-muted">No report submitted</span>}
                      </div>
                    </div>
                  </div>

                  {/* Slot 3 */}
                  <div className="col-md-4 mb-3">
                    <div className="card h-100">
                      <div className="card-header bg-light">Slot 3 (6:00 PM - 8:00 PM)</div>
                      <div className="card-body">
                        {workReports.find(r => r.slot_number === 3)?.report ||
                          <span className="text-muted">No report submitted</span>}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Modal>
          </div>
        )}

        {/* Report Submission Section */}
        <div className="col-12 col-md-10 col-lg-8">
          {/* 1st Slot */}
          <div className="d-flex align-items-center" style={{ gap: '8px', maxWidth: 320, marginTop: '8px' }}>
            <label htmlFor="workreportDate" className="d-flex align-items-center fw-bold text-primary mb-0"
              style={{ whiteSpace: 'nowrap', userSelect: 'none', fontSize: '17px' }}>
              <span role="img" aria-label="calendar" style={{ marginRight: 6 }}>📅</span>
              Select Date:
            </label>
            <input value={report_date} style={{ width: 400 }} onChange={e => setReport_date(e.target.value)}
              className="form-control border-primary shadow-sm" type='date' />
          </div>
          <br />

          {/* Time Slot 1 */}
          <div className="d-flex border rounded-4 p-0 overflow-hidden shadow-sm" style={{ minHeight: "170px" }}>
            <div className="bg-light d-flex align-items-center justify-content-center px-2"
              style={{
                minWidth: "101px",
                borderRight: "1px solid #dee2e6",
                fontWeight: "700",
                fontSize: "0.88rem",
                textAlign: "center"
              }}>
              9:00 AM - 2:00 PM
            </div>
            <div className="flex-grow-1">
              <textarea
                className="form-control border-0 h-100 rounded-0 p-3"
                placeholder="Write your work update here..."
                style={{ height: "100%", minHeight: "130px", resize: "none" }}
                value={report1}
                onChange={(e) => setReport1(e.target.value)}
              />
            </div>
          </div>
          <br />
          <div className="text-end">
            <button onClick={(e) => addData(e, 1, report1, setReport1)} type="submit" className="btn btn-primary px-2 py-2">
              <i className="bi bi-send-fill me-2"></i>
              Submit Report
            </button>
          </div>
          <br />

          {/* Time Slot 2 */}
          <div className="d-flex border rounded-4 p-0 overflow-hidden shadow-sm" style={{ minHeight: "170px" }}>
            <div className="bg-light d-flex align-items-center justify-content-center px-2"
              style={{
                minWidth: "101px",
                borderRight: "1px solid #dee2e6",
                fontWeight: "700",
                fontSize: "0.88rem",
                textAlign: "center"
              }}>
              2:00 PM - 6:00 PM
            </div>
            <div className="flex-grow-1">
              <textarea
                className="form-control border-0 h-100 rounded-0 p-3"
                placeholder="Write your work update here..."
                style={{ height: "100%", minHeight: "130px", resize: "none" }}
                value={report2}
                onChange={(e) => setReport2(e.target.value)}
              />
            </div>
          </div>
          <br />
          <div className="text-end">
            <button onClick={(e) => addData(e, 2, report2, setReport2)} type="submit" className="btn btn-primary px-2 py-2">
              <i className="bi bi-send-fill me-2"></i>
              Submit Report
            </button>
          </div>
          <br />

          {/* Time Slot 3 */}
          <div className="d-flex border rounded-4 p-0 overflow-hidden shadow-sm" style={{ minHeight: "170px" }}>
            <div className="bg-light d-flex align-items-center justify-content-center px-2"
              style={{
                minWidth: "101px",
                borderRight: "1px solid #dee2e6",
                fontWeight: "700",
                fontSize: "0.88rem",
                textAlign: "center"
              }}>
              6:00 PM - 8:00 PM
            </div>
            <div className="flex-grow-1">
              <textarea
                className="form-control border-0 h-100 rounded-0 p-3"
                placeholder="Write your work update here..."
                style={{ height: "100%", minHeight: "130px", resize: "none" }}
                value={report3}
                onChange={(e) => setReport3(e.target.value)}
              />
            </div>
          </div>
          <br />
          <div className="text-end">
            <button onClick={(e) => addData(e, 3, report3, setReport3)} type="submit" className="btn btn-primary px-2 py-2">
              <i className="bi bi-send-fill me-2"></i>
              Submit Report
            </button>
          </div>
          <br />
        </div>
      </div>
    </div>
  );
};

export default Workreport;