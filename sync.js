const fs = require('fs');
const path = require('path');

const ROOT_DIR = __dirname;
const SITE_DIR = path.join(ROOT_DIR, 'site');
const FILES_JS_PATH = path.join(SITE_DIR, 'files.js');
const FILES_JSON_PATH = path.join(SITE_DIR, 'files.json');

function sortFiles(list) {
  return [...list].sort((a, b) => {
    const numA = a.match(/^(\d+)/);
    const numB = b.match(/^(\d+)/);

    if (numA && numB) {
      const valA = parseInt(numA[1], 10);
      const valB = parseInt(numB[1], 10);
      if (valB !== valA) return valB - valA;
      return b.localeCompare(a, 'vi', { numeric: true, sensitivity: 'base' });
    }
    if (numA && !numB) return -1;
    if (!numA && numB) return 1;

    return b.localeCompare(a, 'vi', { numeric: true, sensitivity: 'base' });
  });
}

function updateFileList() {
  if (!fs.existsSync(SITE_DIR)) {
    console.warn(`[sync] Thư mục ${SITE_DIR} không tồn tại.`);
    return;
  }

  const entries = fs.readdirSync(SITE_DIR);
  const htmlFiles = entries.filter(name => {
    return name.endsWith('.html') &&
      !name.startsWith('index') &&
      !name.startsWith('home');
  });

  const sorted = sortFiles(htmlFiles);

  const jsContent = `// Tự động sinh bởi sync.js lúc ${new Date().toISOString()}\nwindow.__INITIAL_SITE_FILES__ = ${JSON.stringify(sorted, null, 2)};\n`;
  const jsonContent = JSON.stringify(sorted, null, 2) + '\n';

  fs.writeFileSync(FILES_JS_PATH, jsContent, 'utf-8');
  fs.writeFileSync(FILES_JSON_PATH, jsonContent, 'utf-8');

  console.log(`[sync] Đã cập nhật ${sorted.length} file vào site/files.js và site/files.json`);
}

updateFileList();

if (process.argv.includes('--watch')) {
  console.log(`[sync] Đang theo dõi thay đổi trong ${SITE_DIR}...`);
  let timeout = null;
  fs.watch(SITE_DIR, (eventType, filename) => {
    if (filename && filename.endsWith('.html')) {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        console.log(`[sync] Phát hiện thay đổi file "${filename}", đang cập nhật...`);
        updateFileList();
      }, 300);
    }
  });
}

