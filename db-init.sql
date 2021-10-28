-- Remove any existing database.
DROP DATABASE IF EXISTS project2;

-- Create Unforget database and user. Ensure Unicode is fully supported.
CREATE DATABASE project2 CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;
GRANT ALL PRIVILEGES ON project2.* TO p2_user@localhost;

-- drop if exists and create secrets table
DROP TABLE IF EXISTS secrets;

CREATE TABLE secrets (
    id SERIAL PRIMARY KEY,
    secret_type VARCHAR,
    'secret' VARCHAR(20)
);
