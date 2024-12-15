import React, { useState } from 'react'
// import about1 from './images/about1.jpg'
// import about from './images/'
// import bg_product_1 from './images/bg-product-1.png'
// import bg_product_2 from './images/bg-product-2.png'
// import blog_2 from './images/blog-2.jpg'
// import blog_3 from './images/blog-3.jpg'
import carousel_1 from '../assets/carousel_1.jpeg'
import carousel_2 from '../assets/carousel_2.jpeg'
// import feature from './images/feature.png'
// import vegetable from './images/vegetable.png'
import { BsBucket, BsGeoAlt, BsPhoneVibrate, BsTelephone, BsTwitter } from 'react-icons/bs';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';

// import VisibilitySensor from 'react-visibility-sensor';


// import './CSS/style.css'
import { FaAward, FaCheck, FaFacebook, FaLinkedin, FaMapMarked, FaMapMarker, FaMapMarkerAlt, FaMugHot, FaPhoneAlt, FaSeedling, FaStar, FaTractor, FaTwitter, FaUsers, FaYoutube } from 'react-icons/fa'
import { BiArrowFromRight, BiArrowToRight, BiEnvelope, BiEnvelopeOpen, BiLeaf } from 'react-icons/bi'
import { FaA, FaCow, FaUserDoctor } from 'react-icons/fa6'
import { useNavigate } from 'react-router-dom'
// import CountUp from 'react-countup'
import { LuBeef, LuMilk } from 'react-icons/lu'
import { GiChicken, GiFarmer, GiGoat, GiRoastChicken, GiRooster, GiSteak } from 'react-icons/gi'
import { TbMilk } from 'react-icons/tb'
import { PiPhone } from 'react-icons/pi'

const Home = () => {

    const navigator = useNavigate()
    const [ active, setActive ] = useState(false);

    return (
        <div>
            <div className="container-fluid px-5 d-none d-lg-block">
                <div className="row gx-5 py-3 align-items-center">
                    <div className="col-lg-3">
                        <div className="d-flex align-items-center justify-content-start">
                            <BsPhoneVibrate className='text-success2 fs-1 me-2' />
                            <h2 className="mb-0">+01550-666800 </h2>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="d-flex align-items-center justify-content-center">
                            <a href="index.html" className="navbar-brand ms-lg-5">
                                <h3 className="m-0 display-4 text-success2"><span className="text-secondary">Promise</span> Nothi</h3>
                            </a>
                        </div>
                    </div>
                    <div className="col-lg-2">
                        
                        <div className="d-flex align-items-center justify-content-end">
                            <a className="btn btn-success2 btn-square rounded-circle me-2" href="https://freewebsitecode.com/"><FaTwitter /></a>
                            <a className="btn btn-success2 btn-square rounded-circle me-2" href="https://facebook.com/freewebsitecode/"><FaFacebook /></a>
                            <a className="btn btn-success2 btn-square rounded-circle me-2" href="https://freewebsitecode.com/"><FaLinkedin /></a>
                            <a className="btn btn-success2 btn-square rounded-circle" href="https://youtube.com/freewebsitecode/"><FaYoutube /></a>
                        </div>

                    </div>
                </div>
            </div>
            {/* <!-- Topbar End --> */}


            {/* <!-- Navbar Start --> */}
            <nav className="navbar navbar-expand-lg bg-success2 navbar-dark shadow-sm py-3 py-lg-0 px-3 px-lg-5">
                <a href="index.html" className="navbar-brand d-flex d-lg-none">
                    <h1 className="m-0 display-4 text-secondary"><span className="text-white">Farm</span>Fresh</h1>
                </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarCollapse">
                    <div className="navbar-nav mx-auto py-0">
                        <a href="#" className="nav-item nav-link active">Home</a>
                        <a href="#about" className="nav-item nav-link">About</a>
                        <a href="#" className="nav-item nav-link">Service</a>
                        <a href="#" className="nav-item nav-link">Product</a>
                        <a href="contact.html" className="nav-item nav-link">Contact</a>
                    </div>
                </div>
                {!localStorage.getItem('token') ? <div className='d-flex align-items-center justify-content-center'>
                    <div onClick={() => {
                        navigator('/login')
                    }} className='mx-3'>
                        <h4 className='bg-login'>Login</h4>
                    </div>
                    <div onClick={() => {
                        navigator('/register')
                    }}>
                        <h4 className='bg-register'>Sign Up</h4>
                    </div>
                </div> : <div className='d-flex align-items-center justify-content-center'>
                    <div onClick={() => {
                        navigator('/employee/general')
                    }} className='mx-3'>
                        <h4 className='bg-login'>Profile</h4>
                    </div>
                   
                </div>}
            </nav>
            {/* <!-- Navbar End --> */}

            {/* <!-- Carousel Start --> */}
            <div className="container-fluid p-0">
                <div id="header-carousel" className="carousel slide carousel-fade" data-bs-ride="carousel">
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img className="w-100 opacity-50" src={carousel_1} alt="Image" />
                            <div className="carousel-caption top-0 bottom-0 start-0 end-0 d-flex flex-column align-items-center justify-content-center">
                                <div className="text-start p-5" style={{ maxWidth: '900px' }}>
                                    <h3 className="text-white bg-success">Promise Nothi</h3>
                                    <h1 style={{ fontSize: '72px' }} className="display-1 text-dark mb-md-4">Smart System For <br />Office Management</h1>
                                    <a href="" className="btn btn-success2 text-white py-md-3 px-md-5 me-3">Explore</a>
                                    <a href="" className="btn btn-secondary py-md-3 px-md-5">Contact</a>
                                </div>
                            </div>
                        </div>
                        <div className="carousel-item">
                            <img className="w-100" src={carousel_2} alt="Image" />
                            <div className="carousel-caption top-0 bottom-0 start-0 end-0 d-flex flex-column align-items-center justify-content-center">
                                <div className="text-start p-5" style={{ maxWidth: '900px' }}>
                                    <h3 className="text-white">Dairy Farm</h3>
                                    <h1 className="display-1 text-white mb-md-4">Organic Fruits For Better Health</h1>
                                    <a href="" className="btn btn-success2  py-md-3 px-md-5 me-3">Explore</a>
                                    <a href="" className="btn btn-secondary py-md-3 px-md-5">Contact</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#header-carousel"
                        data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#header-carousel"
                        data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            </div>
            {/* <!-- Carousel End --> */}

            <div>
                <h1>3rd Section Start</h1>
                <h4>Fourth Section</h4>
            </div>


        </div>
    )
}

export default Home