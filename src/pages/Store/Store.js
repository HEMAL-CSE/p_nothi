import React, { useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import axios from 'axios'
import Modal from 'react-modal'

// const Store = () => {

//   const [item_types, setItem_types] = useState([])
//   const [data, setData] = useState([])

//   const [item_name, setItem_name] = useState('')

//   const [item_type, setItem_type] = useState('')
//   const [available_quantity, setAvailable_quantity] = useState('')
//   const [price, setPrice] = useState('')
//   const [unit, setUnit] = useState('')
//   const [isOpen, setIsOpen] = useState(false)

//   const [edit_item_name, setEdit_Item_name] = useState('')

//   const [edit_item_type, setEdit_Item_type] = useState('')
//   const [edit_available_quantity, setEdit_Available_quantity] = useState('')
//   const [edit_price, setEdit_Price] = useState('')
//   const [edit_unit, setEdit_Unit] = useState('')

//   const [edit_id, setEdit_id] = useState('')


//   const [units, setUnits] = useState([
//     'kg', 'pcs'
//   ])

//   const getData = () => {
//     axios.get('https://server.promisenothi.com/employees/store').then(res => {
//       setData(res.data)
//     })
//   }

//   useEffect(() => {
//     axios.get('https://server.promisenothi.com/employees/item_types').then(res => {
//       setItem_types(res.data)
//     })

//     getData()
//   }, [])

//   const addData = (e) => {
//     e.preventDefault()

//     axios.post(`https://server.promisenothi.com/employees/store/add`, {
//       item_type,
//       available_quantity,
//       price,
//       unit,
//       item_name
//     }).then(res => {
//       toast('Successfulyy Submitted')

//       getData()
//     })
//   }

//   const editData = (e, id) => {
//     e.preventDefault()

//     axios.put(`https://server.promisenothi.com/employees/store/edit?id=${id}`, {
//       item_type: edit_item_type,
//       available_quantity: edit_available_quantity,
//       price: edit_price,
//       unit: edit_unit,
//       item_name: edit_item_name
//     }).then(res => {
//       toast('Successfulyy Submitted')
//       setIsOpen(false)

//       getData()
//     })
//   }

//   return (
//     <div className='details'>
//       <ToastContainer />
//       <div className="container-fluid px-5 d-none d-lg-block">
//         <div className="row gx-5 py-3 align-items-center">
//           <div className="col-lg-3">
//             {/* <div className="d-flex align-items-center justify-content-start">
//                               <BsPhoneVibrate className='text-success2 fs-1 me-2' />
//                               <h2 className="mb-0">+012 345 6789</h2>
//                           </div> */}
//           </div>
//           <div className="col-lg-6">
//             <div className="d-flex align-items-center justify-content-center">
//               <a href="#" className="navbar-brand ms-lg-5">
//                 <h1 className="m-2 display-5 fw-bold text-success2"><span className="text-success2">Store</span> </h1>
//               </a>
//             </div>
//           </div>

//         </div>
//       </div>

//       {localStorage.getItem('role') == '11' && <div>



//         <label> Item Type:</label>
//         <select className='select' onChange={e => {
//           setItem_type(e.target.value)
//         }}>
//           <option>Select</option>
//           {
//             item_types.map(item => (
//               <option value={item.id}>{item.name}</option>
//             ))
//           }
//         </select>

//         <label>Item name</label>
//         <input className='input' value={item_name} onChange={e => setItem_name(e.target.value)} />


//         <label>Available Quantity</label>
//         <input className='input' value={available_quantity} onChange={e => setAvailable_quantity(e.target.value)} />

//         <label>Price</label>
//         <input className='input' value={price} onChange={e => setPrice(e.target.value)} />



//         <label>Unit</label>
//         <select className='select' onChange={e => {
//           setUnit(e.target.value)
//         }}>
//           <option>Select</option>
//           {
//             units.map(item => (
//               <option value={item}>{item}</option>
//             ))
//           }
//         </select>

//         <button onClick={addData} className='button'>Submit</button>

//       </div>}

//       <table className='table'>
//         <thead>
//           <tr>
//             <th>Item Type</th>
//             <th>Item Name</th>
//             <th>Available Quantity</th>
//             <th>Price</th>
//             <th>Unit</th>
//             {localStorage.getItem('role') == '11' && <th>Edit/Delete</th>}
//           </tr>
//         </thead>
//         <tbody>
//           {
//             data.map(item => (
//               <tr>
//                 <td>{item.item_type_name}</td>
//                 <td>{item.item_name}</td>
//                 <td>{item.available_quantity}</td>
//                 <td>{item.price}</td>
//                 <td>{item.unit}</td>
//                 {localStorage.getItem('role') == '11' && <td>
//                   <button onClick={e => {
//                     setEdit_Available_quantity(item.available_quantity)
//                     setEdit_Item_type(item.item_type)
//                     setEdit_Item_name(item.item_name)
//                     setEdit_Price(item.price)
//                     setEdit_Unit(item.unit)
//                     setEdit_id(item.id)
//                     setIsOpen(true)
//                   }} className='btn btn-warning m-2'>Edit</button>
//                   <button className='btn btn-danger m-2'>Delete</button>
//                 </td>}
//               </tr>
//             ))
//           }
//         </tbody>
//       </table>

//       {localStorage.getItem('role') == '11' && <Modal
//         style={{
//           content: {
//             width: "80%",
//             height: "80%",
//             zIndex: 10,
//             top: "5%",
//             left: "10%",
//             right: "10%",
//             bottom: "5%",
//             overflow: "auto",
//             WebkitBoxShadow: "0 5px 15px rgba(0, 0, 0, 0.5)",
//             MozBoxShadow: "0 5px 15px rgba(0, 0, 0, 0.5)",
//             boxShadow: "0 5px 15px rgba(0, 0, 0, 0.5)",
//             borderRadius: "5px",
//             border: "1px solid #ccc",
//           },
//           overlay: { zIndex: 10000 }
//         }}
//         isOpen={isOpen}
//         onRequestClose={() => {
//           setIsOpen(false)
//         }}
//       >
//         <div className='details'>


//           <label> Item Type:</label>
//           <select defaultValue={edit_item_type} className='select' onChange={e => {
//             setEdit_Item_type(e.target.value)
//           }}>
//             <option>Select</option>
//             {
//               item_types.map(item => (
//                 <option value={item.id}>{item.name}</option>
//               ))
//             }
//           </select>

//           <label>Item name</label>
//           <input className='input' value={edit_item_name} onChange={e => setEdit_Item_name(e.target.value)} />


//           <label>Available Quantity</label>
//           <input className='input' value={edit_available_quantity} onChange={e => setEdit_Available_quantity(e.target.value)} />

//           <label>Price</label>
//           <input className='input' value={edit_price} onChange={e => setEdit_Price(e.target.value)} />


//           <button onClick={e => editData(e, edit_id)} className='button'>Submit</button>

//         </div>
//       </Modal>}
//     </div>
//   )
// }

// export default Store


import { CheckCircle, XCircle, Hourglass, Users, Building, DollarSign, FileText } from 'lucide-react';
import { FaBuilding, FaMoneyBill, FaUser } from 'react-icons/fa';

const Store = () => {

  const [data, setData] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const [selectedEmployee, setSelectedEmployee] = useState({})
  const [division, setdivision] = useState('')
  const [divisions, setdivisions] = useState([])
  const [branches, setBranches] = useState([])
  const [branch, setBranch] = useState('')
  const [dept, setdept] = useState('')

  const [employees, setEmployees] = useState([])

  const [nid, setNID] = useState('')

  const [employee, setEmployee] = useState({})

  const [education, setEducation] = useState([])

  const [job_info, setJob_info] = useState({})

  const [experience, setExperience] = useState([])

  const [departments, setDepartments] = useState([])

  const [department, setDepartment] = useState('')

  const [categories, setCategories] = useState([])

  const [category, setCategory] = useState('')

  const [floors, setFloors] = useState([])

  const [floor, setFloor] = useState('')

  const [rooms, setRooms] = useState([])

  const [room, setRoom] = useState('')

  const [item_name, setItem_name] = useState('')

  const [quantity, setQuantity] = useState('')

  const getEmployees = () => {
    if (branch != '') {
      axios.get(`https://server.promisenothi.com/employees?department=${dept}&&branch_id=${branch}`).then(res => {
        setEmployees(res.data)
      })
    } else if (dept == 2 && branch == '' && division != '') {
      axios.get(`https://server.promisenothi.com/employees?department=${dept}&&branch_division_id=${division}`).then(res => {
        setEmployees(res.data)
      })
    } else {
      axios.get(`https://server.promisenothi.com/employees?department=${dept}`).then(res => {
        setEmployees(res.data)
      })
    }
  }

  useEffect(() => {
    axios.get('https://server.promisenothi.com/employees/departments').then(res => {
      setDepartments(res.data)
    })

    axios.get('https://server.promisenothi.com/employees/floors').then(res => {
      setFloors(res.data)
    })

    axios.get('https://server.promisenothi.com/employees/item_types').then(res => {
      setCategories(res.data)
    })
  }, [])

  const getRooms = (floor_id) => {
    axios.get(`https://server.promisenothi.com/employees/rooms?floor_id=${floor_id}`).then(res => {
      setRooms(res.data)
    })
  }

const addData = (e) => {
  e.preventDefault()
  axios.post(`https://server.promisenothi.com/employees/assets/add`, {
    category_id: category,
    floor_id: floor,
    room_id: room,
    department_id: department,
    item_name,
    quantity
  }).then(res => {
    toast('Submitted')
  })
}

  return (
    <div className="container mt-4">
      <ToastContainer />
      <h2 className="mb-4">Store Dashboard Overview:</h2>
      <div className="row">
        <div className="col-md-4 mb-3">
          <div className="card text-white bg-black">
            <div className="card-body d-flex align-items-center justify-content-center">
              {/* <div className="mr-3"> */}
              <FaUser className='mx-3' size={20} /> {/* Assuming you have Font Awesome for icons */}
              {/* </div> */}
              <div>
                <h5 className="card-title">Total Employees</h5>
                <p className="card-text mx-4">1</p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="card text-white bg-success">
            <div className="card-body d-flex align-items-center justify-content-center">
              {/* <div className="mr-3"> */}
              <FaBuilding className='mx-3' size={20} /> {/* Assuming you have Font Awesome for icons */}
              {/* </div> */}
              <div>
                <h5 className="card-title">Total Departments</h5>
                <p className="card-text mx-4">2</p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="card text-white bg-dark bg-gradient">
            <div className="card-body d-flex align-items-center justify-content-center">
              {/* <div className="mr-3"> */}
              <FaMoneyBill className='mx-3' size={20} /> {/* Assuming you have Font Awesome for icons */}
              {/* </div> */}
              <div>
                <h5 className="card-title">Monthly Salary</h5>
                <p className="card-text mx-4">0</p>
              </div>
            </div>
          </div>
        </div>
      </div>


      {/* <h2 className="mb-4">Store Dashboard Overview</h2> */}
      <div className="row">
        <div className="col-md-4 mb-3">
          <div className="card text-white bg-black">
            <div className="card-body d-flex align-items-center justify-content-center">
              {/* <div className="mr-3"> */}
              <FaUser className='mx-3' size={20} /> {/* Assuming you have Font Awesome for icons */}
              {/* </div> */}
              <div>
                <h5 className="card-title">Total Stationary</h5>
                <p className="card-text mx-4">10</p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="card text-white bg-success">
            <div className="card-body d-flex align-items-center justify-content-center">
              {/* <div className="mr-3"> */}
              <FaBuilding className='mx-3' size={20} /> {/* Assuming you have Font Awesome for icons */}
              {/* </div> */}
              <div>
                <h5 className="card-title">Total Chairs and Table</h5>
                <p className="card-text mx-4">2</p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="card text-white bg-danger">
            <div className="card-body d-flex align-items-center justify-content-center">
              {/* <div className="mr-3"> */}
              <FaMoneyBill className='mx-3' size={20} /> {/* Assuming you have Font Awesome for icons */}
              {/* </div> */}
              <div>
                <h5 className="card-title">Total Office Equipment</h5>
                <p className="card-text mx-4">0</p>
              </div>
            </div>
          </div>
        </div>
      </div>


      {/* Store Assest Section */}
      <h2 className="storeassets"> Asset Dashboard Overview:</h2>
      <div className="row">
        <div className="col-md-4 mb-3">
          <div className="card text-white bg-dark">
            <div className="card-body d-flex align-items-center justify-content-center">
              {/* <div className="mr-3"> */}
              <FaUser className='mx-3' size={20} /> {/* Assuming you have Font Awesome for icons */}
              {/* </div> */}
              <div>
                <h5 className="card-title">Total Employees</h5>
                <p className="card-text mx-4">1</p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="card text-white bg-success">
            <div className="card-body d-flex align-items-center justify-content-center">
              {/* <div className="mr-3"> */}
              <FaBuilding className='mx-3' size={20} /> {/* Assuming you have Font Awesome for icons */}
              {/* </div> */}
              <div>
                <h5 className="card-title">Total Departments</h5>
                <p className="card-text mx-4">2</p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-3">
        <div className="card text-white bg-dark">
        <div className="card-body d-flex align-items-center justify-content-center">
              {/* <div className="mr-3"> */}
              <FaMoneyBill className='mx-3' size={20} /> {/* Assuming you have Font Awesome for icons */}
              {/* </div> */}
              <div>
                <h5 className="card-title">Monthly Salary</h5>
                <p className="card-text mx-4">0</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-4 mb-3">
          <div className="card text-white bg-primary">
            <div className="card-body d-flex align-items-center justify-content-center">
              {/* <div className="mr-3"> */}
              <FaUser className='mx-3' size={20} /> {/* Assuming you have Font Awesome for icons */}
              {/* </div> */}
              <div>
                <h5 className="card-title">Total Stationary</h5>
                <p className="card-text mx-4">10</p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="card text-white bg-success">
            <div className="card-body d-flex align-items-center justify-content-center">
              {/* <div className="mr-3"> */}
              <FaBuilding className='mx-3' size={20} /> {/* Assuming you have Font Awesome for icons */}
              {/* </div> */}
              <div>
                <h5 className="card-title">Total Chairs and Table</h5>
                <p className="card-text mx-4">2</p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="card text-white bg-danger">
            <div className="card-body d-flex align-items-center justify-content-center">
              {/* <div className="mr-3"> */}
              <FaMoneyBill className='mx-3' size={20} /> {/* Assuming you have Font Awesome for icons */}
              {/* </div> */}
              <div>
                <h5 className="card-title">Total Office Equipment</h5>
                <p className="card-text mx-4">0</p>
              </div>
            </div>
          </div>
        </div>
      </div>





      {

        <div className='border border-1 border-black p-2 m-4 d-flex flex-column align-items-center'>
          <h2 className="storeassets">Store Asset Dashboard Overview:</h2>

          <div className='d-flex flex-column w-50'>
            <label> Job Department: </label>

            <select onChange={e => {
              setdept(e.target.value)
            }} className='select'>
              <option>Select</option>
              {
                departments.filter(e => e.id != 3).map(item => (
                  <option value={item.id}>{item.name}</option>
                ))
              }
            </select>

            {dept == 2 &&
              <div>
                <label>Division</label>

                <select value={division} onChange={e => {

                  setdivision(e.target.value)
                  // getBranches(e.target.value)
                }} className='select' >
                  <option >Select</option>
                  {
                    divisions.map(item => (
                      <option value={item.id}>{item.name}</option>
                    ))
                  }
                </select>

                <label>Branch</label>

                <select value={branch} onChange={e => {

                  setBranch(e.target.value)

                }} className='select' >
                  <option >Select</option>
                  {
                    branches.map(item => (
                      <option value={item.id}>{item.name}</option>
                    ))
                  }
                </select></div>}

            <button onClick={getEmployees} className='btn btn-primary my-3'>Submit</button>
          </div>
          {

            <div>
              <table className='mt-10 table'>
                <thead>
                  <tr>
                    <th scope="col text-start">SL No</th>
                    {/* <th scope="col">Asset Name</th> */}
                    <th scope="col">Asset Name</th>
                    <th scope="col">Quantity</th>
                    <th>Details</th>
                  </tr>
                </thead>
                <tbody>
                  {

                    employees.map(item => (
                      <tr>
                        <td className='px-3 text-start'>{item.user_name}</td>
                        <td className='px-3'>{item.employee_id}</td>
                        <td className='px-3'>{item.email}</td>
                        <td className='px-3'>{item.mobile_no}</td>
                        <td className='px-3'>{item.present_address}</td>
                        <td className='px-3'>{item.designation != null ? item.designation.toUpperCase() : ''}</td>
                        <td className='px-3'>
                          <button onClick={(e) => {
                            setIsOpen(true)
                            setSelectedEmployee(item)
                          }} className='btn btn-warning'>Details</button>
                        </td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
            </div>

          }
        </div>

      }

{/* Asset Add input feild */}
      <div className='border border-1 border-black p-2 m-4 d-flex flex-column align-items-center'>
        <h2 className="storeassets">Add Asset</h2>

        <div className='d-flex flex-column w-50'>

          <label> Floor: </label>

          <select onChange={e => {
            setFloor(e.target.value)
            getRooms(e.target.value)
          }} className='select'>
            <option>Select</option>
            {
              floors.map(item => (
                <option value={item.id}>{item.name}</option>
              ))
            }
          </select>

          <label> Job Department: </label>

          <select onChange={e => {
            setDepartment(e.target.value)
          }} className='select'>
            <option>Select</option>
            {
              departments.filter(e => e.id != 3).map(item => (
                <option value={item.id}>{item.name}</option>
              ))
            }
          </select>

          <label> Room: </label>

          <select onChange={e => {
            setRoom(e.target.value)
          }} className='select'>
            <option>Select</option>
            {
              rooms.map(item => (
                <option value={item.id}>{item.name}</option>
              ))
            }
          </select>

          <label> Category: </label>

          <select onChange={e => {
            setCategory(e.target.value)
          }} className='select'>
            <option>Select</option>
            {
              categories.map(item => (
                <option value={item.id}>{item.name}</option>
              ))
            }
          </select>

          <label> Item Name: </label>

          <input className='input' value={item_name} onChange={e => setItem_name(e.target.value)} />

          <label> Quantity: </label>
          <input className='input' value={quantity} onChange={e => setQuantity(e.target.value)} />

          <label> NID:</label>
          <input value={nid} onChange={e => setNID(e.target.value)} className='input' type='text' />

        <button onClick={e => addData(e)} className='btn btn-primary my-3'>Submit</button>


        </div>
      </div>

    </div>

  );
};

export default Store