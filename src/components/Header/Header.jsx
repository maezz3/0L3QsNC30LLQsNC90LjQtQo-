import React from 'react';
import styles from './Header.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        <div className={styles.logo}>
          <img src="/images/sputnik.png" alt="Спутник" />
        </div>
        <div className={styles.siteName}>Watercraft Detector</div>
        <nav className={styles.nav}>
          <button className={styles.navButton}>
            <a href="#about" className={styles.navLink}>О нас</a>
          </button>
          <button className={styles.navButton}>
            <a href="#tech" className={styles.navLink}>Технологии</a>
          </button>
          <button className={styles.navButton}>
            <a href="#contact" className={styles.navLink}>Вход/Регистрация</a>
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;