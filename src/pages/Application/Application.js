import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'


export const Application = () => {
    const [quantity, setQuantity] = useState('')
    const [item_details, setItem_details] = useState('')

  const [item_type, setItem_type] = useState('')
  const [department, setDepartment] = useState('')
  const [pendings, setPendings] = useState([])
  const role = localStorage.getItem('role')
  const [positions, setpositions] = useState([
      {
          name: 'Office Equipment',
      },
      {
          name: 'Office Furniture',
      },
      {
          name: 'Stationery',
      },
      {
          name: 'Technology & IT Accessories',
      },
      {
          name: 'Cleaning and Maintenance Supplies',
      },
      {
          name: 'Office Safety and Security',
      },
      {
        name: 'Kitchen and Breakroom Supplies',

      },
      {
        name: 'Others',
      }   
  ])

  const [data, setData] = useState([])


  const addData = e => {
    e.preventDefault()

    const employee_id = localStorage.getItem('employee_id')

    axios.post(`http://68.178.163.174:5012/employees/requisition/add`, {
        employee_id,
        item_type,
        item_details,
        quantity

    }).then(res => {
        toast('Submitted')
        getData()
    })
  }

  const getData = () => {

    const employee_id = localStorage.getItem('employee_id')

    axios.get(`http://68.178.163.174:5012/employees/requisition?employee_id=${employee_id}`).then(res => {
        setData(res.data)
    })
  }

  const pendingData = () => {

    if(['admin', 'manager'].includes(localStorage.getItem('role'))){
        const employee_id = localStorage.getItem('employee_id')
        axios.get(`http://68.178.163.174:5012/employees/job_info?employee_id=${employee_id}`).then(res => {
            setDepartment(res.data[0].department)
            if(res.data[0].department == 3){
                axios.get(`http://68.178.163.174:5012/employees/requisition`).then(res2 => {
                    setPendings(res2.data) 
                })
            } else {
                axios.get(`http://68.178.163.174:5012/employees/requisition?reporting_officer=${employee_id}`).then(res2 => {
                    setPendings(res2.data) 
                })
            }
                    
        })
        
    }
    
  }

  const approve = (e, id) => {
    if(department == 3){
        axios.put(`http://68.178.163.174:5012/employees/requisition/approve?approved_hr=${true}`)
    }else{
        axios.put(`http://68.178.163.174:5012/employees/requisition/approve?approved_hod=${true}`)

    }

    pendingData()
  }

  const reject = (e, id) => {
    if(department == 3){
        axios.put(`http://68.178.163.174:5012/employees/requisition/reject?approved_hr=${true}`)
    }else{
        axios.put(`http://68.178.163.174:5012/employees/requisition/reject?approved_hod=${true}`)
    }
    pendingData()
  }

  useEffect(() => {
    getData()

    pendingData()

  }, [])

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
                                    <h1 className="m-2 display-5 fw-bold text-success2"><span className="text-success2">Application/</span>Requsition</h1>
                                </a>
                            </div>
                        </div>

                    </div>
                </div>


                <label> Select Item Type:</label>
                <select value={item_type} onChange={e => {        
                    setItem_type(e.target.value)
                        }} className='select' >
                            <option >Select</option>
                            {
                                positions.map(item => (
                                    <option value={item.name}>{item.name}</option>
                                ))
                            }
                </select>

                <label> Write Item Details:</label>
                <input value={item_details} onChange={e => setItem_details(e.target.value)} className='input' type='text'/>

                <label> Quantity:</label>
                <input value={quantity} onChange={e => setQuantity(e.target.value)} className='input' type='text'/>

                <button onClick={addData} className='button'>Submit</button>

               { ['admin', 'manager'].includes(role) || department == 3 ?
                <div>
                <label className='text-center mt-4'>Pending Requisitions</label>
               <table className='table mt-3'>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Department</th>
                            <th>Item Type</th>
                            <th>Item Details</th>
                            <th>Item Quantity</th>
                            <th>Approved By {department == 3 ? 'HOD' : 'HR'}</th>
                            <th>Approve/Reject</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            pendings.map(item => (
                                <tr>
                                    <td>{item.user_name}</td>
                                    <td>{item.department_name}</td>
                                    <td>{item.item_type}</td>
                                    <td>{item.item_details}</td>
                                    <td>{item.quantity}</td>
                                    <td>{department == 3 ? item.approved_hod : item.approved_hr}</td>
                                    { department == 3 && item.approved_hr == 'PENDING' ?
                                        <td>
                                        <button onClick={e => approve(e, item.id)} className='btn btn-success mx-2'>Approve</button>
                                        <button onClick={e => reject(e, item.id)} className='btn btn-danger mx-2'>Reject</button>
                                    </td>:
                                        department != 3 && item.approved_hod == 'PENDING' ?
                                        <td>
                                        <button onClick={e => approve(e, item.id)} className='btn btn-success mx-2'>Approve</button>
                                        <button onClick={e => reject(e, item.id)} className='btn btn-danger mx-2'>Reject</button>
                                    </td> :
                                    <td>{department == 3 ? item.approved_hr : item.approved_hod}</td>
                                    }
                                </tr>
                            ))
                        }
                    </tbody>
                </table> </div>: <div></div> }

                <label className='text-center mt-4'>Your Requisitions</label>
               <table className='table mt-3'>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Department</th>
                            <th>Item Type</th>
                            <th>Item Details</th>
                            <th>Item Quantity</th>
                            <th>Approved By HOD</th>
                            <th>Approved By HR</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map(item => (
                                <tr>
                                    <td>{item.user_name}</td>
                                    <td>{item.department_name}</td>
                                    <td>{item.item_type}</td>
                                    <td>{item.item_details}</td>
                                    <td>{item.quantity}</td>
                                    <td>{item.approved_hod}</td>
                                    <td>{item.approved_hr}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table> 
    </div>
    
  )
}
