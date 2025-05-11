import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import './AuthPage1.css';
import '../../styles/global.css';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: ''
  });
  const [apiError, setApiError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Валидация email
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  // Валидация пароля (мин 8 символов, хотя бы 1 цифра и 1 буква)
  const validatePassword = (password) => {
    const hasNumber = /\d/;
    const hasLetter = /[a-zA-Z]/;
    const hasSymbol = /[!,.:;#?*&%()-+=]/;
    return password.length >= 8 && hasNumber.test(password) && hasLetter.test(password) && hasSymbol.test(password);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Валидация в реальном времени
    if (name === 'email') {
      setErrors(prev => ({
        ...prev,
        email: value && !validateEmail(value) ? 'Некорректный формат email' : ''
      }));
    } else if (name === 'password') {
      setErrors(prev => ({
        ...prev,
        password: value && !validatePassword(value) 
          ? 'Пароль должен содержать минимум 8 символов, включая цифру и специальный символ (!,.:;#?*&%()-+=)' 
          : ''
      }))
    } else if (name === 'confirmPassword') {
      setErrors(prev => ({
        ...prev,
        confirmPassword: value && value !== formData.password 
          ? 'Пароли не совпадают' 
          : ''
      }));
    }
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { ...errors };

    // Проверка email
    if (!formData.email) {
      newErrors.email = 'Email обязателен';
      isValid = false;
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Некорректный формат email';
      isValid = false;
    }

    // Проверка пароля
    if (!formData.password) {
      newErrors.password = 'Пароль обязателен';
      isValid = false;
    } else if (!validatePassword(formData.password)) {
      newErrors.password = 'Пароль должен содержать минимум 8 символов, включая цифру и букву';
      isValid = false;
    }

    // Для регистрации - дополнительные проверки
    if (!isLogin) {
      if (!formData.name) {
        newErrors.name = 'Имя обязательно';
        isValid = false;
      }
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Подтвердите пароль';
        isValid = false;
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Пароли не совпадают';
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setApiError('');

    if (!validateForm()) return;

    setIsLoading(true);
    
    // Режим разработки - моковые данные
    if (process.env.NODE_ENV === 'development') {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000)); // Имитация задержки
        
        // Моковая проверка (для теста)
        if (isLogin && formData.password !== 'Password123!') {
          throw new Error('Неверный пароль. Для теста используйте "Password123!"');
        }

        localStorage.setItem('access_token', 'mock-token-123');
        localStorage.setItem('user_data', JSON.stringify({
          name: formData.name || 'Тестовый Пользователь',
          email: formData.email,
          date_joined: new Date().toISOString()
        }));
        
        navigate('/dashboard');
      } catch (err) {
        setApiError(err.message);
      } finally {
        setIsLoading(false);
      }
      return; // Прерываем выполнение, чтобы не идти к реальному API
    }

    try {
      if (isLogin) {
        const response = await axios.post('http://localhost:8000/api/auth/login/', {
          email: formData.email,
          password: formData.password
        });
        localStorage.setItem('access_token', response.data.access);
        navigate('/dashboard');
      } else {
        await axios.post('http://localhost:8000/api/auth/register/', {
          name: formData.name,
          email: formData.email,
          password: formData.password
        });
        const loginResponse = await axios.post('http://localhost:8000/api/auth/login/', {
          email: formData.email,
          password: formData.password
        });
        localStorage.setItem('access_token', loginResponse.data.access);
        navigate('/dashboard');
      }
    } catch (err) {
      setApiError(err.response?.data?.detail || 
        (isLogin ? 'Ошибка входа' : 'Ошибка регистрации'));
    } finally {
      setIsLoading(false);
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
          
          {apiError && <div className="error-message">{apiError}</div>}
          
          <form onSubmit={handleSubmit}>
            {!isLogin && (
              <div className="form-group">
                <label>Имя</label>
                <input 
                  type="text" 
                  name="name" 
                  value={formData.name} 
                  onChange={handleChange} 
                  className={errors.name ? 'invalid' : ''}
                />
                {errors.name && <span className="error-text">{errors.name}</span>}
              </div>
            )}
            
            <div className="form-group">
              <label>Email</label>
              <input 
                type="email" 
                name="email" 
                value={formData.email} 
                onChange={handleChange} 
                className={errors.email ? 'invalid' : ''}
              />
              {errors.email && <span className="error-text">{errors.email}</span>}
            </div>
            
            <div className="form-group">
              <label>Пароль</label>
              <input 
                type="password" 
                name="password" 
                value={formData.password} 
                onChange={handleChange} 
                className={errors.password ? 'invalid' : ''}
              />
              {errors.password && <span className="error-text">{errors.password}</span>}
            </div>
            
            {!isLogin && (
              <div className="form-group">
                <label>Подтвердите пароль</label>
                <input 
                  type="password" 
                  name="confirmPassword" 
                  value={formData.confirmPassword} 
                  onChange={handleChange} 
                  className={errors.confirmPassword ? 'invalid' : ''}
                />
                {errors.confirmPassword && (
                  <span className="error-text">{errors.confirmPassword}</span>
                )}
              </div>
            )}
            
            <button 
              type="submit" 
              className="submit-btn"
              disabled={isLoading}
            >
              {isLoading ? 'Загрузка...' : isLogin ? 'Войти' : 'Зарегистрироваться'}
            </button>
          </form>
          
          <div className="switch-auth">
            <p>
              {isLogin ? 'Нет аккаунта?' : 'Уже есть аккаунт?'}
              <span onClick={() => {
                setIsLogin(!isLogin);
                setApiError('');
                setErrors({
                  email: '',
                  password: '',
                  confirmPassword: '',
                  name: ''
                });
              }}>
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