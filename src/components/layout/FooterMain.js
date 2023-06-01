import React from "react";
import { FaApple, FaLinkedin, FaGithub, FaInstagram, FaTwitterSquare} from "react-icons/fa";
import { SiBinance } from "react-icons/si"
import styles from "./FooterMain.module.css"


export function FooterMain() {
    return (
        <div className={styles.footerMain}>
            <div className={styles.footerMainBar}>
                <a className="footerMainLink" href="https://apple.com"><FaApple size={24} style={{ margin: "10px 15px", fill: 'black' }} /></a>
                <a className="footerMainLink" href="https://linkedin.com"><FaLinkedin size={24} style={{ margin: "10px 15px", fill: 'black' }} /></a>
                <a className="footerMainLink" href="https://github.com"><FaGithub size={24} style={{ margin: "10px 15px", fill: 'black' }} /></a>
                <a className="footerMainLink" href="https://binance.com"><SiBinance size={24} style={{ margin: "10px 15px", fill: 'gold' }} /></a>                
                <a className="footerMainLink" href="https://instagram.com"><FaInstagram size={25} style={{ margin: "10px 15px", fill: 'black' }} /></a>
                <a className="footerMainLink" href="https://twitter.com"><FaTwitterSquare size={24} style={{ margin: "10px 15px", fill: 'black' }} /></a>
            </div>
            <p className={styles.footerMainCopyright}>© 2020 Rochus Offerman</p>
        </div>
    );
}
