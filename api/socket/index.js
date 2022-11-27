var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http, {
    cors: {
        origin: "http://localhost:3001",
    }
});


var mysql = require('mysql');
var moment = require('moment');
var sockets = {};

var con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'school',
});

con.connect(function (err) {
    if (err) {
        throw err;
    }
    console.log('Database connected successfully..');
});

io.on('connection', (socket) => {
    if (!sockets[socket.handshake.query.user_id]) {
        sockets[socket.handshake.query.user_id] = [];
    }
    sockets[socket.handshake.query.user_id].push(socket);
    socket.broadcast.emit('user_connected', socket.handshake.query.user_id);

    con.query(`UPDATE users SET is_online=1 where id=${socket.handshake.query.user_id}`, function (err, res) {
        if (err)
            throw err;
        console.log('User connected: ', socket.handshake.query.user_id);
    });

    socket.on('disconnect', function (err) {
        socket.broadcast.emit('user_disconnected', socket.handshake.query.user_id);
        for (var index in sockets[socket.handshake.query.user_id]) {
            if (socket.id == sockets[socket.handshake.query.user_id][index].id) {
                sockets[socket.handshake.query.user_id].splice(index, 1);
            }
        }
        con.query(`UPDATE users SET is_online=0 where id=${socket.handshake.query.user_id}`, function (err, res) {
            if (err)
                throw err;
            console.log('User disconected', socket.handshake.query.user_id);
        });
    });
});

http.listen(3000);
