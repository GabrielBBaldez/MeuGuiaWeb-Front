import styles from '../module/Card.module.css'
import {BsArrowRight} from 'react-icons/bs'
import RoteiroService from '../../services/RoteiroService'
import { useNavigate  } from 'react-router-dom';
import { useState } from 'react';

function deleteRoteiro(identificador){
    RoteiroService.deleteRoteiro(identificador).then(res => {
        window.location.reload()
    });
}

// eslint-disable-next-line react/prop-types
function Card({name, description, html_url, identificador}){

    const [viagemLotada, setViagemLotada] = useState(false);

    const handleBotaoClick = () => {
        // Se a mensagem estiver visível, esconda-a; caso contrário, mostre-a
        setViagemLotada(!viagemLotada);
      };
    
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
                {viagemLotada ? (
                    <div className={styles.lotado}>
                    <p style={{color:'white', marginBottom:'0px'}}>LOTADO</p>
                    </div>
                ) : null}

            <h3>{name}</h3>
          

            <p>{description}</p>

            <div className={styles.card_footer}>
                <button className='btn btn-secondary' onClick={() => handleEdicao(identificador)} style={{marginRight:'10px'}}><i className="fa-solid fa-pen-to-square"></i></button>
                <button className='btn btn-danger' id="excluirButton" data-id={identificador} onClick={() => deleteRoteiro(identificador)}><i className="fa-solid fa-trash"></i></button>
                <button className="btn btn-dark" style={{marginRight:'10px', marginLeft:'10px'}} onClick={handleBotaoClick}>
                    {viagemLotada ? 'Cancelar Lotação' : 'Lotar viagem'}
                </button>  

                <button className={styles.botao} onClick={() => handleRedirecionar(identificador)}><BsArrowRight/></button>
            </div>      
        </section>
    )
}


export default Card