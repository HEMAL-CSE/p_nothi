import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'
import Modal from 'react-modal'


export const Application = () => {
    const [quantity, setQuantity] = useState('')
    const [item_details, setItem_details] = useState([])
    const [decision_modal, setDecision_modal] = useState(false)
    const [decision_id, setDecision_id] = useState('')
    const [others, setOthers] = useState(false)
    const [detailsOpen, setDetailsOpen] = useState(false)
    const [details, setDetails] = useState([])

    const [item_type, setItem_type] = useState('')
    const [department, setDepartment] = useState('')
    const [pendings, setPendings] = useState([])
    const role = localStorage.getItem('role')
    const [positions, setpositions] = useState([])

    const [items, setItems] = useState([])

    const [item, setItem] = useState('')
    const [comments, setComments] = useState([])

    const [data, setData] = useState([])

    const [adminData, setAdminData] = useState([])

    const [mdData, setMdData] = useState([])

    const [decision, setDecision] = useState('')
    const [estimated_price, setEstimated_price] = useState('')
    const [comment_id, setComment_id] = useState('')




    //get item types
    useEffect(() => {
        axios.get('http://68.178.163.174:5012/employees/item_types').then(res => {
            setpositions(res.data)
        })
    }, [])

    // get items

    useEffect(() => {
        axios.get(`http://68.178.163.174:5012/employees/item_details?item_type_id=${item_type}`)
            .then(res => {
                // console.log(res.data);

                setItems(res.data.map(res => {
                    return { ...res, quantity: '', unit: '', checked: false }
                }))

            })
    }, [item_type])



    // add requisitions
    const addData = e => {

        e.preventDefault()

        const employee_id = localStorage.getItem('employee_id')

        axios.post(`http://68.178.163.174:5012/employees/requisition/add`, {
            employee_id,
            item_type,

        }).then(res => {
            items.map(item => {
                if (item.checked == true) {
                    axios.post(`http://68.178.163.174:5012/employees/requisition/item/add`, {
                        requisition_id: res.data.id,
                        name: item.name,
                        quantity: item.quantity,
                        unit: item.unit
                    }).then(res => {

                    })
                }
            })

            toast('Submitted')
            getData()

        })
    }

    const group = (data) => {
        let result = Object.values(
            data.reduce((e, item) => {
                let value = item.id;
                let existing = e[value] || {...item, item_details: []}
                // console.log(existing);
                
                return {
                    ...e,
                    [value]: {
                        ...existing,
                        item_details: [...existing.item_details, {'name': item.item_name, 'quantity': item.item_quantity, 'unit': item.item_unit}]
                    }
                }
            }, {})
        )

        return result
    }


    // get requisitions

    const getData = () => {


        

        const employee_id = localStorage.getItem('employee_id')

        axios.get(`http://68.178.163.174:5012/employees/requisition?employee_id=${employee_id}`).then(res => {
            
            
            if(res.data.length > 0){
                
                setData(group(res.data))

                console.log(group(res.data));
                
                
            }
            // console.log(res.data);

        })
    }

    const admintData = () => {
        if (['2', '3', '4', '5', '6'].includes(localStorage.getItem('role'))) {
            axios.get(`http://68.178.163.174:5012/employees/requisition?admin=1`).then(res => {
                setAdminData(group(res.data))
                // console.log(res.data);

            })
        }

    }

    const mddata = () => {
        if (localStorage.getItem('role') == '1') {
            axios.get(`http://68.178.163.174:5012/employees/requisition?md=1`).then(res => {
                setMdData(group(res.data))
                console.log(res.data);

            })
        }

    }

    const pendingData = () => {

        if (['7', '9'].includes(localStorage.getItem('role'))) {
            const employee_id = localStorage.getItem('employee_id')
            axios.get(`http://68.178.163.174:5012/employees/job_info?employee_id=${employee_id}`).then(res => {
                setDepartment(res.data[0].department)
                if (res.data[0].department == 3) {
                    axios.get(`http://68.178.163.174:5012/employees/requisition?approved_hod=APPROVED`).then(res2 => {
                        setPendings(group(res2.data))
                        console.log(res2.data);

                    })
                } else {
                    axios.get(`http://68.178.163.174:5012/employees/requisition?reporting_officer=${employee_id}`).then(res2 => {
                        setPendings(group(res2.data))
                    })
                }

            })

        } else if (['11'].includes(localStorage.getItem('role'))) {
            axios.get(`http://68.178.163.174:5012/employees/requisition?approved_admin=APPROVED`).then(res2 => {
                setPendings(group(res2.data))
                console.log(res2.data);

            })
        }else if (['1'].includes(localStorage.getItem('role'))) {
            axios.get(`http://68.178.163.174:5012/employees/requisition?approved_admin=APPROVED&&md=1`).then(res2 => {
                setPendings(group(res2.data))
                console.log(res2.data);

            })
        }

    }


    //approval and rejections
    const approve = (e, id) => {
        if (department == 3) {
            axios.put(`http://68.178.163.174:5012/employees/requisition/approve?approved_hr=${true}&&id=${id}`).then(res => {
                toast('Approved')
            })
        } else {
            axios.put(`http://68.178.163.174:5012/employees/requisition/approve?approved_hod=${true}&&id=${id}`).then(res => {
                toast('Approved')
            })

        }

        pendingData()
    }

    const reject = (e, id) => {
        if (department == 3) {
            axios.put(`http://68.178.163.174:5012/employees/requisition/reject?approved_hr=${true}&&id=${id}`).then(res => {
                toast('Rejected')
            })
        } else {
            axios.put(`http://68.178.163.174:5012/employees/requisition/reject?approved_hod=${true}&&id=${id}`).then(res => {
                toast('Rejected')
            })
        }
        pendingData()
    }



    useEffect(() => {
        getData()

        pendingData()

        admintData()

        mddata()

    }, [])

    const approveAdmin = (e, id) => {
        axios.put(`http://68.178.163.174:5012/employees/requisition/approve?approved_admin=${true}&&id=${id}`).then(res => {
            toast('Approved')
            admintData()
        })

    }

    const approveMd = (e, id) => {
        axios.put(`http://68.178.163.174:5012/employees/requisition/approve?approved_md=${true}&&id=${id}`).then(res => {
            toast('Approved')
            pendingData()
        })

    }

    const rejectAdmin = (e, id) => {
        axios.put(`http://68.178.163.174:5012/employees/requisition/reject?approved_admin=${true}&&id=${id}`).then(res => {
            toast('Rejected')
            admintData()
        })

    }

    const rejectMd = (e, id) => {
        axios.put(`http://68.178.163.174:5012/employees/requisition/reject?approved_md=${true}&&id=${id}`).then(res => {
            toast('Rejected')
            mdData()
        })

    }

    const send_from_store = (e, id) => {
        axios.put(`http://68.178.163.174:5012/employees/requisition/send_from_store?id=${id}`).then(res => {
            toast('Sent')
            axios.get(`http://68.178.163.174:5012/employees/requisition`).then(res2 => {
                setPendings(group(res2.data))

                // console.log(res2.data);

            })
        })
    }


    //decisions

    const getComments = (id) => {
        axios.get(`http://68.178.163.174:5012/employees/decision?requisition_id=${id}`).then(res => {
            setComments(res.data)
        })
    }
    const update_decision = (e, id) => {
        if (comment_id != '') {
            console.log(comment_id);

            axios.put(`http://68.178.163.174:5012/employees/decision/edit?id=${comment_id}`, {
                comment: decision,
                commentor_id: localStorage.getItem('employee_id'),
                requisition_id: id,
                estimated_price
            }).then(res => {
                toast('Decision Submitted')
                // axios.get(`http://68.178.163.174:5012/employees/requisition`).then(res2 => {
                //     setPendings(res2.data)
                //     admintData()
                //     setDecision_modal(false)
                //     // console.log(res2.data);

                // })

                getComments(id)
            })
        } else {
            axios.post(`http://68.178.163.174:5012/employees/decision/add`, {
                comment: decision,
                commentor_id: localStorage.getItem('employee_id'),
                requisition_id: id,
                estimated_price
            }).then(res => {
                toast('Decision Submitted')
                // axios.get(`http://68.178.163.174:5012/employees/requisition`).then(res2 => {
                //     setPendings(res2.data)
                //     admintData()
                //     setDecision_modal(false)
                //     // console.log(res2.data);

                // })

                getComments(id)
            })
        }

    }


    // received
    const received = (e, id) => {
        axios.put(`http://68.178.163.174:5012/employees/received?id=${id}&&received=1`).then(res => {
            toast('Received')
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
                                <h1 className="m-2 display-5 fw-bold text-success2"><span className="text-success2">Application/</span>Requisition</h1>
                            </a>
                        </div>
                    </div>

                </div>
            </div>


            {/* Add Requisition */}
            {localStorage.getItem('role') != '11' && <div>
                <label> Select Item Type:</label>
                <select value={item_type} onChange={e => {
                    setItem_type(e.target.value)
                    setOthers(false)
                }} className='select' >
                    <option >Select</option>
                    {
                        positions.map(item => (
                            <option value={item.id}>{item.name}</option>
                        ))
                    }
                </select>

                <label>Item Details:</label>
                <div className='border border-1 m-2 p-2'>
                    {
                        items.map((item, i) => (
                            <div className='d-flex justify-content-between'>
                                <div className='d-flex align-items-center'>
                                    <input className='mx-2' type='checkbox' onChange={
                                        (e) => {
                                            // if(e.target.checked == true){
                                            //     item_details.push(item)
                                            // }else if(e.target.checked == false){
                                            //     item_details.pop(item)
                                            // }

                                            // console.log(item_details);
                                            var clone = [...items]
                                            var obj = clone[i]
                                            obj.checked = e.target.checked
                                            clone[i] = obj
                                            setItems([...clone])
                                            console.log(items);


                                        }
                                    } />
                                    {
                                        item.id == null ?
                                            <input className='form-control mx-2' onChange={e => {
                                                var clone = [...items]
                                                var obj = clone[i]
                                                obj.name = e.target.value
                                                clone[i] = obj
                                                setItems([...clone])
                                                console.log(items);


                                            }} placeholder='Name' /> :

                                            <p className='fw-bold my-2'>{item.name}</p>}

                                </div>
                                <div className='d-flex m-2'>
                                    <input className='form-control mx-2' onChange={e => {
                                        var clone = [...items]
                                        var obj = clone[i]
                                        obj.quantity = e.target.value
                                        clone[i] = obj
                                        setItems([...clone])
                                        console.log(items);


                                    }} placeholder='quantity' />

                                    <input className='form-control' onChange={e => {
                                        var clone = [...items]
                                        var obj = clone[i]
                                        obj.unit = e.target.value
                                        clone[i] = obj
                                        setItems([...clone])
                                    }} placeholder='unit' />
                                </div>
                            </div>
                        ))
                    }

                    <div className='d-flex'>
                        <button onClick={e =>

                            setItems(prev => [...prev, {
                                name: '',
                                quantity: '',
                                unit: '',
                                checked: false,
                            }])
                        } className='btn btn-primary'>Add More</button>
                    </div>

                </div>
                {/* {
                    items.length != 0 && others == false ?
                        <select className='select' onChange={e => {
                            console.log(e.target.value);
                            if (e.target.value == 'Others') {
                                setOthers(true)
                            } else {
                                setItem_details(e.target.value)

                            }
                        }}>
                            <option>Select</option>
                            {
                                items.map(item => (
                                    <option value={item.item_name}>{item.item_name}</option>
                                ))
                            }
                            <option value="Others">Others</option>
                        </select>
                        :
                        <input placeholder='Enter item name' value={item_details} onChange={e => setItem_details(e.target.value)} className='input' type='text' />

                } */}

                {/* <label> Quantity:</label>
                <input value={quantity} onChange={e => setQuantity(e.target.value)} className='input' type='text' /> */}

                <button onClick={addData} className='button'>Submit</button>
            </div>}

            {/* For HR and HOD */}
            {['7', '9'].includes(role) || department == 3 ?
                <div>
                    <label className='text-center mt-4'>Pending Requisitions</label>
                    <table className='table mt-3'>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Department</th>
                                <th>Item Type</th>
                                <th>Item Details</th>
                                <th>Approved By {localStorage.getItem('role') == '7' ? 'HOD' : 'HR'}</th>
                                <th>Approved By ED</th>
                                <th>Approved By MD</th>
                                <th>Approve/Reject</th>
                                <th>Send from store</th>
                                <th>Received</th>
                                {localStorage.getItem('role') == '7' && <th>Comments</th>}

                            </tr>
                        </thead>
                        <tbody>
                            {
                                pendings.map(item => (
                                    <tr>
                                        <td>{item.user_name}</td>
                                        <td>{item.department_name}</td>
                                        <td>{item.item_type_name}</td>
                                        <td><button onClick={e => {
                                                setDetails(item.item_details)
                                                setDetailsOpen(true)
                                            }} className='btn btn-warning'>Details</button></td>
                                        <td>{department == 3 ? item.approved_hod : item.approved_hr}</td>
                                        <td>{['1', '2'].includes(item.item_type) || item.estimated_price > 15000 ? item.approved_admin : 'Invalid'}</td>
                                        <td>{['1', '2'].includes(item.item_type) && item.total_price > 15000 || item.estimated_price > 15000 ? item.approved_md : 'Invalid'}</td>

                                        {department == 3 && item.approved_hr == 'PENDING' ?
                                            <td>
                                                <button onClick={e => approve(e, item.id)} className='btn btn-success mx-2 my-1'>Approve</button>
                                                <button onClick={e => reject(e, item.id)} className='btn btn-danger mx-2'>Reject</button>
                                            </td> :
                                            department != 3 && item.approved_hod == 'PENDING' ?
                                                <td>
                                                    <button onClick={e => approve(e, item.id)} className='btn btn-success mx-2'>Approve</button>
                                                    <button onClick={e => reject(e, item.id)} className='btn btn-danger mx-2'>Reject</button>
                                                </td> :
                                                <td>{department == 3 ? item.approved_hr : item.approved_hod}</td>
                                        }
                                        <td>{item.sent_from_store}</td>
                                        <td>{item.received}</td>
                                        {localStorage.getItem('role') == '7' && <td>
                                            <button className='btn btn-warning' onClick={e => {
                                                setDecision('')
                                                setEstimated_price('')
                                                setDecision_modal(true)
                                                setDecision_id(item.id)
                                                setDecision(item.decision_making)
                                                setComment_id('')
                                                getComments(item.id)
                                            }}>Comment</button>
                                        </td>}

                                    </tr>
                                ))
                            }
                        </tbody>
                    </table> </div> : <div></div>}

            {
                ['2', '3', '4', '5', '6'].includes(localStorage.getItem('role')) &&
                <div>
                    <label className='text-center mt-4'>Requisitions</label>
                    <table className='table mt-3'>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Department</th>
                                <th>Item Type</th>
                                <th>Item Details</th>
            
                                <th>Approved By HOD</th>
                                <th>Approved By HR</th>
                                <th>Approved By MD</th>
                                <th>{localStorage.getItem('role') == '2' ? 'Approve' : 'Approved By ED'}</th>
                                <th>Send from store</th>
                                <th>Decision Making</th>
                                <th>Received</th>


                            </tr>
                        </thead>
                        <tbody>
                            {
                                adminData.map(item => (
                                    <tr>
                                        <td>{item.user_name}</td>
                                        <td>{item.department_name}</td>
                                        <td>{item.item_type_name}</td>
                                        <td><button onClick={e => {
                                                setDetails(item.item_details)
                                                setDetailsOpen(true)
                                            }} className='btn btn-warning'>Details</button></td>
                                        <td>{item.approved_hod}</td>
                                        <td>{item.approved_hr}</td>
                                        <td>{item.total_price > 15000 || item.estimated_price > 15000 ? item.approved_md : 'Invalid'}</td>

                                        <td>
                                            {
                                                item.approved_admin == 'PENDING' && ['2'].includes(localStorage.getItem('role')) ?
                                                    <div>
                                                        <button onClick={e => approveAdmin(e, item.id)} className='btn btn-primary m-2'>Approve</button>
                                                        <button onClick={e => rejectAdmin(e, item.id)} className='btn btn-primary'>Reject</button>
                                                    </div>
                                                    : item.approved_admin

                                            }
                                        </td>
                                        <td>{item.sent_from_store}</td>
                                         <td>
                                            <button className='btn btn-warning' onClick={e => {
                                                getComments(item.id)
                                                setDecision_modal(true)
                                                setDecision_id(item.id)
                                                setDecision(item.decision_making)
                                                setDecision('')
                                                setEstimated_price('')
                                                setComment_id('')
                                            }}>Comment</button>
                                        </td>
                                        <td>{item.received}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table> </div>
            }

            {
                localStorage.getItem('role') == '1' &&
                <div>
                    <label className='text-center mt-4'>Requisitions</label>
                    <table className='table mt-3'>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Department</th>
                                <th>Item Type</th>
                                <th>Item Details</th>
                                <th>Approved By HOD</th>
                                <th>Approved By HR</th>
                                <th>Approved By ED</th>
                                <th>Approve</th>
                                <th>Send from store</th>
                                <th>Received</th>
                                <th>Comments</th>

                            </tr>
                        </thead>
                        <tbody>
                            {
                                pendings.map(item => (
                                    <tr>
                                        <td>{item.user_name}</td>
                                        <td>{item.department_name}</td>
                                        <td>{item.item_type_name}</td>
                                        <td>
                                        <button onClick={e => {
                                                setDetails(item.item_details)
                                                setDetailsOpen(true)
                                            }} className='btn btn-warning'>Details</button>
                                        </td>
                                        <td>{item.approved_hod}</td>
                                        <td>{item.approved_hr}</td>
                                        <td>{item.approved_admin}</td>

                                        <td>
                                            {
                                                item.approved_md == 'PENDING'  ?
                                                    <div>
                                                        <button onClick={e => approveMd(e, item.id)} className='btn btn-primary m-2'>Approve</button>
                                                        <button onClick={e => rejectMd(e, item.id)} className='btn btn-primary'>Reject</button>
                                                    </div>
                                                    :  item.approved_md

                                            }
                                        </td>
                                        <td>{item.sent_from_store}</td>
                                        <td>{item.received}</td>
                                         <td>
                                            <button className='btn btn-warning' onClick={e => {
                                                getComments(item.id)
                                                setDecision_modal(true)
                                                setDecision_id(item.id)
                                                setDecision(item.decision_making)
                                                setDecision('')
                                                setEstimated_price('')
                                                setComment_id('')
                                            }}>Comment</button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table> </div>
            }

            {localStorage.getItem('role') != '11' &&
                <div>
                    <label className='text-center mt-4'>Your Requisitions</label>

                    <table className='table mt-3'>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Department</th>
                                <th>Item Type</th>
                                <th>Item Details</th>
                                <th>Approved By HOD</th>
                                <th>Approved By HR</th>
                                <th>Approved By ED</th>
                                <th>Approved By MD</th>
                                <th>Received</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data.map(item => (
                                    <tr >
                                        <td>{item.user_name}</td>
                                        <td>{item.department_name}</td>
                                        <td>{item.item_type_name}</td>
                                        <td>
                                            <button onClick={e => {
                                                setDetails(item.item_details)
                                                setDetailsOpen(true)
                                            }} className='btn btn-warning'>Details</button>
                                        </td>
                                        <td>{item.approved_hod}</td>
                                        <td>{item.approved_hr}</td>
                                        <td>{['1', '2'].includes(item.item_type) ? item.approved_admin : 'Invalid'}</td>
                                        <td>{['1', '2'].includes(item.item_type) && item.total_price > 15000 || item.estimated_price > 15000 ? item.approved_md : 'Invalid'}</td>
                                        <td>{item.received != 'PENDING' ? item.received : <button className='btn btn-success' onClick={e => received(e, item.id)} >
                                            Received
                                        </button>}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table> </div>}

            {



                // store manager
                localStorage.getItem('role') == '11' &&
                <div>
                    <label className='text-center mt-4'>Requisitions</label>
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
                                <th>Approved By ED</th>
                                <th>Approved By MD</th>
                                <th>Send</th>

                            </tr>
                        </thead>
                        <tbody>
                            {
                                pendings.map(item => (
                                    <tr>
                                        <td>{item.user_name}</td>
                                        <td>{item.department_name}</td>
                                        <td>{item.item_type_name}</td>
                                        <td>
                                        <button onClick={e => {
                                                setDetails(item.item_details)
                                                setDetailsOpen(true)
                                            }} className='btn btn-warning'>Details</button>
                                        </td>
                                        <td>{item.quantity}</td>
                                        <td>{item.approved_hod}</td>
                                        <td>{item.approved_hr}</td>
                                        <td>{['1', '2'].includes(item.item_type) ? item.approved_admin : 'Invalid'}</td>
                                        <td>{['1', '2'].includes(item.item_type) && item.total_price > 15000 ? item.approved_md : 'Invalid'}</td>

                                        <td>
                                            {
                                                item.sent_from_store != 'SENT' ? <button onClick={e => send_from_store(e, item.id)} className='btn btn-primary'>Send</button> : item.sent_from_store

                                            }
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table> </div>
            }

            {/* Comment box */}

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
                isOpen={decision_modal}
                onRequestClose={() => {
                    setDecision_modal(false)
                }}
            >
                <div className='details'>

                    {
                        comments.map(comment => (
                            <div className='d-flex'>
                                <p className='fw-bold'>{comment.role_name}:</p>
                                <p>{comment.comment}. <span className='fw-bolder'>Estimated Price: {comment.estimated_price}</span></p>
                                {localStorage.getItem('employee_id') == comment.commentor_id &&
                                    <div className=''>
                                        <button onClick={e => {
                                            setComment_id(comment.id)
                                            setEstimated_price(comment.estimated_price)
                                            setDecision(comment.comment)
                                        }} className='btn btn-warning py-0 mx-2 '>Edit</button>
                                    </div>}
                            </div>
                        ))
                    }

                    <label>Comment</label>
                    <textarea rows={5} placeholder='Comment....' className='input' value={decision} onChange={e => setDecision(e.target.value)} />

                    <label>Estimated Price</label>
                    <input className='input w-25' value={estimated_price} type='number' onChange={e => setEstimated_price(e.target.value)} />
                    <button onClick={e => update_decision(e, decision_id)} className='btn btn-success'>Submit</button>
                </div>

            </Modal>

            <Modal
                style={{
                    content: {
                        width: "50%",
                        // height: "10%",
                    
                        zIndex: 10,
                        // top: "5%",
                        left: "30%",
                        right: "10%",
                        // bottom: "5%",
                        overflow: "auto",
                        // WebkitBoxShadow: "0 5px 15px rgba(0, 0, 0, 0.5)",
                        // MozBoxShadow: "0 5px 15px rgba(0, 0, 0, 0.5)",
                        // boxShadow: "0 5px 15px rgba(0, 0, 0, 0.5)",
                        borderRadius: "5px",
                        border: "1px solid #ccc",
                    },
                    overlay: { zIndex: 10000, backgroundColor: 'transparent' }
                }}
                isOpen={detailsOpen}
                onRequestClose={() => {
                    setDetailsOpen(false)
                }}
            >
                <table className='table m-4'>
                    <thead>
                        <th>Name</th>
                        <th>Quantity</th>
                      
                    </thead>
                    <tbody>
                        {
                            details.map(item => (
                                <tr>
                                    <td>{item.name}</td>
                                    <td>{item.quantity} {item.unit}</td>
                                   
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </Modal>
        </div>

    )
}
