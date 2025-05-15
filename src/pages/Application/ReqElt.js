import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import Modal from 'react-modal'
import { toast } from 'react-toastify'
import Approval from '../../Components/Approval'
import moment from 'moment'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import logo from '../../assets/logo.png'
import TableFooter from '../../Components/TableFooter'
import paginate from '../../utils/pagination'


const ReqElt = ({ getData, group }) => {
    const role = localStorage.getItem('role')
    const [pendings, setPendings] = useState([])
    const [decision_id, setDecision_id] = useState('')
    const [department, setDepartment] = useState('')
    const [comments, setComments] = useState([])
    const [selectedRequisition, setSelectedRequisition] = useState({})
    const [job_desg, setJob_desg] = useState('')
    const [job_branch, setJob_branch] = useState('')

    const [divisions, setdivisions] = useState([])

    const [branches, setBranches] = useState([])

    const [division, setDivisoin] = useState('')
    const [branch, setBranch] = useState('')


    const [adminData, setAdminData] = useState([])
    const [mdData, setMdData] = useState([])

    const [decision, setDecision] = useState('')
    const [decision_modal, setDecision_modal] = useState(false)
    const [estimated_price, setEstimated_price] = useState('')
    const [comment_id, setComment_id] = useState('')
    const [detailsOpen, setDetailsOpen] = useState(false)
    const [details, setDetails] = useState([])
    const printRef = useRef(null);

    const [page, setPage] = useState(1);
    const [slice, setSlice] = useState([])
    const [range, setRange] = useState([])
    const [brochures, setBrochures] = useState([])

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

        var width = pdf.internal.pageSize.getWidth();
        var height = pdf.internal.pageSize.getHeight();

        const imgProperties = pdf.getImageProperties(data);
        const pdfWidth = pdf.internal.pageSize.getWidth();

        const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;

        pdf.addImage(data, "PNG", 0, 0, pdfWidth, height);
        pdf.save("examplepdf.pdf");
    };



    const admintData = () => {
        if (['3', '4', '5', '6'].includes(localStorage.getItem('role'))) {

            axios.get(`https://server.promisenothi.com/employees/requisition_elt?admin=1`).then(res => {
                setAdminData(group(res.data))
                // console.log(res.data);
                const { slice, range } = paginate(group(res.data), page, 10)
                setSlice(slice)
                setRange(range)

            })
        } else if (['2'].includes(localStorage.getItem('role'))) {
            axios.get(`https://server.promisenothi.com/employees/requisition?approved_agm=1`).then(res => {
                setAdminData(group(res.data))
                console.log(group(res.data))
                const { slice, range } = paginate(group(res.data), page, 10)
                setSlice(slice)
                setRange(range)
                // console.log(res.data);       

            })
        }

    }

    const filterData = (division_id, branch_id) => {
        if (['2', '3', '4', '5', '6'].includes(localStorage.getItem('role'))) {

            axios.get(`https://server.promisenothi.com/employees/requisition_elt?admin=1&&division=${division_id}&&branch=${branch_id}`).then(res => {
                setAdminData(group(res.data))
                const { slice, range } = paginate(group(res.data), page, 10)
                setSlice(slice)
                setRange(range)
                // console.log(res.data);

            })
        } else if (localStorage.getItem('role') == '1') {
            axios.get(`https://server.promisenothi.com/employees/requisition_elt?approved_admin=APPROVED&&md=1&&division=${division_id}&&branch=${branch_id}`).then(res => {
                setMdData(group(res.data))
                console.log(res.data);

            })
        } else {

        }
    }

    const mddata = () => {
        if (localStorage.getItem('role') == '1') {
            axios.get(`https://server.promisenothi.com/employees/requisition_elt?md=1`).then(res => {
                setMdData(group(res.data))
                console.log(res.data);

            })
        }

    }
    const getBrochures = (requisition_id) => {
        const employee_id = localStorage.getItem('employee_id')
        axios.get(`https://server.promisenothi.com/employees/job_info?employee_id=${employee_id}`).then(res => {
            var requisition_url = res.data[0].department == 2 && ['9', '10'].includes(localStorage.getItem('role')) ? `requisition_elt` : `requisition`
            axios.get(`https://server.promisenothi.com/employees/${requisition_url}/brochures?requisition_id=${requisition_id}`).then(res => {
                setBrochures(res.data)
                console.log(res.data);

            })
        })
    }



    const pendingData = () => {


        if (['6', '7', '9', '15'].includes(localStorage.getItem('role'))) {

            const employee_id = localStorage.getItem('employee_id')
            axios.get(`https://server.promisenothi.com/employees/job_info?employee_id=${employee_id}`).then(res => {
                setDepartment(res.data[0].department)
                setJob_desg(res.data[0].designation.toLowerCase())
                setJob_branch(res.data[0].branch_id)
                console.log(res.data[0].division_id);
                // if (res.data[0].department == 3 || res.data[0].department == 14 || localStorage.getItem('role') == '6') {
                //     axios.get(`https://server.promisenothi.com/employees/requisition_elt?approved_adh=APPROVED`).then(res2 => {
                //         setPendings(group(res2.data))
                //         console.log(res2.data);

                //     })
                // }  
                if (res.data[0].department == 2 && res.data[0].designation.toLowerCase() == 'assistant divisional head') {
                    axios.get(`https://server.promisenothi.com/employees/requisition_elt?approved_dc=APPROVED&&division=${res.data[0].division_id}`).then(res2 => {
                        setPendings(group(res2.data))
                        console.log(res2.data);

                    })
                } else if (res.data[0].department == 2 && res.data[0].designation.toLowerCase() == 'divisional head') {

                    axios.get(`https://server.promisenothi.com/employees/requisition_elt?division=${res.data[0].division_id}&&branch_id=${res.data[0].branch_id}&&reporting_officer_id=${employee_id}`).then(res2 => {
                        setPendings(group(res2.data))
                        console.log(res2.data);

                    })
                }
                // else if (res.data[0].department == 2 && res.data[0].designation.toLowerCase().includes('coordinator')) {


                //     axios.get(`https://server.promisenothi.com/employees/requisition_elt?reporting_officer=${employee_id}&&branch=${res.data[0].branch_id}`).then(res2 => {
                //         setPendings(group(res2.data))
                //         console.log(res2.data);

                //     })
                // }
                //  else {
                //     axios.get(`https://server.promisenothi.com/employees/requisition?reporting_officer=${employee_id}`).then(res2 => {
                //         setPendings(group(res2.data))
                //     })
                // }

            })

        } else if (['11'].includes(localStorage.getItem('role'))) {
            axios.get(`https://server.promisenothi.com/employees/requisition_elt?approved_admin=APPROVED`).then(res2 => {
                setPendings(group(res2.data))
                console.log(res2.data);

            })
        } else if (['1'].includes(localStorage.getItem('role'))) {
            axios.get(`https://server.promisenothi.com/employees/requisition_elt?approved_admin=APPROVED&&md=1`).then(res2 => {
                setPendings(group(res2.data))
                console.log(res2.data);

            })
        }

    }

    const approve = (e, id) => {
        const employee_id = localStorage.getItem('employee_id')

        axios.get(`https://server.promisenothi.com/employees/job_info?employee_id=${employee_id}`).then(res => {
            console.log(res.data[0].department == 2 && res.data[0].designation.toLowerCase() == 'assistant divisional head');

            if (res.data[0].department == 3 || res.data[0].department == 14) {
                axios.put(`https://server.promisenothi.com/employees/requisition_elt/approve?approved_hr=${true}&&id=${id}`).then(res => {
                    toast('Approved')
                })
            } else if (res.data[0].department == 2 && res.data[0].designation.toLowerCase().includes('project manager')) {
                axios.put(`https://server.promisenothi.com/employees/requisition_elt/approve?approved_pm=${true}&&id=${id}`).then(res => {
                    toast('Approved')
                })

            } else if (res.data[0].department == 2 && res.data[0].designation.toLowerCase() == 'divisional head') {
                axios.put(`https://server.promisenothi.com/employees/requisition_elt/approve?approved_dc=${true}&&id=${id}`).then(res => {
                    toast('Approved')
                })

            } else if (res.data[0].department == 2 && res.data[0].designation.toLowerCase().includes('coordinator')) {
                axios.put(`https://server.promisenothi.com/employees/requisition_elt/approve?approved_coord=${true}&&id=${id}`).then(res => {
                    toast('Approved')
                })

            } else if (res.data[0].department == 2 && res.data[0].designation.toLowerCase() == 'assistant divisional head') {


                axios.put(`https://server.promisenothi.com/employees/requisition_elt/approve?approved_adh=${true}&&id=${id}`).then(res => {
                    toast('Approved')
                })


            } else if (res.data[0].designation.toLowerCase().includes('assistant general manager')) {

                axios.put(`https://server.promisenothi.com/employees/requisition_elt/approve?approved_agm=${true}&&id=${id}`).then(res => {
                    toast('Approved')
                })

            }
            pendingData()
            admintData()

        })

    }

    const reject = (e, id) => {
        const employee_id = localStorage.getItem('employee_id')

        axios.get(`https://server.promisenothi.com/employees/job_info?employee_id=${employee_id}`).then(res => {

            if (res.data[0].department == 3 || res.data[0].department == 14) {
                axios.put(`https://server.promisenothi.com/employees/requisition_elt/reject?approved_hr=${true}&&id=${id}`).then(res => {
                    toast('Rejected')
                })
            } else if (res.data[0].department == 2 && res.data[0].designation.toLowerCase().includes('project manager')) {
                axios.put(`https://server.promisenothi.com/employees/requisition_elt/reject?approved_pm=${true}&&id=${id}`).then(res => {
                    toast('Rejected')
                })

            } else if (res.data[0].department == 2 && res.data[0].designation.toLowerCase() == 'divisional head') {
                axios.put(`https://server.promisenothi.com/employees/requisition_elt/reject?approved_dc=${true}&&id=${id}`).then(res => {
                    toast('Rejected')
                })

            } else if (res.data[0].department == 2 && res.data[0].designation.toLowerCase().includes('coordinator')) {
                axios.put(`https://server.promisenothi.com/employees/requisition_elt/reject?approved_coord=${true}&&id=${id}`).then(res => {
                    toast('Rejected')
                })

            } else if (res.data[0].department == 2 && res.data[0].designation.toLowerCase() == 'assistant divisional head') {
                axios.put(`https://server.promisenothi.com/employees/requisition_elt/reject?approved_adh=${true}&&id=${id}`).then(res => {
                    toast('Rejected')
                })

            } else if (res.data[0].designation.toLowerCase().includes('assistant general manager')) {
                axios.put(`https://server.promisenothi.com/employees/requisition_elt/reject?approved_agm=${true}&&id=${id}`).then(res => {
                    toast('Rejected')
                })

            }
        })
        pendingData()
        admintData()
    }

    const approveAdmin = (e, id) => {
        axios.put(`https://server.promisenothi.com/employees/requisition_elt/approve?approved_admin=${true}&&id=${id}`).then(res => {
            toast('Approved')
            admintData()
        })

    }

    const approveMd = (e, id) => {
        axios.put(`https://server.promisenothi.com/employees/requisition_elt/approve?approved_md=${true}&&id=${id}`).then(res => {
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
        axios.put(`https://server.promisenothi.com/employees/requisition_elt/send_from_store?id=${id}`).then(res => {
            toast('Sent')
            axios.get(`https://server.promisenothi.com/employees/requisition_elt`).then(res2 => {
                setPendings(group(res2.data))

                // console.log(res2.data);

            })
        })
    }


    //decisions

    const getComments = (id) => {
        axios.get(`https://server.promisenothi.com/employees/decision_elt?requisition_id=${id}`).then(res => {
            setComments(res.data)
        })
    }
    const update_decision = (e, id) => {
        if (comment_id != '') {
            console.log(comment_id);

            axios.put(`https://server.promisenothi.com/employees/decision_elt/edit?id=${comment_id}`, {
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
            axios.post(`https://server.promisenothi.com/employees/decision_elt/add`, {
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
        axios.put(`https://server.promisenothi.com/employees/received?id=${id}&&received=1`).then(res => {
            toast('Received')
            getData()
        })
    }

    const getBranches = (division_id) => {
        axios.get(`https://server.promisenothi.com/employees/branches?division_id=${division_id}`).then(res => {
            setBranches(res.data)
        })
    }


    useEffect(() => {


        axios.get('https://server.promisenothi.com/employees/divisions').then(res => {
            setdivisions(res.data)
        })


    }, [])

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
                                <th>Branch</th>
                                <th>Item Type</th>
                                <th>Item Details</th>
                                <th>Approved By DH</th>
                                <th>Approved By ADC</th>
                                <th>Approved By AGM</th>
                                <th>Approved By ED</th>
                                <th>Approved By MD</th>
                                <th>Send from Accounts</th>
                                <th>Received</th>
                                {['7', '6', '15'].includes(localStorage.getItem('role')) && <th>Comments</th>}

                            </tr>
                        </thead>
                        <tbody>
                            {
                                pendings.map(item => (
                                    <tr>
                                        <td>{item.user_name}</td>
                                        <td>{item.branch_name}</td>
                                        <td>{item.item_type_name}</td>
                                        <td><button onClick={e => {
                                            setDetails(item.item_details)
                                            setSelectedRequisition(item)
                                            setDetailsOpen(true)
                                            getBrochures(item.id)
                                        }} className='btn btn-warning'>Details</button></td>

                                        <td>{job_desg == 'divisional head' && item.approved_dc == 'PENDING' ?
                                            <td>
                                                <button onClick={e => approve(e, item.id)} className='btn btn-success mx-2 my-1'>Approve</button>
                                                <button onClick={e => reject(e, item.id)} className='btn btn-danger mx-2'>Reject</button>
                                            </td> :
                                            <td>{item.approved_dc}</td>

                                        }</td>
                                        <td>{job_desg == 'assistant divisional head' && item.approved_adh == 'PENDING' ?
                                            <td>
                                                <button onClick={e => approve(e, item.id)} className='btn btn-success mx-2 my-1'>Approve</button>
                                                <button onClick={e => reject(e, item.id)} className='btn btn-danger mx-2'>Reject</button>
                                            </td> :
                                            <td>{item.approved_adh}</td>

                                        }</td>
                                        {['6'].includes(localStorage.getItem('role')) && item.approved_agm == 'PENDING' ?
                                            <td>
                                                <button onClick={e => approve(e, item.id)} className='btn btn-success mx-2 my-1'>Approve</button>
                                                <button onClick={e => reject(e, item.id)} className='btn btn-danger mx-2'>Reject</button>
                                            </td> :
                                            <td>{item.approved_agm}</td>

                                        }
                                        <td><Approval approved={item.approved_admin} /></td>
                                        <td>{item.total_price > 5000 || item.estimated_price > 5000 ? <Approval approved={item.approved_md} /> : 'Invalid'}</td>


                                        <td><Approval approved={item.sent_from_store} /></td>
                                        <td><Approval approved={item.received} /></td>
                                        {['7', '6', '15'].includes(localStorage.getItem('role')) && <td>
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

                    <div className='d-flex  w-100 justify-content-center align-items-end'>




                        <div className='d-flex w-25 flex-column mx-2'>

                            <label>Division</label>

                            <select value={division} onChange={e => {

                                setDivisoin(e.target.value)
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




                        <div className='d-flex w-25 flex-column mx-2'>
                            <label>Branch</label>

                            <select value={branch} onChange={e => {

                                setBranch(e.target.value)

                            }} className='select' >
                                <option value={''}>Select</option>
                                {
                                    branches.map(item => (
                                        <option value={item.id}>{item.name}</option>
                                    ))
                                }
                            </select>
                        </div>



                        <button onClick={e => filterData(division, branch)} className='btn btn-primary my-3'>Submit</button>
                    </div>

                    <table className='table mt-3'>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Branch</th>
                                <th>Item Type</th>
                                <th>Item Details</th>
                                <th>Approved By DH</th>
                                <th>Approved By ADC</th>
                                <th>Approved By AGM</th>
                                <th>Approved By ED</th>
                                <th>Approved By MD</th>
                                <th>Send from Accounts</th>
                                <th>Received</th>
                                <th>Comments</th>

                            </tr>
                        </thead>
                        <tbody>
                            {
                                slice.map(item => (
                                    <tr>
                                        <td>{item.user_name}</td>
                                        <td>{item.branch_name}</td>
                                        <td>{item.item_type_name}</td>
                                        <td><button onClick={e => {
                                            setDetails(item.item_details)
                                            setSelectedRequisition(item)
                                            setDetailsOpen(true)
                                            getBrochures(item.id)
                                        }} className='btn btn-warning'>Details</button></td>
                                        <td><Approval approved={item.approved_dc} /></td>
                                        <td><Approval approved={item.approved_adh} /></td>
                                        {['6'].includes(localStorage.getItem('role')) && item.approved_agm == 'PENDING' ?
                                            <td>
                                                <button onClick={e => approve(e, item.id)} className='btn btn-success mx-2 my-1'>Approve</button>
                                                <button onClick={e => reject(e, item.id)} className='btn btn-danger mx-2'>Reject</button>
                                            </td> :
                                            <td><Approval approved={item.approved_agm} /></td>

                                        }
                                        <td>
                                            {
                                                item.approved_admin == 'PENDING' && ['2'].includes(localStorage.getItem('role')) ?
                                                    <div>
                                                        <button onClick={e => approveAdmin(e, item.id)} className='btn btn-primary m-2'>Approve</button>
                                                        <button onClick={e => rejectAdmin(e, item.id)} className='btn btn-primary'>Reject</button>
                                                    </div>
                                                    : <Approval approved={item.approved_admin} />

                                            }
                                        </td>
                                        <td>{item.total_price > 5000 || item.estimated_price > 5000 ? <Approval approved={item.approved_md} /> : 'Invalid'}</td>


                                        <td><Approval approved={item.sent_from_store} /></td>
                                        <td><Approval approved={item.received} /></td>
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
                    </table>
                    <TableFooter range={range} slice={slice} setSlice={setSlice} data={adminData} setPage={setPage} page={page} pageNumber={10} />
                </div>
            }

            {
                localStorage.getItem('role') == '1' &&
                <div>
                    <label className='text-center mt-4'>Requisitions(Elearning Training)</label>
                    <table className='table mt-3'>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Branch</th>
                                <th>Item Type</th>
                                <th>Item Details</th>
                                <th>Approved By DC</th>
                                <th>Approved By ADC</th>
                                <th>Approved By AGM</th>
                                <th>Approved By ED</th>
                                <th>Approved By MD</th>
                                <th>Send from Accounts</th>
                                <th>Received</th>
                                <th>Comments</th>

                            </tr>
                        </thead>
                        <tbody>
                            {
                                pendings.map(item => (
                                    <tr>
                                        <td>{item.user_name}</td>
                                        <td>{item.branch_name}</td>
                                        <td>{item.item_type_name}</td>
                                        <td>
                                            <button onClick={e => {
                                                setDetails(item.item_details)
                                                setSelectedRequisition(item)
                                                setDetailsOpen(true)
                                                getBrochures(item.id)
                                            }} className='btn btn-warning'>Details</button>
                                        </td>
                                        <td><Approval approved={item.approved_dc} /></td>
                                        <td><Approval approved={item.approved_adh} /></td>
                                        <td><Approval approved={item.approved_agm} /></td>
                                        <td><Approval approved={item.approved_admin} /></td>

                                        <td>
                                            {
                                                item.approved_md == 'PENDING' ?
                                                    <div>
                                                        <button onClick={e => approveMd(e, item.id)} className='btn btn-primary m-2'>Approve</button>
                                                        <button onClick={e => rejectMd(e, item.id)} className='btn btn-primary'>Reject</button>
                                                    </div>
                                                    : <Approval approved={item.approved_md} />

                                            }
                                        </td>
                                        <td><Approval approved={item.sent_from_store} /></td>
                                        <td><Approval approved={item.received} /></td>
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
                                <th>Branch</th>
                                <th>Item Type</th>
                                <th>Item Details</th>
                                <th>Item Quantity</th>
                                <th>Approved By DH</th>
                                <th>Approved By ADC</th>
                                <th>Approved By AGM</th>
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
                                        <td>{item.branch_name}</td>
                                        <td>{item.item_type_name}</td>
                                        <td>
                                            <button onClick={e => {
                                                setDetails(item.item_details)
                                                setSelectedRequisition(item)
                                                setDetailsOpen(true)
                                                getBrochures(item.id)
                                            }} className='btn btn-warning'>Details</button>
                                        </td>
                                        <td>{item.quantity}</td>
                                        <td><Approval approved={item.approved_dc} /></td>
                                        <td><Approval approved={item.approved_adh} /></td>
                                        <td><Approval approved={item.approved_agm} /></td>
                                        <td><Approval approved={item.approved_admin} /></td>
                                        <td>{item.total_price > 5000 ? <Approval approved={item.approved_md} /> : 'Invalid'}</td>

                                        <td>
                                            {
                                                item.sent_from_store != 'SENT' ? <button onClick={e => send_from_store(e, item.id)} className='btn btn-primary'>Send</button> : <Approval approved={item.sent_from_store} />

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
                                                    <th style={{ border: '1px solid black', fontSize: '12px', width: '150px' }} className="fw-bold text-end">Description</th>
                                                    <th style={{ border: '1px solid black', fontSize: '12px' }} className="fw-bold text-end">Quantity</th>
                                                    <th style={{ border: '1px solid black', fontSize: '12px' }} className="fw-bold text-end">Unit</th>
                                                    <th style={{ border: '1px solid black', fontSize: '12px' }} className="fw-bold text-end">Unit Price</th>
                                                    <th style={{ border: '1px solid black', fontSize: '12px' }} className="fw-bold text-end"> Price</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {details.map(item => (
                                                    <tr>
                                                        <td style={{ border: '1px solid black', fontSize: '12px', width: '250px' }} className='text-end'>{item.name}</td>
                                                        <td style={{ border: '1px solid black', fontSize: '12px' }} className='text-end'>{item.quantity}</td>
                                                        <td style={{ border: '1px solid black', fontSize: '12px' }} className='text-end'>{item.unit}</td>
                                                        <td style={{ border: '1px solid black', fontSize: '12px' }} className='text-end'>{item.price}</td>
                                                        <td style={{ border: '1px solid black', fontSize: '12px' }} className='text-end'>{parseFloat(item.price) * parseFloat(item.quantity)}</td>
                                                    </tr>
                                                ))}
                                                <tr>
                                                    <td colSpan={4} style={{ border: '1px solid black', fontSize: '12px' }} className='text-center fw-bold'>Total Price</td>
                                                    <td style={{ border: '1px solid black', fontSize: '12px' }} className='text-end fw-bold'>{details.reduce((n, { price, quantity }) => n + parseFloat(price) * parseFloat(quantity), 0)}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>

                                    <div style={{ width: '92%' }} className="  table-responsive mx-auto mb-5 pb-5">
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
                                    </div>

                                    <div className="my-0 "></div>

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
                                    <p style={{ fontSize: '12px' }} className='bg-blue text-white text-center mb-2'>
                                        All rights reserved by @ Promise E-nothi

                                    </p>
                                </div>

                                <h3 className='mt-3 text-success border border-success'>Brochures</h3>

                                    {
                                        brochures.map(item => (
                                            <div>
                                            <a target='_blank' className='btn btn-warning' href={item.image}>File Link</a>
                                            </div>
                                        ))
                                    }
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default ReqElt