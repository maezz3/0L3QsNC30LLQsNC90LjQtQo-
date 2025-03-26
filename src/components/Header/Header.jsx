import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import styles from './Header.module.css';

const Header = () => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={styles.headerContainer}>
        <Link to="/" className={styles.logolink}>
            <div className={styles.logo}>
                <img src="/images/sputnik.png" alt="Спутник" />
            </div>
            <div className={styles.siteName}>Watercraft Detector</div>
        </Link>
        <nav className={styles.nav}>
          {location.pathname !== '/about' && (
            <button className={styles.navButton}>
              <a href="/about" className={styles.navLink}>О нас</a>
            </button>
          )}
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