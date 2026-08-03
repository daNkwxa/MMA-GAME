const fs = require('fs');
const path = require('path');

const jsDir = path.join(__dirname, 'js');
const wwwDir = path.join(__dirname, 'www');
const wwwJsDir = path.join(wwwDir, 'js');

const files = [
  'data.js',
  'audio.js',
  'fighter.js',
  'career.js',
  'fightEngine.js',
  'adManager.js',
  'arenaManager.js',
  'fighterMovementController.js',
  'fighterBehaviorController.js',
  'arenaCollisionManager.js',
  'combatAnimationController.js',
  'visualFightRenderer.js',
  'roundSimulationController.js',
  'app.js'
];

let bundleContent = '// MMA GOAT - Combined Standalone Bundle for Direct File Execution & i18n Support\n\n';

for (const file of files) {
  const filePath = path.join(jsDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Strip export keywords: export const, export function, export class, export { ... }
  content = content.replace(/^export\s+default\s+/gm, '');
  content = content.replace(/^export\s+(const|let|var|function|class)/gm, '$1');
  
  // Strip import statements
  content = content.replace(/^import\s+[\s\S]*?from\s+['"].*?['"];?/gm, '');

  bundleContent += `\n/* --- ${file} --- */\n` + content + '\n';
}

// Adjust DOMContentLoaded initialization at the end
bundleContent = bundleContent.replace(/window\.addEventListener\('DOMContentLoaded',\s*\(\)\s*=>\s*\{[\s\S]*?\}\);?/g, `
function initMMAGoat() {
  if (!window.app) {
    window.app = new MMAGoatApp();
  }
}
if (document.readyState === 'loading') {
  window.addEventListener('DOMContentLoaded', initMMAGoat);
} else {
  initMMAGoat();
}
`);

// Write bundle.js to js/
fs.writeFileSync(path.join(jsDir, 'bundle.js'), bundleContent, 'utf8');
console.log('bundle.js successfully updated with language fixes!');

// Create www directories if they don't exist
fs.mkdirSync(wwwDir, { recursive: true });
fs.mkdirSync(wwwJsDir, { recursive: true });

// Copy assets to www/
fs.copyFileSync(path.join(__dirname, 'index.html'), path.join(wwwDir, 'index.html'));
fs.copyFileSync(path.join(__dirname, 'styles.css'), path.join(wwwDir, 'styles.css'));
fs.copyFileSync(path.join(jsDir, 'bundle.js'), path.join(wwwJsDir, 'bundle.js'));
console.log('www/ directory successfully populated for Capacitor mobile builds!');
console.log('');
console.log('📱 Mobil Derleme Hazır!');
console.log('   Android için: npm run build:android  (veya npx cap open android)');
console.log('   iOS için:     npm run build:ios      (veya npx cap open ios)');

