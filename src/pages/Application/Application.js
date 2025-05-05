import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'
import Modal from 'react-modal'
import ReqHq from './ReqHq'
import ReqElt from './ReqElt'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import logo from '../../assets/logo.png'
import moment from 'moment'


export const Application = () => {
    const [quantity, setQuantity] = useState('')
    const [item_details, setItem_details] = useState([])
    const [decision_modal, setDecision_modal] = useState(false)
    const [decision_id, setDecision_id] = useState('')
    const [decision_elt_id, setDecision_elt_id] = useState('')
    const [others, setOthers] = useState(false)
    const [detailsOpen, setDetailsOpen] = useState(false)
    const [details, setDetails] = useState([])
    const [requisition_date, setRequisition_date] = useState('')

    const [item_type, setItem_type] = useState('')
    const [department, setDepartment] = useState('')
    const [pendings, setPendings] = useState([])
    const [pendings_elt, setPendings_elt] = useState([])
    const role = localStorage.getItem('role')
    const [positions, setpositions] = useState([])

    const [items, setItems] = useState([])

    const [item, setItem] = useState('')
    const [comments, setComments] = useState([])
    const [comments_elt, setComments_elt] = useState([])

    const [data, setData] = useState([])

    const [adminData, setAdminData] = useState([])
    const [adminData_elt, setAdminData_elt] = useState([])

    const [mdData, setMdData] = useState([])

    const [decision, setDecision] = useState('')
    const [estimated_price, setEstimated_price] = useState('')
    const [comment_id, setComment_id] = useState('')
    const [comment_elt_id, setComment_elt_id] = useState('')

    const [edit_modal, setEdit_modal] = useState(false)

    const [edit_date, setEdit_date] = useState('')
    const [edit_item_type, setEdit_item_type] = useState('')
    const [selectedRequisition, setSelectedRequisition] = useState({})



    const printRef = useRef(null);

    const handleDownloadPdf = async (e) => {
        e.preventDefault()
        const element = printRef.current;
        if (!element) {
            return;
        }

        const canvas = await html2canvas(element, {
            scale: 2,
        });
        const data = canvas.toDataURL("image/png");

        const pdf = new jsPDF({
            orientation: "portrait",
            unit: "px",
            format: "a4",
        });

        const imgProperties = pdf.getImageProperties(data);
        const pdfWidth = pdf.internal.pageSize.getWidth();

        const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;

        pdf.addImage(data, "PNG", 0, 0, pdfWidth, pdfHeight);
        pdf.save("examplepdf.pdf");
    };

    //get item types
    useEffect(() => {
        axios.get('https://server.promisenothi.com/employees/item_types').then(res => {
            setpositions(res.data)
        })
    }, [])

    // get items

    useEffect(() => {
        axios.get(`https://server.promisenothi.com/employees/item_details?item_type_id=${item_type}`)
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
        axios.get(`https://server.promisenothi.com/employees/job_info?employee_id=${employee_id}`).then(res => {
            var requisition_url = res.data[0].department == 2 && ['9', '10'].includes(localStorage.getItem('role')) ? `requisition_elt` : `requisition`

            axios.post(`https://server.promisenothi.com/employees/${requisition_url}/add`, {
                employee_id,
                item_type,
                requisition_date
            }).then(res => {
                items.map(item => {
                    if (item.checked == true) {
                        axios.post(`https://server.promisenothi.com/employees/${requisition_url}/item/add`, {
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

        })

    }




    const group = (data) => {
        let result = Object.values(
            data.reduce((e, item) => {
                let value = item.id;
                let existing = e[value] || { ...item, item_details: [] }
                // console.log(existing);

                return {
                    ...e,
                    [value]: {
                        ...existing,
                        item_details: [...existing.item_details, { 'name': item.item_name, 'quantity': item.item_quantity, 'unit': item.item_unit }]
                    }
                }
            }, {})
        )

        return result
    }


    // get requisitions

    const getData = () => {




        const employee_id = localStorage.getItem('employee_id')

        axios.get(`https://server.promisenothi.com/employees/job_info?employee_id=${employee_id}`).then(res => {
            setDepartment(res.data[0].department)
            var requisition_url = res.data[0].department == 2 && ['9', '10'].includes(localStorage.getItem('role')) ? `requisition_elt` : `requisition`
            console.log(requisition_url);


            axios.get(`https://server.promisenothi.com/employees/${requisition_url}?employee_id=${employee_id}`).then(res => {

                console.log(res.data);

                if (res.data.length > 0) {

                    setData(group(res.data))

                    console.log(group(res.data));


                }
                // console.log(res.data);

            })

        })
    }

    const admintData = () => {
        if (['2', '3', '4', '5', '6'].includes(localStorage.getItem('role'))) {

            axios.get(`https://server.promisenothi.com/employees/requisition?admin=1`).then(res => {
                setAdminData(group(res.data))
                // console.log(res.data);

            })
        }

    }

    const admintData_elt = () => {
        if (['2', '3', '4', '5', '6'].includes(localStorage.getItem('role'))) {

            axios.get(`https://server.promisenothi.com/employees/requisition_elt?admin=1`).then(res => {
                setAdminData_elt(group(res.data))
                // console.log(res.data);

            })
        }

    }

    const mddata = () => {
        if (localStorage.getItem('role') == '1') {
            axios.get(`https://server.promisenothi.com/employees/requisition?md=1`).then(res => {
                setMdData(group(res.data))
                console.log(res.data);

            })
        }

    }




    const pendingData = () => {

        if (['7', '9'].includes(localStorage.getItem('role'))) {
            const employee_id = localStorage.getItem('employee_id')
            axios.get(`https://server.promisenothi.com/employees/job_info?employee_id=${employee_id}`).then(res => {
                setDepartment(res.data[0].department)
                if (res.data[0].department == 3) {
                    axios.get(`https://server.promisenothi.com/employees/requisition?approved_hod=APPROVED`).then(res2 => {
                        setPendings(group(res2.data))
                        console.log(res2.data);

                    })
                } else {
                    axios.get(`https://server.promisenothi.com/employees/requisition?reporting_officer=${employee_id}`).then(res2 => {
                        setPendings(group(res2.data))
                    })
                }

            })

        } else if (['11'].includes(localStorage.getItem('role'))) {
            axios.get(`https://server.promisenothi.com/employees/requisition?approved_admin=APPROVED`).then(res2 => {
                setPendings(group(res2.data))
                console.log(res2.data);

            })
        } else if (['1'].includes(localStorage.getItem('role'))) {
            axios.get(`https://server.promisenothi.com/employees/requisition?approved_admin=APPROVED&&md=1`).then(res2 => {
                setPendings(group(res2.data))
                console.log(res2.data);

            })
        }

    }

    const pendingData_elt = () => {

        if (['7', '9'].includes(localStorage.getItem('role'))) {
            const employee_id = localStorage.getItem('employee_id')
            axios.get(`https://server.promisenothi.com/employees/job_info?employee_id=${employee_id}`).then(res => {
                setDepartment(res.data[0].department)
                if (res.data[0].department == 3) {
                    axios.get(`https://server.promisenothi.com/employees/requisition_elt?approved_pm=APPROVED`).then(res2 => {
                        setPendings_elt(group(res2.data))
                        console.log(res2.data);

                    })
                } else if (res.data[0].department == 2 && res.data[0].designation.toLowerCase().includes('project manager')) {
                    axios.get(`https://server.promisenothi.com/employees/requisition_elt?approved_dc=APPROVED`).then(res2 => {
                        setPendings_elt(group(res2.data))
                        console.log(res2.data);

                    })
                } else if (res.data[0].department == 2 && res.data[0].designation.toLowerCase().includes('divisional head')) {
                    axios.get(`https://server.promisenothi.com/employees/requisition_elt?approved_coord=APPROVED&&division=${res.data[0].division_id}`).then(res2 => {
                        setPendings_elt(group(res2.data))
                        console.log(res2.data);

                    })
                } else if (res.data[0].department == 2 && res.data[0].designation.toLowerCase().includes('coordinator')) {
                    axios.get(`https://server.promisenothi.com/employees/requisition_elt?reporting_officer=${employee_id}&&branch=${res.data[0].branch_id}`).then(res2 => {
                        setPendings_elt(group(res2.data))
                        console.log(res2.data);

                    })
                }
                //  else {
                //     axios.get(`https://server.promisenothi.com/employees/requisition?reporting_officer=${employee_id}`).then(res2 => {
                //         setPendings(group(res2.data))
                //     })
                // }

            })

        } else if (['11'].includes(localStorage.getItem('role'))) {
            axios.get(`https://server.promisenothi.com/employees/requisition_elt?approved_admin=APPROVED`).then(res2 => {
                setPendings_elt(group(res2.data))
                console.log(res2.data);

            })
        } else if (['1'].includes(localStorage.getItem('role'))) {
            axios.get(`https://server.promisenothi.com/employees/requisition_elt?approved_admin=APPROVED&&md=1`).then(res2 => {
                setPendings_elt(group(res2.data))
                console.log(res2.data);

            })
        }

    }


    //approval and rejections
    const approve = (e, id) => {
        if (department == 3) {
            axios.put(`https://server.promisenothi.com/employees/requisition/approve?approved_hr=${true}&&id=${id}`).then(res => {
                toast('Approved')
            })
        } else {
            axios.put(`https://server.promisenothi.com/employees/requisition/approve?approved_hod=${true}&&id=${id}`).then(res => {
                toast('Approved')
            })

        }

        pendingData()
    }

    const reject = (e, id) => {
        if (department == 3) {
            axios.put(`https://server.promisenothi.com/employees/requisition/reject?approved_hr=${true}&&id=${id}`).then(res => {
                toast('Rejected')
            })
        } else {
            axios.put(`https://server.promisenothi.com/employees/requisition/reject?approved_hod=${true}&&id=${id}`).then(res => {
                toast('Rejected')
            })
        }
        pendingData()
    }



    useEffect(() => {
        getData()

        pendingData()
        pendingData_elt()

        admintData_elt()

        admintData()

        mddata()

    }, [])

    const approveAdmin = (e, id) => {
        axios.put(`https://server.promisenothi.com/employees/requisition/approve?approved_admin=${true}&&id=${id}`).then(res => {
            toast('Approved')
            admintData()
        })

    }

    const approveMd = (e, id) => {
        axios.put(`https://server.promisenothi.com/employees/requisition/approve?approved_md=${true}&&id=${id}`).then(res => {
            toast('Approved')
            pendingData()
        })

    }

    const rejectAdmin = (e, id) => {
        axios.put(`https://server.promisenothi.com/employees/requisition/reject?approved_admin=${true}&&id=${id}`).then(res => {
            toast('Rejected')
            admintData()
        })

    }

    const rejectMd = (e, id) => {
        axios.put(`https://server.promisenothi.com/employees/requisition/reject?approved_md=${true}&&id=${id}`).then(res => {
            toast('Rejected')
            pendingData()
        })

    }

    const send_from_store = (e, id) => {
        axios.put(`https://server.promisenothi.com/employees/requisition/send_from_store?id=${id}`).then(res => {
            toast('Sent')
            axios.get(`https://server.promisenothi.com/employees/requisition`).then(res2 => {
                setPendings(group(res2.data))

                // console.log(res2.data);

            })
        })
    }


    //decisions

    const getComments = (id) => {
        axios.get(`https://server.promisenothi.com/employees/decision?requisition_id=${id}`).then(res => {
            setComments(res.data)
        })
    }
    const update_decision = (e, id) => {
        if (comment_id != '') {
            console.log(comment_id);

            axios.put(`https://server.promisenothi.com/employees/decision/edit?id=${comment_id}`, {
                comment: decision,
                commentor_id: localStorage.getItem('employee_id'),
                requisition_id: id,
                estimated_price
            }).then(res => {
                toast('Decision Submitted')
                // axios.get(`https://server.promisenothi.com/employees/requisition`).then(res2 => {
                //     setPendings(res2.data)
                //     admintData()
                //     setDecision_modal(false)
                //     // console.log(res2.data);

                // })

                getComments(id)
            })
        } else {
            axios.post(`https://server.promisenothi.com/employees/decision/add`, {
                comment: decision,
                commentor_id: localStorage.getItem('employee_id'),
                requisition_id: id,
                estimated_price
            }).then(res => {
                toast('Decision Submitted')
                // axios.get(`https://server.promisenothi.com/employees/requisition`).then(res2 => {
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
        var received_url = department == 2 && ['9', '10'].includes(localStorage.getItem('role')) ? `received_elt` : `received`
        axios.put(`https://server.promisenothi.com/employees/${received_url}?id=${id}&&received=1`).then(res => {
            toast('Received')
            getData()
        })
    }

    const deleteData = (e, id) => {
        e.preventDefault()

        if (window.confirm('Do you want to delete this?')) {
            axios.delete(`https://server.promisenothi.com/employees/requisition/delete?id=${id}`).then(res => {
                toast('Deleted')
                getData()
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
                                <h1 className="m-2 display-5 fw-bold text-success2"><span className="text-success2">Application/</span>Requisition</h1>
                            </a>
                        </div>
                    </div>

                </div>
            </div>


            {/* Add Requisition */}
            {localStorage.getItem('role') != '11' && <div>
                <label> Start Date:</label>
                <input value={requisition_date} style={{ width: 300 }} onChange={e => setRequisition_date(e.target.value)} className='input' type='date' />

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

                <button onClick={addData} className='button'>Submit</button>
            </div>}

            <div className='my-5'>
                <ReqHq getData={getData} group={group} />
            </div>

            <div>
                <ReqElt getData={getData} group={group} />
            </div>


            {localStorage.getItem('role') != '11' && department != 2 &&
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
                                <th>Edit/Delete</th>
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
                                                setSelectedRequisition(item)
                                            }} className='btn btn-warning'>Details</button>
                                        </td>
                                        <td>{item.approved_hod}</td>
                                        <td>{item.approved_hr}</td>
                                        <td>{item.approved_admin}</td>
                                        <td>{item.estimated_price > 15000 ? item.approved_md : 'Invalid'}</td>
                                        <td>{item.received != 'PENDING' ? item.received : <button className='btn btn-success' onClick={e => received(e, item.id)} >
                                            Received
                                        </button>}</td>
                                        <td>
                                            <button className='btn btn-warning m-2' onClick={e => deleteData(e, item.id)}>Edit</button>
                                            <button className='btn btn-danger' onClick={e => deleteData(e, item.id)}>Delete</button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table> </div>}

            {localStorage.getItem('role') != '11' && department == 2 &&
                <div>
                    <label className='text-center mt-4'>Your Requisitions</label>

                    <table className='table mt-3'>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Department</th>
                                <th>Item Type</th>
                                <th>Item Details</th>
                                {/* <th>Approved By Coordinator</th> */}
                                <th>Approved By DH</th>
                                <th>Approved By ADC</th>
                                {/* <th>Approved By PM</th> */}
                                <th>Approved By AGM</th>
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
                                                setSelectedRequisition(item)
                                            }} className='btn btn-warning'>Details</button>
                                        </td>
                                        <td>{item.approved_dc}</td>
                                        <td>{item.approved_adh}</td>
                                        <td>{item.approved_agm}</td>
                                        <td>{item.approved_admin}</td>
                                        <td>{item.estimated_price > 15000 ? item.approved_md : 'Invalid'}</td>
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
                    <label className='text-center mt-4'>Your Requisitions</label>

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
                                        <td><button onClick={e => {
                                            setDetails(item.item_details)
                                            setSelectedRequisition(item)
                                            setDetailsOpen(true)
                                        }} className='btn btn-warning'>Details</button></td>
                                        <td>{item.approved_coord}</td>
                                        <td>{item.approved_dc}</td>
                                        <td>{item.approved_pm}</td>
                                        <td>{item.approved_hr}</td>
                                        <td>{item.approved_admin}</td>
                                        <td>{item.approved_md}</td>

                                        <td>
                                            {
                                                item.sent_from_store != 'SENT' ? <button onClick={e => send_from_store(e, item.id)} className='btn btn-primary'>Send</button> : item.sent_from_store

                                            }
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table> </div>}

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

                <div className='m-2'>
                    <span className='fw-bold'>PDF Download:</span> <button onClick={e => {
                        handleDownloadPdf(e)
                    }} className='btn btn-secondary text-center m-2'>Click Here</button>
                </div>

                {/* PDF Print DIV */}
                <div >
                    <div className="col-6">

                    </div>
                    {/* <table className='table m-5'>
                    <thead>
                        <th>Item Name</th>
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
                </table> */}

                    <div className="container mt-4">
                        <div className="row">
                            <div className="col-lg-9 offset-md-2">
                                <div ref={printRef} className="card shadow">
                                    <header className="bg-white align-items-center justify-content-between">
                                        <div className='bg-blue p-2'>

                                        </div>
                                        <div className="d-flex align-items-center">
                                            <img
                                                src={logo}

                                                alt="E-Learning & Earning Ltd."
                                                height={121}
                                                width={132}
                                                className="p-3"
                                            />
                                            {/* <div>
            <h5 className="mb-0 fw-bold text-success">E-Learning & Earning Ltd.</h5>
            <small className="text-muted">Excellence in Learning</small>
          </div> */}
                                        </div>
                                    </header>
                                    <div className="d-flex row mb-4 mx-4 justify-content-between">
                                        <div className="col-6">
                                            <h6 className="text-uppercase fw-bold">Requisitions</h6>
                                            <p style={{ fontSize: '12px' }} className="text-muted p-0 m-0">REQ ID #{selectedRequisition.id}</p>
                                            <p style={{ fontSize: '12px' }} className="text-muted p-0 m-0">Name: {selectedRequisition.user_name}</p>
                                            <p style={{ fontSize: '12px' }} className="text-muted p-0 m-0">Department: {selectedRequisition.department_name}</p>
                                            <p style={{ fontSize: '12px' }} className="text-muted p-0 m-0">Designation: {selectedRequisition.designation}</p>
                                            <p style={{ fontSize: '12px' }} className="text-muted p-0 m-0">Branch: {selectedRequisition.branch_name}</p>

                                        </div>
                                        <div className="col-3">
                                            <p style={{ fontSize: '12px' }} className="text-muted">Date: {moment(selectedRequisition.requisition_date).format('DD/MM/yyyy')}</p>

                                        </div>
                                        {/* <div className="col-6 text-end">
                <h6 className="fw-bold">{invoiceData.companyName}</h6>
                <p className="text-muted mb-1">{invoiceData.companyAddress}</p>
                <p className="text-muted">{invoiceData.companyCityStateZip}</p>
              </div> */}
                                    </div>


                                    <div className="table-responsive mx-4 mb-4">
                                        <table style={{ border: '1px solid black' }} className="table">
                                            <thead>
                                                <tr>
                                                    <th style={{ border: '1px solid black', fontSize: '12px' }} className="fw-bold text-end">Description</th>
                                                    <th style={{ border: '1px solid black', fontSize: '12px' }} className="fw-bold text-end">Quantity</th>
                                                    <th style={{ border: '1px solid black', fontSize: '12px' }} className="fw-bold text-end">Unit</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {details.map(item => (
                                                    <tr>
                                                        <td style={{ border: '1px solid black', fontSize: '12px' }} className='text-end'>{item.name}</td>
                                                        <td style={{ border: '1px solid black', fontSize: '12px' }} className='text-end'>{item.quantity}</td>
                                                        <td style={{ border: '1px solid black', fontSize: '12px' }} className='text-end'>{item.unit}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>

                                    {department == 2 ? <div style={{ width: '92%' }} className="  table-responsive mx-auto mb-5 pb-5">
                                        <table className="table table-bordered">
                                            <thead>
                                                <tr>
                                                    <th style={{ border: '1px solid black', fontSize: '12px' }} className="fw-bold text-end p-2 m-0">Approved By DH</th>
                                                    <th style={{ border: '1px solid black', fontSize: '12px' }} className="fw-bold text-end p-2 m-0">Approved By ADC</th>
                                                    <th style={{ border: '1px solid black', fontSize: '12px' }} className="fw-bold text-end p-2 m-0">Approved By AGM</th>
                                                    <th style={{ border: '1px solid black', fontSize: '12px' }} className="fw-bold text-end p-2 m-0">Approved By ED</th>
                                                    <th style={{ border: '1px solid black', fontSize: '12px' }} className="fw-bold text-end p-2 m-0">Approved By MD</th>
                                                </tr>
                                            </thead>
                                            <tbody>

                                                <tr >
                                                    <td className='text-end p-2 m-0' style={{ fontSize: '12px', border: '1px solid black' }}>{selectedRequisition.approved_dc}</td>
                                                    <td className='text-end p-2 m-0' style={{ fontSize: '12px', border: '1px solid black' }}>{selectedRequisition.approved_adh}</td>
                                                    <td className='text-end p-2 m-0' style={{ fontSize: '12px', border: '1px solid black' }}>{selectedRequisition.approved_agm}</td>
                                                    <td className='text-end p-2 m-0' style={{ fontSize: '12px', border: '1px solid black' }}>{selectedRequisition.approved_admin}</td>
                                                    <td className='text-end p-2 m-0' style={{ fontSize: '12px', border: '1px solid black' }}>{selectedRequisition.total_price > 5000 ? selectedRequisition.approved_md : 'Invalid'}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div> : <div style={{ width: '92%' }} className="  table-responsive mx-auto mb-5 pb-5">
                                        <table className="table table-bordered">
                                            <thead>
                                                <tr>
                                                    <th style={{ border: '1px solid black', fontSize: '12px' }} className="fw-bold text-end p-2 m-0">Approved By HOD</th>
                                                    <th style={{ border: '1px solid black', fontSize: '12px' }} className="fw-bold text-end p-2 m-0">Approved By Admin</th>
                                                    <th style={{ border: '1px solid black', fontSize: '12px' }} className="fw-bold text-end p-2 m-0">Approved By ED</th>
                                                    <th style={{ border: '1px solid black', fontSize: '12px' }} className="fw-bold text-end p-2 m-0">Approved By MD</th>
                                                </tr>
                                            </thead>
                                            <tbody>

                                                <tr >
                                                    <td className='text-end p-2 m-0' style={{ fontSize: '12px', border: '1px solid black' }}>{selectedRequisition.approved_hod}</td>
                                                    <td className='text-end p-2 m-0' style={{ fontSize: '12px', border: '1px solid black' }}>{selectedRequisition.approved_hr}</td>
                                                    <td className='text-end p-2 m-0' style={{ fontSize: '12px', border: '1px solid black' }}>{selectedRequisition.approved_admin}</td>
                                                    <td className='text-end p-2 m-0' style={{ fontSize: '12px', border: '1px solid black' }}>{selectedRequisition.total_price > 5000 ? selectedRequisition.approved_md : 'Invalid'}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>}

                                    <div className="my-5 "></div>

                                    <div className='mx-3 d-flex justify-content-between'>

                                        <div className='text-center'>
                                            <hr style={{ width: '100px' }} />
                                            <p className='fw-bold'>AGM</p>
                                        </div>

                                        <div className='text-center'>
                                            <hr style={{ width: '100px' }} />
                                            <p className='fw-bold'>CEO</p>
                                        </div>


                                        <div className='text-center'>
                                            <hr style={{ width: '100px' }} />
                                            <p className='fw-bold'>ED</p>
                                        </div>

                                        <div className='text-center'>
                                            <hr style={{ width: '100px' }} />
                                            <p className='fw-bold'>MD</p>
                                        </div>


                                    </div>

                                    <p style={{ fontSize: '12px' }} className="mt-4 mb-0 pb-0 mx-3">
                                        <strong>Head Office :</strong> Khaja IT Park, 2nd to 7th Floor, Mirpur Road, Dhaka-1207.
                                    </p>
                                    <p style={{ fontSize: '12px' }} className="mt-0 mb-1 pt-0 mx-3">
                                        <strong>Phone:</strong> 02-8091188, +88 01550 666 800 |
                                        <strong> Email:</strong> info@e-laeltd.com
                                    </p>


                                    <div className="bg-success text-white text-center pb-0">
                                        <div className="container">

                                            <p className='my-0'>
                                                <a style={{ fontSize: '12px' }} className="text-white" href="https://www.facebook.com/elaeltd">https://www.facebook.com/elaeltd</a>
                                                <span> | </span>
                                                <a style={{ fontSize: '12px' }} className="text-white" href="https://www.promisenothi.com">https://www.promisenothi.com</a>
                                            </p>
                                        </div>
                                    </div>
                                    <p style={{ fontSize: '12px' }} className='bg-blue text-white text-center'>
                                        All rights reserved by @ Promise E-nothi

                                    </p>
                                </div>


                            </div>
                        </div>
                    </div>
                </div>
            </Modal>

        </div>

    )
}
