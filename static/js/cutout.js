let uploadedFile;

document.getElementById('upload').addEventListener('change', (event) => {
    uploadedFile = event.target.files[0];
    const fileNameSpan = document.getElementById('fileName');
    
    if (uploadedFile) {
        // 文件类型检查
        if (!uploadedFile.type.startsWith('image/')) {
            alert('请上传有效的图片文件！');
            uploadedFile = null; // 重置已上传文件
            fileNameSpan.textContent = '';
        } else {
            fileNameSpan.textContent = uploadedFile.name; // 显示文件名
        }
    }
});

document.getElementById('processButton').addEventListener('click', async () => {
    if (!uploadedFile) {
        alert('请先上传一张图片！');
        return;
    }

    const formData = new FormData();
    formData.append('image_file', uploadedFile);

    try {
        const loadingDiv = document.getElementById('loading');
        loadingDiv.style.display = 'block';
        const resultImage = document.getElementById('resultImage');
        resultImage.style.display = 'none';

        const response = await fetch('/.netlify/functions/rembg', {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            const errorMessage = await response.text(); 
            throw new Error(`抠图失败: ${errorMessage}`);
        }

        const imgBlob = await response.blob();
        const imgURL = URL.createObjectURL(imgBlob);
        resultImage.src = imgURL;
        resultImage.style.display = 'block';
    } catch (error) {
        console.error('抠图失败:', error);
        alert(`抠图失败，请重试！错误信息: ${error.message}`);
    } finally {
        loadingDiv.style.display = 'none';
    }
});
