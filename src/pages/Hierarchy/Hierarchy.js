import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import Modal from 'react-modal'
import divisionsdata from '../../assets/divisions.json'


const Hierarchy = () => {
    const [data, setData] = useState([])
    const [reporting_officers, setReporting_officers] = useState([])
    // const [selectedRoles, setSelectedRoles] = useState([])
    const [roles, setRoles] = useState([])
    const [isOpen, setIsOpen] = useState(false)
    const [tree, setTree] = useState({})
    const [selected, setSelected] = useState('')
    const [division, setdivision] = useState('')
    const [divisions, setdivisions] = useState([])
    const [branches, setBranches] = useState([])
    const [branch, setBranch] = useState('')
    const [dept, setdept] = useState('')
    const [departments, setDepartments] = useState([])


    useEffect(() => {
        axios.get('http://68.178.163.174:5012/employees/')
            .then(res => {
                setData(res.data)
                console.log(res.data);


            })

        axios.get('http://68.178.163.174:5012/employees/departments')
            .then(res => {
                setDepartments(res.data)
                console.log(res.data);


            })
    }, [])

    const getBranches = (division_id) => {
        axios.get(`http://68.178.163.174:5012/employees/branches?division_id=${division_id}`).then(res => {
            setBranches(res.data)
        })
    }


    useEffect(() => {

        if (dept == 2) {
            setdivisions(divisionsdata)

        }
    }, [dept])

    const getData = () => {
        if (branch != '' || division != '') {
            axios.get(`http://68.178.163.174:5012/employees?department=${dept}&&branch_id=${branch}&&branch_division_id=${division}`)
                .then(res => {
                    var data = res.data.map(i => {

                        return { ...i, needSave: false, new_role: '', new_reporting_officer: '', new_reporting_officer_name: '' }
                    })
                    setData(data)
                    console.log(division);


                })
        } else if (dept != '') {
            axios.get(`http://68.178.163.174:5012/employees?department=${dept}`)
                .then(res => {
                    var data = res.data.map(i => {

                        return { ...i, needSave: false, new_role: '', new_reporting_officer: '', new_reporting_officer_name: '' }
                    })
                    setData(data)

                })
        } else {
            axios.get('http://68.178.163.174:5012/employees/')
                .then(res => {
                    var data = res.data.map(i => {

                        return { ...i, needSave: false, new_role: '', new_reporting_officer: '', new_reporting_officer_name: '' }
                    })
                    setData(data)

                })
        }

    }

    useEffect(() => {
        axios.get('http://68.178.163.174:5012/employees/roles').then(res => {
            setRoles(res.data)
        })
    }, [])

    useEffect(() => {
        getData()


    }, [])

    const save = (e, id, role, reporting_officer) => {
        e.preventDefault()

        axios.put(`http://68.178.163.174:5012/employees/update_role?id=${id}`, {
            role
        }).then(res => {
            toast('Saved')
            getData()

        })

        axios.put(`http://68.178.163.174:5012/employees/update_reporting_officer?id=${id}`, {
            reporting_officer
        }).then(res => {
            toast('Saved')
            getData()
        })

    }

    const getExecutives = (department, role) => {

        console.log(role);

        if ([2, 3, 4, 5, 6, 7, 9].includes(role)) {
            axios.get(`http://68.178.163.174:5012/employees/executives`).then(res => {
                setReporting_officers(res.data)
            })
        } else {
            axios.get(`http://68.178.163.174:5012/employees/executives?department=${department}`).then(res => {
                setReporting_officers(res.data)
            })
        }


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

            <div className='d-flex  w-100 justify-content-center align-items-end'>
                <div className='d-flex flex-column w-25 mx-2'>
                    <label> Job Department: </label>

                    <select onChange={e => {
                        setdept(e.target.value)
                    }} className='select'>
                        <option>Select</option>
                        {
                            departments.filter(e => e.id != 3).map(item => (
                                <option value={item.id}>{item.name}</option>
                            ))
                        }
                    </select>
                </div>

                {dept == 2 &&

                    <div className='d-flex w-25 flex-column mx-2'>

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
                    </div>

                }

                {dept == 2 &&
                    <div className='d-flex w-25 flex-column mx-2'>
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
                        </select>
                    </div>

                }

                <button onClick={getData} className='btn btn-primary my-3'>Submit</button>
            </div>

            <table className='table m-4 border border-1 border-grey p-5'>
                <thead>
                    <tr>
                        <th className='text-start'>Name</th>
                        <th>Branch</th>
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
                                <td className='text-start'
                                >{item.user_name}</td>
                                <td>{item.branch_name}</td>
                                <td>{item.employee_id}</td>
                                <td>
                                    <select onChange={e => {
                                        setData(
                                            data.map(item2 => {
                                                if (item2.id == item.id) {
                                                    if (item.role == e.target.value) {
                                                        return { ...item2, needSave: false }
                                                    } else {
                                                        return { ...item2, needSave: true, new_role: e.target.value }

                                                    }
                                                }
                                                else {
                                                    return { ...item2 }
                                                }
                                            })
                                        )
                                    }} defaultValue={item.role_id} className='select'>
                                        {
                                            roles.map(item => (
                                                <option value={item.id}>{item.name}</option>
                                            ))
                                        }
                                    </select>
                                </td>
                                <td onClick={e => {
                                    setIsOpen(true)
                                    getExecutives(item.department, item.role_id)
                                    setSelected(item)
                                }} style={{ cursor: 'pointer' }}>

                                    {item.new_reporting_officer ? item.new_reporting_officer_name : item.reporting_officer_name}
                                </td>
                                <td>
                                    <button onClick={e => save(e, item.user_id, item.new_role, item.new_reporting_officer)} disabled={!item.needSave} className={`btn ${item.needSave ? 'btn-success' : 'btn-secondary'}`}>Save</button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>

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
                <div>

                    <p className='fw-bold'>Current Reporting Officer: {selected.reporting_officer_name} </p>
                    <p className='fw-bold'>Reporting Officers: </p>
                    <select onChange={e => {
                        setData(
                            data.map(item2 => {
                                if (item2.id == selected.id) {
                                    if (selected.reporting_officer == e.target.value) {
                                        return { ...item2, needSave: false, new_reporting_officer_name: e.target.selectedOptions[0].text }
                                    } else {
                                        return { ...item2, needSave: true, new_reporting_officer: e.target.value, new_reporting_officer_name: e.target.selectedOptions[0].text }

                                    }
                                }
                                else {
                                    return { ...item2 }
                                }
                            })
                        )
                    }} className='form-control'>
                        <option>Select</option>
                        {
                            reporting_officers.map(item => (
                                <option value={item.id}>{item.user_name}</option>
                            ))
                        }
                    </select>
                    {/* <button onClick={saveReportingOfficer} className='btn btn-success m-2'>Save</button> */}
                </div>

            </Modal>
        </div>
    )
}

export default Hierarchy