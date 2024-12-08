import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'

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
                    
                    return {...i, needSave: false, new_role: '', new_reporting_officer: ''}})
                setData(data)

            })

        axios.get('http://68.178.163.174:5012/employees/executives').then(res => {
            setReporting_officers(res.data)
        })
    }, [])

    const save = (e, id, role, reporting_officer) => {
        e.preventDefault()

        axios.put(`http://68.178.163.174:5012/employees/update_role?id=${id}`, {
            role
        }).then(res => {
            toast('Saved')
        })

        axios.put(`http://68.178.163.174:5012/employees/update_reporting_officer?id=${id}`, {
            reporting_officer
        }).then(res => {
            toast('Saved')
        })
        
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
                            <th>Save</th>
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
                                                        if(item.role == e.target.value) {
                                                            return {...item2, needSave: false}
                                                        } else{
                                                            return {...item2, needSave: true, new_role: e.target.value}

                                                        }
                                                    }
                                                    else {
                                                        return {...item2}
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
                                                                if(item.reporting_officer == e.target.value) {
                                                                    return {...item2, needSave: false}
                                                                } else{
                                                                    return {...item2, needSave: true, new_reporting_officer: e.target.value}
        
                                                                }
                                                            }
                                                            else {
                                                                return {...item2}
                                                            }
                                                    })
                                                )
                                            }} defaultValue={item.reporting_officer} className='select'>
                                                <option>Select</option>
                                                {
                                                    reporting_officers.map(item => (
                                                        <option value={item.id} >{item.user_name}</option>
                                                    ))
                                                }
                                             </select>    
                                        }
                                    </td>
                                    <td>
                                        <button onClick={e => save(e, item.user_id, item.new_role, item.new_reporting_officer)} disabled={!item.needSave} className={`btn ${item.needSave ? 'btn-success' : 'btn-secondary'}`}>Save</button>
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