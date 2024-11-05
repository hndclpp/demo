exports.handler = async (event) => {
    const fetch = (await import("node-fetch")).default; 
    const ip = event.queryStringParameters.ip;
    const ipInfoToken = process.env.IPINFO_TOKEN;

    const response = await fetch(`https://ipinfo.io/${ip}/json?token=${ipInfoToken}`);
    const data = await response.json();

    return {
        statusCode: 200,
        body: JSON.stringify(data)
    };
};
