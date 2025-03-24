import React, { useState, useRef } from 'react';
import styles from './FileUpload.module.css';

const FileUpload = () => {
  const [preview, setPreview] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = (file) => {
    if (file && ['image/jpeg', 'image/png', 'image/tiff'].includes(file.type)) {
      const reader = new FileReader();
      reader.onload = (e) => setPreview(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleDragEvents = {
    onDragOver: (e) => {
      e.preventDefault();
      setIsDragging(true);
    },
    onDragLeave: () => setIsDragging(false),
    onDrop: (e) => {
      e.preventDefault();
      setIsDragging(false);
      handleFileChange(e.dataTransfer.files[0]);
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
                    Поддерживаемые форматы: JPG, PNG, TIFF. Максимальный размер файла: 20 МБ.
                </p>
            </div>

            {/* Поле загрузки */}
            <div 
                className={`${styles.fileUpload} ${isDragging ? styles.dragging : ''}`}
                {...handleDragEvents}
                onClick={() => fileInputRef.current.click()}
            >
                <input 
                    type="file" 
                    ref={fileInputRef}
                    accept=".jpg,.png,.tiff"
                    className={styles.fileInput}
                    onChange={(e) => handleFileChange(e.target.files[0])}
                />
                <label className={styles.fileLabel}>Выберите файл</label>
                <p className={styles.fileHint}>или перетащите его сюда</p>
            </div>
        </div>

        {preview && (
            <div className={styles.rightColumn}>
                <div className={styles.preview}>
                    <img src={preview} alt="Загруженное изображение" />
                </div>
            </div>
        )}
    </div>
  );
};

export default FileUpload;