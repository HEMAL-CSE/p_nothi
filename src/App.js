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


function App() {
  return (

    <BrowserRouter>

      <Routes>
        {/* <Route element={<Employee />} exact path='/employee/' /> */}

        <Route element={<Home />} exact path='/' />
        <Route element={<Register />} exact path='/register' />
        <Route element={<Login />} exact path='/login' />

        <Route element={<Employeelayout />} path='/employee'>
        <Route element={<Employee />} exact path='/employee/general' />
        <Route element={<Education />} exact path='/employee/education' />
        <Route element={<Profile />} exact path='/employee/profile' />
        <Route element={<Jobinfo/>} exact path='/employee/job' />
        <Route element={<Experience/>} exact path='/employee/experience' />





        </Route>

      </Routes>

    </BrowserRouter>

  );
}

export default App;
