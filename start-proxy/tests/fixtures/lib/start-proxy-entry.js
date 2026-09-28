const fs = require('fs');
const outputFile = process.env.GITHUB_OUTPUT;
if (outputFile) {
  fs.appendFileSync(outputFile, 'proxy_host=127.0.0.1\n');
  fs.appendFileSync(outputFile, 'proxy_port=8080\n');
  fs.appendFileSync(outputFile, 'proxy_ca_certificate=stub-cert\n');
  fs.appendFileSync(outputFile, 'proxy_urls=[]\n');
}
console.log('stub start-proxy-entry: done');
