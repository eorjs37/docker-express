const express = require('express')
const app = express()
const port = 3000;
const cors = require('cors')
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io')
const io = new Server(server, {
    cors: {
        origin: '*'
    }
})
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


const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
});
app.use(cors())
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
})

app.get("/users", (req, res) => {
    connection.query('SELECT * from Users', (error, rows, fields) => {
        if (error) throw error;
        console.log('User info is: ', rows);
        res.send(rows)
    });
});


io.on('connection', (socket) => {
    socket.on("send", (req) => {
        setTimeout(() => {
            socket.emit("resend", {
                data: '반사'
            })
        }, 3000);
    });
});


server.listen(port, () => {
    console.log(`Socket IO server Example app listening on port ${port}`)
})