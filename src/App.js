import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";

import Home from './components/pages/Home' 
import CadastraRoteiro from './components/pages/CadastraRoteiro'
import Roteiro from './components/pages/Roteiro';

function App() {
  return (
    <div>
    <Router>
      <Header></Header>
            <Routes>
                  <Route exact path="/" element= {< Home />}/>
                  <Route path="/roteiros" element= {< Roteiro />}/>
                  <Route path="/cadastro" element= {< CadastraRoteiro />}/>
            </Routes>    
    </Router>
    </div>
  );
}

export default App;