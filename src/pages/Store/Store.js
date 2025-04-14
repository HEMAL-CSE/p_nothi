import React, { useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import axios from 'axios'
import Modal from 'react-modal'
import '../../App.css'

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
import paginate from '../../utils/pagination'
import TableFooter from '../../Components/TableFooter'

const Store = () => {

  const [data, setData] = useState([])
  const [slice, setSlice] = useState([])
  const [isOpen, setIsOpen] = useState(false)

  const [division, setdivision] = useState('')
  const [divisions, setdivisions] = useState([])
  const [branches, setBranches] = useState([])
  const [branch, setBranch] = useState('')


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

  const [category_wise_data, setCategory_wise_data] = useState({})

  const [assignable, setAssignable] = useState('')
  const [page, setPage] = useState(1);

  const [assignables, setAssignables] = useState([
    {

      name: 'Non-assignable', value: 0,
    },
    {
      name: 'Assignable', value: 1,
    }
  ])

  const [filter_category, setFilter_category] = useState('')
  const [filter_floor, setFilter_floor] = useState('')
  const [filter_room, setFilter_room] = useState('')
  const [filter_assignable, setFilter_assignable] = useState('')
  const [filter_department, setFilter_department] = useState('')
  const [clear, setClear] = useState(false)
  const [range, setRange] = useState([])



  const getData = () => {
    axios.get('https://server.promisenothi.com/employees/assets').then(res => {

      var result = res.data.reduce((value, object) => {
        if (value[object.category_name]) {
          value[object.category_name].amount += object.quantity;
        } else {
          value[object.category_name] = {
            id: object.category_id,
            amount: object.quantity
          }
        }

        return value
      }, {})

      setCategory_wise_data(result)

      const { slice, range } = paginate(res.data, page, 15)
      setData(res.data)
      setSlice(slice)
      setRange(range)

    })
  }



  useEffect(() => {

    getData()

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
      quantity,
      assignable
    }).then(res => {
      console.log('heeeeeeeeellllllllll');

      toast('Submitted')
      getData()

    })
  }

  const filter = (e) => {
    e.preventDefault()
    axios.get(`https://server.promisenothi.com/employees/assets?category_id=${filter_category}&&department_id=${filter_department}&&floor_id=${filter_floor}&&room_id=${filter_room}&&assignable=${filter_assignable}`).then(res => {
      setData(res.data)
      console.log(res.data);
      setClear(true)
    })
  }



  return (
    <div className="container mt-4">
      <ToastContainer />

      {/* <h2 className="mb-4">Store Dashboard Overview:</h2>

      <div className="row">
        <div className="col-md-4 mb-3">
          <div className="card text-white bg-black">
            <div className="card-body d-flex align-items-center justify-content-center">

              <FaUser className='mx-3' size={20} />
     
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
        
              <FaBuilding className='mx-3' size={20} /> 
    
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
     
              <FaMoneyBill className='mx-3' size={20} />
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
          <div className="card text-white bg-black">
            <div className="card-body d-flex align-items-center justify-content-center">
     
              <FaUser className='mx-3' size={20} /> 
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

              <FaBuilding className='mx-3' size={20} /> 
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
           
              <FaMoneyBill className='mx-3' size={20} /> 
              <div>
                <h5 className="card-title">Total Office Equipment</h5>
                <p className="card-text mx-4">0</p>
              </div>
            </div>
          </div>
        </div>
      </div> */}





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
                <h5 className="card-title">Office Equipment</h5>
                <p className="card-text mx-4">{category_wise_data['Office Equipment'] ? category_wise_data['Office Equipment'].amount : '0'}</p>
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
                <h5 className="card-title">Office Furniture</h5>
                <p className="card-text mx-4">{category_wise_data['Office Furniture'] ? category_wise_data['Office Furniture'].amount : '0'}</p>
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
                <h5 className="card-title">Stationary</h5>
                <p className="card-text mx-4">{category_wise_data['Stationary'] ? category_wise_data['Stationary'].amount : '0'}</p>
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
                <h5 className="card-title">Technology and IT Accessories</h5>
                <p className="card-text mx-4">{category_wise_data['Technology and IT Accessories'] ? category_wise_data['Technology and IT Accessories'].amount : '0'}</p>
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
                <h5 className="card-title">Cleaning and Maintenance Supplies</h5>
                <p className="card-text mx-4">{category_wise_data['Cleaning and Maintenance Supplies'] ? category_wise_data['Cleaning and Maintenance Supplies'].amount : '0'}</p>
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
                <h5 className="card-title">Electrical and Electronics Items</h5>
                <p className="card-text mx-4">{category_wise_data['Electrical and Electronics Items'] ? category_wise_data['Electrical and Electronics Items'].amount : '0'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>


      {

        <div className='border border-1 border-black p-2 m-4 d-flex flex-column align-items-center'>
          <h2 className="storeassets">Store Asset Dashboard Overview:</h2>

          <div className='d-flex flex-column w-25'>
            <div className='d-flex flex-column m-2'>
              <label> Floor: </label>

              <select value={filter_floor} onChange={e => {
                setFilter_floor(e.target.value)
                getRooms(e.target.value)
              }} className='select'>
                <option>Select</option>
                {
                  floors.map(item => (
                    <option value={item.id}>{item.name}</option>
                  ))
                }
              </select>
            </div>


            <div className='d-flex flex-column m-2'>
              <label>Room</label>
              <select value={filter_room} onChange={e => {
                setFilter_room(e.target.value)
              }} className='select'>
                <option>Select</option>
                {
                  rooms.map(item => (
                    <option value={item.id}>{item.name}</option>
                  ))
                }
              </select>
            </div>

            <div className='d-flex flex-column m-2'>
              <label>Job Department</label>
              <select value={filter_department} onChange={e => {
                setFilter_department(e.target.value)
              }} className='select'>
                <option>Select</option>
                {
                  departments.filter(e => e.id != 3).map(item => (
                    <option value={item.id}>{item.name}</option>
                  ))
                }
              </select>
            </div>


            <div className='d-flex flex-column m-2'>
              <label>Category</label>
              <select value={filter_category} onChange={e => {
                setFilter_category(e.target.value)
              }} className='select'>
                <option>Select</option>
                {
                  categories.filter(e => e.id != 7).map(item => (
                    <option value={item.id}>{item.name}</option>
                  ))
                }
              </select>
            </div>



            <div className='d-flex flex-column m-2'>
              <label>Assignable</label>
              <select value={filter_assignable} onChange={e => {
                setFilter_assignable(e.target.value)
              }} className='select'>
                <option>Select</option>
                {
                  assignables.map(item => (
                    <option value={item.value}>{item.name}</option>
                  ))
                }
              </select>
            </div>

            <button className='btn btn-success my-2' onClick={filter}>Filter</button>
            {clear && <button className='btn btn-danger' onClick={e => {
              e.preventDefault()
              getData()
              setFilter_assignable('')
              setFilter_category('')
              setFilter_department('')
              setFilter_floor('')
              setFilter_room('')
              setClear(false)
            }}>Clear</button>}





            {/* 
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

            <button onClick={getEmployees} className='btn btn-primary my-3'>Submit</button> */}
          </div>
          {

            <div>
              <table className='mt-10 table'>
                <thead>
                  <tr>
                    <th scope="col text-start">SL No</th>
                    <th scope="col">Floor</th>
                    <th scope="col">Room</th>
                    <th scope="col">Department</th>
                    <th scope="col">Asset Name</th>
                    <th scope="col">Assignable</th>
                    <th scope="col">Quantity</th>
                  </tr>
                </thead>
                <tbody>
                  {

                    slice.map((item, i) => (
                      <tr>
                        <td className='px-3 text-start'>{(page - 1) * 10 + i + 1}</td>
                        <td className='px-3'>{item.floor_name}</td>
                        <td className='px-3'>{item.room_name}</td>
                        <td className='px-3'>{item.department_name}</td>
                        <td className='px-3'>{item.item_name}</td>
                        <td className='px-3'>{item.assignable == 0 ? 'Non Assignable' : 'Assignable'}</td>
                        <td className='px-3'>{item.quantity}</td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
              <TableFooter range={range} slice={slice} setSlice={setSlice} data={data} setPage={setPage} page={page} />
            </div>



          }
        </div>

      }

      {/* Asset Add input feild */}
      <div className='border border-1 border-black p-2 m-4 d-flex flex-column align-items-center'>
        <h2 className="storeassets">Add Asset</h2>

        <form onSubmit={addData} className='d-flex flex-column w-50'>

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

          <label> Assignable: </label>

          <select onChange={e => {
            setAssignable(e.target.value)
          }} className='select'>
            <option>Select</option>
            {
              assignables.map(item => (
                <option value={item.value}>{item.name}</option>
              ))
            }
          </select>

          <label> Item Name: </label>

          <input className='input' value={item_name} onChange={e => setItem_name(e.target.value)} />

          <label> Quantity: </label>
          <input className='input' value={quantity} onChange={e => setQuantity(e.target.value)} />


          <button type='submit' className='btn btn-primary my-3'>Submit</button>


          {/* <div>

<label>Item Name</label>
<input className='input' value={name} onChange={e => setName(e.target.value)} />


<label>Company Name</label>
<input className='input' value={company_name} onChange={e => setCompany_name(e.target.value)} />

<label>Price</label>
<input className='input' value={price} onChange={e => setPrice(e.target.value)} />

<button onClick={addData} className='button'>Submit</button>

</div> */}


        </form>
      </div>

    </div>

  );
};

export default Store