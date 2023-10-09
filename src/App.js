import './App.css';
import Header from './components/Default/Header';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";

import Home from './components/pages/Home' 
import CadastraRoteiro from './components/pages/CadastraRoteiro'
import Roteiro from './components/pages/Roteiro';
import Login from './components/pages/Login';
import Logout from './components/pages/Logout';
import ViewRoteiro from './components/pages/ViewRoteiro';
import UpdateCadastro from './components/pages/UpdateCadastro';
import ParticiparViagem from './components/pages/ParticiparViagem';
import {AuthContext} from "./components/Context/Auth";

function App() {
  return (
    <div>

    <Router>

      <Header>
      </Header>
            <Routes>
                  <Route exact path="/" element= {< Home />}/>
                  <Route path="/roteiros" element= {< Roteiro />}/>
                  <Route path="/cadastro" element= {< CadastraRoteiro />}/>
                  <Route path="/login" element= {< Login />}/>
                  <Route path="/logout" element={< Logout />}/>
                  <Route path="/cadastro/:id" element= {< UpdateCadastro />}/>
                  <Route path="/roteiros/:id" element= {< ViewRoteiro />}/>
                  <Route path="/roteiros/:id/participar" element= {< ParticiparViagem />}/>
            </Routes>

    </Router>

    </div>
  );
}

export default App;