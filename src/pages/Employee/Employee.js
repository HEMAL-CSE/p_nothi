import React, { useState } from 'react'


export const Employee = () => {

  const [name, setName] = useState('')
  const [fname, setFName] = useState('')
  const [mname, setMotherName] = useState('')
  const [nid, setNID] = useState('')
  const [Presentaddrss, setPresentaddrss] = useState('')
  const [villagename, setvillagename] = useState('')


  const [division, setdivision] = useState('')
  const [divisions, setdivisions] = useState([
    {
        name: 'Dhaka',
    },
    {
        name: 'Rajshahi',
    },
    {
        name: 'Barisal',
    }
])

const [district, setdistrict] = useState('')
  const [districts, setdistricts] = useState([
    {
        name: 'Narsingdi',
    },
    {
        name: 'Gazipur',
    },
    {
        name: 'Tangail',
    }
])

const [upazila, setupazila] = useState('')
  const [upazilas, setupazilas] = useState([
    {
        name: 'Shibpur',
    },
    {
        name: 'Polash',
    },
    {
        name: 'Monohordi',
    }
])

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

  const addData = e => {
    e.preventDefault()
  }

  return (

        <div className='details'>
                {/* <h2>Cow Purchase</h2> */}
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
                                    <h1 className="m-2 display-4 text-success2"><span className="text-success2">Employee</span> Information</h1>
                                </a>
                            </div>
                        </div>

                    </div>
                </div>

                <form>
                    <label> Employee Name:</label>
                    <input value={name} onChange={e => setName(e.target.value)} className='input' type='text'/>

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
                        }} className='select' >
                            <option >Select</option>
                            {
                                divisions.map(item => (
                                    <option value={item.name}>{item.name}</option>
                                ))
                            }
                        </select>

                        <label> Select District:</label>
                    <select value={district} onChange={e => {
                            
                            setdistrict(e.target.value)
                        }} className='select' >
                            <option >Select</option>
                            {
                                districts.map(item => (
                                    <option value={item.name}>{item.name}</option>
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
                                    <option value={item.name}>{item.name}</option>
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
