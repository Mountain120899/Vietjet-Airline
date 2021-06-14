import './App.css';
import {BrowserRouter as Router} from "react-router-dom";

import HeaderComp from './Component/HeaderComp.js';
import CenterComp from './Component/CenterComp.js';


function App() {
  return (
    <Router>
      <div className="App">
        <HeaderComp />
        <CenterComp />
      </div>
    </Router>
  );
}

export default App;
