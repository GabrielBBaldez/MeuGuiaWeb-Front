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
                        <Link to="/roteiros">Roteiros</Link>
                        </li>
                        <li className={styles.item}>
                        <Link to="/cadastro">Cadastro</Link>
                        </li>
                        <li className={styles.item}>
                        <Dropdown data-bs-theme="dark" >
                            <Dropdown.Toggle className={styles.botaoUsuario} id="dropdown-button-dark" variant="dark" style={{ background: 'transparent', border: 'none', fontSize:'25px'}}>
                                Usuário
                            </Dropdown.Toggle>
                            <Dropdown.Menu style={{backgroundColor: "#333"}} >
                                <Dropdown.Item className={styles.link} href="/login" style={{color:"white"}}>
                                    Login
                                </Dropdown.Item>
                                <Dropdown.Divider />
                                <Dropdown.Item className={styles.link} href="/logout" style={{color:"white"}}>
                                    Logout
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