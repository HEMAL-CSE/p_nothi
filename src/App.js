import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Employeelayout from './pages/Employee/Employeelayout';
import { Employee } from './pages/Employee/Employee';
import  Home  from './pages/Home';
import Register from './pages/Auth/Register';
import Login from './pages/Auth/Login';
import 'react-toastify/dist/ReactToastify.css';
import { Education } from './pages/Education/Education';
import Profile from './pages/Profile/Profile';
import { Jobinfo } from './pages/Job Info/Jobinfo';
import { Experience } from './pages/Experience/Experience';
import { Responsibilities } from './pages/Responsibilities/Responsibilities';
import { Leaveinfo } from './pages/LeaveInformation/Leaveinfo';
import AllEmployeeInfo from './pages/AllEmployeeInfo/AllEmployeeInfo';
import { Application } from './pages/Application/Application';
import Hierarchy from './pages/Hierarchy/Hierarchy';
import ProtectedRoute from './pages/Auth/ProtectedRoute';
import Store from './pages/Store/Store';
import Purchase from './pages/Purchase/Purchase';
import { ECommerce } from './pages/e-commerce/ecommerce';
import { Notice } from './pages/Notices/Notice';
import Dashboard from './pages/Dashboard/Dashboard';

// import { Leaveinfo } from './pages/LeaveInformation/Leaveinfo';

function App() {
  return (
    <BrowserRouter>

      <Routes>
        {/* <Route element={<Employee />} exact path='/employee/' /> */}

        <Route element={<Home />} exact path='/' />
        <Route element={<Register />} exact path='/register' />
        <Route element={<Login />} exact path='/login' />

        <Route element={<ProtectedRoute />}>
        <Route element={<Employeelayout />} path='/employee'>
        <Route element={<Employee />} exact path='/employee/general' />
        <Route element={<Store />} exact path='/employee/store' />
        <Route element={<Education />} exact path='/employee/education' />
        <Route element={<Profile />} exact path='/employee/profile' />
        <Route element={<Jobinfo/>} exact path='/employee/job' />
        <Route element={<Experience/>} exact path='/employee/experience' />
        <Route element={<Responsibilities/>} exact path='/employee/responsibility'/>
        <Route element={<Leaveinfo/>} exact path='/employee/leave'/>
        <Route element={<AllEmployeeInfo/>} exact path='/employee/all_employee_info'/>
        <Route element={<Dashboard/>} exact path='employee/dashboard'/>

        <Route element={<Notice/>} exact path='/employee/notice'/>

        <Route element={<Application/>} exact path='/employee/application'/>
        <Route element={<Hierarchy/>} exact path='/employee/hierarchy'/>
        <Route element={<Purchase/>} exact path='/employee/purchase'/>
        </Route>
        </Route>

      </Routes>

    </BrowserRouter>

  );
}

export default App;
