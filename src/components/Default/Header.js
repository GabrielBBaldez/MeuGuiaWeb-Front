import styles from '../module/Header.module.css'
import {Link, useNavigate} from 'react-router-dom'
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import useAuth from "../hooks/useAuth";
import {useState} from "react";

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
            <div className={styles.userbox}>
                <nav>
                    <NavDropdown
                        title="User"
                        className={styles.usuario}
                    >
                        <NavDropdown.Item href="/login">
                            <Link to="/login">Login</Link>
                        </NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="/logout">
                            <Link to="/logout">Logout</Link>
                        </NavDropdown.Item>
                    </NavDropdown>
                </nav>
            </div>
        </nav>
    )
}

export default Header