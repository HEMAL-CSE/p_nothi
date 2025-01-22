import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import Modal from 'react-modal'
import moment from 'moment'
import divisionsdata from '../../assets/divisions.json'


const AllEmployeeInfo = () => {
    const [data, setData] = useState([])
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

    useEffect(() => {
        axios.get('http://68.178.163.174:5012/employees/')
            .then(res => {
                setData(res.data)
                console.log(res.data);


            })

        axios.get('http://68.178.163.174:5012/employees/departments')
            .then(res => {
                setDepartments(res.data)
                console.log(res.data);


            })
    }, [])

    useEffect(() => {

        axios.get(`http://68.178.163.174:5012/employees/?user_id=${selectedEmployee.user_id}`).then(res => {
            if (res.data.length > 0) {
                setEmployee(res.data[0])
            }
        })

        axios.get(`http://68.178.163.174:5012/employees/education?employee_id=${selectedEmployee.id}`).then(res => {
            setEducation(res.data)


        })

        axios.get(`http://68.178.163.174:5012/employees/experience?employee_id=${selectedEmployee.id}`).then(res => {
            setExperience(res.data)
        })

        axios.get(`http://68.178.163.174:5012/employees/job_info?employee_id=${selectedEmployee.id}`).then(res => {
            if (res.data.length > 0) {
                setJob_info(res.data[0])
            }
            // console.log(res.data[0]);

        })

    }, [selectedEmployee])

    useEffect(() => {
        axios.get('http://68.178.163.174:5012/employees/departments').then(res => {
            setDepartments(res.data)
        })
    }, [])

    useEffect(() => {

        if (dept == 2) {
            setdivisions(divisionsdata)

        }
    }, [dept])

    const getBranches = (division_id) => {
        axios.get(`http://68.178.163.174:5012/employees/branches?division_id=${division_id}`).then(res => {
            setBranches(res.data)
        })
    }

    const getEmployees = () => {
        if(branch != ''){
            axios.get(`http://68.178.163.174:5012/employees?department=${dept}&&branch_id=${branch}`).then(res => {
                setEmployees(res.data)
            })
        }else{
            axios.get(`http://68.178.163.174:5012/employees?department=${dept}`).then(res => {
                setEmployees(res.data)
            })
        }
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
                                <h1 className="m-2 display-5 fw-bold text-success2"><span className="text-success2">All Employee</span> Information</h1>
                            </a>
                        </div>
                    </div>

                </div>
            </div>

            <div className='border border-1 border-black p-2 m-4'>
                <h1 className='m-3 '>Administration</h1>
                <table className='mt-10 table'>
                    <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Employee ID</th>
                            <th scope="col">Email</th>
                            <th scope="col">Phone Number</th>
                            <th scope="col">Present Address</th>
                            <th scope="col">Role</th>
                            <th>Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.filter(item => [1, 2, 12].includes(item.role_id)).map(item => (
                                <tr>
                                    <td className='px-3'>{item.user_name}</td>
                                    <td className='px-3'>{item.employee_id}</td>
                                    <td className='px-3'>{item.email}</td>
                                    <td className='px-3'>{item.mobile_no}</td>
                                    <td className='px-3'>{item.present_address}</td>
                                    <td className='px-3'>{item.role != null ? item.role.toUpperCase() : ''}</td>
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

            <div className='border border-1 border-black p-2 m-4'>
                <h1 className='m-3 '>Management</h1>
                <table className='mt-10 table'>
                    <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Employee ID</th>
                            <th scope="col">Email</th>
                            <th scope="col">Phone Number</th>
                            <th scope="col">Present Address</th>
                            <th scope="col">Role</th>
                            <th>Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.filter(item => [3, 4, 5, 6].includes(item.role_id)).map(item => (
                                <tr>
                                    <td className='px-3'>{item.user_name}</td>
                                    <td className='px-3'>{item.employee_id}</td>
                                    <td className='px-3'>{item.email}</td>
                                    <td className='px-3'>{item.mobile_no}</td>
                                    <td className='px-3'>{item.present_address}</td>
                                    <td className='px-3'>{item.role != null ? item.role.toUpperCase() : ''}</td>
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


            <div className='border border-1 border-black p-2 m-4'>
                <h1 className='m-3'>HR</h1>
                <table className='mt-10 table'>
                    <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Employee ID</th>
                            <th scope="col">Email</th>
                            <th scope="col">Phone Number</th>
                            <th scope="col">Present Address</th>
                            <th scope="col">Role</th>
                            <th>Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.filter(item => [7].includes(item.role_id)).map(item => (
                                <tr>
                                    <td className='px-3'>{item.user_name}</td>
                                    <td className='px-3'>{item.employee_id}</td>
                                    <td className='px-3'>{item.email}</td>
                                    <td className='px-3'>{item.mobile_no}</td>
                                    <td className='px-3'>{item.present_address}</td>
                                    <td className='px-3'>{item.role != null ? item.role.toUpperCase() : ''}</td>
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

            <div className='border border-1 border-black p-2 m-4'>
                <h1 className='m-3'>Accounts</h1>
                <table className='mt-10 table'>
                    <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Employee ID</th>
                            <th scope="col">Email</th>
                            <th scope="col">Phone Number</th>
                            <th scope="col">Present Address</th>
                            <th scope="col">Role</th>
                            <th>Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.filter(item => [13].includes(item.role_id)).map(item => (
                                <tr>
                                    <td className='px-3'>{item.user_name}</td>
                                    <td className='px-3'>{item.employee_id}</td>
                                    <td className='px-3'>{item.email}</td>
                                    <td className='px-3'>{item.mobile_no}</td>
                                    <td className='px-3'>{item.present_address}</td>
                                    <td className='px-3'>{item.role != null ? item.role.toUpperCase() : ''}</td>
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


            {

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
                                        <th scope="col">Email</th>
                                        <th scope="col">Phone Number</th>
                                        <th scope="col">Present Address</th>
                                        <th scope="col">Role</th>
                                        <th>Details</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {

                                        employees.map(item => (
                                            <tr>
                                                <td className='px-3 text-start'>{item.user_name}</td>
                                                <td className='px-3'>{item.employee_id}</td>
                                                <td className='px-3'>{item.email}</td>
                                                <td className='px-3'>{item.mobile_no}</td>
                                                <td className='px-3'>{item.present_address}</td>
                                                <td className='px-3'>{item.role != null ? item.role.toUpperCase() : ''}</td>
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

            }

            <Modal
                style={{
                    content: {
                        width: "80%",
                        height: "80%",
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

                <div>
                    <h2 className='mt-3'>Education</h2>
                    {
                        education.map(item => (
                            <div className='d-flex p-3 flex-column bg-card align-items-start'>
                                <div className='m-2'>
                                    <span className='fw-bold'>Degree:</span> {item.degree}
                                </div>

                                <div className='m-2'>
                                    <span className='fw-bold'>Institution:</span> {item.institution}
                                </div>

                                <div className='m-2'>
                                    <span className='fw-bold'>Subject:</span> {item.subject}
                                </div>

                                <div className='m-2'>
                                    <span className='fw-bold'>Passing Year:</span> {item.passing_year}
                                </div>
                                <div className='m-2'>
                                    <span className='fw-bold'>GPA/CGPA:</span> {item.gpa}
                                </div>
                            </div>
                        ))
                    }
                </div>
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

                <div>
                    <h2 className='mt-3'>Experience</h2>
                    {
                        experience.map(item => (
                            <div className='d-flex p-3 flex-column bg-card align-items-start'>
                                <div className='m-2'>
                                    <span className='fw-bold'>Job Title:</span> {item.title}
                                </div>

                                <div className='m-2'>
                                    <span className='fw-bold'>Company Name:</span> {item.company_name}
                                </div>

                                <div className='m-2'>
                                    <span className='fw-bold'>Start Date:</span> {moment(item.start_date).format('DD/MM/yyyy')}
                                </div>

                                <div className='m-2'>
                                    <span className='fw-bold'>End Date:</span> {moment(item.end_date).format('DD/MM/yyyy')}
                                </div>
                                <div className='m-2'>
                                    <span className='fw-bold'>Description:</span> {item.description}
                                </div>
                                <div className='m-2'>
                                    <span className='fw-bold'>Achievements:</span> {item.achievements}
                                </div>
                            </div>
                        ))
                    }
                </div>
            </Modal>
        </div>
    )
}

export default AllEmployeeInfo