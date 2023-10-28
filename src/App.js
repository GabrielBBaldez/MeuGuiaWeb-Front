import './App.css';
import Header from './components/Default/Header';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";

import Home from './components/pages/Home' 
import CadastraRoteiro from './components/pages/CadastraRoteiro'
import Roteiro from './components/pages/Roteiro';
import RoteiroUsuario from './components/pagesUsuario/RoteiroUsuario';
import Login from './components/pages/Login';
import Logout from './components/pages/Logout';
import ViewRoteiro from './components/pages/ViewRoteiro';
import UpdateCadastro from './components/pages/UpdateCadastro';
import ParticiparViagem from './components/pages/ParticiparViagem';
import {AuthContext} from "./components/Context/Auth";

function App() {

  let admin = false;

  if (localStorage.getItem('user_token') !== null) {
    
    console.log('Item no localStorage encontrado');
    admin = true;

  } else {
    // O item do localStorage é null (não existe)
    console.log('Item no localStorage não encontrado');
  }

  return (
    <div>


    <Router>

      <Header>
      </Header>
            <Routes>
                  <Route exact path="/" element= {< Home />}/>
                  <Route path="/roteiros" element={admin ? (<Roteiro />) : (<RoteiroUsuario />)}/>
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