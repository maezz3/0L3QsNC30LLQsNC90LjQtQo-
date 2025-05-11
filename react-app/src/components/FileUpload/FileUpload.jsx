import React, { useState, useRef } from 'react';
import axios from 'axios'; // Импортируем axios
import styles from './FileUpload.module.css';

const FileUpload = () => {
  const [imagePreview, setImagePreview] = useState('');
  const [jsonFile, setJsonFile] = useState(null);
  const [isDraggingImage, setIsDraggingImage] = useState(false);
  const [isDraggingJson, setIsDraggingJson] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [resultImage, setResultImage] = useState('');
  const [message, setMessage] = useState({ text: '', type: '' }); 
  const imageInputRef = useRef(null);
  const jsonInputRef = useRef(null);

  const MAX_IMAGE_SIZE_MB = 20;
  const MAX_JSON_SIZE_MB = 5;
  const BYTES_IN_MB = 1048576;

  const showMessage = (text, type = 'info') => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: '', type: '' }), 10000);
  };

  const validateFile = (file, maxSizeMB, allowedTypes) => {
    if (!file) return false;

    if (!allowedTypes.includes(file.type)) {
      showMessage(`Неподдерживаемый формат файла. Разрешены: ${allowedTypes.join(', ')}`, 'error');
      return false;
    }

    if (file.size > maxSizeMB * BYTES_IN_MB) {
      showMessage(`Файл слишком большой. Максимальный размер: ${maxSizeMB} МБ`, 'error');
      return false;
    }

    return true;
  };

  const handleImageChange = (file) => {
    const isValid = validateFile(file, MAX_IMAGE_SIZE_MB, ['image/jpeg', 'image/png', 'image/tiff']);
    if (isValid) {
      const reader = new FileReader();
      reader.onload = (e) => setImagePreview(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleJsonChange = (file) => {
    const isValid = validateFile(file, MAX_JSON_SIZE_MB, ['application/json']);
    if (isValid) setJsonFile(file);
  };

  const handleDragEvents = (type) => ({
    onDragOver: (e) => {
      e.preventDefault();
      type === 'image' ? setIsDraggingImage(true) : setIsDraggingJson(true);
    },
    onDragLeave: () => {
      type === 'image' ? setIsDraggingImage(false) : setIsDraggingJson(false);
    },
    onDrop: (e) => {
      e.preventDefault();
      const file = e.dataTransfer.files[0];
      if (type === 'image') {
        setIsDraggingImage(false);
        handleImageChange(file);
      } else {
        setIsDraggingJson(false);
        handleJsonChange(file);
      }
    }
  });

  const handleSubmit = async () => {
    if (!imagePreview || !jsonFile) {
      showMessage('Пожалуйста, загрузите изображение и JSON файл', 'error');
      return;
    }

    const formData = new FormData();
    formData.append('image', imageInputRef.current.files[0]);
    formData.append('json', jsonFile);

    setIsLoading(true);
    setMessage({ text: '', type: '' });

    try {
      const response = await axios.post('http://localhost:8000/api/fileupload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }, 
        timeout: 30000,
      });

      setResultImage(response.data.imageUrl);
      showMessage('Файлы успешно отправлены! Обработка завершена.', 'success');

    } catch (error) {
      console.error('Ошибка:', error);
      const errorMsg = error.response?.data?.message || 'Произошла ошибка при отправке файлов';
      showMessage(errorMsg, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.content}>
      <div className={styles.leftColumn}>
        <div className={styles.leftText}>
          <p className={styles.leftTextFirst}>
            Хотите узнать, какие суда находятся на вашем снимке? Начните анализ — просто загрузите спутниковое изображение моря или океана.
          </p>
          <p className={styles.leftTextSecond}>
            Поддерживаемые форматы: JPG, PNG, TIFF (макс. {MAX_IMAGE_SIZE_MB} МБ). JSON (макс. {MAX_JSON_SIZE_MB} МБ).
          </p>
        </div>

        {/* Поле загрузки изображения */}
        <div 
          className={`${styles.fileUpload} ${isDraggingImage ? styles.dragging : ''}`}
          {...handleDragEvents('image')}
          onClick={() => imageInputRef.current.click()}
        >
          <input 
            type="file" 
            ref={imageInputRef}
            accept=".jpg,.jpeg,.png,.tiff"
            className={styles.fileInput}
            onChange={(e) => handleImageChange(e.target.files[0])}
          />
          <label className={styles.fileLabel}>Выберите изображение</label>
          <p className={styles.fileHint}>или перетащите его сюда</p>
        </div>

        {/* Поле загрузки JSON */}
        <div 
          className={`${styles.fileUpload} ${isDraggingJson ? styles.dragging : ''}`}
          {...handleDragEvents('json')}
          onClick={() => jsonInputRef.current.click()}
          style={{ marginTop: '20px' }}
        >
          <input 
            type="file" 
            ref={jsonInputRef}
            accept=".json"
            className={styles.fileInput}
            onChange={(e) => handleJsonChange(e.target.files[0])}
          />
          <label className={styles.fileLabel}>Выберите JSON файл</label>
          <p className={styles.fileHint}>или перетащите его сюда</p>
        </div>

        {/* Кнопка отправки с индикатором загрузки */}
        <button 
          className={styles.submitButton}
          onClick={handleSubmit}
          disabled={!imagePreview || !jsonFile || isLoading}
        >
          {isLoading ? (
            <>
              <span className={styles.spinner}></span>
              Отправка...
            </>
          ) : 'Отправить на анализ'}
        </button>

        {/* Блок с уведомлениями */}
        {message.text && (
          <div className={`${styles.message} ${styles[message.type]}`}>
            {message.text}
          </div>
        )}
      </div>

      {/* Превью загруженного изображения */}
      {imagePreview && (
        <div className={styles.rightColumn}>
          <div className={styles.preview}>
          <h3>Загруженное изображение:</h3>
            <img src={imagePreview} alt="Загруженное изображение" />
          </div>
        </div>
      )}

      {/* Результат анализа (если есть) */}
      {resultImage && (
        <div className={styles.rightColumn}>
          <div className={styles.preview}>
            <h3>Результат анализа:</h3>
            <img src={resultImage} alt="Результат анализа" />
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUpload;