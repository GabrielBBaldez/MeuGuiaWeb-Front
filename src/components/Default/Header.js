import styles from '../module/Header.module.css'
import {Link} from 'react-router-dom'

function Header(){
    return(
        <nav className={styles.navbar}>
            <h1>Guia Turismo</h1>
            <div>
                <ul className={styles.list}>
                    <li className={styles.item}>
                        <Link to="/">Home</Link>
                    </li>
                    <li className={styles.item}>
                    <Link to="/roteiros">Roteiros</Link>
                    </li>
                    <li className={styles.item}>
                    <Link to="/cadastro">Cadastro</Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Header