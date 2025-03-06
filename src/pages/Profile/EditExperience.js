import axios from 'axios'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import Modal from 'react-modal'
import { toast, ToastContainer } from 'react-toastify'

const EditExperience = ({ isOpen, setIsOpen, profile }) => {
    const [jobtittle, setJobtittle] = useState('')
    const [jobdeg, setJobdef] = useState('')
    const [des, setdes] = useState('')
    const [joining, setjoining] = useState('')
    const [end_date, setend_date] = useState('')
    const [acheivement, setacheivement] = useState('')

    const addData = e => {
        e.preventDefault()
        const employee_id = localStorage.getItem('employee_id')

        axios.put(`https://server.promisenothi.com/employees/experience/edit?id=${profile.id}`, {
            title: jobtittle,
            // department: dept,
            company_name: jobdeg,
            start_date: joining,
            end_date: end_date,
            description: des,
            achievements: acheivement
        }).then(res => {
            toast('Profile Updated')
            setJobtittle('')
            setJobdef('')
            setjoining('')
            setend_date('')
            setdes('')
            setacheivement('')
            setIsOpen(false)
        })
    }

    useEffect(() => {
        setJobtittle(profile.title)
        setJobdef(profile.company_name)
        setjoining(moment(profile.start_date).format('yyyy-MM-DD'))
        setend_date(moment(profile.end_date).format('yyyy-MM-DD'))
        setdes(profile.description)
        setacheivement(profile.achievements)
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
                                    <h1 className="m-2 display-5 fw-bold text-success2"><span className="text-success2">Experiences</span></h1>
                                </a>
                            </div>
                        </div>

                    </div>
                </div>

                <form>
                    <label> Job Title: </label>
                    <input value={jobtittle} onChange={e => setJobtittle(e.target.value)} className='input' type='text' />

                    <label> Company Name: </label>
                    <input value={jobdeg} onChange={e => setJobdef(e.target.value)} className='input' type='text' />

                    <label> Start Date:</label>
                    <input value={joining} onChange={e => setjoining(e.target.value)} className='input' type='date' />

                    <label> End Date:</label>
                    <input value={end_date} onChange={e => setend_date(e.target.value)} className='input' type='date' />

                    <label> Job Description: </label>
                    <input value={des} onChange={e => setdes(e.target.value)} className='input' type='text' />

                    <label> Achievements:</label>
                    <input value={acheivement} onChange={e => setacheivement(e.target.value)} className='input' type='text' />

                    <button onClick={addData} className='button'>Submit</button>



                </form>
            </div>
        </Modal>
    )
}

export default EditExperience