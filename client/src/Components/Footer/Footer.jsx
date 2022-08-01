import React from "react";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.footerFlex}>
        <div className={styles.footerLeft}>
          <h2>
            {/* Enterate de todas <br /> nuestras novedades! */}
            yumPaw
          </h2>
          <p className={styles.newsletter}>
            {/* ¡Suscribite a nuestro Newsletter! */}
            Matheus, Leo, Sabri, Alan, Frano
          </p>
          {/* <div>
            <input
              type="email"
              name="email"
              placeholder="E-mail"
              className={styles.email}
            />
            <button className={styles.submit}>Suscribirme</button>
          </div> */}
        </div>
        {/* <div className={styles.footerMid}>
          <ul className={styles.navList}>
            <li className={styles.navItem}>
              <a href="#wwo" className={styles.navLink}>
                Que ofrecemos
              </a>
            </li>
            <li className={styles.navItem}>
              <a href="#team" className={styles.navLink}>
                Equipo
              </a>
            </li>
          </ul>
        </div> */}
        <div className={styles.footerRight}>
          <a href="#">
            <img
              src="../assets/img/arrow-up.svg"
              alt="Go Up"
              className={styles.goUp}
            />
          </a>
        </div>
      </div>
      <div className={styles.footerBottom}>
        <p className={styles.copyright}>Copyright @yumPaw - 2022</p>
        <div className={styles.social}>
          <a href="https://github.com/teixeira26/Proyecto-grupal" target="__blank"><img src="./assets/img/logo-github.svg" alt="" /></a>
        </div>
        <div className={styles.social}>
          <img src="./assets/img/logo-instagram.svg" alt="" target='__blank' className={styles.social}/> 
        </div>
      </div>
    </div>
  );
};

export default Footer;
