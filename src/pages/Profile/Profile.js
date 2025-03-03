import axios from 'axios'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import EditGeneralInfo from './EditGeneralInfo'
import EditEducation from './EditEducation'
import EditJobInfo from './EditJobInfo'
import EditExperience from './EditExperience'
import EditResponsibility from './EditResponsibility'
// import {SfNav} from 'react-sf-building-blocks';


const Profile = () => {
    const [employee, setEmployee] = useState({})

    const [education, setEducation] = useState([])

    const [job_info, setJob_info] = useState({})

    const [job_responsibility, setJob_responsibility] = useState({})

    const [experience, setExperience] = useState([])

    const [general_info_open, setGeneral_info_open] = useState(false)

    const [education_open, setEducation_open] = useState(false)

    const [experience_open, setExperience_open] = useState(false)

    const [responsibility_open, setResponsibility_open] = useState(false)

    const [edit_education, setEdit_education] = useState({})
    const [edit_job_info, setEdit_job_info] = useState(false)
    const [edit_experience, setEdit_experience] = useState({})

    const getGeneralInfo = () => {
        const user_id = localStorage.getItem('user_id')

        axios.get(`https://server.promisenothi.com/employees/?user_id=${user_id}`).then(res => {
            if (res.data.length > 0) {
                setEmployee(res.data[0])
            }
        })
    }

    const getEducation = () => {
        const employee_id = localStorage.getItem('employee_id')

        axios.get(`https://server.promisenothi.com/employees/education?employee_id=${employee_id}`).then(res => {
            setEducation(res.data)
        })
    }

    const getExperience = () => {
        const employee_id = localStorage.getItem('employee_id')

        axios.get(`https://server.promisenothi.com/employees/experience?employee_id=${employee_id}`).then(res => {
            setExperience(res.data)
        })
    }

    const getJobinfo = () => {
        const employee_id = localStorage.getItem('employee_id')

        axios.get(`https://server.promisenothi.com/employees/job_info?employee_id=${employee_id}`).then(res => {
            if (res.data.length > 0) {
                setJob_info(res.data[0])
            }
            console.log(res.data[0]);

        })
    }

    const getResponsibility = () => {
        const employee_id = localStorage.getItem('employee_id')

        axios.get(`https://server.promisenothi.com/employees/job_responsibility?employee_id=${employee_id}`).then(res => {
            if (res.data.length > 0) {
                setJob_responsibility(res.data[0])
            }

        })
    }

    useEffect(() => {

        getGeneralInfo()

        getEducation()

        getExperience()

        getJobinfo()

        getResponsibility()


    }, [general_info_open, education_open, edit_job_info, experience_open, responsibility_open])

    const deleteEducation = (e, id) => {
        e.preventDefault()

        if (window.confirm('Do you want to delete this?')) {
            axios.delete(`https://server.promisenothi.com/employees/education/delete?id=${id}`)
                .then(res => {
                    toast('Deleted Successfully')
                    getEducation()
                })
        }

    }

    const deleteExperience = (e, id) => {
        e.preventDefault()

        if (window.confirm('Do you want to delete this?')) {
            axios.delete(`https://server.promisenothi.com/employees/experience/delete?id=${id}`)
                .then(res => {
                    toast('Deleted Successfully')
                    getExperience()
                })
        }

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
                                <h1 className="m-2 display-5 fw-bold text-success2"><span className="text-success2">Employee</span> Profile</h1>
                            </a>
                        </div>
                    </div>

                </div>

    {/* <div>
      <SfNav showProfile={true} 
         profilePicture="https://i.pinimg.com/736x/7f/79/6d/7f796d57218d9cd81a92d9e6e8e51ce4--free-avatars-online-profile.jpg"
        profileMenu={[
          {caption: "My Account", link: 'my_account'},
          {caption: "My Profile", link: 'profile'},
          {caption: "Security", link: 'security'},
          {caption: "Sign Out", link: 'sign_out'},
        ]}
        showSignIn={false}
        stylesProfilePictureContainer={{backgroundColor: 'black', padding: '2px', color: 'white', borderRadius: '5px'}}
        stylesMenu={{backgroundColor: 'black', color: 'white', paddingTop: '3px', paddingBottom: '3px', paddingLeft: '10px', paddingRight: '10px', borderRadius: '5px'}}
        stylesSubMenu={{backgroundColor: 'black', color: 'white', paddingLeft: '5px', paddingRight: '5px', border: 'solid 1px gray'}}
        stylesMenuMobile={{backgroundColor: 'black', color: 'white', paddingLeft: '5px', paddingRight: '5px', borderRadius: '5px', border: 'solid 1px gray'}}
        stylesMenuMobileSelected={{backgroundColor: 'white', color: 'black', paddingLeft: '5px', paddingRight: '5px', borderRadius: '5px', border: 'solid 1px gray'}}
         />
    </div> */}

            </div>

            <div className='container-fluid px-5 d-none'>

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
                    <div className='text-center'>
                        <button onClick={e => {
                            setGeneral_info_open(true)
                        }} className='btn btn-secondary text-center'>Edit</button>
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
                            <div className='text-center'>
                                <button onClick={e => {
                                    setEdit_education(item)
                                    setEducation_open(true)
                                }} className='btn btn-secondary text-center'>Edit</button>

                                <button onClick={e => {
                                    deleteEducation(e, item.id)
                                }} className='btn btn-danger mx-3 text-center'>Delete</button>
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

                    {job_info.department == 2 && <div className='m-2'>
                        <span className='fw-bold'>Branch:</span> {job_info.branch_name}
                    </div>}

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
                    <div className='text-center'>
                        <button onClick={e => {
                            setEdit_job_info(true)
                        }} className='btn btn-secondary text-center'>Edit</button>
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

                            <div className='text-center m-2'>
                                <button onClick={e => {
                                    setEdit_experience(item)
                                    setExperience_open(true)
                                }} className='btn btn-secondary text-center'>Edit</button>

                                <button onClick={e => {
                                    deleteExperience(e, item.id)
                                }} className='btn btn-danger mx-3 text-center'>Delete</button>
                            </div>
                        </div>
                    ))
                }
            </div>
            <h2 className='mt-3'>Job Reponsibility</h2>

            {
                Object.keys(job_responsibility).length != 0 && job_responsibility != undefined &&
                <div className='d-flex p-3 flex-column bg-card align-items-start'>


                    <div className='m-2'>
                        <span className='fw-bold'>Primary Duties:</span> {job_responsibility.primary_duties}
                    </div>

                    <div className='m-2'>
                        <span className='fw-bold'>Key Responsibilities:</span> {job_responsibility.key_responsibilities}

                    </div>

                    <div className='text-center'>
                        <button onClick={e => {
                            setResponsibility_open(true)
                        }} className='btn btn-secondary text-center'>Edit</button>
                    </div>
                </div>
            }

            <EditGeneralInfo isOpen={general_info_open} setIsOpen={setGeneral_info_open} profile={employee} />
            <EditEducation isOpen={education_open} setIsOpen={setEducation_open} profile={edit_education} />
            <EditJobInfo isOpen={edit_job_info} setIsOpen={setEdit_job_info} profile={job_info} />
            <EditExperience isOpen={experience_open} setIsOpen={setExperience_open} profile={edit_experience} />
            <EditResponsibility isOpen={responsibility_open} setIsOpen={setResponsibility_open} profile={job_responsibility} />
        </div>
    )
}

export default Profile