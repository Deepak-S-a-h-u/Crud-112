import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Department from './Screens/Department';
import Designation from './Screens/Designation';
import Employee from './Screens/Employee';
import Header from './Screens/Header';
import Home from './Screens/Home';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
       <Header/>
       <Routes>
        <Route path='/home' element={<Home/>}/>
        <Route path='/department' element={<Department/>}/>
        <Route path='/designation' element={<Designation/>}/>
        <Route path='/employee' element={<Employee/>}/>

       </Routes>
       </BrowserRouter>
   
    </div>
  );
}

export default App;
