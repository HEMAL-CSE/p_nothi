// import React from 'react'
import axios from 'axios'
import React, { useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'


export const Education = () => {

    const [iname, setIname] = useState('')
    const [subject, setsubject] = useState('')
    const [cgpa, setcgpa] = useState('')



    const [bsc, setbsc] = useState('')
    const [bscs, setbscs] = useState([
        {
            name: 'Diploma Degree',
        },
        {
            name: 'Master’s Degree',
        },
        {
            name: 'Bachelor’s Degree',
        },
        {
            name: 'Higher Secondary Certificate (HSC)',
        },
        {
            name: 'Secondary School Certificate (SSC) ',
        }
    ])

    const [passyear, setpassyear] = useState('')
    const [passyears, setpassyears] = useState([
        {
            name: '2010',
        },
        {
            name: '2011',
        },
        {
            name: '2012',
        },
        {
            name: '2013',
        },
        {
            name: '2014',
        },
        {
            name: '2015',
        },
        {
            name: '2016',
        },
        {
            name: '2017',
        },
        {
            name: '2018',
        },
        {
            name: '2019',
        },
        {
            name: '2021',
        },
        {
            name: '2022',
        },
        {
            name: '2023',
        },
        {
            name: '2024',
        }
    ])

    const addData = e => {
        e.preventDefault()

        const employee_id = localStorage.getItem('employee_id')

        axios.post(`https://server.promisenothi.com/employees/education/add`, {
            employee_id,
            degree: bsc,
            passing_year: passyear,
            gpa: cgpa,
            institution: iname,
            subject
        }).then(res => {
            toast('Profile Updated')
            setpassyear('')
            setcgpa('')
            setIname('')
            setsubject('')
        })

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
                                <h1 className="m-2 display-5 fw-bold text-success2"><span className="text-success2">Educational</span> Qualification</h1>
                            </a>
                        </div>
                    </div>

                </div>
            </div>


            <form>
                <label> Select Degree:</label>
                <select value={bsc} onChange={e => {

                    setbsc(e.target.value)
                }} className='select' >
                    <option >Select</option>
                    {
                        bscs.map(item => (
                            <option value={item.name}>{item.name}</option>
                        ))
                    }
                </select>
                <label> Institute Name:</label>
                <input value={iname} onChange={e => setIname(e.target.value)} className='input' type='text' />


                <label> Select Passing Year:</label>
                <select value={passyear} onChange={e => {

                    setpassyear(e.target.value)
                }} className='select' >
                    <option >Select</option>
                    {
                        passyears.map(item => (
                            <option value={item.name}>{item.name}</option>
                        ))
                    }
                </select>

                <label> Enter Your {bsc == 'Bachelor’s Degree' ? 'Subject' : 'Group'}:</label>
                <input value={subject} onChange={e => setsubject(e.target.value)} className='input' type='text' />

                <label> Enter Your {bsc == 'Bachelor’s Degree' ? 'CGPA' : 'GPA'}:</label>
                <input value={cgpa} onChange={e => setcgpa(e.target.value)} className='input' type='text' />

                <button onClick={addData} className='button'>Submit</button>

            </form>



        </div>
    )
}
