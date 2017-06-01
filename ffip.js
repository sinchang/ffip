#!/usr/bin/env node
var c = require('colors'),
  https = require('https'),
  iconv = require('iconv-lite'),
  argv = require('yargs')
    .option('ip', {
      demand: true,
      describe: 'input your ip'
    })
    .example('$0 ffip --ip 127.0.0.1')
    .help()
    .version()
    .alias('h', 'help')
    .alias('v', 'version')
    .argv

var options = {
  hostname: 'whois.pconline.com.cn',
  path: '/ip.jsp?ip=' + argv.ip
}

var req = https.request(options, (res) => {
  var body = []
  res
    .on('data', (buf) => {
      body.push(buf)
    })
    .on('end', () => {
      console.log(iconv.decode(Buffer.concat(body), 'GBK').green)
    })
})

req.on('error', (e) => {
  console.log(e.red)
})

req.end()
