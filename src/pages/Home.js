import React, { useState } from 'react'
import feature1 from '../assets/img/features-1.jpg'
import Homepic from '../assets/img/home.png'
import Feautures from '../assets/img/feature.png'
// import banner1 from '../assets/carousel_1.jpeg'
import banner1 from '../assets/img/banner1.png'
import banner2 from '../assets/img/banner2.png'
import banner3 from '../assets/img/banner3.png'
// import banner2 from '../assets/carosel.jpg'
// import feature from './images/feature.png'
// import vegetable from './images/vegetable.png'
import { BsBinoculars, BsBoundingBoxCircles, BsBoxSeam, BsBrightnessHigh, BsBucket, BsChatSquareText, BsEasel, BsGeoAlt, BsPeople, BsPhoneVibrate, BsTelephone, BsTwitter } from 'react-icons/bs';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import './Home.css'

// import VisibilitySensor from 'react-visibility-sensor';

// import './CSS/style.css'
import { FaAward, FaCheck, FaFacebook, FaFacebookF, FaFacebookSquare, FaLinkedin, FaMapMarked, FaMapMarker, FaMapMarkerAlt, FaMugHot, FaPhoneAlt, FaRegistered, FaSeedling, FaStar, FaTractor, FaTwitter, FaUsers, FaYoutube } from 'react-icons/fa'
import { BiArrowFromRight, BiArrowToRight, BiBroadcast, BiCalendar, BiEnvelope, BiEnvelopeOpen, BiLeaf, BiNotepad, BiPen, BiPencil, BiPieChart, BiRegistered, BiStore } from 'react-icons/bi'
import { FaA, FaCow, FaUserDoctor } from 'react-icons/fa6'
import { useNavigate } from 'react-router-dom'
// import CountUp from 'react-countup'
import { LuBeef, LuMilk } from 'react-icons/lu'
import { GiChicken, GiFarmer, GiGoat, GiRoastChicken, GiRooster, GiSteak } from 'react-icons/gi'
import { TbMilk, TbRegistered } from 'react-icons/tb'
import { PiPerson, PiPhone } from 'react-icons/pi'
import { FiActivity, FiInstagram } from 'react-icons/fi'
import { LiaLinkedin } from 'react-icons/lia'
import { FcDocument } from 'react-icons/fc'
import { MdAppRegistration } from 'react-icons/md'

const Home = () => {

  const navigator = useNavigate()
  const [active, setActive] = useState(false);


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
            <a href="#" className="nav-item nav-link">Features</a>
            <a href="#" className="nav-item nav-link">E-commerce</a>
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
              <img className='home1' src={banner1} alt="Image" />
              {/* <button className="get-started-button">Get Started →</button> */}
              <div className="carousel-caption my-4 top-0 bottom-0 start-0 end-0 d-flex flex-column align-items-end justify-content-start">
                <div className="text-start p-5" style={{ maxWidth: '900px' }}>
                  <h3 className="text-white px-5 bg-success w-75 rounded">Promise Nothi</h3>
                  <h1 style={{ fontSize: '70px' }} className="display-1 text-dark mb-md-4">Smart System For <br />Office Management</h1>
                  <a href="" className="btn btn-success2 text-white py-md-3 px-md-5 me-3">Explore</a>
                  <a href="" className="btn btn-secondary py-md-3 px-md-5">Contact</a>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
      {/* <!-- Carousel End --> */}

      <div class="row gy-4 justify-content-between features-item">
      </div>

      {/* Service Section Start */}
      <div className='service-section'>
        <section id="services" class="services section light-background">
          <div class="container section-title" data-aos="fade-up">
            <h2>Services We Provide</h2>
            <p>Here are some of the key services highlighted of Promise Nothi Website.</p>
          </div>

          <div class="container">

            <div class="row g-5">

              <div class="col-lg-6" data-aos="fade-up" data-aos-delay="100">
                <div class="service-item item-cyan position-relative">
                  {/* <i class="bi bi-activity icon"></i> */}
                  <BsPeople className='icon' />
                  <div>
                    <h3>HR and Employee Management</h3>
                    <p>HR can access full overview of this Software. All Employees information, application, Requisition, leave information etc.</p>
                    <a href="#" class="read-more stretched-link">Read More <i class="bi bi-arrow-right"></i></a>
                  </div>
                </div>
              </div>

              <div class="col-lg-6" data-aos="fade-up" data-aos-delay="300">
                <div class="service-item item-teal position-relative">
                  {/* <i class="bi bi-easel icon"></i> */}
                  <BsEasel className='icon' />
                  <div>
                    <h3>Project & Task Management</h3>
                    <p>Promise-Nothi provides task management system of promise group and all 64 branches from one place.</p>
                    <a href="#" class="read-more stretched-link">Read More <i class="bi bi-arrow-right"></i></a>
                  </div>
                </div>
              </div>

              <div class="col-lg-6" data-aos="fade-up" data-aos-delay="200">
                <div class="service-item item-orange position-relative">
                  {/* <i class="bi bi-broadcast icon"></i> */}
                  <FcDocument className='icon' />
                  <div>
                    <h3>Document Management</h3>
                    <p>Promise-Nothi provided A well-structured document management system. It ensures that important documents are easily accessible, organized, and secure. </p>
                    <a href="#" class="read-more stretched-link">Read More <i class="bi bi-arrow-right"></i></a>
                  </div>
                </div>
              </div>


              <div class="col-lg-6" data-aos="fade-up" data-aos-delay="400">
                <div class="service-item item-red position-relative">
                  {/* <i class="bi bi-bounding-box-circles icon"></i> */}

                  <BsBoundingBoxCircles className='icon' />
                  <div>
                    <h3>Workflow Automation</h3>
                    <p>Promise-Nothi provided A well-structured Workflow system from general employees, Reporting Boss, HR & Admin, Management and Administrator. </p>
                    <a href="#" class="read-more stretched-link">Read More <i class="bi bi-arrow-right"></i></a>
                  </div>
                </div>
              </div>

              <div class="col-lg-6" data-aos="fade-up" data-aos-delay="500">
                <div class="service-item item-indigo position-relative">
                  {/* <i class="bi bi-calendar4-week icon"></i> */}
                  <TbRegistered  className='icon' />
                  <div>
                    <h3>Application & Requisition Management</h3>
                    <p>All Application and Requisition-related issues are provided via this Software. Employees can request items and it will be approved by admins. </p>
                    <a href="#" class="read-more stretched-link">Read More <i class="bi bi-arrow-right"></i></a>
                  </div>
                </div>
              </div>

              <div class="col-lg-6" data-aos="fade-up" data-aos-delay="600">
                <div class="service-item item-pink position-relative">
                  {/* <i class="bi bi-chat-square-text icon"></i> */}
                  <BiStore className='icon' />
                  <div>
                    <h3>Store Management</h3>
                    <p>Pnothi provided well structured store management. Store manager will add new items in store and admins will be able to check available items in store.</p>
                    <a href="#" class="read-more stretched-link">Read More <i class="bi bi-arrow-right"></i></a>
                  </div>
                </div>
              </div>

            </div>

          </div>

        </section>
      </div>

      {/* <!-- Features Section --> */}
      <section id="features" class="features section">

        <div class="container section-title" data-aos="fade-up">
          <h2>Features</h2>
          <p>Here are some key features for Promise Nothi documented management website.</p>
        </div>

        <div class="container">
          <div class="row justify-content-between">

            <div class="col-lg-5 d-flex align-items-center">

              <ul class="nav nav-tabs" data-aos="fade-up" data-aos-delay="100">
                <li class="nav-item">
                  <a class="nav-link active show" data-bs-toggle="tab" data-bs-target="#features-tab-1">
                    {/* <i class="bi bi-binoculars"></i> */}
                    <div className='icon'>
                      <BsBinoculars />
                    </div>

                    <div>
                      <h4 class="d-none d-lg-block">HR and Employee Management</h4>
                      <p>
                        HR can access full overview of this Software. All Employees information, 
                        application, Requisition, leave information etc. 
                      </p>
                    </div>
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" data-bs-toggle="tab" data-bs-target="#features-tab-2">
                    {/* <i class="bi bi-box-seam"></i> */}
                    <div className='icon'>
                      <BsBoxSeam />
                    </div>
                    <div>
                      <h4 class="d-none d-lg-block">Application & Requisition Related Issues</h4>
                      <p> All Application and Requisition-related issues are provided via this Software.
                        Whenever an employee needs something, they can apply this Requisition.
                      </p>
                    </div>
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" data-bs-toggle="tab" data-bs-target="#features-tab-3">
                    {/* <i class="bi bi-brightness-high"></i> */}
                    <div className='icon'>
                      <BsBrightnessHigh />
                    </div>
                    <div>
                      <h4 class="d-none d-lg-block">Leave Information Related Issues</h4>
                      <p>
                        Employees' leave information and leave taking process can be done easily through this website.
                        Each Reporting Boss and HR can approve their leave application.
                      </p>
                    </div>
                  </a>
                </li>
              </ul>

            </div>

            <div class="col-lg-6">

              <div class="tab-content" data-aos="fade-up" data-aos-delay="200">

                <div class="tab-pane fade active show" id="features-tab-1">
                  <img src={feature1} alt="" class="img-fluid" />
                </div>

                <div class="tab-pane fade" id="features-tab-2">
                  <img src="assets/img/tabs-2.jpg" alt="" class="img-fluid" />
                </div>

                <div class="tab-pane fade" id="features-tab-3">
                  <img src="assets/img/tabs-3.jpg" alt="" class="img-fluid" />
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>


      {/* Contact Section Start */}
      <section id="contact" class="contact section">

        {/* <!-- Section Title --> */}
        <div class="container section-title" data-aos="fade-up">
          <h2>Contact</h2>
          <p>Contact Us </p>
        </div>

        <div class="container" data-aos="fade-up" data-aos-delay="100">

          <div class="row gy-4">

            <div class="col-lg-6">
              <div class="info-item d-flex flex-column justify-content-center align-items-center" data-aos="fade-up" data-aos-delay="200">
                {/* <i class="bi bi-geo-alt"></i> */}

                <div className='icon'>
                  <BsGeoAlt />
                </div>

                <h3>Address</h3>
                <p>Khaja IT Park, 2nd to 7th Floor, Kallyanpur Bus Stop, Mirpur Road, Dhaka-1207.</p>
              </div>
            </div>

            <div class="col-lg-3 col-md-6">
              <div class="info-item d-flex flex-column justify-content-center align-items-center" data-aos="fade-up" data-aos-delay="300">
                {/* <i class="bi bi-telephone"></i> */}
                <div className='icon'>
                  <BsTelephone />
                </div>
                <h3>Call Us</h3>
                <p>+88 01550-666900</p>
              </div>
            </div>

            <div class="col-lg-3 col-md-6">
              <div class="info-item d-flex flex-column justify-content-center align-items-center" data-aos="fade-up" data-aos-delay="400">
                {/* <i class="bi bi-envelope"></i> */}
                <div className='icon'>
                  <BiEnvelope />
                </div>
                <h3>Email Us</h3>
                <p>info@e-laeltd.com</p>
              </div>
            </div>

          </div>

        </div>

      </section>

      {/* Footer Section Start */}

      {/* // Footer section with responsibe */}
      <footer>
        <div class="footer-col">
          <h3>E-Learning & Earning Ltd. </h3>
          <li>Khaja IT Park, 2nd to 7th Floor,</li>
          <li>Kallyanpur Bus Stop, Mirpur Road, Dhaka-1207.</li>
          <li>Phone: +88 01550-666900 </li>
          <li>Email: info@e-laeltd.com </li>
        </div>
        <div class="footer-col">
          <h3>Useful links</h3>
          <li>Home</li>
          <li>About Us</li>
          <li>Services</li>
          <li>Contact Us</li>
          <li>Privacy Policy</li>
        </div>
        <div class="footer-col">
          <h3>Our Services</h3>
          <li>Website Interface</li>
          <li>Mobile Application</li>
          <li>Administrator Access</li>
          <li>Guardian Access</li>
          <li>SMS Gateway.</li>
        </div>

        <div class="footer-col">
          <h3>Newsletter</h3>
          <p>You can trust us. We only send promo offers. </p>
          <div class="subscribe">
            <input type="text" placeholder="Your Email address" />
            <a href="#" class="yellow">SUBSCRIBE</a>
          </div>
        </div>

        {/* <!-- Copyright section--> */}
        <div class="copyright">
          <p class=""> &copy; Copyright @E-Learning & Earning Ltd. All Rights Reserved @2025. </p>
          <div class="pro-links">
            <a href="https://www.facebook.com/"> <FaFacebookSquare /></a>
            <a href="https://www.facebook.com/"> <BsTwitter /> </a>
            <a href="https://www.facebook.com/"> <FiInstagram /> </a>
            <a href="https://www.facebook.com/"> <LiaLinkedin /> </a>
          </div>
        </div>


      </footer>

    </div>
  )
}

export default Home