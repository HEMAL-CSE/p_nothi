import React, { useEffect, useState } from 'react'
import divisionsdata from '../../assets/divisions.json'
import districtsdata from '../../assets/districts.json'
import upazilasdata from '../../assets/upazilas.json'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'


export const Employee = () => {

  const [name, setName] = useState('')
  const [fname, setFName] = useState('')
  const [mname, setMotherName] = useState('')
  const [nid, setNID] = useState('')
  const [Presentaddrss, setPresentaddrss] = useState('')
  const [villagename, setvillagename] = useState('')


  const [division, setdivision] = useState('')
  const [divisions, setdivisions] = useState([])

const [district, setdistrict] = useState('')
  const [districts, setdistricts] = useState([])

const [upazila, setupazila] = useState('')
  const [upazilas, setupazilas] = useState([])

const [blood, setblood] = useState('')
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

    setdivisions(divisionsdata)
}, [])

  const addData = e => {
    e.preventDefault()

    const user_id = localStorage.getItem('user_id')

    axios.put(`http://68.178.163.174:5012/employees/edit?user_id=${user_id}`, {
        father_name: fname,
        mother_name: mname,
        nid: nid,
        present_address:Presentaddrss,
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
    })
  }

  return (

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
                
                    <label> Father Name:</label>
                    <input value={fname} onChange={e => setFName(e.target.value)} className='input' type='text'/>

                    <label> Mother Name:</label>
                    <input value={mname} onChange={e => setMotherName(e.target.value)} className='input' type='text'/>

                    <label> NID:</label>
                    <input value={nid} onChange={e => setNID(e.target.value)} className='input' type='text'/>

                    <label> Present Address:</label>
                    <input value={Presentaddrss} onChange={e => setPresentaddrss(e.target.value)} className='input' type='text'/>

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
                    <input value={villagename} onChange={e => setvillagename(e.target.value)} className='input' type='text'/>
                    
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

    
  )
}
