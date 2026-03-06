const fs = require('fs');
const path = require('path');

const srcDir = path.resolve('c:/Users/soora/OneDrive/Desktop/bus/frontend/src');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else {
      if (file.endsWith('.jsx') || file.endsWith('.js')) {
        results.push(file);
      }
    }
  });
  return results;
}

const files = walk(srcDir);
files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  if (content.includes('https://ksrtc-bus-search-booking-system.onrender.com')) {
    content = content.replace(/https:\/\/ksrtc-bus-search-booking-system\.onrender\.com/g, '${API_URL}');

    const relDir = path.relative(path.dirname(file), srcDir);
    let importPath = relDir ? relDir.replace(/\\/g, '/') + '/config' : './config';
    if (!importPath.startsWith('.')) importPath = './' + importPath;

    content = `import { API_URL } from '${importPath}';\n` + content;

    fs.writeFileSync(file, content, 'utf8');
    console.log('Updated', file);
  }
});
