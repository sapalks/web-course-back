const Pool = require('pg').Pool

const pool = new Pool({
    user: 'wtpcjpjlwxayip',
    password: '5083c7c5c33e708716b40f9f3dee25e8912d473ec063ef9ac3ce4a43f8674921',
    host: 'ec2-54-72-155-238.eu-west-1.compute.amazonaws.com',
    port: 5432,
    database: 'd587iv3algr5sg'
})

module.exports = pool