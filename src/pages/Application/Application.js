import React, { useEffect, useState } from 'react'
import axios from 'axios'


export const Application = () => {
    const [res, setres] = useState('')

    const [dept, setdept] = useState('')
    const [depts, setdepts] = useState([
      {
          name: 'Promise InfoTech',
      },
      {
          name: 'Promise Delivery',
      },
      {
          name: 'Nagathat Ltd',
      },
      {
          name: 'Promise Agency',
      },
      {
          name: 'E-learning',
      },
      {
          name: 'IT Support',
      }  
  ])

  const [position, setposition] = useState('')
    const [positions, setpositions] = useState([
      {
          name: 'Chief Executive Officer (CEO)',
      },
      {
          name: 'General Manager (GM)',
      },
      {
          name: 'Deputy General Manager (DGM)',
      },
      {
          name: 'HR & Admin',
      },
      {
          name: 'Accountant',
      },
      {
          name: 'Senior Executive',
      },
      {
        name: 'Executive',
      },
      {
        name: 'Junior Executive',
      }   
  ])

  const addData = e => {
    // e.preventDefault()

    // const user_id = localStorage.getItem('user_id')

    // axios.put(`http://68.178.163.174:5012/employees/edit?user_id=${user_id}`, {
        
    // }).then(res => {
        
    // })
  }

  return (

    <div className='details'>
                {/* <ToastContainer /> */}
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
                                    <h1 className="m-2 display-5 fw-bold text-success2"><span className="text-success2">Application/</span>Requsition</h1>
                                </a>
                            </div>
                        </div>

                    </div>
                </div>

                <label> Select Department:</label>
                <select value={dept} onChange={e => {        
                    setdept(e.target.value)
                        }} className='select' >
                            <option >Select</option>
                            {
                                depts.map(item => (
                                    <option value={item.name}>{item.name}</option>
                                ))
                            }
                </select>

                <label> Select Items:</label>
                <select value={position} onChange={e => {        
                    setposition(e.target.value)
                        }} className='select' >
                            <option >Select</option>
                            {
                                positions.map(item => (
                                    <option value={item.name}>{item.name}</option>
                                ))
                            }
                </select>

                <label> Quantity:</label>
                <input value={res} onChange={e => setres(e.target.value)} className='input' type='text'/>

                <button onClick={addData} className='button'>Submit</button>
                
    </div>
    
  )
}
