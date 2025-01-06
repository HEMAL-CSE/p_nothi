import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import Modal from 'react-modal'

const Purchase = () => {
    const [data, setData] = useState([])

    const [requisitions, setRequisitions] = useState([])

    const [requisition_id, setRequisition_id] = useState('')

    const [name, setName] = useState('')

    const [company_name, setCompany_name] = useState('')
    const [price, setPrice] = useState('')
    const [isOpen, setIsOpen] = useState(false)

    const [edit_name, setEdit_name] = useState('')

    const [edit_company_name, setEdit_company_name] = useState('')
    const [edit_price, setEdit_Price] = useState('')

    const [edit_id, setEdit_id] = useState('')




    const getData = () => {
        axios.get('http://68.178.163.174:5012/employees/purchase').then(res => {
            setData(res.data)
        })
    }

    useEffect(() => {
        axios.get(`http://68.178.163.174:5012/employees/requisition?approved_hr=APPROVED&&not_available=1`).then(res => {
            setRequisitions(res.data)
        })

        getData()
    }, [])

    const addData = (e) => {
        e.preventDefault()

        let employee_id = localStorage.getItem('employee_id')

        axios.post(`http://68.178.163.174:5012/employees/purchase/add`, {
            employee_id,
            name,
            company_name,
            price
        }).then(res => {
            toast('Successfulyy Submitted')

            getData()
        })
    }

    const editData = (e, id) => {
        e.preventDefault()

        axios.put(`http://68.178.163.174:5012/employees/purchase/edit?id=${id}`, {
            name: edit_name,
            company_name: edit_company_name,
            price: edit_price
        }).then(res => {
            toast('Successfulyy Submitted')
            setIsOpen(false)

            getData()
        })
    }

    const deleteData = (e, id) => {
        e.preventDefault()

        if (window.confirm('Do you want to delete this?')) {
            axios.delete(`http://68.178.163.174:5012/employees/purchase/delete?id=${id}`).then(res => {
                toast('Deleted Successfully')

                getData()
            })
        }


    }

    const approve = (e, role, id) => {
        if(role == '2'){
            axios.put(`http://68.178.163.174:5012/employees/purchase/approve?approved_ed=1&&id=${id}`).then(res => {
                toast('Approved')
                getData()
            })
        }else if(role == '1'){
            axios.put(`http://68.178.163.174:5012/employees/purchase/approve?approved_md=1&&id=${id}`).then(res => {
                toast('Approved')
                getData()
            })
        }
    }

    const reject = (e, role, id) => {
        if(role == '2'){
            axios.put(`http://68.178.163.174:5012/employees/purchase/reject?approved_ed=1&&id=${id}`).then(res => {
                toast('Rejected')
                getData()
            })
        }else if(role == '1'){
            axios.put(`http://68.178.163.174:5012/employees/purchase/reject?approved_md=1&&id=${id}`).then(res => {
                toast('Rejected')
                getData()
            })
        }
    }

    const purchaseConfirmed = (e, id) => {
        axios.put(`http://68.178.163.174:5012/employees/purchase/confirm?id=${id}`).then(res => {
            toast('Purchase Confirmed')
            getData()
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
                                <h1 className="m-2 display-5 fw-bold text-success2"><span className="text-success2">Purchase</span> </h1>
                            </a>
                        </div>
                    </div>

                </div>
            </div>

            <div>



                <label> For which requisition:</label>
                <select className='select' onChange={e => {
                    setRequisition_id(e.target.value)
                }}>
                    <option>Select</option>
                    {
                        requisitions.map(item => (
                            <option value={item.id}>{item.user_name} || {item.department_name} || {item.item_details}</option>
                        ))
                    }
                </select>

                <label>Item Name</label>
                <input className='input' value={name} onChange={e => setName(e.target.value)} />


                <label>Company Name</label>
                <input className='input' value={company_name} onChange={e => setCompany_name(e.target.value)} />

                <label>Price</label>
                <input className='input' value={price} onChange={e => setPrice(e.target.value)} />




                <button onClick={addData} className='button'>Submit</button>

            </div>

            <table className='table'>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Item Name</th>
                        <th>Company Name</th>
                        <th>Price</th>
                        <th>{localStorage.getItem('role') == '2' ? 'Approve' : 'Approved by ED'}</th>
                        <th>{localStorage.getItem('role') == '1' ? 'Approve' : 'Approved by MD'}</th>
                        <th>Purchase Confirmed</th>
                        <th>Edit/Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map(item => (
                            <tr>
                                <td>{item.role_name}</td>
                                <td>{item.name}</td>
                                <td>{item.company_name}</td>
                                <td>{item.price}</td>
                                <td>{localStorage.getItem('role') == '2' && item.approved_ed == 'PENDING' ?
                                    <div>
                                        <button onClick={e => approve(e, '2', item.id)} className='btn btn-success mx-2'>Approve</button>
                                        <button onClick={e => reject(e, '2', item.id)} className='btn btn-danger'>Reject</button>
                                    </div>
                                    : item.approved_ed}</td>
                                <td>{localStorage.getItem('role') == '1' && item.approved_md == 'PENDING' ?
                                    <div>
                                        <button onClick={e => approve(e, '1', item.id)} className='btn btn-success mx-2'>Approve</button>
                                        <button onClick={e => reject(e, '2', item.id)} className='btn btn-danger'>Reject</button>

                                    </div>
                                    : item.approved_md}</td>
                                <td>{localStorage.getItem('role') == '13' && item.purchase_confirmed == 'PENDING' ?
                                    <button onClick={e => purchaseConfirmed(e, item.id)} className='btn btn-success'>Confirm</button>
                                    : item.purchase_confirmed}</td>
                                <td>
                                    <button onClick={e => {
                                        setEdit_name(item.name)
                                        setEdit_company_name(item.company_name)
                                        setEdit_Price(item.price)
                                        setEdit_id(item.id)
                                        setIsOpen(true)
                                    }} className='btn btn-warning m-2'>Edit</button>
                                    <button onClick={e => deleteData(e, item.id)} className='btn btn-danger m-2'>Delete</button>
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
                <div className='details'>



                    <label>Item Name</label>
                    <input className='input' value={edit_name} onChange={e => setEdit_name(e.target.value)} />


                    <label>Company Name</label>
                    <input className='input' value={edit_company_name} onChange={e => setEdit_company_name(e.target.value)} />

                    <label>Price</label>
                    <input className='input' value={edit_price} onChange={e => setEdit_Price(e.target.value)} />


                    <button onClick={e => editData(e, edit_id)} className='button'>Submit</button>

                </div>
            </Modal>
        </div>
    )
}

export default Purchase