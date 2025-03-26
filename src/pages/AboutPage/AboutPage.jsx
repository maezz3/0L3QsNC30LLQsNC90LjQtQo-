import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Hero from '../../components/Hero/Hero';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import styles from './AboutPage.module.css';
import '../../styles/global.css';


const useTimelineAnimation = () => {
    const itemsRef = useRef([]);
    const timelineRef = useRef();
  
    useEffect(() => {
      const lineObserver = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add(styles.animated);
        }
      }, { threshold: 0.5 });
  
      if (timelineRef.current) {
        lineObserver.observe(timelineRef.current);
      }
  
      const itemObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.visible);
          }
        });
      }, { threshold: 0.1 });
  
      itemsRef.current.forEach(item => {
        if (item) itemObserver.observe(item);
      });
  
      return () => {
        lineObserver.disconnect();
        itemObserver.disconnect();
      };
    }, []);
  
    const setTimelineRef = (el) => {
      if (el && !itemsRef.current.includes(el)) {
        itemsRef.current.push(el);
      }
    };
  
    return { setTimelineRef, timelineRef };
};

const AboutPage = () => {
  const { setTimelineRef, timelineRef } = useTimelineAnimation();
  const teamMembers = [
    {
      name: "Владислав Лукьянов",
      role: "Тимлид",
    },
    {
      name: "Маркелов Ярослав",
      role: "Backend-разработчик",
    },
    {
        name: "Чернышкова Злата",
        role: "ML Engineer",
    },
    {
        name: "Солодова София",
        role: "Backend-разработчик, UI/UX-дизайнер",
    },
    {
        name: "Кондратенко Александр",
        role: "ML Engineer",
    },
    {
        name: "Ысаев Руслан",
        role: "Технический писатель, QA Engineer",
    },
    {
        name: "Кузин Антон",
        role: "Frontend-разработчик",
    },
    {
        name: "Подцыкин Валерий",
        role: "ML Engineer",
    },
    {
        name: "Матюшкин Роман",
        role: "Backend-разработчик",
    },
    {
        name: "Шмагин Никита",
        role: "Frontend-разработчик",
    },
  ];

  const timelineItems = [
    {
      year: "2024",
      title: "Старт проекта",
      description: "Разработка первых алгоритмов обнаружения"
    },
    {
      year: "2025",
      title: "Новые возможности",
      description: "Точность распознавания достигла 89%"
    }
  ];

  return (
    <div className={styles.page}>
        <Header />
        <div className={styles.aboutPage}>
        <Hero 
            title="О проекте Watercraft Detector"
        />

        <section className={styles.mission}>
            <h2>Наша миссия</h2>
            <p>
            Разработка точного алгоритма для автоматического обнаружения судов 
            на спутниковых снимках с целью мониторинга морского трафика, 
            контроля рыболовства и поисково-спасательных операций.
            </p>
        </section>

        <section className={styles.team}>
            <h2>Команда</h2>
            <div className={styles.teamGrid}>
            {teamMembers.map((member, index) => (
                <div key={index} className={styles.memberCard}>
                <h3>{member.name}</h3>
                <p className={styles.memberRole}>{member.role}</p>
                </div>
            ))}
            </div>
        </section>

        <section className={styles.history}>
          <h2>История проекта</h2>
          <div 
            className={styles.timeline} 
            ref={timelineRef}
          >
            {timelineItems.map((item, index) => (
              <div 
                key={index} 
                className={styles.timelineItem}
                ref={setTimelineRef}
              >
                <div className={styles.timelineYear}>{item.year}</div>
                <div className={styles.timelineContent}>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.contact}>
            <h2>Связаться с нами</h2>
            <form className={styles.contactForm}>
            <input type="text" placeholder="Ваше имя" required />
            <input type="email" placeholder="Email" required />
            <textarea placeholder="Ваше сообщение" rows="5" required></textarea>
            <button type="submit" className={styles.submitButton}>
                Отправить
            </button>
            </form>
        </section>
        </div>
        <Footer />
    </div>
  );
};

export default AboutPage;