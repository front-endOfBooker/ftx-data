// const {URL} = require('url')
// let myUrl = new URL('http://localhost:3000/data?date=2019/7')

// console.log(myUrl.searchParams)
// console.log(myUrl.searchParams.get('date'))
// console.log(myUrl.search)

const url = require('url');
const qs = require('qs');
let myUrl = '/data?date=2019/7'
console.log(qs.parse(url.parse(myUrl).query).date)
