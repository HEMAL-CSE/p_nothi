import axios from 'axios'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import Modal from 'react-modal'
import { toast, ToastContainer } from 'react-toastify'
import divisionsdata from '../../assets/divisions.json'

const EditJobInfo = ({ isOpen, setIsOpen, profile }) => {

    const [jobtittle, setJobtittle] = useState('')
    const [jobdeg, setJobdef] = useState('')
    const [dept, setdept] = useState('')
    const [jobtype, setjobtype] = useState('')
    const [joining, setjoining] = useState('')
    const [joblocation, setjoblocation] = useState('')
    const [division, setdivision] = useState('')
    const [divisions, setdivisions] = useState([])
    const [branches, setBranches] = useState([])
    const [branch, setBranch] = useState('')

    const [departments, setDepartments] = useState([])
    const addData = e => {
        e.preventDefault()
        const employee_id = localStorage.getItem('employee_id')

        axios.post(`https://server.promisenothi.com/employees/job_info/add`, {
            employee_id,
            title: jobtittle,
            department: dept,
            designation: jobdeg,
            type: jobtype,
            joining_date: joining,
            location: joblocation,
            branch_id: branch
        }).then(res => {
            toast('Profile Updated')
            setJobtittle('')
            setdept('')
            setJobdef('')
            setjobtype('')
            setjoining('')
            setjoblocation('')
            setIsOpen(false);

        })
    }


    useEffect(() => {

        axios.get('https://server.promisenothi.com/employees/divisions').then(res => {
            setdivisions(res.data)
        })
    }, [])

    const getBranches = (division_id) => {
        axios.get(`https://server.promisenothi.com/employees/branches?division_id=${division_id}`).then(res => {
            setBranches(res.data)
        })
    }

    useEffect(() => {
        axios.get('https://server.promisenothi.com/employees/departments').then(res => {
            setDepartments(res.data)
        })

        setJobtittle(profile.title)
        setJobdef(profile.designation)
        setjoblocation(profile.location)
        setjobtype(profile.type)
        setjoining(moment(profile.joining_date).format('yyyy-MM-DD'))
        setdept(profile.department)
        axios.get(`https://server.promisenothi.com/employees/branches?branch_id=${profile.branch_id}`).then(res => {
            if (res.data.length > 0) {
                setdivision(res.data[0].division_id)
                getBranches(res.data[0].division_id)
                setBranch(profile.branch_id)
            }
        })

    }, [isOpen])

    return (
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
                                    <h1 className="m-2 display-5 fw-bold text-success2"><span className="text-success2">Job</span> Info</h1>
                                </a>
                            </div>
                        </div>

                    </div>
                </div>

                <form>
                    <label> Job Grade: </label>
                    <input value={jobtittle} onChange={e => setJobtittle(e.target.value)} className='input' type='text' />

                    <label> Job Designation: </label>
                    <input value={jobdeg} onChange={e => setJobdef(e.target.value)} className='input' type='text' />

                    <label> Job Department: </label>

                    <select defaultValue={dept} onChange={e => {
                        setdept(e.target.value)
                    }} className='select'>
                        <option>Select</option>
                        {
                            departments.map(item => (
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

                    <label> Job Type:</label>
                    <input value={jobtype} onChange={e => setjobtype(e.target.value)} className='input' type='text' />

                    <label> Joining Date:</label>
                    <input value={joining} onChange={e => setjoining(e.target.value)} className='input' type='date' />

                    <label> Job Location:</label>
                    <input value={joblocation} onChange={e => setjoblocation(e.target.value)} className='input' type='text' />

                    <button onClick={addData} className='button'>Submit</button>

                </form>
            </div>
        </Modal>
    )
}

export default EditJobInfo