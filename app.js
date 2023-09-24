const express = require('express')
const app = express()
const port = 3000;
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io')
const io = new Server(server)
const mysql = require('mysql');
if (process.env.NODE_ENV === "production") {
    require('dotenv').config({ path: "config/env/.env.production" });

}
else if (process.env.NODE_ENV === 'local') {
    require('dotenv').config({ path: "config/env/.env.local" });
}
else {
    require('dotenv').config({ path: "config/env/.env.development" });
}

io.on('connection', (socket) => {
    console.log('a user connected');
});


const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
})

app.get("/users", (req, res) => {
    //connection.connect();
    connection.query('SELECT * from Users', (error, rows, fields) => {
        if (error) throw error;
        console.log('User info is: ', rows);
        res.send(rows)
    });

    //connection.end();

})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})