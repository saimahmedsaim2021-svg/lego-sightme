const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const PORT = process.env.PORT || 3000;

// CORS আনলক করার জন্য
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    next();
});

// মূল স্ট্রিম পোর্টের দিকে প্রক্সি
app.use('/stream.m3u8', createProxyMiddleware({
    target: 'http://livetv.akr4m.com:8080/bdtv/restrem/02.m3u8',
    changeOrigin: true,
    ignorePath: true,
    headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
        'Referer': 'http://livetv.akr4m.com:8080/'
    }
}));

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
