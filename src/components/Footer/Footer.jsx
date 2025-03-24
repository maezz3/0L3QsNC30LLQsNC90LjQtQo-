import React from 'react';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <p className={styles.copyright}>© 2024 - 2025 0L3QsNC30LLQsNC90LjQtQo=. Все права защищены.</p>
        <p className={styles.email}>kakayatopochta@project.ru</p>
      </div>
    </footer>
  );
};

export default Footer;