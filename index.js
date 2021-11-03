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
service.post('/confess', (request, response) => {
    if (request.body.hasOwnProperty('secret') &&
        request.body.hasOwnProperty('secret_type')) {
        const parameters = [
            request.body.secret,
            request.body.secret_type
        ];

        const query = 'INSERT INTO secrets(secret, secret_type) VALUES (?, ?)';
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

// get all secrets in the database
// service.get('/get/)
service.get('/get/', (request, response) => {
    const parameter = [
        request.params.type,
    ];
    const query = 'SELECT * FROM secrets';
    connection.query(query, parameter, (error, rows) => {
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

// returns all secrets of that type.
service.get('/get/:type', (request, response) => {
    const parameter = [
        request.params.type,
    ];
    const query = 'SELECT * FROM secrets WHERE secret_type = ?';
    connection.query(query, parameter, (error, rows) => {
        if (error) {
            response.status(500);
            response.json({
                ok: false,
                results: 'Specify a secret type in the URL.',
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

// endpoint for getting the report
service.get('/report.html', (request, response) => {
    response.sendFile('/home/sterart/webdev-project2/report.html');
});



// update a secret - p
service.patch('/update/:id', (request, response) => {
    if (request.body.hasOwnProperty('secret') &&
        request.body.hasOwnProperty('secret_type')) {
        const parameters = [
            request.body.secret,
            request.body.secret_type,
            parseInt(request.params.id)
        ];

        const query = 'UPDATE secrets SET secret = ?, secret_type = ? WHERE id = ?';
        connection.query(query, parameters, (error, result) => {
            if (error) {
                response.status(404);
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
    } else {
        response.status(400);
        response.json({
            ok: false,
            results: 'Needs a new secret and a new secret type. ',
        });
    }
});

// delete a secret 
service.delete('/delete/:id', (request, response) => {
    const parameters = [parseInt(request.params.id)];

    const query = 'DELETE FROM secrets WHERE id = ?';
    connection.query(query, parameters, (error, result) => {
        if (error) {
            response.status(404);
            response.json({
                ok: false,
                results: 'No secret with that id.',
            });
        } else {
            const secrets = rows.map(rowToSecrets);
            response.json({
                ok: deleted,
                results: rows.map(rowToSecrets),
            });
        }
    });
});
