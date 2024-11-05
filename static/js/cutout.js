const loadingDiv = document.createElement('div');
loadingDiv.classList.add('loading');
loadingDiv.textContent = 'Loading...';
document.body.appendChild(loadingDiv);

async function sendRequest() {
    try {
        loadingDiv.style.display = 'block';
        const response = await fetch('/.netlify/functions/rembg', {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            throw new Error('抠图失败');
        }
        
        // 处理返回的图片
        const imageBlob = await response.blob();
        const imgElement = document.createElement('img');
        imgElement.src = URL.createObjectURL(imageBlob);
        document.body.appendChild(imgElement);
    } catch (error) {
        console.error('抠图失败:', error);
    } finally {
        loadingDiv.style.display = 'none';
    }
}
