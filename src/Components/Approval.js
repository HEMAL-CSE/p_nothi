import React from 'react'

const Approval = ({approved}) => {

    let color = approved == 'APPROVED' || approved == 'RECEIVED' || approved=='SENT' ? 'lightgreen' : approved == 'PENDING' ? 'lightblue' : 'red'

  return (

    <p className='p-2 rounded' style={{backgroundColor: color}}>{approved}</p>
  )
}

export default Approval