import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Modal from 'react-modal'
import { toast } from 'react-toastify'
const ReqElt = ({ getData, group }) => {
    const role = localStorage.getItem('role')
    const [pendings, setPendings] = useState([])
    const [decision_id, setDecision_id] = useState('')
    const [department, setDepartment] = useState('')
    const [comments, setComments] = useState([])
    const [job_desg, setJob_desg] = useState('')
    const [job_branch, setJob_branch] = useState('')


    const [adminData, setAdminData] = useState([])
    const [mdData, setMdData] = useState([])

    const [decision, setDecision] = useState('')
    const [decision_modal, setDecision_modal] = useState(false)
    const [estimated_price, setEstimated_price] = useState('')
    const [comment_id, setComment_id] = useState('')
    const [detailsOpen, setDetailsOpen] = useState(false)
    const [details, setDetails] = useState([])



    const admintData = () => {
        if (['2', '3', '4', '5', '6'].includes(localStorage.getItem('role'))) {

            axios.get(`http://68.178.163.174:5012/employees/requisition_elt?admin=1`).then(res => {
                setAdminData(group(res.data))
                // console.log(res.data);

            })
        }

    }

    const mddata = () => {
        if (localStorage.getItem('role') == '1') {
            axios.get(`http://68.178.163.174:5012/employees/requisition_elt?md=1`).then(res => {
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
                setJob_desg(res.data[0].designation.toLowerCase())
                setJob_branch(res.data[0].branch_id)
                console.log(res.data[0].designation.toLowerCase());
                if (res.data[0].department == 3) {
                    axios.get(`http://68.178.163.174:5012/employees/requisition_elt?approved_pm=APPROVED`).then(res2 => {
                        setPendings(group(res2.data))
                        console.log(res2.data);

                    })
                } else if (res.data[0].department == 2 && res.data[0].designation.toLowerCase().includes('project manager')) {
                    axios.get(`http://68.178.163.174:5012/employees/requisition_elt?approved_dc=APPROVED`).then(res2 => {
                        setPendings(group(res2.data))
                        console.log(res2.data);

                    })
                } else if (res.data[0].department == 2 && res.data[0].designation.toLowerCase().includes('divisional coordinator')) {
                    axios.get(`http://68.178.163.174:5012/employees/requisition_elt?approved_coord=APPROVED&&division=${res.data[0].division_id}&&reporting_officer=${employee_id}&&branch=${res.data[0].branch_id}`).then(res2 => {
                        setPendings(group(res2.data))
                        console.log(res2.data);

                    })
                } else if (res.data[0].department == 2 && res.data[0].designation.toLowerCase().includes('coordinator')) {
                    
                    
                    axios.get(`http://68.178.163.174:5012/employees/requisition_elt?reporting_officer=${employee_id}&&branch=${res.data[0].branch_id}`).then(res2 => {
                        setPendings(group(res2.data))
                        console.log(res2.data);

                    })
                }
                //  else {
                //     axios.get(`http://68.178.163.174:5012/employees/requisition?reporting_officer=${employee_id}`).then(res2 => {
                //         setPendings(group(res2.data))
                //     })
                // }

            })

        } else if (['11'].includes(localStorage.getItem('role'))) {
            axios.get(`http://68.178.163.174:5012/employees/requisition_elt?approved_admin=APPROVED`).then(res2 => {
                setPendings(group(res2.data))
                console.log(res2.data);

            })
        } else if (['1'].includes(localStorage.getItem('role'))) {
            axios.get(`http://68.178.163.174:5012/employees/requisition_elt?approved_admin=APPROVED&&md=1`).then(res2 => {
                setPendings(group(res2.data))
                console.log(res2.data);

            })
        }

    }

    const approve = (e, id) => {
        const employee_id = localStorage.getItem('employee_id')

        axios.get(`http://68.178.163.174:5012/employees/job_info?employee_id=${employee_id}`).then(res => {
            if (res.data[0].department == 3) {
                axios.put(`http://68.178.163.174:5012/employees/requisition_elt/approve?approved_hr=${true}&&id=${id}`).then(res => {
                    toast('Approved')
                })
            } else if (res.data[0].department == 2 && res.data[0].designation.toLowerCase().includes('project manager')) {
                axios.put(`http://68.178.163.174:5012/employees/requisition_elt/approve?approved_pm=${true}&&id=${id}`).then(res => {
                    toast('Approved')
                })

            } else if (res.data[0].department == 2 && res.data[0].designation.toLowerCase().includes('divisional coordinator')) {
                axios.put(`http://68.178.163.174:5012/employees/requisition_elt/approve?approved_dc=${true}&&id=${id}`).then(res => {
                    toast('Approved')
                })

            } else if (res.data[0].department == 2 && res.data[0].designation.toLowerCase().includes('coordinator')) {
                axios.put(`http://68.178.163.174:5012/employees/requisition_elt/approve?approved_coord=${true}&&id=${id}`).then(res => {
                    toast('Approved')
                })

            }
        })


        pendingData()
    }

    const reject = (e, id) => {
        const employee_id = localStorage.getItem('employee_id')

        axios.get(`http://68.178.163.174:5012/employees/job_info?employee_id=${employee_id}`).then(res => {
            if (res.data[0].department == 3) {
                axios.put(`http://68.178.163.174:5012/employees/requisition_elt/reject?approved_hr=${true}&&id=${id}`).then(res => {
                    toast('Approved')
                })
            } else if (res.data[0].department == 2 && res.data[0].designation.toLowerCase().includes('project manager')) {
                axios.put(`http://68.178.163.174:5012/employees/requisition_elt/reject?approved_pm=${true}&&id=${id}`).then(res => {
                    toast('Approved')
                })

            } else if (res.data[0].department == 2 && res.data[0].designation.toLowerCase().includes('divisional coordinator')) {
                axios.put(`http://68.178.163.174:5012/employees/requisition_elt/reject?approved_dc=${true}&&id=${id}`).then(res => {
                    toast('Approved')
                })

            } else if (res.data[0].department == 2 && res.data[0].designation.toLowerCase().includes('coordinator')) {
                axios.put(`http://68.178.163.174:5012/employees/requisition_elt/reject?approved_coord=${true}&&id=${id}`).then(res => {
                    toast('Approved')
                })

            }
        })
        pendingData()
    }

    const approveAdmin = (e, id) => {
        axios.put(`http://68.178.163.174:5012/employees/requisition_elt/approve?approved_admin=${true}&&id=${id}`).then(res => {
            toast('Approved')
            admintData()
        })

    }

    const approveMd = (e, id) => {
        axios.put(`http://68.178.163.174:5012/employees/requisition_elt/approve?approved_md=${true}&&id=${id}`).then(res => {
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
            pendingData()
        })

    }

    const send_from_store = (e, id) => {
        axios.put(`http://68.178.163.174:5012/employees/requisition_elt/send_from_store?id=${id}`).then(res => {
            toast('Sent')
            axios.get(`http://68.178.163.174:5012/employees/requisition_elt`).then(res2 => {
                setPendings(group(res2.data))

                // console.log(res2.data);

            })
        })
    }


    //decisions

    const getComments = (id) => {
        axios.get(`http://68.178.163.174:5012/employees/decision_elt?requisition_id=${id}`).then(res => {
            setComments(res.data)
        })
    }
    const update_decision = (e, id) => {
        if (comment_id != '') {
            console.log(comment_id);

            axios.put(`http://68.178.163.174:5012/employees/decision_elt/edit?id=${comment_id}`, {
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
            axios.post(`http://68.178.163.174:5012/employees/decision_elt/add`, {
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

    useEffect(() => {
        getData()

        pendingData()


        admintData()

        mddata()

    }, [])


    return (
        <div>

{['9'].includes(localStorage.getItem('role')) && department == 2 ?
                <div>
                    <label className='text-center mt-4'>Pending Requisitions(Elearning Training)</label>
                    <table className='table mt-3'>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Department</th>
                                <th>Item Type</th>
                                <th>Item Details</th>
                                <th>Approved By Coordinator</th>
                                <th>Approved By DC</th>
                                <th>Approved By PM</th>
                                <th>Approved By HR</th>
                                <th>Approved By ED</th>
                                <th>Approved By MD</th>
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
                                        <td>{job_desg == 'coordinator' && item.approved_coord == 'PENDING' ?
                                            <td>
                                                <button onClick={e => approve(e, item.id)} className='btn btn-success mx-2 my-1'>Approve</button>
                                                <button onClick={e => reject(e, item.id)} className='btn btn-danger mx-2'>Reject</button>
                                            </td> :
                                            <td>{item.approved_coord}</td>

                                        }</td>
                                        <td>{job_desg == 'divisional coordinator' && item.approved_dc == 'PENDING' ?
                                            <td>
                                                <button onClick={e => approve(e, item.id)} className='btn btn-success mx-2 my-1'>Approve</button>
                                                <button onClick={e => reject(e, item.id)} className='btn btn-danger mx-2'>Reject</button>
                                            </td> :
                                            <td>{item.approved_dc}</td>

                                        }</td>
                                        <td>{job_desg == 'project manager' && item.approved_pm == 'PENDING' ?
                                            <td>
                                                <button onClick={e => approve(e, item.id)} className='btn btn-success mx-2 my-1'>Approve</button>
                                                <button onClick={e => reject(e, item.id)} className='btn btn-danger mx-2'>Reject</button>
                                            </td> :
                                            <td>{item.approved_pm}</td>

                                        }</td>
                                        {department == 3 && item.approved_hr == 'PENDING' ?
                                            <td>
                                                <button onClick={e => approve(e, item.id)} className='btn btn-success mx-2 my-1'>Approve</button>
                                                <button onClick={e => reject(e, item.id)} className='btn btn-danger mx-2'>Reject</button>
                                            </td> :
                                            <td>{item.approved_hr}</td>

                                        }
                                        <td>{item.approved_admin}</td>
                                        <td>{item.total_price > 5000 || item.estimated_price > 5000 ? item.approved_md : 'Invalid'}</td>

                
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

            {department == 3 ?
                <div>
                    <label className='text-center mt-4'>Pending Requisitions(Elearning Training)</label>
                    <table className='table mt-3'>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Department</th>
                                <th>Item Type</th>
                                <th>Item Details</th>
                                <th>Approved By Coordinator</th>
                                <th>Approved By DC</th>
                                <th>Approved By PM</th>
                                <th>Approved By HR</th>
                                <th>Approved By ED</th>
                                <th>Approved By MD</th>
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
                                        <td>{item.approved_coord}</td>
                                        <td>{item.approved_dc}</td>
                                        <td>{item.approved_pm}</td>
                                        {department == 3 && item.approved_hr == 'PENDING' ?
                                            <td>
                                                <button onClick={e => approve(e, item.id)} className='btn btn-success mx-2 my-1'>Approve</button>
                                                <button onClick={e => reject(e, item.id)} className='btn btn-danger mx-2'>Reject</button>
                                            </td> :
                                            <td>{item.approved_hr}</td>

                                        }
                                        <td>{item.approved_admin}</td>
                                        <td>{item.total_price > 5000 || item.estimated_price > 5000 ? item.approved_md : 'Invalid'}</td>

                                        
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
                    <label className='text-center mt-4'>Requisitions(Elearning Training)</label>
                    <table className='table mt-3'>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Department</th>
                                <th>Item Type</th>
                                <th>Item Details</th>
                                <th>Approved By Coordinator</th>
                                <th>Approved By DC</th>
                                <th>Approved By PM</th>
                                <th>Approved By HR</th>
                                <th>Approved By ED</th>
                                <th>Approved By MD</th>
                                <th>Send from store</th>
                                <th>Received</th>
                                <th>Comments</th>


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
                                        <td>{item.approved_coord}</td>
                                        <td>{item.approved_dc}</td>
                                        <td>{item.approved_pm}</td>
                                        <td>{item.approved_hr}</td>
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
                                        <td>{item.total_price > 5000 || item.estimated_price > 5000 ? item.approved_md : 'Invalid'}</td>

                                        
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
                    <label className='text-center mt-4'>Requisitions(Elearning Training)</label>
                    <table className='table mt-3'>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Department</th>
                                <th>Item Type</th>
                                <th>Item Details</th>
                                <th>Approved By Coordinator</th>
                                <th>Approved By DC</th>
                                <th>Approved By PM</th>
                                <th>Approved By HR</th>
                                <th>Approved By ED</th>
                                <th>Approved By MD</th>
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
                                        <td>{item.approved_coord}</td>
                                        <td>{item.approved_dc}</td>
                                        <td>{item.approved_pm}</td>
                                        <td>{item.approved_hr}</td>
                                        <td>{item.approved_admin}</td>

                                        <td>
                                            {
                                                item.approved_md == 'PENDING' ?
                                                    <div>
                                                        <button onClick={e => approveMd(e, item.id)} className='btn btn-primary m-2'>Approve</button>
                                                        <button onClick={e => rejectMd(e, item.id)} className='btn btn-primary'>Reject</button>
                                                    </div>
                                                    : item.approved_md

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





            {



                // store manager
                localStorage.getItem('role') == '11' &&
                <div>
                    <label className='text-center mt-4'>Requisitions(Elearning Training)</label>
                    <table className='table mt-3'>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Department</th>
                                <th>Item Type</th>
                                <th>Item Details</th>
                                <th>Item Quantity</th>
                                <th>Approved By Coordinator</th>
                                <th>Approved By DC</th>
                                <th>Approved By PM</th>
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
                                        <td>{item.approved_coord}</td>
                                        <td>{item.approved_dc}</td>
                                        <td>{item.approved_pm}</td>
                                        <td>{item.approved_hr}</td>
                                        <td>{item.approved_admin}</td>
                                        <td>{item.total_price > 5000 ? item.approved_md : 'Invalid'}</td>

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

export default ReqElt