
import './App.css';
import Home from "../src/pages/Home";
import Login from "../src/pages/Login";

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'



function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element = {<Login/>}/>
          <Route path="/home"  element = {<Home/>}/>
        </Routes>


      </Router>
    </div>
  );
}

export default App;
