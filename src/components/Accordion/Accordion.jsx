import React, { useState } from 'react';
import styles from './Accordion.module.css';

const Accordion = ({ title, content }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.accordion}>
      <div 
        className={styles.header} 
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={styles.title}>{title}</span>
        <span className={styles.arrow}>
          {isOpen ? '▲' : '▼'}
        </span>
      </div>
      
      {isOpen && (
        <div className={styles.content}>
          {Array.isArray(content) ? (
            <div className={styles.exampleContainer}>
              {content.map((item, index) => (
                <div key={index} className={styles.example}>
                  <img 
                    src={`/images/${item.img}`} 
                    alt={item.alt} 
                    className={styles.exampleImage}
                  />
                </div>
              ))}
            </div>
          ) : (
            <p className={styles.description}>{content}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Accordion;