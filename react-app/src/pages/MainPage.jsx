import Header from '../components/Header/Header';
import Hero from '../components/Hero/Hero';
import FileUpload from '../components/FileUpload/FileUpload';
import Accordion from '../components/Accordion/Accordion';
import Footer from '../components/Footer/Footer';
import '../styles/global.css';

const MainPage = () => {
    const examples = [
        { img: "example1.jpg", alt: "Пример 1" },
        { img: "example2.jpg", alt: "Пример 2" },
        { img: "example3.jpg", alt: "Пример 3" },
        { img: "example4.jpg", alt: "Пример 4" }
        ];
    return (
        <div className="page">
            <div className="container">
                <Header />
                <Hero />
                <div className="content__back">
                    <FileUpload />
                    <Accordion 
                    title="Вы можете ознакомиться с примерами" 
                    content={examples} 
                    />
                    <Accordion 
                    title="Как это работает, почему выбрали эти технологии" 
                    content="Здесь будет описание того, как работает система и почему мы выбрали эти технологии." 
                    />
                </div>
                <Footer />
            </div>
        </div>
    );
};

export default MainPage;