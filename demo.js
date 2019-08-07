const fs = require('fs');
const qs = require('qs');

// function readText(path) {
//     return new Promise((resolve, reject) => {
//         fs.readFile(path, 'utf-8', (err, data) => {
//             if (err) {
//                 throw err
//             }
//             resolve(data)
//         })
//     })
// }

// function writeText(path, content) {
//     return new Promise((resolve, reject) => {
//         fs.writeFile(path, content, 'utf-8', err => {
//             if (err) {
//                 throw err
//             }
//             resolve('done')
//         })
//     })
// }

// readText('./player.txt').then(res => {
//     let textData = res.slice(0, res.length - 1).split(',').map(item => {
//         return qs.parse(item)
//     })

//     console.log(textData)
// })

// readText('./playerData.txt').then(res => {
//     let gameData = res.slice(0, res.length - 1).split(',').map(item => {
//         return qs.parse(item)
//     })

//     console.log(gameData)
// })

let textData = [{ id: '7' }, { id: '14' }, { id: '34' }, { id: '11' }]

let gameData = [{
    id: '7',
    data: [{ time: '2019/10/6' }, { time: '2019/11/6' }]
},
{
    id: '14',
    data: [{ time: '2019/10/6' }, { time: '2019/11/6' }]
},
{
    id: '34',
    data: [{ time: '2019/10/6' }, { time: '2019/11/6' }]
},
{
    id: '11',
    data: [{ time: '2019/10/6' }, { time: '2019/11/6' }]
}]


// let getMonthList = new Map().set(11, [10]).set(12, [10, 11]).set(1, [10, 11, 12]).set(2, [10, 11, 12, 1]).set(3, [10, 11, 12, 1, 2]).set(4, [10, 11, 12, 1, 2, 3]).set(5, [10, 11, 12, 1, 2, 3, 4])

// let monthList = getMonthList(12)
// let monthList = [];
// for (let i = 0; i < gameData.length; i++) {
//     for (let j = 0; j < gameData[i].length; j++) {
//         if () {

//         }
//     }
// }
