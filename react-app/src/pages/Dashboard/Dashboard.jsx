import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import './Dashboard.css';

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Проверяем авторизацию и загружаем данные пользователя
  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('access_token');
      
      if (!token) {
        navigate('/auth'); // Если нет токена, перенаправляем на логин
        return;
      }

      // Моковые данные в режиме разработки
      if (process.env.NODE_ENV === 'development') {
        const mockData = localStorage.getItem('user_data');
        if (mockData) {
          setUserData(JSON.parse(mockData));
        } else {
          setUserData({
            name: 'Тестовый Пользователь',
            email: 'test@example.com',
            date_joined: new Date().toISOString()
          });
        }
        setIsLoading(false);
        return;
      }

      try {
        const response = await axios.get('http://localhost:8000/api/auth/user/', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setUserData(response.data);
      } catch (error) {
        console.error('Ошибка загрузки данных:', error);
        localStorage.removeItem('access_token'); // Удаляем невалидный токен
        navigate('/auth');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    navigate('/auth');
  };

  if (isLoading) {
    return <div className="loading">Загрузка...</div>;
  }

  return (
    <div className="dashboard-page">
      <Header />
      <div className="dashboard-container">
        <h1>Личный кабинет</h1>
        
        {userData && (
          <div className="user-profile">
            <div className="user-info">
              <h2>Привет, {userData.name}!</h2>
              <p>Email: {userData.email}</p>
              <p>Дата регистрации: {new Date(userData.date_joined).toLocaleDateString()}</p>
            </div>
            
            <div className="dashboard-actions">
              <button className="logout-btn" onClick={handleLogout}>
                Выйти
              </button>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard