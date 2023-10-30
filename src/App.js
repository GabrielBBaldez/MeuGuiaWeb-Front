import './App.css';
import Header from './components/Default/Header';
import Footer from './components/Default/Footer';
import HeaderUsuario from './components/Default/HeaderUsuario';
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
import PessoalAutorizado from './components/pagesUsuario/PessoalAutorizado';

function App() {

  let admin = false;

  if (localStorage.getItem('user_token') !== null) {

    admin = true;

  }

  return (
    <div>

    <Router>

    {admin ? (
        <Header/> // Renderiza o cabeçalho do administrador
      ) : (
        <HeaderUsuario/>
      )}
            <Routes>
                  <Route exact path="/" element= {< Home />}/>
                  <Route path="/roteiros" element={admin ? (<Roteiro />) : (<RoteiroUsuario />)}/>
                  <Route path="/cadastro" element={admin ? (<CadastraRoteiro />) : (<PessoalAutorizado/>)}/>
                  <Route path="/login" element= {< Login />}/>
                  <Route path="/logout" element={< Logout />}/>
                  <Route path="/cadastro/:id" element={admin ? (<UpdateCadastro />) : (<PessoalAutorizado/>)}/>
                  <Route path="/roteiros/:id" element= {< ViewRoteiro />}/>
                  <Route path="/roteiros/:id/participar" element= {< ParticiparViagem />}/>
            </Routes>

          <Footer></Footer>
    </Router>

    </div>
  );
}

export default App;