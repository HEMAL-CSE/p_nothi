import axios from 'axios'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify'

const Profile = () => {
    const [employee, setEmployee] = useState({})

    const [education, setEducation] = useState([])

    const [job_info, setJob_info] = useState({})

    useEffect(() => {

        const employee_id = localStorage.getItem('employee_id')
        const user_id = localStorage.getItem('user_id')

        axios.get(`http://68.178.163.174:5012/employees/?user_id=${user_id}`).then(res => {
            setEmployee(res.data[0])
        })

        axios.get(`http://68.178.163.174:5012/employees/education?employee_id=${employee_id}`).then(res => {
            setEducation(res.data)
        })

        axios.get(`http://68.178.163.174:5012/employees/job_info?employee_id=${employee_id}`).then(res => {
            // setJob_info(res.data[0])
            console.log(res.data[0]);
            
        })
    }, [])

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
                        <span className='fw-bold'>Job Department:</span> {job_info.department}
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


        </div>
    )
}

export default Profile