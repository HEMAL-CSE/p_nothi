import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Hierarchy = () => {
    const [data, setData] = useState([])
    const [reporting_officers, setReporting_officers] = useState([])
    // const [selectedRoles, setSelectedRoles] = useState([])
    const [roles, setRoles] = useState([
        {
            name: 'employee',   
        },
        {   
            name: 'manager'
        },
        {
            name: 'admin'
        },

    ])

    useEffect(() => {
        axios.get('http://68.178.163.174:5012/employees/')
            .then(res => {
                var data = res.data.map(i => {
                    
                    return {...i, needSave: false}})
                setData(data)

            })

        axios.get('http://68.178.163.174:5012/employees/executives').then(res => {
            setReporting_officers(res.data)
        })
    }, [])


  return (
    <div className='details'>
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
                                    <h1 className="m-2 display-5 fw-bold text-success2"><span className="text-success2">Hierarchy</span></h1>
                                </a>
                            </div>
                        </div>

                    </div>
                </div>

                <table className='table'>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Employee ID</th>
                            <th>Role</th>
                            <th>Reporting Officer</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map((item, i) => (
                                <tr>
                                    <td>{item.user_name}</td>
                                    <td>{item.employee_id}</td>
                                    <td>
                                        <select onChange={e => {
                                            setData(
                                                data.map(item2 => {
                                                    if(item2.id == item.id)
                                                    {
                                                        return {...item2, needSave: true, role: e.target.value}
                                                    }
                                                    else {
                                                        return item2
                                                    }
                                                })
                                            )
                                        }} defaultValue={item.role} className='select'>
                                            {
                                                roles.map(item => (
                                                    <option value={item.name}>{item.name}</option>
                                                ))
                                            }
                                        </select>
                                    </td>
                                    <td>
                                        {
                                            <select onChange={e=> {
                                                setData(
                                                    data.map(item2 => {
                                                        if(item2.id == item.id)
                                                        {
                                                            return {...item2, needSave: true, role: e.target.value}
                                                        }
                                                        else {
                                                            return item2
                                                        }
                                                    })
                                                )
                                            }} className='select'>
                                             </select>    
                                        }
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
    </div>
  )
}

export default Hierarchy