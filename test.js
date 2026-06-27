const fs = require('fs');
const content = fs.readFileSync('borboleta_3d.html', 'utf-8');
const scriptContent = content.split('<script type="module">')[1].split('</script>')[0];
try {
  require('vm').Script(scriptContent);
  console.log('Syntax OK');
} catch (e) {
  console.error('Syntax Error:', e);
}
