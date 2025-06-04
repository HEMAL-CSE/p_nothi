import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import Modal from 'react-modal';
import moment from 'moment';

const WorkreportAdc = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [workreport_date, setWorkreport_date] = useState('');
  const [workReports, setWorkReports] = useState([]);
  const [fetchingEmployees, setFetchingEmployees] = useState(false);
  const [employeeReports, setEmployeeReports] = useState({}); // To store reports for each employee

  // ADC employee IDs with their predefined branches
  const assistantDivisionCoordinators = {
    "5": { branch: "Khulna" },//202200306
    "6": { branch: "Rangpur" },//202200422
    "442": { branch: "Mymensingh" },//202200451
    "33": { branch: "Hill Tracks" },//20220030
    "521": { branch: "Rajshahi" },//202200473
    "513": { branch: "Dhaka-1" },// 202200497
    "441": { branch: "Dhaka-2" },//202200147
    "446": { branch: "Chattogram" },// 202200269
    "490": { branch: "Barisal" }// 202200385
  };

  // Function to update designation
  const updateDesignation = (employee) => {
    return {
      ...employee,
      designation: employee.designation 
        ? employee.designation.replace('Head', 'Coordinator') 
        : 'Assistant Divisional Coordinator'
    };
  };

  const getAdcEmployees = () => {
    if (!workreport_date) {
      toast.error('Please select a date first');
      return;
    }

    setFetchingEmployees(true);

    axios.get('https://server.promisenothi.com/employees')
      .then(res => {
        const adcEmployees = res.data
          .filter(employee => {
            const empId = employee.id?.toString() || employee.employee_id?.toString();
            return Object.keys(assistantDivisionCoordinators).includes(empId);
          })
          .map(employee => {
            const empId = employee.id?.toString() || employee.employee_id?.toString();
            return {
              ...updateDesignation(employee),
              branch: assistantDivisionCoordinators[empId]?.branch || 'N/A'
            };
          });

        if (adcEmployees.length === 0) {
          toast.info('No ADC employees found');
        }

        setEmployees(adcEmployees);
        
        // Fetch reports for each employee
        adcEmployees.forEach(employee => {
          fetchEmployeeReports(employee);
        });
      })
      .catch(error => {
        console.error('Error fetching employees:', error);
        toast.error('Failed to load employees');
      })
      .finally(() => {
        setFetchingEmployees(false);
      });
  };

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
      // Don't show toast here to avoid multiple error messages
    }
  };

  const getWorkReportDetails = async (employee) => {
    try {
      setIsLoading(true);
      const employeeId = employee.id || employee.employee_id;
      
      // Check if we already have reports for this employee
      if (employeeReports[employeeId]) {
        setWorkReports(employeeReports[employeeId]);
      } else {
        const response = await axios.get(
          `https://server.promisenothi.com/employees/daily_work_report?employee_id=${employeeId}&report_date=${workreport_date}`
        );
        setWorkReports(response.data);
      }

      if (workReports.length === 0) {
        toast.info('No reports found for selected date');
      }

      setSelectedEmployee(employee);
      setIsOpen(true);
    } catch (error) {
      console.error('Error fetching work reports:', error);
      toast.error('Failed to load work reports');
    } finally {
      setIsLoading(false);
    }
  };

  // Function to check if employee has submitted any report for the selected date
  const hasSubmittedReport = (employee) => {
    const employeeId = employee.id || employee.employee_id;
    const reports = employeeReports[employeeId] || [];
    return reports.length > 0;
  };

  return (
    <div className="container py-4">
      <ToastContainer />
      <div className="row justify-content-center">
        <h3 className="mb-2 text-center fw-bold text-primary border-3 pb-0"
          style={{ fontSize: "2rem", letterSpacing: "0.5px" }}>
          📝 Daily Work Report For ADC
        </h3>

        {['1', '2'].includes(localStorage.getItem('role')) && (
          <div className='border border-1 border-black p-2 m-4 d-flex flex-column align-items-center'>
            {/* Date Selection */}
            <div className="d-flex align-items-center" style={{ gap: '8px', maxWidth: 400 }}>
              <label
                htmlFor="workreportDate"
                className="d-flex align-items-center fw-bold text-primary mb-0"
                style={{ whiteSpace: 'nowrap', userSelect: 'none', fontSize: '17px' }}
              >
                <span role="img" aria-label="calendar" style={{ marginRight: 6 }}>
                  📅
                </span>
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

            {/* Department Display */}
            <div className='d-flex flex-column w-50 mt-3'>
              <label style={{ fontSize: '19px' }} className="d-flex align-items-center fw-bold text-primary mb-0">
                Department: <span className="ms-2 text-dark">Assistant Divisional Coordinator</span>
              </label>
            </div>

            {/* Get Reports Button */}
            <button
              onClick={getAdcEmployees}
              className='btn btn-primary my-3'
              disabled={fetchingEmployees}
            >
              {fetchingEmployees ? 'Loading...' : 'Get Reports'}
            </button>

            {/* Employees Table */}
            {employees.length > 0 && (
              <div className="table-responsive">
                <table className='table table-hover'>
                  <thead className="table-light">
                    <tr>
                      <th>Report Date</th>
                      <th>Employee Name</th>
                      <th>Designation</th>
                      <th>Branch</th>
                      <th>Status</th>
                      <th>Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    {employees.map((item) => (
                      <tr key={`${item.id || item.employee_id}-${workreport_date}`}>
                        <td>{moment(workreport_date).format('DD/MM/YYYY')}</td>
                        <td>{item.user_name || item.name}</td>
                        <td>{item.designation.toUpperCase()}</td>
                        <td>{item.branch}</td>
                        <td>
                          {hasSubmittedReport(item) ? (
                            <span
                              className="badge bg-success text-white px-4 py-2 d-inline-block"
                              style={{
                                borderRadius: '6px',
                                fontSize: '14px',
                                fontWeight: '500',
                                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                              }}
                            >
                              <i className="bi bi-check-circle-fill me-2"></i>
                              Submitted
                            </span>
                          ) : (
                            <span
                              className="badge bg-danger text-white px-4 py-2 d-inline-block"
                              style={{
                                borderRadius: '6px',
                                fontSize: '14px',
                                fontWeight: '500',
                                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                              }}
                            >
                              <i className="bi bi-x-circle-fill me-2"></i>
                              Not Submitted
                            </span>
                          )}
                        </td>
                        <td>
                          <button
                            onClick={() => getWorkReportDetails(item)}
                            className="btn btn-warning px-4 py-2 fw-semibold shadow-sm"
                            style={{
                              fontSize: '15px',
                              borderRadius: '6px',
                              letterSpacing: '0.3px',
                            }}>
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
              isOpen={isOpen}
              onRequestClose={() => {
                setIsOpen(false);
                setWorkReports([]);
              }}
              style={{
                content: {
                  width: "70%",
                  height: "70%",
                  top: "45%",
                  left: "55%",
                  transform: "translate(-50%, -50%)",
                  overflow: "auto",
                  boxShadow: "0 5px 15px rgba(0, 0, 0, 0.5)",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                },
                overlay: { zIndex: 1000 }
              }}
            >
              {isLoading ? (
                <div className="text-center my-5">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              ) : (
                <>
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <h3 className="text-primary">
                      {selectedEmployee.user_name || selectedEmployee.name}'s Work Report
                    </h3>
                    <button
                      className="btn btn-close"
                      onClick={() => setIsOpen(false)}
                    ></button>
                  </div>

                  <div className="card mb-4">
                    <div className="card-body">
                      <div className="row">
                        <div className="col-md-6">
                          <p><strong>Designation:</strong> {selectedEmployee.designation}</p>
                          <p><strong>Branch:</strong> {selectedEmployee.branch}</p>
                        </div>
                        <div className="col-md-6">
                          <p><strong>Date:</strong> {moment(workreport_date).format('DD/MM/YYYY')}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <h4 className="mb-3">Daily Activities</h4>
                  <div className="row g-3">
                    {[1, 2, 3, 4, 5].map(slot => (
                      <div className="col-md-4" key={slot}>
                        <div className="card h-100">
                          <div className="card-header bg-light">
                            Slot {slot} (
                            {slot === 1 && '9:00 AM - 12:00 PM'}
                            {slot === 2 && '12:00 PM - 2:00 PM'}
                            {slot === 3 && '2:00 PM - 4:00 PM'}
                            {slot === 4 && '4:00 PM - 6:00 PM'}
                            {slot === 5 && '6:00 PM - 8:00 PM'}
                            )
                          </div>
                          <div className="card-body">
                            {workReports.find(r => r.slot_number === slot)?.report || (
                              <span className="text-muted">No activity reported</span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </Modal>
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkreportAdc;