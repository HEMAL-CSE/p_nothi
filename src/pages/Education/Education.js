// import React from 'react'
import React, { useState } from 'react'


export const Education = () => {

  const [bsc, setbsc] = useState('')
  const [bscs, setbscs] = useState([
    {
        name: 'Bachelor’s Degree ',
    },
    {
        name: 'Higher Secondary Certificate (HSC)',
    },
    {
        name: 'Secondary School Certificate (SSC) ',
    }
])


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
                                    <h1 className="m-2 display-4 text-success2"><span className="text-success2">Educational</span> Qualification</h1>
                                </a>
                            </div>
                        </div>

                    </div>
                </div>


                <form>
                <label> Select Degree:</label>
                    <select value={bsc} onChange={e => {
                            
                            setbsc(e.target.value)
                        }} className='select' >
                            <option >Select</option>
                            {
                                bscs.map(item => (
                                    <option value={item.name}>{item.name}</option>
                                ))
                            }
                    </select>
                  </form>



    </div>
  )
}
