const express = require('express')
const app = express()
const port = 3001
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '3509',
    database: 'my_db'
});
connection.connect();
connection.query('SELECT * from Users', (error, rows, fields) => {
    if (error) throw error;
    console.log('User info is: ', rows);
});

connection.end();

app.get('/', (req, res) => {
    console.log("hello world")
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})