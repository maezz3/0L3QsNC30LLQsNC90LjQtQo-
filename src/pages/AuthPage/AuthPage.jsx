import { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import './AuthPage1.css'
import '../../styles/global.css';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      console.log('Login data:', { email: formData.email, password: formData.password });
      // Здесь логика входа
    } else {
      if (formData.password !== formData.confirmPassword) {
        alert('Пароли не совпадают!');
        return;
      }
      console.log('Register data:', { 
        name: formData.name, 
        email: formData.email, 
        password: formData.password 
      });
      // Здесь логика регистрации
    }
  };

  return (
    <div className="page">
      
        <Header />
        <div className="app">
          <div className="auth-container">
            <div className="auth-header">
              <h2>{isLogin ? 'Вход' : 'Регистрация'}</h2>
              <div className="wave"></div>
            </div>
            
            <form onSubmit={handleSubmit}>
              {!isLogin && (
                <div className="form-group">
                  <label>Имя</label>
                  <input 
                    type="text" 
                    name="name" 
                    value={formData.name} 
                    onChange={handleChange} 
                    required 
                  />
                </div>
              )}
              
              <div className="form-group">
                <label>Email</label>
                <input 
                  type="email" 
                  name="email" 
                  value={formData.email} 
                  onChange={handleChange} 
                  required 
                />
              </div>
              
              <div className="form-group">
                <label>Пароль</label>
                <input 
                  type="password" 
                  name="password" 
                  value={formData.password} 
                  onChange={handleChange} 
                  required 
                />
              </div>
              
              {!isLogin && (
                <div className="form-group">
                  <label>Подтвердите пароль</label>
                  <input 
                    type="password" 
                    name="confirmPassword" 
                    value={formData.confirmPassword} 
                    onChange={handleChange} 
                    required 
                  />
                </div>
              )}
              
              <button type="submit" className="submit-btn">
                {isLogin ? 'Войти' : 'Зарегистрироваться'}
              </button>
            </form>
            
            <div className="switch-auth">
              <p>
                {isLogin ? 'Нет аккаунта?' : 'Уже есть аккаунт?'}
                <span onClick={() => setIsLogin(!isLogin)}>
                  {isLogin ? ' Зарегистрироваться' : ' Войти'}
                </span>
              </p>
            </div>
          </div>
        </div>
        <Footer />
    </div>
  );
};

export default AuthPage;