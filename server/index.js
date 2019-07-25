const fs = require('fs');
const http = require('http');

// fs.writeFile('./demo.txt', '1222', err => {
//   if (err) {
//     throw err
//   }
// })

// let text = [
//   { name: 'A', duty: '开发人员', id: '001' },
//   { name: 'B', duty: '运营人员', id: '002' },
//   { name: 'C', duty: '超级管理员', id: '003' },
//   { name: 'D', duty: '开发人员', id: '004' },
//   { name: 'E', duty: '开发人员', id: '005' },
// ]
// fs.appendFile('./demo.txt', JSON.stringify(text), 'utf-8',  err => {
//   if (err) {
//     throw err
//   }
// })

// fs.readFile('./demo.txt', 'utf-8', (err, data) => {
//   if (err) {
//     throw err
//   } else {
//     console.log(data)
//   }
// })

// const read = fs.createReadStream('./demo.txt', 'utf-8')
// let str = ''
// let count = 0

// read.on('data', (chunk) => {
//   str += chunk
//   count++
// })

// read.on('end', (chunk) => {
//   console.log(str)
//   console.log(count)
// })
let items = []

http.createServer((req, res) => {
  // 设置跨域的域名，* 代表允许任意域名跨域
  res.setHeader('Access-Control-Allow-Origin', '*');
  // 设置 header 类型
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  // 跨域允许的请求方式
  res.setHeader('Content-Type', 'application/json');
  // console.log(req.url)
  switch(req.method){
    case 'OPTIONS':
      res.statusCode = 200;
      res.end();
      break;
    case 'POST':
      let item = '';
      req.on('data', (chunk) => {
        item += chunk;
      })

      req.on('end', () => {
        // item = JSON.parse(item)
        console.log(item)
        fs.appendFile('./demo.txt', item, 'utf-8', err => {
          if (err) {
            throw err
          }
        })
        // items.push(item)
        // let data = JSON.stringify(items)
        res.write(JSON.stringify({
          code: 200
        }))
        res.end()
      })
      break;
    case 'GET':
      let read = fs.createReadStream('./demo.txt')
      let demo = ''
      read.on('data', (chunk) => {
        demo += chunk
      })
      read.on('end', () => {
        demo = JSON.stringify([demo])
        res.write(demo)
        res.end()
      })
  }
}).listen(3000, () => {
  console.log('server is starting')
})
