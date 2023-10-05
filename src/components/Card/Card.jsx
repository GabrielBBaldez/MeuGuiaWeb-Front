import styles from '../module/Card.module.css'
import {BsArrowRight} from 'react-icons/bs'
import RoteiroService from '../../services/RoteiroService'
import { useNavigate  } from 'react-router-dom';

function deleteRoteiro(identificador){
    RoteiroService.deleteRoteiro(identificador).then(res => {
        window.location.reload()
    });
}

// eslint-disable-next-line react/prop-types
function Card({name, description, html_url, identificador}){
    
    const navigate  = useNavigate();

    const handleRedirecionar = (identificador) => {
        navigate(`/roteiros/${identificador}`);
    };

    const handleEdicao = (identificador) => {
        navigate(`/cadastro/${identificador}`);
    };



    return(
        <section className={styles.card}>
            <img src={html_url} alt="imagem-roteiro"></img>
            <h3>{name}</h3>

            <p>{description}</p>

            <div className={styles.card_footer}>
            <button className='btn btn-secondary' onClick={() => handleEdicao(identificador)}><i className="fa-solid fa-pen-to-square"></i></button>
            <button className='btn btn-danger' id="excluirButton" data-id={identificador} onClick={() => deleteRoteiro(identificador)}><i className="fa-solid fa-trash"></i></button>
                <button className={styles.botao} onClick={() => handleRedirecionar(identificador)}><BsArrowRight/></button>
            </div>
        </section>
    )
}


export default Card