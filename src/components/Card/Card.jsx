import { Link } from 'react-router-dom'
import styles from './Card.module.css'
import {BsArrowRight} from 'react-icons/bs'

// eslint-disable-next-line react/prop-types
function Card({name, description, html_url}){
const estilo_card = {
    width: '18 rem'
}

    return(
        <section className={styles.card}>
            <img src={html_url} alt="imagem-roteiro"></img>
            <h3>{name}</h3>
            <p>{description}</p>
            <div className={styles.card_footer}>
                <div></div>
                <Link to={html_url} className={styles.botao}><BsArrowRight/></Link>
            </div>
        </section>
    )
}

export default Card