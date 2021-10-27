const express = require('express');
const service = express();

const fs = require('fs');
const mysql = require('mysql');

const json = fs.readFileSync('credentials.json', 'utf8');
const credentials = JSON.parse(json);
const id = 0;
const connection = mysql.createConnection(credentials);

connection.connect(error => {
    if (error) {
        console.error(error);
        process.exit(1);    
    }
});

service.listen(port, () => {
    console.log(`We're live on port ${port}!`);
  });

service.post('/humans', (request, response) => {
    if (request.body.hasOwnProperty('username') &&
        request.body.hasOwnProperty('screenname')) {
        const parameters = [
            request.body.username,
            request.body.screenname,

        ];

        const query = 'INSERT INTO humans(username, screenname) VALUES (?, ?)';
        connection.query(query, parameters, (error, result) => {
            if (error) {
                response.status(500);
                response.json({
                    ok: false,
                    results: error.message,
                });
            } else {
                response.json({
                    ok: true,
                    results: result.insertId,
                });
            }
        });

    } else {
        response.status(400);
        response.json({
            ok: false,
            results: 'Incomplete human.',
        });
    }
});

service.get('/humans/:id', (request, response) => {
    const parameters = [
        parseInt(request.params.username),
        parseInt(request.params.screenname),
    ];
    const query = 'SELECT * FROM humans WHERE username = ? AND screenname = ?';
    connection.query(query, parameters, (error, rows) => {
        if (error) {
            response.status(500);
            response.json({
                ok: false,
                results: error.message,
            });
        } else {
            const memories = rows.map(rowToMemory);
            response.json({
                ok: true,
                results: rows.map(rowToMemory),
            });
        }
    });
});

service.post('/follow/:followee/:follower', (request, response) => {

    const query = 'INSERT INTO humans(username, screenname) VALUES (?, ?)';
    connection.query(query, parameters, (error, result) => {
        if (error) {
            response.status(500);
            response.json({
                ok: false,
                results: error.message,
            });
        } else {
            response.status(204);
            response.json({
                ok: true,
                results: result.insertId,
            });
        }
    });

});

service.get('/follow/:followee', (request, response) => {

});

service.delete('/follow/:followee/:follower', (request, response) => {

});

service.delete('/humans/:id', (request, response) => {

});