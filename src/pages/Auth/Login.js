import axios from 'axios'
import React, { useState } from 'react'
import { BsEye, BsEyeSlash } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'

const Login = () => {
    const [employee_idoremail, setEmployee_idoremail] = useState('')
    const [password, setPassword] = useState('')
    const [togglePass, setTogglePass] = useState('')

    const navigator = useNavigate()


    const handleSubmit = e => {
        e.preventDefault()

        let emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/

        if(employee_idoremail.match(emailRegex)){
            axios.post('http://68.178.163.174:5012/users/login', {
                email: employee_idoremail,
                password
            }).then(res => {
                localStorage.setItem('role', res.data.role)
                localStorage.setItem('user_id', res.data.user_id)
                localStorage.setItem('token', res.data.token)
                toast('Logged In')
            })
        }else {
            axios.post('http://68.178.163.174:5012/users/login?email=0', {
                email: employee_idoremail,
                password
            }).then(res => {
                localStorage.setItem('role', res.data.role)
                localStorage.setItem('user_id', res.data.user_id)
                localStorage.setItem('token', res.data.token)


                axios.get(`http://68.178.163.174:5012/employees/?user_id=${res.data.user_id}`).then(res2 => {
                    localStorage.setItem('employee_id',res2.data[0].id )
                    console.log(res2.data);
                    

                    navigator('/employee/general')
                })

                toast('Logged In')
            })
        }



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

                <h3 className='text-success'>Login</h3>
                <form onSubmit={handleSubmit} className=' m-4 d-flex flex-column justify-content-center align-items-center'>
                    <div className='mb-4'>
                        <label>Employee ID or Email</label>
                        <input value={employee_idoremail} onChange={e => setEmployee_idoremail(e.target.value)} className='form-control' size={22} placeholder='Employee ID or Email' />
                    </div>
                    <div className='mb-4'>
                        <label>Password</label>
                        <div className='input-group'>
                        <input type={`${togglePass ? 'text': 'password'}`} value={password} onChange={e => setPassword(e.target.value)} className='form-control' size={17} placeholder='Password' autoComplete="new-password" />
                        <span onClick={e => setTogglePass(!togglePass)} className='input-group-text'>
                            {
                                togglePass ?
                                <BsEye /> : <BsEyeSlash />
                            }
                        </span>

                        </div>                    </div>
                    <div className='text-center'>
                    <button type='submit' className='btn btn-success mt-2 text-center'>
                        Login
                    </button>
                    <p className='text-secondary'>If you do not have an account, <span onClick={() => {
                        navigator('/register')
                    }} role='button' className='text-primary'>Sign up here</span></p>
                    </div>
                    
                </form>
            </div>

        </div>
  )
}

export default Login