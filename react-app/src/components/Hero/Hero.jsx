import React from 'react';
import styles from './Hero.module.css';

const Hero = () => {
  return (
    <div className={styles.hero}>
      <img 
        src="/images/Planet.jpg" 
        alt="Распознавание морской техники" 
        className={styles.image}
      />
      <div className={styles.text}>
        Распознавание морской техники на снимках высокого пространственного разрешения
      </div>
    </div>
  );
};

export default Hero;