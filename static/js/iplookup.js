document.getElementById('checkIpButton').addEventListener('click', function () {
    const ip = document.getElementById('ipInput').value.trim();
    if (!ip) {
        alert('请输入有效的IP地址！');
        return;
    }

    document.getElementById('result').innerHTML = "<p>正在查询...</p>";

    fetch(`/.netlify/functions/ipLookup?ip=${ip}`)
        .then(response => response.json())
        .then(data => {
            document.getElementById('result').innerHTML = JSON.stringify(data, null, 2);
        })
        .catch(error => {
            console.error(error);
            document.getElementById('result').innerHTML = `<p class="error">查询失败: 网络错误</p>`;
        });
});
