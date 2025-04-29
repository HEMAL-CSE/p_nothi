// import React from 'react'
import axios from 'axios';
import React, { useState, useRef, useEffect } from 'react';
import divisionsdata from '../../assets/divisions.json'
import { BiPlus } from 'react-icons/bi';
import { toast, ToastContainer } from 'react-toastify';
import Modal from 'react-modal'
import moment from 'moment';
import logo from '../../assets/logo.png'



export const Notice = () => {

  const [all_data, setAll_data] = useState([])

  const [department_data, setDepartment_data] = useState([])

  const [individual_data, setIndividual_data] = useState([])

  const [management_data, setManagement_data] = useState([])

  const [notice_type, setNotice_type] = useState('')
  const [notice_type_others, setNotice_type_others] = useState('')
  const [detailsOpen, setDetailsOpen] = useState(false)
  const [notice_date, setNotice_date] = useState('')
  const [notice, setNotice] = useState({})

  const [notice_types, setNotice_types] = useState([
    'Leave Notice', 'Transfer Notice', 'Others'
  ])

  const [notice_desc, setNotice_desc] = useState('')
  const [notice_for, setNotice_for] = useState('')
  const [user_department, setUser_department] = useState('')
  const [notice_fors, setNotice_fors] = useState([
    'All', 'Department', 'Individual', 'Promise Group', 'Management'
  ])

  const [department, setDepartment] = useState('')
  const [division, setDivision] = useState('')
  const [branch, setBranch] = useState('')
  const [employee, setEmployee] = useState('')

  const [departments, setDepartments] = useState([])
  const [notice_for_items, setNotice_for_items] = useState([])
  const [divisions, setDivisions] = useState([])
  const [branches, setBranches] = useState([])
  const [employees, setEmployees] = useState([])

  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);

  const [management_checked, setManagement_checked] = useState([])

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      // Basic validation (you can add more robust checks)
      // if (file.type.startsWith('image/')) {
      setSelectedImage(file);
      // } else {
      // alert('Please select an image file.');
      // event.target.value = ''; // Clear the invalid file
      // }
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current.click(); // Programmatically trigger the file input
  };

  const getEmployees = (branch_id, department) => {
    if (notice_for == 'Individual' && department == 2) {
      axios.get(`https://server.promisenothi.com/employees?branch_id=${branch_id}`).then(res => {
        setEmployees(res.data)
      })
    } else if (notice_for == 'Individual' && department != 2) {
      axios.get(`https://server.promisenothi.com/employees?department=${department}`).then(res => {
        setEmployees(res.data)
      })
    }
  }

  const getData = () => {
    const employee_id = localStorage.getItem('employee_id')


    axios.get(`https://server.promisenothi.com/employees/job_info?employee_id=${employee_id}`).then(res => {
      setUser_department(res.data[0].department)



      if (res.data[0].department != '2' && !['1', '2', '3', '4', '5', '6', '7', '12'].includes(localStorage.getItem('role'))) {
        axios.get(`https://server.promisenothi.com/employees/notice?for_department=1&&department=${res.data[0].department}`).then(res => {
          console.log(res.data);
          setDepartment_data(res.data)
        })

        axios.get(`https://server.promisenothi.com/employees/notice?for_individual=1&&department=${res.data[0].department}&&employee_id=${employee_id}`).then(res => {
          setIndividual_data(res.data)
        })
      } else if (res.data[0].department == '2' && !['1', '2', '3', '4', '5', '6', '7', '12'].includes(localStorage.getItem('role'))) {
        axios.get(`https://server.promisenothi.com/employees/notice?for_department=1&&department=${res.data[0].department}&&branch=${res.data[0].branch_id}`).then(res => {
          console.log(res.data);
          setDepartment_data(res.data)
        })

        axios.get(`https://server.promisenothi.com/employees/notice?for_individual=1&&department=${res.data[0].department}&&branch=${res.data[0].branch_id}&&employee_id=${employee_id}`)
          .then(res => {
            setIndividual_data(res.data)
          })
      }




      if (['1', '2', '3', '12'].includes(localStorage.getItem('role')) && ['4', '5', '6', '12'].includes(res.data[0].department)) {
        axios.get(`https://server.promisenothi.com/employees/notice?notice_for_role=12&&notice_for_department=12`).then(res => {
          console.log(res.data);

          setManagement_data(res.data)
        })
      }


      if (res.data[0].department == 3) {
        axios.get(`https://server.promisenothi.com/employees/notice`).then(res => {


          let uniq = res.data.filter(
            (item, i) => i == res.data.findIndex(
              other => item.id == other.id
            )
          )

          console.log(uniq);

          setAll_data(uniq)
        })
      } else {
        axios.get(`https://server.promisenothi.com/employees/notice?all=1`).then(res => {
          setAll_data(res.data)
        })
      }
    })
  }

  useEffect(() => {

    getData()

    axios.get('https://server.promisenothi.com/employees/notice_for_items').then(res => {
      let data = res.data.map(i => {
        return { ...i, checked: true }
      })
      setNotice_for_items(data)

    })

    axios.get('https://server.promisenothi.com/employees/departments').then(res => {
      setDepartments(res.data)
    })
  }, [])

  useEffect(() => {

    if (department == 2) {
      setDivisions(divisionsdata)

    }
  }, [department])

  const getBranches = (division_id) => {
    axios.get(`https://server.promisenothi.com/employees/branches?division_id=${division_id}`).then(res => {
      setBranches(res.data)
    })
  }

  const deleteData = (e, id) => {
    e.preventDefault()

    if (window.confirm('Do you want to delete this?')) {
      axios.delete(`https://server.promisenothi.com/employees/notice/delete?id=${id}`).then(res => {
        toast('Deleted')
        getData()
      })
    }


  }

  const addData = (e) => {
    e.preventDefault()

    let poster_id = localStorage.getItem('employee_id')

    let notice_typee = notice_type == 'Others' ? notice_type_others : notice_type

    const formData = new FormData()
    formData.append('notice_type', notice_typee)
    formData.append('image', selectedImage)
    formData.append('notice_date', notice_date)
    formData.append('notice_for', notice_for)
    formData.append('notice_desc', notice_desc)
    formData.append('poster_id', poster_id)
    formData.append('department', department)
    formData.append('division', division)
    formData.append('branch', branch)
    formData.append('employee_id', employee)

    axios.post('https://server.promisenothi.com/employees/notice/add', formData)
      .then(res => {
        toast('Submitted')

        if (notice_for == 'Management') {
          notice_for_items.map(item => {
            if (item.checked == true) {
              axios.post('https://server.promisenothi.com/employees/notice_fors/add', {
                notice_id: res.data.id,
                notice_for_item_id: item.id
              }).then(res => {
                toast('Submitted')
              })
            }
          })
        }

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
                <h1 className="m-2 display-5 fw-bold text-success2"><span className="text-success2"></span> Notice</h1>
              </a>
            </div>
          </div>

        </div>
      </div>

      {['1', '2', '3', '4', '5', '6', '7'].includes(localStorage.getItem('role')) && <form onSubmit={addData}>
        <label> Notice Date: </label>
        <input type='date' value={notice_date} className='input' onChange={e => setNotice_date(e.target.value)} placeholder='Enter Notice Type' />


        <label> Notice Type: </label>
        <select onChange={e => {
          setNotice_type(e.target.value)
        }} className='select'>
          <option>Select</option>
          {
            notice_types.map(item => (
              <option value={item}>{item}</option>
            ))
          }
        </select>


        {
          notice_type == 'Others' &&
          <input value={notice_type_others} className='input' onChange={e => setNotice_type_others(e.target.value)} placeholder='Enter Notice Type' />}

        <label> Notice For: </label>
        <select onChange={e => {
          setNotice_for(e.target.value)
        }} className='select'>
          <option>Select</option>
          {
            notice_fors.map(item => (
              <option value={item}>{item}</option>
            ))
          }
        </select>

        {
          notice_for == 'Management' &&
          <div>
            {
              notice_for_items.map((item, i) => (
                <div className='d-flex justify-content-start'>
                  <input type='checkbox' checked={item.checked} onChange={(value) => {
                    setNotice_for_items(
                      notice_for_items.map(
                        item2 => {
                          if (item2.id == item.id) {
                            return { ...item2, checked: !item2.checked }
                          } else {
                            return { ...item2 }
                          }
                        }
                      )
                    )

                    console.log(notice_for_items);

                  }} value={item.id} /><span className='mx-3'>{item.name}</span>
                </div>
              ))
            }
          </div>
        }


        {notice_for == 'Department' || notice_for == 'Individual' ?
          <div>
            <label> Job Department: </label>

            <select onChange={e => {
              setDepartment(e.target.value)
              getEmployees(branch, e.target.value)

            }} className='select'>
              <option>Select</option>
              {
                departments.map(item => (
                  <option value={item.id}>{item.name}</option>
                ))
              }
            </select>
          </div>
          : null}

        {department == 2 &&
          <div>
            <label>Division:</label>

            <select value={division} onChange={e => {

              setDivision(e.target.value)
              getBranches(e.target.value)
            }} className='select' >
              <option >Select</option>
              {
                divisions.map(item => (
                  <option value={item.id}>{item.name}</option>
                ))
              }
            </select>

            <label>Branch:</label>

            <select value={branch} onChange={e => {

              setBranch(e.target.value)
              getEmployees(e.target.value, department)

            }} className='select' >
              <option >Select</option>
              {
                branches.map(item => (
                  <option value={item.id}>{item.name}</option>
                ))
              }
            </select>


          </div>}


        {
          notice_for == 'Individual' && (
            <div>
              <label>Employee</label>
              <select value={employee} onChange={e => {

                setEmployee(e.target.value)


              }} className='select' >
                <option >Select</option>
                {
                  employees.map(item => (
                    <option value={item.id}>{item.user_name}</option>
                  ))
                }
              </select>
            </div>
          )
        }

        <label>Notice Description:</label>
        <textarea
          className='input'
          placeholder='Enter Description'
          value={notice_desc}
          rows={5}
          onChange={e => {
            setNotice_desc(e.target.value)
          }}
        />

        <label>Select File:</label>
        <input
          type="file"
          // accept="image/*" // Accept only image files
          style={{ display: 'none' }} // Hide the input visually
          ref={fileInputRef} // Ref for programmatic access
          onChange={handleImageChange}
        />

        {selectedImage ? (
          <div className='border d-flex justify-content-center align-items-center' style={{ width: '400px', height: '400px' }} onClick={handleUploadClick}>
            {/* <h2>Selected Image:</h2> */}
            {selectedImage.type.startsWith('image/') ? <img
              src={URL.createObjectURL(selectedImage)} // Create a URL for the image
              alt={selectedImage.name}
              style={{ maxWidth: '400px', maxHeight: '400px' }}
            /> : <p>{selectedImage.name}</p>}
            {/* <p>File Name: {selectedImage.name}</p> */}
            {/* <p>File Size: {selectedImage.size} bytes</p>
          <button onClick={handleClearImage}>Clear Image</button> */}

          </div>

        ) :
          <div className='border d-flex justify-content-center align-items-center' style={{ width: '400px', height: '400px' }} onClick={handleUploadClick}>
            <BiPlus />
          </div>
        }

        <button type='submit' className='btn btn-success mt-3'>Submit</button>
      </form>}

      <div className='mt-5'>
        <h4>Notice for all</h4>
        <table className='table mt-3'>
          <thead>
            <tr>
              <th>Notice From</th>
              <th>Designation</th>
              <th>Notice For</th>
              <th>Details</th>
              {['1', '2', '3', '4', '5', '6', '7'].includes(localStorage.getItem('role')) && <th>Delete</th>}
            </tr>
          </thead>
          <tbody>
            {
              all_data.map(item => (
                <tr>
                  <td>{item.poster_name}</td>
                  <td>{item.designation}</td>
                  <td>{item.notice_for}</td>
                  <td>
                    <button onClick={e => {
                      setDetailsOpen(true)
                      setNotice(item)
                      console.log(item.notice_desc);

                    }} className='btn btn-warning'>Details</button>
                  </td>
                  {['1', '2', '3', '4', '5', '6', '7'].includes(localStorage.getItem('role')) && <td>
                    <button onClick={e => deleteData(e, item.id)} className='btn btn-danger'>Delete</button>
                  </td>}
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>

      <div className='mt-5'>
        <h4>Notice for Department</h4>
        <table className='table mt-3'>
          <thead>
            <tr>
              <th>Notice From</th>
              <th>Designation</th>
              <th>Notice For</th>
              <th>Details</th>
              {['1', '2', '3', '4', '5', '6', '7'].includes(localStorage.getItem('role')) && <th>Delete</th>}
            </tr>
          </thead>
          <tbody>
            {
              department_data.map(item => (
                <tr>
                  <td>{item.poster_name}</td>
                  <td>{item.designation}</td>
                  <td>{item.notice_for}</td>
                  <td>
                    <button onClick={e => {
                      setDetailsOpen(true)
                      setNotice(item)
                      console.log(item.notice_desc);

                    }} className='btn btn-warning'>Details</button>
                  </td>
                  {['1', '2', '3', '4', '5', '6', '7'].includes(localStorage.getItem('role')) && <td>
                    <button onClick={e => deleteData(e, item.id)} className='btn btn-danger'>Delete</button>
                  </td>}
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>

      <div className='mt-5'>
        <h4>Notice for Individual</h4>
        <table className='table mt-3'>
          <thead>
            <tr>
              <th>Notice From</th>
              <th>Designation</th>
              <th>Notice For</th>
              <th>Details</th>
              {['1', '2', '3', '4', '5', '6', '7'].includes(localStorage.getItem('role')) && <th>Delete</th>}
            </tr>
          </thead>
          <tbody>
            {
              individual_data.map(item => (
                <tr>
                  <td>{item.poster_name}</td>
                  <td>{item.designation}</td>
                  <td>{item.notice_for}</td>
                  <td>
                    <button onClick={e => {
                      setDetailsOpen(true)
                      setNotice(item)
                      console.log(item.notice_desc);

                    }} className='btn btn-warning'>Details</button>
                  </td>
                  {['1', '2', '3', '4', '5', '6', '7'].includes(localStorage.getItem('role')) && <td>
                    <button onClick={e => deleteData(e, item.id)} className='btn btn-danger'>Delete</button>
                  </td>}
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>

      <Modal
        style={{
          content: {
            width: "35%",
            // height: "10%",

            zIndex: 10,
            padding: '0px',
            // top: "5%",
            left: "40%",
            right: "10%",
            display: "flex",
            flexDirection: "column", 
            justifyContent: 'space-between',
            // bottom: "5%",
            overflow: "auto",
            WebkitBoxShadow: "0 5px 15px rgba(0, 0, 0, 0.5)",
            MozBoxShadow: "0 5px 15px rgba(0, 0, 0, 0.5)",
            boxShadow: "0 5px 15px rgba(0, 0, 0, 0.5)",
            borderRadius: "5px",
            border: "1px solid #ccc",
          },
          overlay: { zIndex: 10000 }
        }}
        isOpen={detailsOpen}
        onRequestClose={() => {
          setDetailsOpen(false)
        }}
      >
        <div className=''>
        <div className='bg-blue pb-3'>

</div>

          <div className=" d-flex flex-column  ">
            <img
              src={logo}

              alt="E-Learning & Earning Ltd."
              height={121}
              width={132}
              className="p-3 my-2"
            />
            <p className='mx-4'>Date: {moment(notice.notice_date).format('DD/MM/yyyy')}</p>

          </div>
          <h3 className='text-center mb-4 text-decoration-underline'>Office Notice</h3>

          <p className='mx-4'>{notice.notice_desc}</p>
          {notice.notice_file != 'null' && <a target='_blank' href={notice.notice_file} className='text-decoration-underline text-blue mx-4' style={{ cursor: 'pointer' }}>Notice File</a>}
          <h6 className='mt-4 mx-4'>Notice For: {notice.notice_for}</h6>
          {
            notice.notice_for == 'Department' &&
            <h6 className='mx-4'>Department: {notice.department_name}</h6>
          }
          {
            notice.notice_for == 'Department' && notice.department == 2 &&
            <h6 className='mx-4'>Branch: {notice.branch_name}</h6>
          }

          {
            notice.notice_for == 'Individual' &&
            <h6 className='mx-4'>Employee: {notice.employee_name}</h6>
          }

          <div className="my-4"></div>


        </div>

        <div>
          <p className="mx-4">
            <strong>Head Office :</strong> Khaja IT Park, 2nd to 7th Floor, Mirpur Road, Dhaka-1207.
          </p>
          <p className=" mx-4">
            <strong>Phone:</strong> 02-8091188, +88 01550 666 800|
            <strong> Email:</strong> info@e-laeltd.com
          </p>
          <div className="bg-success text-white text-center  p-1">
            <div className="">

              <p>
                <a className="text-white" href="https://www.facebook.com/elaeltd">https://www.facebook.com/elaeltd</a>
                <span> | </span>
                <a className="text-white" href="https://www.e-laeltd.com">https://www.e-laeltd.com</a>
              </p>
            </div>
          </div>
          <div className='bg-blue pb-3'>

          </div>
        </div>
      </Modal>
    </div>
  );
}
