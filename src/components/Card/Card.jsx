import { Link } from 'react-router-dom'
import styles from '../module/Card.module.css'
import {BsArrowRight} from 'react-icons/bs'
import RoteiroService from '../../services/RoteiroService'


function deleteRoteiro(identificador){
    RoteiroService.deleteRoteiro(identificador).then(res => {
        window.location.reload()
    });
}
// eslint-disable-next-line react/prop-types
function Card({name, description, html_url, identificador}){

    return(
        <section className={styles.card}>
            <img src={html_url} alt="imagem-roteiro"></img>
            <h3>{name}</h3>
            <p>{description}</p>
            <div className={styles.card_footer}>
            <button className='btn btn-secondary' ><i className="fa-solid fa-pen-to-square"></i> Editar</button>
            <button className='btn btn-danger' id="excluirButton" data-id={identificador} onClick={() => deleteRoteiro(identificador)}><i className="fa-solid fa-trash"></i> Excluir</button>
                <Link to={`http://localhost:3000/roteiros/${identificador}`} className={styles.botao}><BsArrowRight/></Link>
            </div>
        </section>
    )
}


export default Card