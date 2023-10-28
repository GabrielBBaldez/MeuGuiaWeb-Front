import styles from '../module/Card.module.css'
import {BsArrowRight} from 'react-icons/bs'
import RoteiroService from '../../services/RoteiroService'
import { useNavigate  } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function deleteRoteiro(identificador){
    RoteiroService.deleteRoteiro(identificador).then(res => {

        toast.success('Card excluído com sucesso!', {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
          });

          setTimeout(() => {
            window.location.reload();
          }, 3000);

    });
}

// eslint-disable-next-line react/prop-types
function Card({name, description, html_url, identificador}){


    const notify = () => toast("Wow so easy!");



    const [repositories, setRepositories] = useState([])

    useEffect(()=>{
        const buscarRepositorios = async() => {
            const response = await fetch(`http://localhost:8080/roteiro/${identificador}`)

            const data = await response.json()
            setRepositories(data)
        }
        buscarRepositorios()
    }, [])

    const [viagemLotada, setViagemLotada] = useState();

    const handleBotaoClick = async (e) => {

        let lotado = repositories.lotado;
        console.log(lotado);

        if(lotado === true){
            lotado = false;
        }
        else{
            lotado=true;
        }

    const headers = {
    'Content-Type': 'application/json',
  };

    axios
      .put(`http://localhost:8080/roteiro/${lotado}/${identificador}`, { headers })
      .then((response) => {
        console.log('PUT request bem-sucedido:', response);
        window.location.reload();
      })
      .catch((error) => {
        console.error('Erro ao enviar o PUT request:', error);
      });
    }

    const navigate  = useNavigate();

    const handleRedirecionar = (identificador) => {
        navigate(`/roteiros/${identificador}`);
    };

    const handleEdicao = (identificador) => {
        navigate(`/cadastro/${identificador}`);
    };



    return(
        <section className={styles.card}>
                
                <img  className={styles.imagemViagem} src={html_url} alt="imagem-roteiro"></img>
                {repositories.lotado ? (
                    <div className={styles.lotado}>
                    <p style={{color:'white', marginBottom:'0px'}}>LOTADO</p>
                    </div>
                ) : 
                    null
                }
                

            <h3>{name}</h3>
          

            <p>{description}</p>

            <div className={styles.card_footer}>
                <button className='btn btn-secondary' onClick={() => handleEdicao(identificador)} style={{marginRight:'10px'}}><i className="fa-solid fa-pen-to-square"></i></button>
                <button className='btn btn-danger' id="excluirButton" data-id={identificador} onClick={() => deleteRoteiro(identificador)}><i className="fa-solid fa-trash"></i></button>
                <button className="btn btn-dark" style={{marginRight:'10px', marginLeft:'10px'}} onClick={handleBotaoClick}>
                    {repositories.lotado ? 'Cancelar Lotação' : 'Lotar viagem'}
                </button>  

                <button className={styles.botao} onClick={() => handleRedirecionar(identificador)}><BsArrowRight/></button>
            </div>   

            <ToastContainer />   
        </section>
    )
}


export default Card