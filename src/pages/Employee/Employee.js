import React, { useState } from 'react'


export const Employee = () => {

  const [name, setName] = useState('')
  const [fname, setFName] = useState('')
  const [mname, setMotherName] = useState('')
  const [nid, setNID] = useState('')
  const [Presentaddrss, setPresentaddrss] = useState('')

  const [division, setdivision] = useState('')

  const [divisions, setdivisions] = useState([
    {
        name: 'Male',
    },
    {
        name: 'Female',
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
                    <input value={fname} onChange={e => setName(e.target.value)} className='input' type='text'/>

                    <label> Mother Name:</label>
                    <input value={mname} onChange={e => setName(e.target.value)} className='input' type='text'/>

                    <label> NID:</label>
                    <input value={nid} onChange={e => setName(e.target.value)} className='input' type='text'/>

                    <label> Present Address:</label>
                    <input value={Presentaddrss} onChange={e => setName(e.target.value)} className='input' type='text'/>

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
                    
                    <label> Blood Group:</label>
                    <input value={name} onChange={e => setName(e.target.value)} className='input' type='text'/>

                    <button onClick={addData} className='button'>Submit</button>

                </form>


  </div>

    
  )
}
