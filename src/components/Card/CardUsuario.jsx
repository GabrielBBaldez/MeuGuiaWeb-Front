import styles from '../module/Card.module.css'
import {BsArrowRight} from 'react-icons/bs'
import { useNavigate  } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';



// eslint-disable-next-line react/prop-types
function CardUsuario({name, description, html_url, identificador}){
    
    const navigate  = useNavigate();

    const handleRedirecionar = (identificador) => {
        navigate(`/roteiros/${identificador}`);
    };

    const [repositories, setRepositories] = useState([])

    useEffect(()=>{
        const buscarRepositorios = async() => {
            const response = await fetch(`http://localhost:8080/roteiro/${identificador}`)

            const data = await response.json()
            setRepositories(data)
        }
        buscarRepositorios()
    }, [])


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
                <button className={styles.botao} onClick={() => handleRedirecionar(identificador)}><BsArrowRight/></button>
            </div>   
 
        </section>
    )
}


export default CardUsuario