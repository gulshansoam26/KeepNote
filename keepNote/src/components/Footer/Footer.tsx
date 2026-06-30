import type { JSX } from "react";
import { FaFacebookF,FaInstagram ,FaLinkedinIn } from "react-icons/fa";
import styles from './Footer.module.css'

export function Footer():JSX.Element{
    return(
        <footer className={styles.footer}>
            <p>&copy; 2026 KeepNote, All rights reserved.</p>
            <ul className={styles.footerList}>
                <li><a className={styles.footerAnchor }href="https://facebook.com" target="_blank"><FaFacebookF /></a></li>
                <li><a className={styles.footerAnchor } href="https://instagram.com" target="_blank"><FaInstagram /></a></li>
                <li><a className={styles.footerAnchor } href= "https://linkedin.com"
                target="_blank"
                ><FaLinkedinIn /></a></li>
            </ul>
        </footer>
    )
}