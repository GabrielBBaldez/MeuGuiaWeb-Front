import styles from '../module/Header.module.css'
import {Link} from 'react-router-dom'
import Dropdown from 'react-bootstrap/Dropdown'

function Header(){
    return(
        <nav className={styles.navbar}>
            <h1>Guia Turismo</h1>
            <div className={styles.destinos}>
                    <ul className={styles.list}>
                        <li className={styles.item}>
                            <Link to="/">Home</Link>
                        </li>
                        <li className={styles.item}>
                        <Link to="/roteiros">Roteiros</Link>
                        </li>
                        <li className={styles.item}>
                        <Dropdown data-bs-theme="dark" >
                            <Dropdown.Toggle className={styles.botaoUsuario} id="dropdown-button-dark" variant="dark" style={{ background: 'transparent', border: 'none', fontSize:'25px'}}>
                                Usuário
                            </Dropdown.Toggle>
                            <Dropdown.Menu style={{backgroundColor: "#333"}} >
                                <Dropdown.Item href="/login" className={styles.link}>
                                    <Link to="/login" style={{color:"white"}}>Login</Link>
                                </Dropdown.Item>
                                <Dropdown.Divider />
                                <Dropdown.Item href="/logout" className={styles.link}>
                                    <Link to="/logout" style={{color:"white"}}>Logout</Link>
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        </li>
                    </ul>
        </div>

        </nav>
    )
}

export default Header