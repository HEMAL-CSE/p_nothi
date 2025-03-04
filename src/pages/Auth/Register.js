import axios from 'axios'
import React, { useState } from 'react'
import { BsEye, BsEyeSlash } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'

const Register = () => {
    const [name, setName] = useState('')
    const [employee_id, setEmployee_id] = useState('')
    const [email, setEmail] = useState('')
    const [mobile, setMobile] = useState('')
    const [password, setPassword] = useState('')
    const [confirm_password, setConfirm_password] = useState('')

    const [togglePass, setTogglePass] = useState(false)
    const [toggleConPass, setToggleConPass] = useState(false)

    const navigator = useNavigate()

    const handleSubmit = e => {
        e.preventDefault()

        axios.post(`http://68.178.163.174:5012/users/register`, {
            name,
            email,
            mobile,
            password,
            employee_id,
            role: 10
        }).then(res => {
            axios.post('http://68.178.163.174:5012/employees/add', {
                user_id: res.data.user_id
            }).then(res => {
                navigator('/login')
                toast('Submitted')
            })
        })
    }

    return (
        <div className='d-flex flex-column justify-content-center align-items-center'>
            <ToastContainer />
            <div className="container-fluid px-5 h-100">
                <div className="row gx-5 py-3 ">
                    <div className="col-lg-3">
                        {/* <div className="d-flex align-items-center justify-content-start">
                            <BsPhoneVibrate className='text-success2 fs-1 me-2' />
                            <h2 className="mb-0">+012 345 6789</h2>
                        </div> */}
                    </div>
                    <div className="">
                        <div className="d-flex align-items-center justify-content-center">
                            {/* <a href="index.html" className="navbar-brand"> */}
                            <h1 className="m-0 display-4 text-success2">Authentication</h1>
                            {/* </a> */}
                        </div>
                    </div>

                </div>
            </div>


            <div className='col-lg-5 py-5 mt-5 d-flex flex-column justify-content-between align-items-center border border-2 '>

                <h3 className='text-success'>Sign Up</h3>
                <form onSubmit={handleSubmit} className=' m-4 d-flex flex-wrap justify-content-around align-items-center'>
                    <div className='mb-4'>
                        <label>Name</label>
                        <input value={name} onChange={e => setName(e.target.value)} className='form-control' size={22} placeholder='Name' />
                    </div>
                    <div className='mb-4'>
                        <label>Employee ID</label>
                        <input value={employee_id} onChange={e => setEmployee_id(e.target.value)} className='form-control' size={22} placeholder='Employee ID' />
                    </div>
                    <div className='mb-4'>
                        <label>Mobile No</label>
                        <input value={mobile} onChange={e => setMobile(e.target.value)} className='form-control' size={22} placeholder='Mobile No' />
                    </div>
                    <div className='mb-4'>
                        <label>Email</label>
                        <input value={email} onChange={e => setEmail(e.target.value)} className='form-control' size={22} placeholder='Email' />
                    </div>
                    <div className='mb-4'>
                        <label>Password</label>
                        <div className='input-group'>
                            <input type={`${togglePass ? 'text' : 'password'}`} value={password} onChange={e => setPassword(e.target.value)} className='form-control' size={17} placeholder='Password' autoComplete="new-password" />
                            <span onClick={e => setTogglePass(!togglePass)} className='input-group-text'>
                                {
                                    togglePass ?
                                        <BsEye /> : <BsEyeSlash />
                                }
                            </span>

                        </div>                    </div>
                    <div className='mb-4'>
                        <label>Confirm Password</label>
                        <div className='input-group'>
                            <input type={`${toggleConPass ? 'text' : 'password'}`} value={confirm_password} onChange={e => setConfirm_password(e.target.value)} className='form-control' size={17} placeholder='Confirm Password' />
                            <span onClick={e => setToggleConPass(!toggleConPass)} className='input-group-text'>
                                {
                                    toggleConPass ?
                                        <BsEye /> : <BsEyeSlash />
                                }
                            </span>

                        </div>
                    </div>
                    <div className='text-center'>
                        <button type='submit' className='btn btn-success mt-2 text-center'>
                            Sign Up
                        </button>
                        <p className='text-secondary'>If you already have an account, <span onClick={() => {
                            navigator('/login')
                        }} role='button' className='text-primary'>Login here</span></p>
                    </div>

                </form>
            </div>

        </div>
    )
}

export default Register