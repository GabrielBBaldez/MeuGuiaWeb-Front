import {FaFacebook, FaInstagram, FaLinkedin} from 'react-icons/fa'
import styles from '../module/Footer.module.css'

function Footer(){
    return(
    <div className={styles.footer}>
        <footer> 
            <ul className={styles.social_list}>
                <li>
                    <FaFacebook></FaFacebook>
                </li>
                <li>
                    <FaInstagram></FaInstagram>
                </li>
                <li>
                    <FaLinkedin></FaLinkedin>
                </li>
            </ul>
            <p className={styles.copy_right}><span>Guia Turismo PI V</span> &copy; 2023</p>
        </footer>
      </div>  

    )
}

export default Footer