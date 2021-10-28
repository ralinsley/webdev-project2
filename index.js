const express = require('express');

const fs = require('fs');
const mysql = require('mysql');

const service = express();
const id = 0;


// parse credentials
const json = fs.readFileSync('credentials.json', 'utf8');
const credentials = JSON.parse(json);
const connection = mysql.createConnection(credentials);
connection.connect(error => {
    if (error) {
        console.error(error);
        process.exit(1);
    }
});


// function to simplify SELECT statement returns 
function rowToSecrets(row) {
    return {
        id: row.id,
        secret_type: row.secret_type,
        secret: row.secret,
    };
}

// displays all rows in console
const selectQuery = 'SELECT * FROM secrets';
connection.query(selectQuery, (error, rows) => {
    if (error) {
        console.error(error);
    } else {
        const secrets = rows.map(rowToSecrets);
        console.log(secrets);
    }
});

const hostname = 'localhost';
const port = 5001;

service.listen(port, hostname, () => {
    console.log(`We're live on port ${port}!`);
});

// allow cross origin
service.use((request, response, next) => {
    response.set('Access-Control-Allow-Origin', '*');
    next();
});

// cross origin * 
service.options('*', (request, response) => {
    response.set('Access-Control-Allow-Headers', 'Content-Type');
    response.set('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE');
    response.sendStatus(200);
});

service.use(express.json());

// post a secret into the secrets database
service.post('/secret', (request, response) => {
    if (request.body.hasOwnProperty('secret') &&
        request.body.hasOwnProperty('secret_type')) {
        const parameters = [
            request.body.secret,
            request.body.secret_type
        ];

        const query = 'INSERT INTO secrets(secret, secret_type) VALUES (? ?)';
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
            results: 'Needs a secret and a secret type.',
        });
    }
});


// returns all secrets of that type.
service.get('/type', (request, response) => {
    const parameters = [
        request.body.secret_type
    ];
    const query = 'SELECT * FROM secrets WHERE secret_type = ?';
    connection.query(query, parameters, (error, rows) => {
        if (error) {
            response.status(500);
            response.json({
                ok: false,
                results: error.message,
            });
        } else {
            const secrets = rows.map(rowToSecrets);
            response.json({
                ok: true,
                results: rows.map(rowToSecrets),
            });
        }
    });
});

// endpoint for gettinv the report
service.get('/report.html', (request, response) => {
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