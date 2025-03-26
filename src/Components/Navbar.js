import React from 'react'

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-teal px-3 d-flex justify-content-between" style={{ backgroundColor: "#008080" }}>
    <a className="navbar-brand fw-bold" href="#">
      <span style={{ fontFamily: "cursive", fontWeight: "bold", fontSize: '30px' }}>Pnothi</span>
    </a>
    <div className=" text-white">
    <span style={{ fontFamily: "cursive", fontWeight: "bold", fontSize: '30px', marginLeft: '100px' }}>Welcome to Promise E-Nothi</span>
    </div>
    <div>

    </div>
  </nav>
  )
}

export default Navbar