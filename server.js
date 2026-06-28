const http = require('http');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const PORT = 3000;
const HOST = 'localhost';
const START_URL = `http://${HOST}:${PORT}/menu/index.html`;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.wav': 'audio/wav',
  '.mp3': 'audio/mpeg',
  '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
  // Decode URL to handle Chinese characters in filenames
  let safeUrl = req.url;
  try {
    safeUrl = decodeURIComponent(req.url);
  } catch (e) {
    console.error('Failed to decode URI:', req.url);
  }

  // Parse path
  let filePath = path.join(__dirname, safeUrl === '/' ? '/menu/index.html' : safeUrl);
  
  // Ensure the path is within __dirname (basic security)
  if (!filePath.startsWith(__dirname)) {
    res.statusCode = 403;
    res.end('Forbidden');
    return;
  }

  fs.stat(filePath, (err, stats) => {
    if (err) {
      res.statusCode = 404;
      res.setHeader('Content-Type', 'text/plain; charset=utf-8');
      res.end(`File not found: ${safeUrl}`);
      return;
    }

    if (stats.isDirectory()) {
      filePath = path.join(filePath, 'index.html');
    }

    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'text/plain; charset=utf-8');
        res.end(`Internal Server Error: ${err.message}`);
        return;
      }

      const ext = path.extname(filePath).toLowerCase();
      const contentType = MIME_TYPES[ext] || 'application/octet-stream';
      
      res.statusCode = 200;
      res.setHeader('Content-Type', contentType);
      // Allow iframes and cross origin requests for full local functionality
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.end(data);
    });
  });
});

server.listen(PORT, HOST, () => {
  console.log('==================================================');
  console.log(`🚀 舟神 AI 兩日極致工坊本地伺服器啟動成功！`);
  console.log(`   正在為您在瀏覽器開啟展示網頁...`);
  console.log(`   網址: ${START_URL}`);
  console.log('   (若未自動開啟，請手動複製以上網址至瀏覽器中)');
  console.log('   提示: 請保持此視窗開啟以維持網頁運行，按 Ctrl+C 可關閉。');
  console.log('==================================================');

  // Automatically open browser on Windows
  exec(`start ${START_URL}`, (err) => {
    if (err) {
      console.log('自動開啟瀏覽器失敗，請手動打開瀏覽器並輸入網址。');
    }
  });
});
