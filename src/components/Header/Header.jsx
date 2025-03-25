import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import styles from './Header.module.css';

const Header = () => {
  const location = useLocation();
  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        <Link to="/" className={styles.logolink}>
            <div className={styles.logo}>
                <img src="/images/sputnik.png" alt="Спутник" />
            </div>
            <div className={styles.siteName}>Watercraft Detector</div>
        </Link>
        <nav className={styles.nav}>
          <button className={styles.navButton}>
            <a href="#about" className={styles.navLink}>О нас</a>
          </button>
          <button className={styles.navButton}>
            <a href="#tech" className={styles.navLink}>Технологии</a>
          </button>
          {location.pathname !== '/auth' && (
            <button className={styles.navButton}>
                <a href="/auth" className={styles.navLink}>Вход/Регистрация</a>
            </button>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;