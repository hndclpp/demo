document.getElementById('checkIpButton').addEventListener('click', function () {
    const ip = document.getElementById('ipInput').value.trim();
    if (!ip) {
        alert('请输入有效的IP地址！');
        return;
    }

    // 显示加载提示
    document.getElementById('result').innerHTML = "<p>正在查询...</p>";

    // 调用 Netlify 后端函数获取 IP 信息
     fetch(`/.netlify/functions/ipLookup?ip=${ip}`)
        .then(response => response.json())
        .then(data => {
            //console.log(data);

            // 判断是否存在数据
            if (data.error) {
                document.getElementById('result').innerHTML = `<p class="error">查询失败: ${data.error.message}</p>`;
                return;
            }

            // 处理并展示返回的数据
            const resultHtml = `
                <h2>IP 信息</h2>
                <div><span class="field-name">IP:</span> <span class="field-value">${data.ip}</span></div>
                <div><span class="field-name">Hostname:</span> <span class="field-value">${data.hostname}</span></div>
                <div><span class="field-name">Anycast:</span> <span class="field-value">${data.anycast ? 'Yes' : 'No'}</span></div>
                <div><span class="field-name">City:</span> <span class="field-value">${data.city}</span></div>
                <div><span class="field-name">Region:</span> <span class="field-value">${data.region}</span></div>
                <div><span class="field-name">Country:</span> <span class="field-value">${data.country}</span></div>
                <div><span class="field-name">Location (Lat, Lng):</span> <span class="field-value">${data.loc}</span></div>
                <div><span class="field-name">Organization:</span> <span class="field-value">${data.org}</span></div>
                <div><span class="field-name">Postal Code:</span> <span class="field-value">${data.postal}</span></div>
                <div><span class="field-name">Timezone:</span> <span class="field-value">${data.timezone}</span></div>
                <hr>
                
                <h2>ASN 信息</h2>
                <div><span class="field-name">ASN:</span> <span class="field-value">${data.asn.asn}</span></div>
                <div><span class="field-name">Name:</span> <span class="field-value">${data.asn.name}</span></div>
                <div><span class="field-name">Domain:</span> <span class="field-value">${data.asn.domain}</span></div>
                <div><span class="field-name">Route:</span> <span class="field-value">${data.asn.route}</span></div>
                <div><span class="field-name">Type:</span> <span class="field-value">${data.asn.type}</span></div>
                <hr>
                
                <h2>公司信息</h2>
                <div><span class="field-name">Name:</span> <span class="field-value">${data.company.name}</span></div>
                <div><span class="field-name">Domain:</span> <span class="field-value">${data.company.domain}</span></div>
                <div><span class="field-name">Type:</span> <span class="field-value">${data.company.type}</span></div>
                <hr>

                <h2>隐私信息</h2>
                <div><span class="field-name">VPN:</span> <span class="field-value">${data.privacy.vpn ? 'Yes' : 'No'}</span></div>
                <div><span class="field-name">Proxy:</span> <span class="field-value">${data.privacy.proxy ? 'Yes' : 'No'}</span></div>
                <div><span class="field-name">TOR:</span> <span class="field-value">${data.privacy.tor ? 'Yes' : 'No'}</span></div>
                <div><span class="field-name">Relay:</span> <span class="field-value">${data.privacy.relay ? 'Yes' : 'No'}</span></div>
                <div><span class="field-name">Hosting:</span> <span class="field-value">${data.privacy.hosting ? 'Yes' : 'No'}</span></div>
                <div><span class="field-name">Service:</span> <span class="field-value">${data.privacy.service || 'N/A'}</span></div>
                <hr>

                <h2>Abuse 联系信息</h2>
                <div><span class="field-name">Address:</span> <span class="field-value">${data.abuse.address}</span></div>
                <div><span class="field-name">Country:</span> <span class="field-value">${data.abuse.country}</span></div>
                <div><span class="field-name">Email:</span> <span class="field-value">${data.abuse.email}</span></div>
                <div><span class="field-name">Name:</span> <span class="field-value">${data.abuse.name}</span></div>
                <div><span class="field-name">Network:</span> <span class="field-value">${data.abuse.network}</span></div>
                <div><span class="field-name">Phone:</span> <span class="field-value">${data.abuse.phone}</span></div>
                <hr>

                <h2>域名信息</h2>
                <div><span class="field-name">Total Domains:</span> <span class="field-value">${data.domains.total}</span></div>
                <div><span class="field-name">Domains:</span></div>
                <ul>
                    ${data.domains.domains.map(domain => `<li><span class="field-value">${domain}</span></li>`).join('')}
                </ul>
            `;
            
            // 显示查询结果
            document.getElementById('result').innerHTML = resultHtml;
        })
        .catch(error => {
            console.error(error);
            document.getElementById('result').innerHTML = `<p class="error">查询失败: 网络错误</p>`;
        });
});
