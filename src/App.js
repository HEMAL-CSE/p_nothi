import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Employeelayout from './pages/Employee/Employeelayout';
import { Employee } from './pages/Employee/Employee';
import { Home } from './pages/Home';

function App() {
  return (

    <BrowserRouter>

      <Routes>
        {/* <Route element={<Employee />} exact path='/employee/' /> */}

        <Route element={<Home />} exact path='/' />
        <Route element={<Employeelayout />} path='/employee'>
          <Route element={<Employee />} exact path='/employee/general' />




        </Route>

      </Routes>

    </BrowserRouter>

  );
}

export default App;
