import React, { useState, useEffect, useContext } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import styles from './Header.module.css';

const Header = () => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const { isAuthenticated, user } = useContext(AuthContext); // Получаем статус авторизации

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
              <Link to="/about" className={styles.navLink}>
                О нас
              </Link>
            </button>
          )}
          <button className={styles.navButton}>
            <Link to="#tech" className={styles.navLink}>
              Технологии
            </Link>
          </button>
          {isAuthenticated ? (
            location.pathname !== '/dashboard' && (
              <button className={styles.navButton}>
                <Link to="/dashboard" className={styles.navLink}>
                  Личный кабинет
                </Link>
              </button>
            )
          ) : (
            location.pathname !== '/auth' && (
              <button className={styles.navButton}>
                <Link to="/auth" className={styles.navLink}>
                  Вход/Регистрация
                </Link>
              </button>
            )
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;