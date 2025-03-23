import React, { useEffect, useState } from 'react'
import Modal from 'react-modal'
import divisionsdata from '../../assets/divisions.json'
import districtsdata from '../../assets/districts.json'
import upazilasdata from '../../assets/upazilas.json'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'

const EditGeneralInfo = ({ isOpen, setIsOpen, profile }) => {

    const [fname, setFName] = useState()
    const [name, setName] = useState()
    const [mname, setMotherName] = useState()
    const [nid, setNID] = useState()
    const [email, setEmail] = useState()
    const [mobile_no, setMobile_no] = useState()
    const [Presentaddrss, setPresentaddrss] = useState()
    const [villagename, setvillagename] = useState()


    const [division, setdivision] = useState()
    const [divisions, setdivisions] = useState([])

    const [district, setdistrict] = useState()
    const [districts, setdistricts] = useState([])

    const [upazila, setupazila] = useState()
    const [upazilas, setupazilas] = useState([])

    const [blood, setblood] = useState()
    const [bloods, setbloods] = useState([
        {
            name: 'B+',
        },
        {
            name: 'B-',
        },
        {
            name: 'A+',
        },
        {
            name: 'A-',
        },
        {
            name: 'O+',
        },
        {
            name: 'O-',
        },
        {
            name: 'AB+',
        }
    ])

    useEffect(() => {
        console.log(profile.user_name)
        setName(profile.user_name)
        setFName(profile.father_name)
        setMotherName(profile.mother_name)
        setNID(profile.nid)
        setMobile_no(profile.mobile_no)
        setEmail(profile.email)
        setPresentaddrss(profile.present_address)
        setvillagename(profile.village)
        setdivision(profile.division)

        setblood(profile.blood_group)
        setdivisions(divisionsdata)

        let districtsx = districtsdata.filter(x => x.division_id == profile.division)

        setdistricts(districtsx)

        setdistrict(profile.district)

        let upazialasx = upazilasdata.filter(x => x.district_id == profile.district)
        setupazilas(upazialasx)
        setupazila(profile.upazila)
    }, [isOpen])

    const addData = e => {
        e.preventDefault()

        const user_id = localStorage.getItem('user_id')

        axios.put(`https://server.promisenothi.com/employees/edit?user_id=${user_id}`, {
            name,
            father_name: fname,
            mother_name: mname,
            email,
            mobile_no,
            nid: nid,
            present_address: Presentaddrss,
            division,
            district,
            upazila,
            village: villagename,
            blood_group: blood
        }).then(res => {
            toast('Profile Updated')
            setFName('')
            setMotherName('')
            setNID('')
            setPresentaddrss('')
            setdivision('')
            setdistrict('')
            setupazila('')
            setvillagename('')
            setblood('')
            setIsOpen(false)
        })
    }

    return (
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
                {/* <h2>Cow Purchase</h2> */}
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
                                    <h1 className="m-2 display-5 fw-bold text-success2"><span className="text-success2">Employee</span> Information</h1>
                                </a>
                            </div>
                        </div>

                    </div>
                </div>

                <form>

                    <label>  Name:</label>
                    <input value={name} onChange={e => setName(e.target.value)} className='input' type='text' />
                    
                    <label>  Email:</label>
                    <input value={email} onChange={e => setEmail(e.target.value)} className='input' type='text' />
                    
                    <label>  Phone Number:</label>
                    <input value={mobile_no} onChange={e => setMobile_no(e.target.value)} className='input' type='text' />

                    <label> Father Name:</label>
                    <input value={fname} onChange={e => setFName(e.target.value)} className='input' type='text' />

                    <label> Mother Name:</label>
                    <input value={mname} onChange={e => setMotherName(e.target.value)} className='input' type='text' />

                    <label> NID:</label>
                    <input value={nid} onChange={e => setNID(e.target.value)} className='input' type='text' />

                    <label> Present Address:</label>
                    <input value={Presentaddrss} onChange={e => setPresentaddrss(e.target.value)} className='input' type='text' />

                    <label> Permanent Address:</label>
                    <select value={division} onChange={e => {

                        setdivision(e.target.value)
                        let districtsx = districtsdata.filter(x => x.division_id == e.target.value)
                        console.log(districtsx);

                        setdistricts(districtsx)
                    }} className='select' >
                        <option >Select</option>
                        {
                            divisions.map(item => (
                                <option value={item.id}>{item.bn_name}</option>
                            ))
                        }
                    </select>

                    <label> Select District:</label>
                    <select value={district} onChange={e => {

                        setdistrict(e.target.value)
                        let upazialasx = upazilasdata.filter(x => x.district_id == e.target.value)
                        setupazilas(upazialasx)
                    }} className='select' >
                        <option >Select</option>
                        {
                            districts.map(item => (
                                <option value={item.id}>{item.bn_name}</option>
                            ))
                        }
                    </select>

                    <label> Select Upazila:</label>
                    <select value={upazila} onChange={e => {

                        setupazila(e.target.value)
                    }} className='select' >
                        <option >Select</option>
                        {
                            upazilas.map(item => (
                                <option value={item.id}>{item.bn_name}</option>
                            ))
                        }
                    </select>


                    <label> Enter Village Name:</label>
                    <input value={villagename} onChange={e => setvillagename(e.target.value)} className='input' type='text' />

                    <label> Select Blood Group:</label>
                    <select value={blood} onChange={e => {

                        setblood(e.target.value)
                    }} className='select' >
                        <option >Select</option>
                        {
                            bloods.map(item => (
                                <option value={item.name}>{item.name}</option>
                            ))
                        }
                    </select>

                    <button onClick={addData} className='button'>Submit</button>

                </form>


            </div>

        </Modal>
    )
}

export default EditGeneralInfo