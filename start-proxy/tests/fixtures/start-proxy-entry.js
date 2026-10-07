// Stub entry point for testing - uses only Node.js built-ins
const fs = require('fs');
const path = require('path');

const outputFile = process.env.GITHUB_OUTPUT;
if (outputFile) {
  fs.appendFileSync(outputFile, 'proxy_host=127.0.0.1\n');
  fs.appendFileSync(outputFile, 'proxy_port=8080\n');
  fs.appendFileSync(outputFile, 'proxy_ca_certificate=\n');
  fs.appendFileSync(outputFile, 'proxy_urls=[]\n');
}
process.exit(0);
