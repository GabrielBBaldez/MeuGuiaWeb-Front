import styles from '../module/Card.module.css'
import {BsArrowRight} from 'react-icons/bs'
import RoteiroService from '../../services/RoteiroService'
import { useNavigate  } from 'react-router-dom';
import { useState } from 'react';



// eslint-disable-next-line react/prop-types
function CardUsuario({name, description, html_url, identificador}){
    
    const navigate  = useNavigate();

    const handleRedirecionar = (identificador) => {
        navigate(`/roteiros/${identificador}`);
    };


    return(
        <section className={styles.card}>

            <img  className={styles.imagemViagem} src={html_url} alt="imagem-roteiro"></img>              

            <h3>{name}</h3>
          
            <p>{description}</p>

            <div className={styles.card_footer}>            
                <button className={styles.botao} onClick={() => handleRedirecionar(identificador)}><BsArrowRight/></button>
            </div>   
 
        </section>
    )
}


export default CardUsuario