document.querySelectorAll('.accordion__header').forEach(header => {
    header.addEventListener('click', () => {
        const content = header.nextElementSibling;
        const arrow = header.querySelector('.accordion__arrow');

        if (content.classList.contains('open')) {
            content.classList.remove('open');
            arrow.innerHTML = '&#9660;';
        } else {
            content.classList.add('open');
            arrow.innerHTML = '&#9650;';
        }
    });
});

// Получаем элементы
const fileUpload = document.getElementById('fileUpload');
const fileInput = document.getElementById('fileInput');
const previewImage = document.getElementById('previewImage');

// Обработчик для выбора файла через кнопку
fileInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            previewImage.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
});

// Обработчик для перетаскивания файла
fileUpload.addEventListener('dragover', (event) => {
    event.preventDefault();
    fileUpload.style.borderColor = '#0056b3';
});

fileUpload.addEventListener('dragleave', () => {
    fileUpload.style.borderColor = '#007BFF';
});

fileUpload.addEventListener('drop', (event) => {
    event.preventDefault();
    fileUpload.style.borderColor = '#007BFF';

    const file = event.dataTransfer.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            previewImage.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
});
