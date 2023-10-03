import './App.css';
import Header from './components/Default/Header';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";

import Home from './components/pages/Home' 
import CadastraRoteiro from './components/pages/CadastraRoteiro'
import Roteiro from './components/pages/Roteiro';
import ViewRoteiro from './components/pages/ViewRoteiro';

function App() {
  return (
    <div>
    <Router>
      <Header></Header>
            <Routes>
                  <Route exact path="/" element= {< Home />}/>
                  <Route path="/roteiros" element= {< Roteiro />}/>
                  <Route path="/cadastro" element= {< CadastraRoteiro />}/>
                  <Route path="/roteiros/:id" element= {< ViewRoteiro />}/>
            </Routes>    
    </Router>
    </div>
  );
}

export default App;