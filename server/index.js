const fs = require('fs');
const http = require('http');
const qs = require('qs');
const url = require('url');

let successCode = JSON.stringify({ code: 200 })

// fs.writeFile('./player.txt', '1222', err => {
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
// fs.appendFile('./player.txt', JSON.stringify(text), 'utf-8',  err => {
//   if (err) {
//     throw err
//   }
// })

// fs.readFile('./player.txt', 'utf-8', (err, data) => {
//   if (err) {
//     throw err
//   } else {
//     console.log(data)
//   }
// })

// const read = fs.createReadStream('./player.txt', 'utf-8')
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
    switch (req.method) {
        case 'OPTIONS':
            res.statusCode = 200;
            res.end();
            break;
        case 'POST':
            let item = '';
            req.on('data', (chunk) => {
                item += chunk;
            })
            if (req.url == '/add') {
                req.on('end', () => {
                    fs.appendFile('./player.txt', item + ',', 'utf-8', err => {
                        if (err) {
                            throw err
                        }
                    })
                    res.write(successCode)
                    res.end()
                })
            } else if (req.url == '/delete') {
                req.on('end', () => {
                    let deldteId = qs.parse(item).id
                    console.log(deldteId)
                    readText('./player.txt').then(data => {
                        let textData = data.slice(0, data.length - 1).split(',').filter(item => {
                            // console.log(qs.parse(item))

                            return qs.parse(item).id != deldteId
                        })
                        // console.log(textData.join(','))
                        writeText('./player.txt', textData.join(',').length ? textData.join(',') + ',' : '')
                    })
                    readText('./playerData.txt').then(data => {
                        console.log(data)
                        let gameData = data.slice(0, data.length - 1).split(',').filter(item => {
                            return qs.parse(item).id != deldteId
                        })
                        console.log(gameData)
                        writeText('./playerData.txt', gameData.join(',').length ? gameData.join(',') + ',' : '')
                    })
                    // readText().then(data => {
                    //   let textData = data.slice(0, data.length - 1).split(',').map(item => {
                    //     return qs.parse(item)
                    //   })
                    //   textData.splice(index, 1)
                    //   let _textData = ''
                    //   textData.forEach(item => {
                    //     return _textData += `name=` + item.name + '&id=' + item.id + ','
                    //   })
                    //   fs.writeFile('./player.txt', _textData, 'utf-8', err => {
                    //     if (err) {
                    //       throw err
                    //     }
                    //   })
                    // })
                    res.write(successCode)
                    res.end()
                    // fs.readFile('./player.txt', 'utf-8', (err, data) => {
                    //   if (err) {
                    //     throw err
                    //   }
                    //   demo = demo.replace(/}(?={)/g, '},').split(',')
                    //   demo = demo.map(item => {
                    //     return JSON.parse(item)
                    //   })
                    //   demo.splice()
                    // })
                })
            } else if (req.url == '/addGame') {
                req.on('end', () => {
                    fs.readFile('./playerData.txt', 'utf-8', (err, data) => {
                        fs.appendFile('./playerData.txt', item + ',', 'utf-8', err => {
                            if (err) {
                                throw err
                            }
                        })
                    })
                    res.write(successCode)
                    res.end()
                })
            }
            break;
        case 'GET':
            let queryDate = qs.parse(url.parse(req.url).query).date
            let read = fs.createReadStream('./player.txt')
            let textData = ''
            let gameData = fs.readFileSync('./playerData.txt', 'utf-8')

            console.log(req.url)
            console.log(queryDate)

            read.on('data', (chunk) => {
                textData += chunk
            })
            read.on('end', () => {
                if (textData.length) {
                    textData = textData.slice(0, textData.length - 1).split(',').map(item => {
                        return qs.parse(item)
                    })
                    gameData = gameData.slice(0, gameData.length - 1).split(',').map(item => {
                        return qs.parse(item)
                    })

                    // 如果有查询的月份
                    if (queryDate) {
                        gameData = gameData.filter(item => {
                            return JSON.parse(item.data).time.indexOf(queryDate) > -1
                        })
                    }


                    textData.forEach((item1, index1) => {
                        gameData.forEach((item2, index2) => {
                            if (item1.id == item2.id) {
                                if (textData[index1].data) {
                                    textData[index1].data.push(JSON.parse(item2.data))
                                } else {
                                    textData[index1].data = [JSON.parse(item2.data)]
                                }
                            }
                        })
                    })

                } else {
                    textData = []
                }
                res.write(JSON.stringify(textData))
                res.end()
            })
    }
}).listen(3000, () => {
    console.log('server is starting')
})

function readText(path) {
    return new Promise((resolve, reject) => {
        fs.readFile(path, 'utf-8', (err, data) => {
            if (err) {
                throw err
            }
            resolve(data)
        })
    })
}

function writeText(path, content) {
    return new Promise((resolve, reject) => {
        fs.writeFile(path, content, 'utf-8', err => {
            if (err) {
                throw err
            }
            resolve('done')
        })
    })
}

