-- drop if exists and create secrets table
DROP TABLE IF EXISTS secrets;

CREATE TABLE secrets (
    id SERIAL PRIMARY KEY,
    secret_type VARCHAR(20),
    'secret' TEXT
);