import React, { useState } from 'react'
// import about1 from './images/about1.jpg'
// import about from './images/'
// import bg_product_1 from './images/bg-product-1.png'
// import bg_product_2 from './images/bg-product-2.png'
// import blog_2 from './images/blog-2.jpg'
// import blog_3 from './images/blog-3.jpg'
import carousel_1 from '../assets/carousel_1.jpeg'
import carousel_2 from '../assets/carousel_2.jpeg'
import feature1 from '../assets/img/features-1.jpg'
import Homepic from '../assets/img/home.png'
// import feature from './images/feature.png'
// import vegetable from './images/vegetable.png'
import { BsBucket, BsGeoAlt, BsPhoneVibrate, BsTelephone, BsTwitter } from 'react-icons/bs';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import './Home.css'

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
                            <img className='home1' src={Homepic} alt="Image" />
                            <button className="get-started-button">Get Started →</button>
                            {/* <div className="carousel-caption top-0 bottom-0 start-0 end-0 d-flex flex-column align-items-center justify-content-center">
                                <div className="text-start p-5" style={{ maxWidth: '900px' }}>
                                    <h3 className="text-white bg-success">Promise Nothi</h3>
                                    <h1 style={{ fontSize: '72px' }} className="display-1 text-dark mb-md-4">Smart System For <br />Office Management</h1>
                                    <a href="" className="btn btn-success2 text-white py-md-3 px-md-5 me-3">Explore</a>
                                    <a href="" className="btn btn-secondary py-md-3 px-md-5">Contact</a>
                                </div>
                            </div> */}
                        </div>
                       
                    </div>
                    
                </div>
            </div>
            {/* <!-- Carousel End --> */}

            {/* Service Section Start */}
    <div className='service-section'>
            <section id="services" class="services section light-background">


      <div class="container section-title" data-aos="fade-up">
        <h2>Service</h2>
        <p>Necessitatibus eius consequatur ex aliquid fuga eum quidem sint consectetur velit</p>
      </div>  

<div class="container">

  <div class="row g-5">

    <div class="col-lg-6" data-aos="fade-up" data-aos-delay="100">
      <div class="service-item item-cyan position-relative">
        <i class="bi bi-activity icon"></i>
        <div>
          <h3>Nesciunt Mete</h3>
          <p>Provident nihil minus qui consequatur non omnis maiores. Eos accusantium minus dolores iure perferendis tempore et consequatur.</p>
          <a href="#" class="read-more stretched-link">Learn More <i class="bi bi-arrow-right"></i></a>
        </div>
      </div>
    </div> 

    <div class="col-lg-6" data-aos="fade-up" data-aos-delay="200">
      <div class="service-item item-orange position-relative">
        <i class="bi bi-broadcast icon"></i>
        <div>
          <h3>Eosle Commodi</h3>
          <p>Ut autem aut autem non a. Sint sint sit facilis nam iusto sint. Libero corrupti neque eum hic non ut nesciunt dolorem.</p>
          <a href="#" class="read-more stretched-link">Learn More <i class="bi bi-arrow-right"></i></a>
        </div>
      </div>
    </div>

    <div class="col-lg-6" data-aos="fade-up" data-aos-delay="300">
      <div class="service-item item-teal position-relative">
        <i class="bi bi-easel icon"></i>
        <div>
          <h3>Ledo Markt</h3>
          <p>Ut excepturi voluptatem nisi sed. Quidem fuga consequatur. Minus ea aut. Vel qui id voluptas adipisci eos earum corrupti.</p>
          <a href="#" class="read-more stretched-link">Learn More <i class="bi bi-arrow-right"></i></a>
        </div>
      </div>
    </div> 

    <div class="col-lg-6" data-aos="fade-up" data-aos-delay="400">
      <div class="service-item item-red position-relative">
        <i class="bi bi-bounding-box-circles icon"></i>
        <div>
          <h3>Asperiores Commodi</h3>
          <p>Non et temporibus minus omnis sed dolor esse consequatur. Cupiditate sed error ea fuga sit provident adipisci neque.</p>
          <a href="#" class="read-more stretched-link">Learn More <i class="bi bi-arrow-right"></i></a>
        </div>
      </div>
    </div>

    <div class="col-lg-6" data-aos="fade-up" data-aos-delay="500">
      <div class="service-item item-indigo position-relative">
        <i class="bi bi-calendar4-week icon"></i>
        <div>
          <h3>Velit Doloremque.</h3>
          <p>Cumque et suscipit saepe. Est maiores autem enim facilis ut aut ipsam corporis aut. Sed animi at autem alias eius labore.</p>
          <a href="#" class="read-more stretched-link">Learn More <i class="bi bi-arrow-right"></i></a>
        </div>
      </div>
    </div> 

    <div class="col-lg-6" data-aos="fade-up" data-aos-delay="600">
      <div class="service-item item-pink position-relative">
        <i class="bi bi-chat-square-text icon"></i>
        <div>
          <h3>Dolori Architecto</h3>
          <p>Hic molestias ea quibusdam eos. Fugiat enim doloremque aut neque non et debitis iure. Corrupti recusandae ducimus enim.</p>
          <a href="#" class="read-more stretched-link">Learn More <i class="bi bi-arrow-right"></i></a>
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
        <p>Necessitatibus eius consequatur ex aliquid fuga eum quidem sint consectetur velit</p>
      </div> 

      <div class="container">
        <div class="row justify-content-between">

          <div class="col-lg-5 d-flex align-items-center">

            <ul class="nav nav-tabs" data-aos="fade-up" data-aos-delay="100">
              <li class="nav-item">
                <a class="nav-link active show" data-bs-toggle="tab" data-bs-target="#features-tab-1">
                  <i class="bi bi-binoculars"></i>
                  <div>
                    <h4 class="d-none d-lg-block">Modi sit est dela pireda nest</h4>
                    <p>
                      Ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
                      velit esse cillum dolore eu fugiat nulla pariatur
                    </p>
                  </div>
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" data-bs-toggle="tab" data-bs-target="#features-tab-2">
                  <i class="bi bi-box-seam"></i>
                  <div>
                    <h4 class="d-none d-lg-block">Unde praesenti mara setra le</h4>
                    <p>
                      Recusandae atque nihil. Delectus vitae non similique magnam molestiae sapiente similique
                      tenetur aut voluptates sed voluptas ipsum voluptas
                    </p>
                  </div>
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" data-bs-toggle="tab" data-bs-target="#features-tab-3">
                  <i class="bi bi-brightness-high"></i>
                  <div>
                    <h4 class="d-none d-lg-block">Pariatur explica nitro dela</h4>
                    <p>
                      Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
                      Debitis nulla est maxime voluptas dolor aut
                    </p>
                  </div>
                </a>
              </li>
            </ul> 

          </div>

          <div class="col-lg-6">

            <div class="tab-content" data-aos="fade-up" data-aos-delay="200">

              <div class="tab-pane fade active show" id="features-tab-1">
                <img src={feature1} alt="" class="img-fluid"/>
              </div>

              <div class="tab-pane fade" id="features-tab-2">
                <img src="assets/img/tabs-2.jpg" alt="" class="img-fluid"/>
              </div>

              <div class="tab-pane fade" id="features-tab-3">
                <img src="assets/img/tabs-3.jpg" alt="" class="img-fluid"/>
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
        <p>Necessitatibus eius consequatur ex aliquid fuga eum quidem sint consectetur velit</p>
      </div> 

      <div class="container" data-aos="fade-up" data-aos-delay="100">

        <div class="row gy-4">

          <div class="col-lg-6">
            <div class="info-item d-flex flex-column justify-content-center align-items-center" data-aos="fade-up" data-aos-delay="200">
              <i class="bi bi-geo-alt"></i>
              <h3>Address</h3>
              <p>A108 Adam Street, New York, NY 535022</p>
            </div>
          </div> 

          <div class="col-lg-3 col-md-6">
            <div class="info-item d-flex flex-column justify-content-center align-items-center" data-aos="fade-up" data-aos-delay="300">
              <i class="bi bi-telephone"></i>
              <h3>Call Us</h3>
              <p>+1 5589 55488 55</p>
            </div>
          </div> 

          <div class="col-lg-3 col-md-6">
            <div class="info-item d-flex flex-column justify-content-center align-items-center" data-aos="fade-up" data-aos-delay="400">
              <i class="bi bi-envelope"></i>
              <h3>Email Us</h3>
              <p>info@example.com</p>
            </div>
          </div>

        </div>

      </div>

    </section>


</div>
    )
}

export default Home