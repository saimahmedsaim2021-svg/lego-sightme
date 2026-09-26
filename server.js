const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const PORT = process.env.PORT || 3000;

// CORS সেটআপ
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    res.header('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS');
    next();
});

// মূল সার্ভার প্রক্সি (M3U8 এবং .TS ফাইল দুটোই প্রক্সি করবে)
app.use('/', createProxyMiddleware({
    target: 'http://livetv.akr4m.com:8080/bdtv/restrem/',
    changeOrigin: true,
    pathRewrite: {
        '^/stream.m3u8': '/02.m3u8',
    },
    headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
        'Referer': 'http://livetv.akr4m.com:8080/'
    },
    onError: (err, req, res) => {
        res.status(500).send('Original stream server is down or unreachable.');
    }
}));

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
